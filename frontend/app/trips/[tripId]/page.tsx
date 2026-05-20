"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, onSnapshot, collection, query, orderBy, getDoc, runTransaction, increment, updateDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { Share2, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import BudgetDisplay from "@/components/trip-details/BudgetDisplay";
import AddExpenseForm from "@/components/trip-details/AddExpenseForm";
import ExpenseList from "@/components/trip-details/ExpenseList";
import SettlementSummary from "@/components/trip-details/SettlementSummary";
// import { useToast } from "@/components/ui/use-toast"; // Toast not available

// Types
interface Trip {
    id: string;
    name: string;
    budget: number;
    totalSpent: number;
    members: string[]; // UIDs
    inviteToken: string;
}

interface Member {
    id: string;
    name: string;
}

export default function TripDetailsPage() {
    const params = useParams();
    const tripId = params.tripId as string;
    const router = useRouter();
    const { currentUser } = useAuth();


    // State
    const [trip, setTrip] = useState<Trip | null>(null);
    const [expenses, setExpenses] = useState<any[]>([]);
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);

    const [tripRefPath, setTripRefPath] = useState<string | null>(null);

    // Fetch Trip
    useEffect(() => {
        if (!tripId || !currentUser) return; // Wait for auth
        console.log("Setting up trip listener for:", tripId);

        let unsubscribeTrip: any;

        const setupListener = async () => {
            // 1. Try Root Collection (New Schema)
            try {
                const rootRef = doc(db, "trips", tripId);
                // We use onSnapshot directly? No, check existence first.
                // But getDoc might throw PERMISSION_DENIED if we are not a member.
                // If so, catch it and try legacy.

                const rootSnap = await getDoc(rootRef);

                if (rootSnap.exists()) {
                    console.log("Found trip in root collection");
                    setTripRefPath(`trips/${tripId}`);
                    unsubscribeTrip = onSnapshot(rootRef, (docSnap) => {
                        if (docSnap.exists()) {
                            setTrip({ id: docSnap.id, ...docSnap.data() } as Trip);
                        } else {
                            router.push("/trips");
                        }
                        setLoading(false);
                    });
                    return; // Exit, don't try legacy
                }
            } catch (e) {
                console.warn("Could not access root trip (permission or not found):", e);
                // Proceed to legacy check
            }

            // 2. Try User Subcollection (Legacy Schema)
            console.log("Not found in root, trying legacy user collection...");
            const userRef = doc(db, "users", currentUser.uid, "trips", tripId);

            unsubscribeTrip = onSnapshot(userRef, (docSnap) => {
                if (docSnap.exists()) {
                    console.log("Found trip in legacy collection");
                    setTripRefPath(`users/${currentUser.uid}/trips/${tripId}`);
                    setTrip({ id: docSnap.id, ...docSnap.data() } as Trip);
                } else {
                    console.log("Trip not found in either location");
                    setTrip(null);
                }
                setLoading(false);
            }, (error) => {
                console.error("Error fetching legacy trip:", error);
                setTrip(null); // Ensure we don't hang
                setLoading(false);
            });
        };

        setupListener();

        return () => {
            console.log("Cleaning up trip listener");
            if (unsubscribeTrip) unsubscribeTrip();
        }
    }, [tripId, router, currentUser]);

    // Fetch Members when trip members change
    useEffect(() => {
        if (!trip || !currentUser) return;

        const memberIds = (trip.members && trip.members.length > 0) ? trip.members : [currentUser.uid];

        const fetchMembers = async () => {
            const memberPromises = memberIds.map(async (uid) => {
                try {
                    const userSnap = await getDoc(doc(db, "users", uid));
                    if (userSnap.exists()) {
                        return { id: uid, name: userSnap.data().displayName || "Unknown" };
                    }
                } catch (e) {
                    console.warn("Could not fetch user", uid);
                }
                return { id: uid, name: uid === currentUser?.uid ? "You" : `User ${uid.substring(0, 4)}` };
            });

            const memberData = await Promise.all(memberPromises);
            setMembers(memberData);
        };

        fetchMembers();
    }, [trip, currentUser]);

    // Fetch Expenses
    useEffect(() => {
        // Only run if we know WHERE the trip is (tripRefPath)
        if (!tripId || !tripRefPath) return;
        console.log("Setting up expenses listener on path:", tripRefPath);

        const expensesRef = collection(db, `${tripRefPath}/expenses`);
        // Removing orderBy temporarily to debug "Unexpected state" error which can be index-related
        // const q = query(expensesRef, orderBy("createdAt", "desc")); 
        const q = query(expensesRef);

        const unsubscribeExpenses = onSnapshot(q, (snapshot) => {
            console.log("Expenses snapshot received", snapshot.size);
            const expensesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // Manual sort since we removed orderBy
            expensesData.sort((a: any, b: any) => {
                const tA = a.createdAt?.seconds || 0;
                const tB = b.createdAt?.seconds || 0;
                return tB - tA;
            });
            setExpenses(expensesData);
        }, (error) => {
            console.error("Error fetching expenses:", error);
        });

        return () => {
            console.log("Cleaning up expenses listener");
            unsubscribeExpenses();
        };
    }, [tripId, tripRefPath]);

    const handleShare = async () => {
        if (!trip) return;
        const url = `${window.location.origin}/join/${trip.inviteToken}`;

        const shareData = {
            title: `Join my trip: ${trip.name}`,
            text: `Click to join our trip on Yatra India!`,
            url: url
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log("Error sharing", err);
            }
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(url);
            alert("Invite link copied to clipboard!");
        }
    };

    const handleDeleteExpense = async (expenseId: string) => {
        if (!confirm("Are you sure you want to delete this expense?")) return;
        if (!tripRefPath) return;

        try {
            await runTransaction(db, async (transaction) => {
                const expenseRef = doc(db, `${tripRefPath}/expenses`, expenseId);
                const tripRef = doc(db, tripRefPath);

                // 1. Get expense to know amount
                const expenseSnap = await transaction.get(expenseRef);
                if (!expenseSnap.exists()) {
                    throw "Expense does not exist!";
                }

                const expenseData = expenseSnap.data();
                const amount = expenseData.amount;

                // 2. Delete expense
                transaction.delete(expenseRef);

                // 3. Update total spent (subtract amount)
                transaction.update(tripRef, {
                    totalSpent: increment(-amount)
                });
            });
        } catch (e) {
            console.error("Failed to delete", e);
            alert("Failed to delete expense");
        }
    };

    const handleUpdateBudget = async (newBudget: number) => {
        if (!tripRefPath) return;
        try {
            await updateDoc(doc(db, tripRefPath), {
                budget: newBudget
            });
        } catch (e) {
            console.error("Failed to update budget", e);
            alert("Failed to update budget");
        }
    };

    const handleWhatsAppShare = () => {
        if (!trip) return;
        const url = `${window.location.origin}/join/${trip.inviteToken}`;
        const text = `Join my trip: ${trip.name} on Yatra India! Click here: ${url}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');
    };

    // Debug timeout
    const [debugInfo, setDebugInfo] = useState<string>("");

    useEffect(() => {
        const timer = setTimeout(() => {
            if (loading) {
                setDebugInfo("Loading timeout (5s) - something might be stuck.");
            }
        }, 5000);
        return () => clearTimeout(timer);
    }, [loading]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                <p className="text-gray-500">Loading trip details...</p>
                {debugInfo && (
                    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded text-xs font-mono text-left max-w-md overflow-auto">
                        <p className="font-bold text-yellow-700">Debug Info:</p>
                        <p>TripId: {tripId}</p>
                        <p>User: {currentUser?.uid || "Not logged in"}</p>
                        <p>Loading: {String(loading)}</p>
                        <p>Trip State: {trip ? "Loaded" : "Null"}</p>
                        <p>Message: {debugInfo}</p>
                    </div>
                )}
            </div>
        );
    }

    console.log("Render: loading=", loading, "trip=", trip);

    if (!trip && !loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
                <h1 className="text-2xl font-bold text-red-600 mb-2">Error Loading Trip</h1>
                <p className="text-gray-600 mb-4">We couldn&apos;t find the trip details. It might have been deleted or you don&apos;t have permission.</p>
                <Button onClick={() => router.push("/trips")}>
                    Back to My Trips
                </Button>
            </div>
        );
    }

    if (!trip) return null; // Should not be reached given above logic, but keeps TS happy

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" onClick={() => router.back()}>
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        <div>
                            <h1 className="text-lg font-bold text-gray-900">{trip.name}</h1>
                            <p className="text-xs text-gray-500">{members.length} Members</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleWhatsAppShare} className="gap-2 bg-green-50 text-green-600 hover:bg-green-100 border-green-200">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-4 h-4" />
                            WhatsApp
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleShare} className="gap-2">
                            <Share2 className="w-4 h-4" />
                            Invite
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
                {/* Budget Display */}
                <BudgetDisplay
                    budget={trip.budget || 0}
                    totalSpent={trip.totalSpent || 0}
                    currency="INR"
                    onEditBudget={handleUpdateBudget}
                />

                {/* Tabs/Sections */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Left Column: Actions & Expenses */}
                    <div className="space-y-6">
                        <AddExpenseForm
                            tripId={trip.id}
                            members={members}
                            onExpenseAdded={() => { }} // Real-time listener handles update
                            currentUser={currentUser}
                            tripPath={tripRefPath || ""}
                        />

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Expenses</h3>
                            <ExpenseList
                                expenses={expenses}
                                members={members}
                                currentUserId={currentUser?.uid || ""}
                                onDeleteExpense={handleDeleteExpense}
                            />
                        </div>
                    </div>

                    {/* Right Column: Settlements */}
                    <div>
                        <SettlementSummary expenses={expenses} members={members} />
                    </div>
                </div>
            </div>
        </div>
    );
}
