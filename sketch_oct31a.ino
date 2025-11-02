#include <WiFi.h>
#include <HTTPClient.h>
#include <SPI.h>
#include <MFRC522.h>
#include <ArduinoJson.h>
#include "time.h"

// ---------- CONFIGURATION ----------
const char* WIFI_SSID = "Akshaya S";
const char* WIFI_PASSWORD = "0987654321";
const char* FIREBASE_DB_URL = "https://pulse-6ab9f-default-rtdb.asia-southeast1.firebasedatabase.app";

#define ENTRY_SS 22   // SDA for Entry Reader
#define ENTRY_RST 21  // RST for Entry Reader
#define EXIT_SS 5     // SDA for Exit Reader
#define EXIT_RST 18   // RST for Exit Reader

MFRC522 entryReader(ENTRY_SS, ENTRY_RST);
MFRC522 exitReader(EXIT_SS, EXIT_RST);

// WiFi time setup
const char* ntpServer = "pool.ntp.org";
const long gmtOffset_sec = 19800; // +5:30 IST
const int daylightOffset_sec = 0;

// --------------------------
// 🔹 Tag Roles
// --------------------------
String getTagRole(String uid) {
  uid.toUpperCase();
  if (uid == "A39C081F" || uid == "D3A0761C") return "patient";
  if (uid == "333C841C" || uid == "8CF4D35B") return "nurse";
  if (uid == "735F091F" || uid == "F36E741C") return "cleaner";
  if (uid == "AC6FD15A" || uid == "B34B0A1F") return "doctor";
  return "unknown";
}

// --------------------------
// 🔹 Globals
// --------------------------
String currentPatientUID = "";
bool bedOccupied[4] = {false, false, false, false}; // For 4 beds
String bedPatientUID[4] = {"", "", "", ""};
String bedIDs[4] = {"bed1", "bed2", "bed3", "bed4"};

// --------------------------
// 🔹 Time helper
// --------------------------
String getFormattedTime() {
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    return "Time_Error";
  }
  char buffer[30];
  strftime(buffer, sizeof(buffer), "%Y-%m-%d %H:%M:%S", &timeinfo);
  return String(buffer);
}

// --------------------------
// 🔹 Firebase helpers
// --------------------------
void updateBedStatus(String bedID, String status, String patientUID) {
  HTTPClient http;
  String url = String(FIREBASE_DB_URL) + "/beds/" + bedID + ".json";

  DynamicJsonDocument doc(256);
  doc["status"] = status;
  doc["patient_uid"] = patientUID;
  doc["timestamp"] = getFormattedTime();

  String json;
  serializeJson(doc, json);

  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  int code = http.PUT(json);
  Serial.printf("📡 Firebase Bed Update → %s | Bed: %s | Code: %d\n", status.c_str(), bedID.c_str(), code);
  http.end();
}

void logEvent(String bedID, String eventType, String uid, String role) {
  HTTPClient http;
  String url = String(FIREBASE_DB_URL) + "/events.json";

  DynamicJsonDocument doc(256);
  doc["bed"] = bedID;
  doc["event"] = eventType;
  doc["uid"] = uid;
  doc["role"] = role;
  doc["timestamp"] = getFormattedTime();

  String json;
  serializeJson(doc, json);

  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  int code = http.POST(json);
  Serial.printf("📝 Firebase Event Log → %s | Bed: %s | Code: %d\n", eventType.c_str(), bedID.c_str(), code);
  http.end();
}

// --------------------------
// 🔹 Setup
// --------------------------
void setup() {
  Serial.begin(115200);
  delay(1000);
  Serial.println("\n🩺 Booting Dual RFID ICU Bed Monitor...");

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(400);
  }
  Serial.println("\n✅ WiFi connected!");

  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);
  Serial.println("🕒 Time synchronized with NTP server!");

  SPI.begin(19, 25, 23);
  entryReader.PCD_Init();
  exitReader.PCD_Init();

  Serial.println("✅ Both RFID readers ready!");
  Serial.println("System initialized. Waiting for RFID tags...");

  // Initialize all beds as vacant
  for (int i = 0; i < 4; i++) {
    updateBedStatus(bedIDs[i], "vacant", "");
  }
}

// --------------------------
// 🔹 Loop
// --------------------------
void loop() {
  checkRFID(entryReader, "entry");
  checkRFID(exitReader, "exit");
  delay(200);
}

// --------------------------
// 🔹 RFID Handling
// --------------------------
void checkRFID(MFRC522 &reader, String readerType) {
  if (!reader.PICC_IsNewCardPresent() || !reader.PICC_ReadCardSerial()) return;

  String uid = "";
  for (byte i = 0; i < reader.uid.size; i++) {
    uid += String(reader.uid.uidByte[i] < 0x10 ? "0" : "") + String(reader.uid.uidByte[i], HEX);
  }
  uid.toUpperCase();

  String role = getTagRole(uid);
  Serial.printf("\n📡 %s reader detected → UID: %s | Role: %s\n", readerType.c_str(), uid.c_str(), role.c_str());

  if (role == "patient") {
    handlePatient(uid, readerType);
  } else if (role == "doctor" || role == "nurse" || role == "cleaner") {
    handleStaff(uid, role, readerType);
  } else {
    Serial.println("❌ Unknown tag detected!");
    logEvent("unknown", "unknown_tag", uid, "unknown");
  }

  reader.PICC_HaltA();
}

// --------------------------
// 🔹 Handle Patient Logic
// --------------------------
void handlePatient(String uid, String readerType) {
  if (readerType == "entry") {
    int assignedBed = -1;

    // Find first vacant bed
    for (int i = 0; i < 4; i++) {
      if (!bedOccupied[i]) {
        assignedBed = i;
        break;
      }
    }

    if (assignedBed != -1) {
      bedOccupied[assignedBed] = true;
      bedPatientUID[assignedBed] = uid;
      Serial.printf("✅ Patient assigned to %s\n", bedIDs[assignedBed].c_str());
      updateBedStatus(bedIDs[assignedBed], "occupied", uid);
      logEvent(bedIDs[assignedBed], "patient_entry", uid, "patient");
    } else {
      Serial.println("⚠️ No vacant beds available!");
    }
  }

  else if (readerType == "exit") {
    // Find which bed the patient was in
    for (int i = 0; i < 4; i++) {
      if (bedPatientUID[i] == uid) {
        bedOccupied[i] = false;
        bedPatientUID[i] = "";
        Serial.printf("🚶 Patient exited from %s\n", bedIDs[i].c_str());
        updateBedStatus(bedIDs[i], "vacant", "");
        logEvent(bedIDs[i], "patient_exit", uid, "patient");
        return;
      }
    }
    Serial.println("⚠️ Patient exit detected but not assigned to any bed!");
  }
}

// --------------------------
// 🔹 Handle Staff Logic
// --------------------------
void handleStaff(String uid, String role, String readerType) {
  String eventType = role + "_" + readerType;

  // Only log staff for BED1 (active monitoring zone)
  String bedID = "bed1";
  logEvent(bedID, eventType, uid, role);

  HTTPClient http;
  String url = String(FIREBASE_DB_URL) + "/beds/" + bedID + "/staff_logs/" + role + ".json";

  DynamicJsonDocument doc(256);
  if (readerType == "entry") {
    doc["entry_time"] = getFormattedTime();
  } else if (readerType == "exit") {
    doc["exit_time"] = getFormattedTime();
  }
  doc["uid"] = uid;

  String json;
  serializeJson(doc, json);

  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  int code = http.PATCH(json);
  Serial.printf("📋 Firebase Staff Log (%s) [%s] → Code: %d\n", role.c_str(), readerType.c_str(), code);
  http.end();
}
