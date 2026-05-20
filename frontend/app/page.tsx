"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { CategoryRail } from "@/components/landing/CategoryRail";
import { DestinationsGrid } from "@/components/landing/DestinationsGrid";
import { TransportHub } from "@/components/landing/TransportHub";
import { CulturalGuide } from "@/components/landing/CulturalGuide";
import { SafetyBanner } from "@/components/landing/SafetyBanner";

export default function Home() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    return (
        <div className="min-h-screen relative font-sans overflow-x-hidden transition-colors duration-300 dark:bg-zinc-950">
            {/* Extended Theme Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF9933]/20 via-orange-50/40 to-[#138808]/20 dark:from-orange-900/10 dark:via-zinc-950 dark:to-green-900/10" />
                <div className="absolute inset-0 z-10 opacity-[0.05] dark:opacity-[0.02]"
                    style={{
                        backgroundImage: `radial-gradient(#d97706 1px, transparent 1px)`,
                        backgroundSize: '24px 24px'
                    }}
                />
            </div>

            <Header />
            <div className="relative z-10">
                <HeroSection />

                {/* Main Content Container with Dark Mode support */}
                <div className="-mt-20 z-20 relative bg-white dark:bg-zinc-900 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.08)] transition-colors duration-300">
                    <div className="pt-8">
                        <CategoryRail 
                            activeCategory={selectedCategory} 
                            onCategoryChange={setSelectedCategory} 
                        />
                        <DestinationsGrid selectedCategory={selectedCategory} />
                    </div>

                    <div className="my-16 container mx-auto px-4">
                        <div className="h-px bg-gradient-to-r from-transparent via-orange-100 dark:via-orange-900/30 to-transparent" />
                    </div>

                    <TransportHub />
                    <CulturalGuide />
                    <SafetyBanner />
                    <Footer />
                </div>
            </div>
        </div>
    );
}