"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { useRouter } from "next/navigation";

import Image from "next/image";

const SLIDES = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1000&auto=format&fit=crop", // Taj Mahal
        title: "Explore Incredible India",
        subtitle: "Discover breathtaking destinations, rich culture, and unforgettable experiences across Bharat.",
        color: "from-orange-500/20 to-orange-500/5",
        accent: "text-orange-600"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1570191913972-50320c32904a?q=80&w=1000&auto=format&fit=crop", // Travel/Map concept
        title: "Plan Your Trip Easily",
        subtitle: "Book hotels, transport, and local guides seamlessly. Your perfect itinerary is just a tap away.",
        color: "from-blue-500/20 to-blue-500/5",
        accent: "text-blue-600"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1555088264-b0a51469e38f?q=80&w=1000&auto=format&fit=crop", // Robot/Tech concept placeholder
        title: "Smart Travel with AI",
        subtitle: "Get personalized trip plans and local insights powered by our advanced AI assistant.",
        color: "from-green-500/20 to-green-500/5",
        accent: "text-green-600"
    }
];

export function OnboardingCarousel() {
    const router = useRouter();
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        if (currentSlide < SLIDES.length - 1) {
            setCurrentSlide(prev => prev + 1);
        } else {
            completeOnboarding();
        }
    };

    const completeOnboarding = () => {
        // In a real app, set a cookie or local storage here
        router.push("/auth/login");
    };

    return (
        <div className="fixed inset-0 bg-white flex flex-col">
            {/* Skip Button */}
            <div className="absolute top-6 right-6 z-20">
                <button
                    onClick={completeOnboarding}
                    className="text-gray-500 hover:text-gray-900 font-medium text-sm px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors"
                >
                    Skip
                </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 relative overflow-hidden flex flex-col">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="flex-1 flex flex-col"
                    >
                        {/* Top Image Section (60% height) */}
                        <div className="h-[60%] relative overflow-hidden">
                            <div className={`absolute inset-0 bg-gradient-to-b ${SLIDES[currentSlide].color} z-10 mix-blend-multiply`} />
                            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent z-20" />
                            <Image
                                src={SLIDES[currentSlide].image}
                                alt={SLIDES[currentSlide].title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Bottom Text Section (40% height) */}
                        <div className="flex-1 px-8 pt-8 pb-12 flex flex-col items-center text-center justify-start z-30 -mt-20">
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className={`text-xs font-bold uppercase tracking-widest mb-3 ${SLIDES[currentSlide].accent}`}
                            >
                                Step {currentSlide + 1} of {SLIDES.length}
                            </motion.span>

                            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-serif leading-tight">
                                {SLIDES[currentSlide].title}
                            </h2>

                            <p className="text-gray-500 leading-relaxed max-w-xs mx-auto">
                                {SLIDES[currentSlide].subtitle}
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Footer Controls */}
            <div className="px-8 pb-10 pt-4 flex items-center justify-between">
                {/* Pagination Dots */}
                <div className="flex gap-2">
                    {SLIDES.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? "w-8 bg-black" : "w-2 bg-gray-200"
                                }`}
                        />
                    ))}
                </div>

                {/* Action Button */}
                <Button
                    onClick={nextSlide}
                    className="rounded-full w-14 h-14 p-0 bg-black text-white shadow-xl hover:scale-105 hover:bg-gray-800 transition-all flex items-center justify-center"
                >
                    {currentSlide === SLIDES.length - 1 ? (
                        <Check className="w-6 h-6" />
                    ) : (
                        <ArrowRight className="w-6 h-6" />
                    )}
                </Button>
            </div>
        </div>
    );
}
