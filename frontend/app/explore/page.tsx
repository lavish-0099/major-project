"use client";

import { Button } from "@/components/ui/button";
import { Search, MapPin, Tent, Mountain, Sunset, Building2, Palmtree } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import Image from "next/image";

const CATEGORIES = [
    { id: "all", label: "All", icon: Search },
    { id: "mountains", label: "Mountain", icon: Mountain },
    { id: "beaches", label: "Beach", icon: Palmtree },
    { id: "desert", label: "Desert", icon: Sunset },
    { id: "city", label: "City", icon: Building2 },
    { id: "camping", label: "Camping", icon: Tent },
];

const PLACES = [
    { name: "Manali", location: "Himachal Pradesh", img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1000&auto=format&fit=crop", rating: "4.8" },
    { name: "Rishikesh", location: "Uttarakhand", img: "https://images.unsplash.com/photo-1720819029162-8500607ae232?q=80&w=1000&auto=format&fit=crop", rating: "4.7" }, // TODO: Replace with unique Rishikesh image
    { name: "Udaipur", location: "Rajasthan", img: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?q=80&w=1000&auto=format&fit=crop", rating: "4.9" },
    { name: "Varkala", location: "Kerala", img: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1000&auto=format&fit=crop", rating: "4.6" },
];

export default function ExplorePage() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 pb-32 pt-20 px-4">
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-6">Explore Bharat</h1>

            <div className="relative mb-8">
                <Input placeholder="Search places, categories..." className="pl-12 h-14 rounded-2xl bg-white shadow-sm border-gray-100" />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide mb-6">
                {loading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 min-w-[70px]">
                            <Skeleton className="w-14 h-14 rounded-full" />
                            <Skeleton className="h-3 w-10" />
                        </div>
                    ))
                ) : (
                    CATEGORIES.map(cat => (
                        <div key={cat.id} className="flex flex-col items-center gap-2 min-w-[70px] cursor-pointer group">
                            <div className="w-14 h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 group-hover:bg-orange-50 group-hover:border-orange-200 group-hover:text-orange-600 transition-colors">
                                <cat.icon className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900">{cat.label}</span>
                        </div>
                    ))
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                {loading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 pb-3">
                            <Skeleton className="h-32 w-full rounded-xl mb-3" />
                            <Skeleton className="h-4 w-3/4 mb-2" />
                            <Skeleton className="h-3 w-1/2" />
                        </div>
                    ))
                ) : (
                    PLACES.map((place, i) => (
                        <div key={i} className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 pb-3">
                            <div className="h-32 rounded-xl overflow-hidden mb-3 relative">
                                <Image src={place.img} alt={place.name} fill className="object-cover" />
                                <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    ⭐ {place.rating}
                                </div>
                            </div>
                            <h3 className="font-bold text-gray-900 text-sm">{place.name}</h3>
                            <div className="flex items-center text-gray-500 text-xs mt-1">
                                <MapPin className="w-3 h-3 mr-1" /> {place.location}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
