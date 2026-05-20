import { db } from "@/lib/firebase";
import {
    collection,
    query,
    where,
    getDocs,
    updateDoc,
    arrayUnion,
    doc,
    getDoc
} from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { token, userId } = await request.json();

        if (!token || !userId) {
            return NextResponse.json({ error: "Missing token or userId" }, { status: 400 });
        }

        // 1. Find trip by invite token
        const q = query(collection(db, "trips"), where("inviteToken", "==", token));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return NextResponse.json({ error: "Invalid invite token" }, { status: 404 });
        }

        const tripDoc = querySnapshot.docs[0];
        const tripData = tripDoc.data();
        const tripId = tripDoc.id;

        // 2. Check if user already a member
        if (tripData.members.includes(userId)) {
            return NextResponse.json({ message: "Already a member", tripId }, { status: 200 });
        }

        // 3. Add user to members
        await updateDoc(doc(db, "trips", tripId), {
            members: arrayUnion(userId)
        });

        return NextResponse.json({ message: "Joined trip successfully", tripId }, { status: 200 });

    } catch (error) {
        console.error("Error joining trip:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
