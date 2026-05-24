import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Naye Firebase project (YatraIndia-Final) ka dynamic configuration object
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCsH93sMxB-4WUBaJwF4dfQ6HsIGCfCchk",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "yatraindia-final.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "yatraindia-final",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "yatraindia-final.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "171649831585",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:171649831585:web:c55e3053aa85f11895d6e0",
};

// Next.js ke compilation reloads mein duplicate instances se bachne ke liye singleton initialization
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Firebase modules export
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Google login trigger handler function (Isko apne login button par call karein)
export const loginWithGoogle = async () => {
  try {
    // Force account selection prompt screen har baar login click par dikhane ke liye
    googleProvider.setCustomParameters({ prompt: "select_account" });
    
    const result = await signInWithPopup(auth, googleProvider);
    return result.user; // User object successfully login hone par return hoga
  } catch (error) {
    console.error("Firebase Authentication Workflow Failure:", error);
    throw error;
  }
};

// User sign out handler function
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign Out Error:", error);
    throw error;
  }
};