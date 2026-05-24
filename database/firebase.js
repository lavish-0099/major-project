// lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCsH93sMxB-4WUBaJwF4dfQ6HsIGCfCchk",
  authDomain: "yatraindia-final.firebaseapp.com",
  projectId: "yatraindia-final",
  storageBucket: "yatraindia-final.firebasestorage.app",
  messagingSenderId: "171649831585",
  appId: "1:171649831585:web:c55e3053aa85f11895d6e0"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
