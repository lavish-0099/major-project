"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    sendEmailVerification
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const AuthContext = createContext<any>(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    async function signup(email: string, password: string, name: string, sendVerification: boolean = true) {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        // Create user document in Firestore
        await setDoc(doc(db, "users", result.user.uid), {
            uid: result.user.uid,
            name,
            email,
            createdAt: new Date().toISOString(),
            emailVerified: false
        });

        // Send verification email automatically after signup
        if (sendVerification && result.user) {
            await sendVerificationEmail();
        }

        return result;
    }

    async function sendVerificationEmail(continueUrl?: string) {
        if (!auth.currentUser) {
            throw new Error("No user is currently signed in");
        }

        const actionCodeSettings = continueUrl ? {
            url: continueUrl,
            handleCodeInApp: false
        } : undefined;

        await sendEmailVerification(auth.currentUser, actionCodeSettings);
    }

    async function resendVerificationEmail(continueUrl?: string) {
        return sendVerificationEmail(continueUrl);
    }

    function isEmailVerified(): boolean {
        return auth.currentUser?.emailVerified ?? false;
    }

    async function login(email: string, password: string) {
        const result = await signInWithEmailAndPassword(auth, email, password);

        // Check if email is verified
        if (!result.user.emailVerified) {
            // Sign out the user immediately
            await signOut(auth);
            throw new Error("Please verify your email before logging in. Check your inbox for the verification link.");
        }

        return result;
    }

    async function reloadUser() {
        if (auth.currentUser) {
            await auth.currentUser.reload();
            setCurrentUser({ ...auth.currentUser });
            return auth.currentUser.emailVerified;
        }
        return false;
    }

    async function googleLogin() {
        const provider = new GoogleAuthProvider();
        let result;
        try {
            result = await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error during Google Sign In popup:", error);
            throw error;
        }

        const user = result.user;

        try {
            // Check if user exists
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    createdAt: new Date().toISOString()
                });
            }
        } catch (error) {
            console.error("Error creating user profile in Firestore:", error);
            // We don't throw here to allow login to succeed even if profile creation fails, 
            // BUT for this specific debugging session, letting it throw is better so the user sees the error.
            // Actually, if profile creation fails, the app might break later, so throwing is correct.
            throw new Error("Login successful but failed to create profile: " + (error as any).message);
        }

        return result;
    }

    function logout() {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        logout,
        googleLogin,
        sendVerificationEmail,
        resendVerificationEmail,
        isEmailVerified,
        reloadUser
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
