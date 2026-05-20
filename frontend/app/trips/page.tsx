"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, getDocs, orderBy, doc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import TripCard from "@/components/TripCard";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import { AnimatePresence } from "framer-motion";

export default function TripsPage() {
    const { currentUser } = useAuth();
    const router = useRouter();
    const [trips, setTrips] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Delete Modal State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [tripToDelete, setTripToDelete] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        // Auth check is handled by context, but we can double check here
        if (!currentUser && !loading) {
            // Optional: redirect logic if needed
        }

        async function fetchTrips() {
            if (!currentUser) return;

            try {
                const q = query(
                    collection(db, "users", currentUser.uid, "trips"),
                    orderBy("createdAt", "desc")
                );
                const querySnapshot = await getDocs(q);
                const tripsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setTrips(tripsData);
            } catch (error) {
                console.error("Error fetching trips:", error);
            } finally {
                setLoading(false);
            }
        }

        if (currentUser) {
            fetchTrips();
        } else {
            // Small delay to allow auth state to settle if needed, or simply stop loading
            const timer = setTimeout(() => setLoading(false), 500);
            return () => clearTimeout(timer);
        }
    }, [currentUser, loading]);

    // Open Delete Modal
    const confirmDelete = (tripId: string) => {
        setTripToDelete(tripId);
        setIsDeleteModalOpen(true);
    };

    // Handle Actual Deletion
    const handleDeleteTrip = async () => {
        if (!currentUser || !tripToDelete) return;

        setIsDeleting(true);
        try {
            await deleteDoc(doc(db, "users", currentUser.uid, "trips", tripToDelete));
            setTrips(prevTrips => prevTrips.filter(trip => trip.id !== tripToDelete));
            setIsDeleteModalOpen(false);
            setTripToDelete(null);
            // Optional: Show success toast
        } catch (error) {
            console.error("Error deleting trip:", error);
            alert("Failed to delete trip. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    };

    const handleViewTrip = (tripId: string) => {
        router.push(`/trips/${tripId}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
        );
    }

    if (!currentUser) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
                <h1 className="text-2xl font-bold">Please Log In</h1>
                <p className="text-gray-500 mb-4">You need to be logged in to view your trips.</p>
                <Button onClick={() => router.push("/auth/login")}>Go to Login</Button>
            </div>
        );
    }

    if (trips.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 pb-32 pt-20 px-4 flex flex-col items-center justify-center text-center">
                <div className="w-40 h-40 bg-orange-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
                    <span className="text-6xl">✈️</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">No Upcoming Trips</h1>
                <p className="text-gray-500 max-w-xs mx-auto mb-8">You haven&apos;t planned any trips yet. Start exploring or use our AI planner to create your perfect itinerary.</p>
                <Button onClick={() => router.push("/plan-trip")} className="bg-black text-white px-8 py-6 rounded-xl font-bold shadow-lg hover:bg-gray-800 transition-colors">
                    Plan a Trip
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-32 pt-12 px-4">
            <div className="container mx-auto max-w-6xl">
                <div className="flex items-center justify-between mb-8 mt-12">
                    <div>
                        <h1 className="text-4xl font-serif font-bold text-gray-900">My Trips</h1>
                        <p className="text-gray-500 mt-2">Manage your upcoming adventures</p>
                    </div>
                    <Button onClick={() => router.push("/plan-trip")} variant="outline" className="hidden sm:flex">
                        + New Trip
                    </Button>
                </div>

                {/* Trips Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {trips.map((trip) => (
                            <TripCard
                                key={trip.id}
                                trip={trip}
                                onDelete={confirmDelete}
                                onView={handleViewTrip}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteTrip}
                loading={isDeleting}
                title="Delete Trip?"
                description={`Are you sure you want to delete your trip to ${trips.find(t => t.id === tripToDelete)?.destination}? This action cannot be undone.`}
            />
        </div>
    );
}
