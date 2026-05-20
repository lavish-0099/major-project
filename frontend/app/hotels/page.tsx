"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Star, Filter, Wifi, Coffee, Utensils } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const HOTELS = [
    {
        id: 1,
        name: "Taj Resort &amp; Convention Centre",
        location: "Panaji, Goa",
        rating: 4.8,
        price: 12500,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop",
        tags: ["Sea View", "Luxury", "Spa"]
    },
    {
        id: 2,
        name: "Grand Hyatt Goa",
        location: "Bambolim, Goa",
        rating: 4.7,
        price: 15000,
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1000&auto=format&fit=crop",
        tags: ["Beach Access", "Pool"]
    },
    {
        id: 3,
        name: "Lemon Tree Amarante",
        location: "Candolim, Goa",
        rating: 4.3,
        price: 5500,
        image: "https://images.unsplash.com/photo-1571896349842-68c894913d3e?q=80&w=1000&auto=format&fit=crop",
        tags: ["Budget", "City Center"]
    }
];

export default function HotelsPage() {
    const { currentUser } = useAuth();
    const router = useRouter();
    const [booking, setBooking] = useState<number | null>(null);

    const handleBook = async (hotel: any) => {
        if (!currentUser) {
            alert("Please login to book a hotel.");
            router.push("/auth/login");
            return;
        }

        if (confirm(`Confirm booking for ${hotel.name}?`)) {
            setBooking(hotel.id);
            try {
                await addDoc(collection(db, "users", currentUser.uid, "bookings"), {
                    type: 'hotel',
                    hotelId: hotel.id,
                    name: hotel.name,
                    location: hotel.location,
                    price: hotel.price,
                    image: hotel.image,
                    date: new Date().toISOString(),
                    status: 'confirmed'
                });
                alert("Booking Confirmed!");
            } catch (error) {
                console.error("Booking failed", error);
                alert("Booking failed. Please try again.");
            } finally {
                setBooking(null);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-32 pt-6">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-6">Stay in Luxury</h1>

                {/* Search & Filter */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 sticky top-4 z-30">
                    <div className="relative mb-4">
                        <div className="absolute left-3 top-3 text-gray-400"><Search className="w-5 h-5" /></div>
                        <Input placeholder="Search hotels, cities..." className="pl-10 h-12 bg-gray-50 border-gray-200" />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        <Button variant="outline" className="rounded-full h-9 border-gray-200 text-gray-600 gap-2"><Filter className="w-3 h-3" /> Filter</Button>
                        <Button variant="ghost" className="rounded-full h-9 bg-black text-white px-4 border">All</Button>
                        <Button variant="ghost" className="rounded-full h-9 bg-gray-100 text-gray-600 px-4 border border-transparent">5 Star</Button>
                        <Button variant="ghost" className="rounded-full h-9 bg-gray-100 text-gray-600 px-4 border border-transparent">Villa</Button>
                        <Button variant="ghost" className="rounded-full h-9 bg-gray-100 text-gray-600 px-4 border border-transparent">Resort</Button>
                    </div>
                </div>

                {/* Hotel List */}
                <div className="space-y-6">
                    {HOTELS.map((hotel) => (
                        <div key={hotel.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-md transition-all">
                            <div className="h-48 relative overflow-hidden">
                                <Image src={hotel.image} alt={hotel.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {hotel.rating}
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{hotel.name}</h3>
                                <div className="flex items-center text-gray-500 text-sm mb-4">
                                    <MapPin className="w-3.5 h-3.5 mr-1" /> {hotel.location}
                                </div>

                                <div className="flex gap-2 mb-4">
                                    {hotel.tags.map(tag => (
                                        <span key={tag} className="px-2 py-1 rounded-md bg-orange-50 text-orange-600 text-[10px] font-bold uppercase tracking-wider">{tag}</span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                                    <div>
                                        <span className="text-gray-400 text-xs font-medium">Per Night</span>
                                        <div className="text-lg font-bold text-gray-900">₹{hotel.price.toLocaleString()}</div>
                                    </div>
                                    <Button
                                        onClick={() => handleBook(hotel)}
                                        disabled={booking === hotel.id}
                                        className="rounded-xl px-6 bg-black text-white hover:bg-gray-800"
                                    >
                                        {booking === hotel.id ? "Booking..." : "Book"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
