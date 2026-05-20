// lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwUB-qVNQKLV55O9Q4SJVycD1rM04K6gs",
  authDomain: "bhart-yatra.firebaseapp.com",
  projectId: "bhart-yatra",
  storageBucket: "bhart-yatra.firebasestorage.app",
  messagingSenderId: "678608618061",
  appId: "1:678608618061:web:57a50ae4c2cb3c64271204",
  measurementId: "G-QLLMYF0VHH"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
