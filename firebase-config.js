// firebase-config.js

// ✅ Import Firebase modules from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// ✅ Your Firebase Configuration (from your Firebase console)
const firebaseConfig = {
  apiKey: "AIzaSyAAMaCrbgspznOqKa0pSRb51cYLZOIfGfw",
  authDomain: "pulse-6ab9f.firebaseapp.com",
  databaseURL: "https://pulse-6ab9f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pulse-6ab9f",
  storageBucket: "pulse-6ab9f.appspot.com",
  messagingSenderId: "51405793087",
  appId: "1:51405793087:web:b9c59d4a29b59e0b8ef8a3"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Realtime Database
const db = getDatabase(app);

// ✅ Export db for other modules
export { db };
