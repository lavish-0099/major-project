"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Calendar, MapPin, CreditCard, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function BookingsPage() {
    const { currentUser } = useAuth();
    const router = useRouter();
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBookings() {
            if (!currentUser) return;

            try {
                const q = query(
                    collection(db, "users", currentUser.uid, "bookings"),
                    // orderBy("date", "desc") // Date might store as ISO string, so checking order
                );
                // Note: orderBy might require an index if mixed with other filters, but simple collection query is usually fine.
                // However, if "bookings" collection doesn't exist yet, it's fine.
                const querySnapshot = await getDocs(q);
                const bookingsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                // Client-side sort to be safe if index missing
                bookingsData.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setBookings(bookingsData);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        }

        if (currentUser) {
            fetchBookings();
        } else {
            setLoading(false);
        }
    }, [currentUser]);

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
                <Button onClick={() => router.push("/auth/login")}>Go to Login</Button>
            </div>
        );
    }

    if (bookings.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 pb-32 pt-20 px-4 flex flex-col items-center justify-center text-center">
                <div className="w-40 h-40 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                    <span className="text-6xl">🏨</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">No Upcoming Bookings</h1>
                <p className="text-gray-500 max-w-xs mx-auto mb-8">You haven&apos;t made any bookings yet.</p>
                <Button onClick={() => router.push("/hotels")} className="bg-black text-white px-8 py-6 rounded-xl font-bold shadow-lg hover:bg-gray-800 transition-colors">
                    Find Hotels
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-32 pt-12 px-4">
            <div className="container mx-auto max-w-5xl">
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8 mt-12">My Bookings</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all group flex flex-col">
                            <div className="h-48 relative overflow-hidden">
                                <Image src={booking.image} alt={booking.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 text-green-600 border border-green-200">
                                    Confirmed
                                </div>
                            </div>

                            <div className="p-5 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{booking.name}</h3>
                                <div className="flex items-center text-gray-500 text-sm mb-4">
                                    <MapPin className="w-3.5 h-3.5 mr-1" /> {booking.location}
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                                        <Calendar className="w-4 h-4 text-orange-500" />
                                        <span>Booked on {new Date(booking.date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                                        <CreditCard className="w-4 h-4 text-green-600" />
                                        <span>₹{booking.price?.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
