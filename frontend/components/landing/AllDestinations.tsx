"use client";

import { DestinationsGrid } from "./DestinationsGrid";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function AllDestinationsComponent() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-900 transition-colors duration-300 relative z-10">
            {/* Header Section */}
            <div className="bg-gradient-to-b from-orange-50 to-white dark:from-zinc-950 dark:to-zinc-900 pt-32 pb-10">
                <div className="container mx-auto px-6 text-center">
                    <Button 
                        variant="outline" 
                        onClick={() => router.push("/")}
                        className="mb-8 rounded-full border-orange-200 dark:border-zinc-700 dark:text-zinc-300 hover:bg-orange-50 dark:hover:bg-zinc-800 transition-all gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Button>
                    
                    <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 dark:text-zinc-100 mb-4">
                        All Indian Destinations
                    </h1>
                    <p className="text-gray-500 dark:text-zinc-400 max-w-2xl mx-auto text-lg">
                        Explore our full collection of handpicked travel experiences across the subcontinent.
                    </p>
                </div>
            </div>

            {/* Grid Section - Removed the extra "Featured Destinations" title from here */}
            <div className="pb-32">
                <DestinationsGrid selectedCategory="All" />
            </div>
        </div>
    );
}