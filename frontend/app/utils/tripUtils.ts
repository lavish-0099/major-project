import { db } from "@/lib/firebase";
import {
    collection,
    doc,
    addDoc,
    updateDoc,
    getDoc,
    getDocs,
    query,
    where,
    serverTimestamp,
    increment,
    arrayUnion
} from "firebase/firestore";

// --- Types ---
export interface Trip {
    id?: string;
    name: string;
    budget: number;
    totalSpent: number;
    currency: string;
    createdBy: string;
    inviteToken: string;
    members: string[]; // Array of UIDs
    createdAt: any;
}

export interface Expense {
    id?: string;
    tripId: string;
    title: string;
    amount: number;
    paidBy: string;
    date: any;
    note?: string;
    involvedMembers: string[];
}

// --- Trip Functions ---

export const createTrip = async (tripData: Omit<Trip, "id" | "createdAt" | "totalSpent" | "members">, userId: string) => {
    try {
        const docRef = await addDoc(collection(db, "trips"), {
            ...tripData,
            createdBy: userId,
            members: [userId],
            totalSpent: 0,
            createdAt: serverTimestamp(),
            inviteToken: generateInviteToken() // Helper needed
        });
        return docRef.id;
    } catch (error) {
        console.error("Error creating trip: ", error);
        throw error;
    }
};

export const getTrip = async (tripId: string) => {
    const docRef = doc(db, "trips", tripId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Trip;
    } else {
        return null;
    }
}

export const joinTrip = async (tripId: string, userId: string) => {
    const tripRef = doc(db, "trips", tripId);
    await updateDoc(tripRef, {
        members: arrayUnion(userId)
    });
}


// --- Expense Functions ---

export const addExpense = async (tripId: string, expenseData: Omit<Expense, "id" | "tripId">) => {
    try {
        // 1. Add expense doc
        const expenseRef = await addDoc(collection(db, `trips/${tripId}/expenses`), {
            ...expenseData,
            tripId,
            createdAt: serverTimestamp()
        });

        // 2. Update trip totalSpent
        const tripRef = doc(db, "trips", tripId);
        await updateDoc(tripRef, {
            totalSpent: increment(expenseData.amount)
        });

        return expenseRef.id;
    } catch (error) {
        console.error("Error adding expense: ", error);
        throw error;
    }
};

export const getExpenses = async (tripId: string) => {
    const q = query(collection(db, `trips/${tripId}/expenses`));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Expense[];
}


// --- Helpers ---
const generateInviteToken = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
