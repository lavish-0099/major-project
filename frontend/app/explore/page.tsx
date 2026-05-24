"use client";

import { Button } from "@/components/ui/button";
import { Search, MapPin, Tent, Mountain, Sunset, Building2, Palmtree, Landmark, Compass, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import Link from "next/link";
import { ALL_DESTINATIONS } from "@/lib/data";

// Mapped CATEGORIES ids directly matching data.ts category strings
const CATEGORIES = [
    { id: "All", label: "All", icon: Compass },
    { id: "Temples", label: "Temples", icon: Landmark },
    { id: "Adventure", label: "Adventure", icon: Mountain },
    { id: "Heritage", label: "Heritage", icon: Building2 },
    { id: "Beaches", label: "Beaches", icon: Palmtree },
    { id: "Hidden Gems", label: "Hidden Gems", icon: Tent },
];

export default function ExplorePage() {
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    // Clear state or fake small transition on category transformations
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [activeCategory]);

    // Operational Filtering Engine (Checks both search inputs and category buttons)
    const filteredPlaces = ALL_DESTINATIONS.filter((place) => {
        const matchesCategory = activeCategory === "All" || place.category === activeCategory;
        const matchesSearch = 
            place.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            place.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            place.category.toLowerCase().includes(searchQuery.toLowerCase());
        
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 pb-32 pt-28 px-4 transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                
                {/* --- HEADER TITLE --- */}
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-zinc-100 mb-6">
                    Explore Bharat
                </h1>

                {/* --- SEAMLESS SEARCH INPUT ENGINE --- */}
                <div className="relative mb-8">
                    <Input 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search places, states, historical monuments..." 
                        className="pl-12 h-14 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm border-gray-100 dark:border-zinc-800 dark:text-zinc-100 focus-visible:ring-orange-500" 
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    {searchQuery && (
                        <button 
                            onClick={() => setSearchQuery("")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-orange-500"
                        >
                            Clear
                        </button>
                    )}
                </div>

                {/* --- INTERACTIVE CATEGORIES SCROLL RAIL --- */}
                <div className="flex gap-4 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
                    {CATEGORIES.map((cat) => {
                        const isSelected = activeCategory === cat.id;
                        return (
                            <div 
                                key={cat.id} 
                                onClick={() => setActiveCategory(cat.id)}
                                className="flex flex-col items-center gap-2 min-w-[85px] cursor-pointer group unselectable"
                            >
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                                    isSelected 
                                        ? "bg-orange-600 text-white border-orange-600 ring-4 ring-orange-100 dark:ring-orange-950/50" 
                                        : "bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-500 dark:text-zinc-400 group-hover:bg-orange-50 dark:group-hover:bg-zinc-800 group-hover:text-orange-600"
                                }`}>
                                    <cat.icon className="w-6 h-6" />
                                </div>
                                <span className={`text-xs font-medium transition-colors ${
                                    isSelected 
                                        ? "text-orange-600 dark:text-orange-400 font-bold" 
                                        : "text-gray-600 dark:text-zinc-400 group-hover:text-gray-900 dark:group-hover:text-zinc-200"
                                }`}>
                                    {cat.label}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* --- GRID SYSTEM LISTINGS --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {loading ? (
                        Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="bg-white dark:bg-zinc-900 rounded-2xl p-3 shadow-sm border border-gray-100 dark:border-zinc-800 pb-4">
                                <Skeleton className="h-40 w-full rounded-xl mb-3" />
                                <Skeleton className="h-5 w-3/4 mb-2" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        ))
                    ) : filteredPlaces.length > 0 ? (
                        filteredPlaces.map((place) => (
                            <Link href={`/destination/${place.id}`} key={place.id} className="block group">
                                <div className="bg-white dark:bg-zinc-900 rounded-2xl p-3 shadow-sm border border-gray-100 dark:border-zinc-800 pb-4 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                                    
                                    {/* Local Public Asset Folder Images */}
                                    <div className="h-40 rounded-xl overflow-hidden mb-3 relative bg-zinc-100 dark:bg-zinc-800">
                                        <ImageWithFallback 
                                            src={place.image} 
                                            alt={place.title} 
                                            fill 
                                            className="object-cover group-hover:scale-105 transition-transform duration-500" 
                                            fallbackText={place.title}
                                        />
                                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                                            ⭐ {place.rating}
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col flex-grow px-1">
                                        <h3 className="font-serif font-bold text-gray-900 dark:text-zinc-100 text-base mb-1 line-clamp-1 group-hover:text-orange-600 transition-colors">
                                            {place.title}
                                        </h3>
                                        <div className="flex items-center text-gray-500 dark:text-zinc-400 text-xs mt-auto">
                                            <MapPin className="w-3.5 h-3.5 mr-1 text-orange-500 shrink-0" /> 
                                            <span className="line-clamp-1">{place.location}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        /* --- FALLBACK FOR NO SEARCH RESULTS --- */
                        <div className="col-span-full text-center py-20 bg-white dark:bg-zinc-900 rounded-2xl border border-dashed border-gray-200 dark:border-zinc-800 p-8">
                            <HelpCircle className="w-12 h-12 text-gray-300 dark:text-zinc-700 mx-auto mb-3" />
                            <p className="text-gray-500 dark:text-zinc-400 font-medium text-lg">No destinations match your criteria.</p>
                            <p className="text-gray-400 dark:text-zinc-500 text-sm mt-1">Try resetting the category filter or looking up different terms.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}