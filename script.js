import { db } from "./firebase-config.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// Firebase references
const bedsRef = ref(db, "beds/");
const eventsRef = ref(db, "events/");

// UI Elements
const bedsContainer = document.getElementById("beds-container");
const eventsTable = document.getElementById("events-table");
const totalBeds = document.getElementById("totalBeds");
const occupiedBeds = document.getElementById("occupiedBeds");
const vacantBeds = document.getElementById("vacantBeds");
const cleanedBeds = document.getElementById("cleanedBeds");

// 🌗 Dark/Light Mode Toggle
document.getElementById("modeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
});

// Initialize dark mode from localStorage
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
}

// 🕒 Format Timestamp "2025-10-31 21:18:22" → readable date/time
function formatTimestamp(ts) {
  if (!ts) return "N/A";
  try {
    const formatted = ts.replace(" ", "T");
    const date = new Date(formatted);
    if (isNaN(date)) return ts;
    return date.toLocaleString("en-IN", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  } catch {
    return ts;
  }
}

// 🛏️ Load and render all beds
onValue(bedsRef, (snapshot) => {
  const data = snapshot.val();
  bedsContainer.innerHTML = "";
  let occ = 0,
    vac = 0,
    cle = 0,
    total = 0;

  for (const bedId in data) {
    total++;
    const bed = data[bedId];
    const status = bed.status?.toLowerCase() || "unknown";
    if (status === "occupied") occ++;
    if (status === "vacant") vac++;
    if (status === "cleaned") cle++;

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${bedId.toUpperCase()}</h3>
      <p><strong>Status:</strong> <span class="status ${status}">${bed.status}</span></p>
      <p><strong>Patient UID:</strong> ${bed.patient_uid || "None"}</p>
      <p><strong>Last Updated:</strong> ${formatTimestamp(bed.timestamp)}</p>
    `;

    // When clicked, show staff details modal
    card.addEventListener("click", () => showStaffDetails(bedId));
    bedsContainer.appendChild(card);
  }

  totalBeds.textContent = total;
  occupiedBeds.textContent = occ;
  vacantBeds.textContent = vac;
  cleanedBeds.textContent = cle;
});

// 📜 Load Event Logs
let allEvents = [];
onValue(eventsRef, (snapshot) => {
  const events = snapshot.val() || {};
  allEvents = Object.values(events).sort((a, b) => {
    const dateA = new Date((a.timestamp || "").replace(" ", "T"));
    const dateB = new Date((b.timestamp || "").replace(" ", "T"));
    return dateB - dateA;
  });
  renderTable(allEvents);
});

function renderTable(events) {
  eventsTable.innerHTML = "";
  events.forEach((e) => {
    const role = e.role?.toLowerCase() || "unknown";
    const badge = `<span class="role-badge role-${role}">${role}</span>`;
    const row = `
      <tr>
        <td>${e.bed}</td>
        <td>${e.event}</td>
        <td>${badge}</td>
        <td>${e.uid}</td>
        <td>${formatTimestamp(e.timestamp)}</td>
      </tr>
    `;
    eventsTable.innerHTML += row;
  });
}

// 🔍 Search/Filter Function
document.getElementById("searchInput").addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();
  const filtered = allEvents.filter(
    (ev) =>
      ev.role?.toLowerCase().includes(term) ||
      ev.event?.toLowerCase().includes(term) ||
      ev.bed?.toLowerCase().includes(term)
  );
  renderTable(filtered);
});

// 🧾 Show Staff Details Modal
function showStaffDetails(bedId) {
  const modal = document.getElementById("staffModal");
  const staffContainer = document.getElementById("staffDetails");
  const title = document.getElementById("modalBedTitle");
  title.textContent = `Staff Details - ${bedId.toUpperCase()}`;
  modal.style.display = "flex";

  const staffRef = ref(db, `beds/${bedId}/staff_logs`);
  onValue(staffRef, (snapshot) => {
    const logs = snapshot.val();
    if (!logs) {
      staffContainer.innerHTML = "<p>No staff logs found for this bed.</p>";
      return;
    }

    let html = "";
    for (const role in logs) {
      const log = logs[role];
      const entryTime = log.entry_time ? new Date(log.entry_time.replace(" ", "T")) : null;
      const exitTime = log.exit_time ? new Date(log.exit_time.replace(" ", "T")) : null;

      let duration = "N/A";
      if (entryTime && exitTime) {
        const diff = (exitTime - entryTime) / 1000; // seconds
        const mins = Math.floor(diff / 60);
        const secs = Math.floor(diff % 60);
        duration = `${mins} min ${secs} sec`;
      }

      html += `
        <div class="staff-log">
          <h4 class="role-${role.toLowerCase()}">${role.toUpperCase()}</h4>
          <p>🕓 <strong>Entry:</strong> ${formatTimestamp(log.entry_time)}</p>
          <p>🕒 <strong>Exit:</strong> ${formatTimestamp(log.exit_time)}</p>
          <p>⏱️ <strong>Duration:</strong> ${duration}</p>
        </div>
        <hr>
      `;
    }
    staffContainer.innerHTML = html;
  });
}

// 🪟 Close Modal Logic
document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("staffModal").style.display = "none";
});
window.addEventListener("click", (e) => {
  if (e.target.id === "staffModal") {
    document.getElementById("staffModal").style.display = "none";
  }
});
