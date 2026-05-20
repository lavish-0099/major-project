"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface SplashScreenProps {
    onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 3000); // 3 seconds splash
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
        >
            <div className="relative mb-6">
                {/* Animated Ashoka Chakra-like element */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 rounded-full border-4 border-blue-900 border-t-blue-600 border-r-blue-800 border-b-blue-900 border-l-blue-700 opacity-90 relative flex items-center justify-center"
                >
                    <div className="w-2 h-2 bg-blue-900 rounded-full" />
                    {[...Array(24)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-0.5 h-10 bg-blue-900/40 origin-bottom bottom-1/2 left-1/2 -translate-x-1/2"
                            style={{ transform: `translateX(-50%) rotate(${i * 15}deg)` }}
                        />
                    ))}
                </motion.div>

                {/* Saffron and Green Glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-orange-400/20 rounded-full blur-3xl -z-10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-green-400/20 rounded-full blur-2xl -z-10 translate-y-4" />
            </div>

            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-gray-900 mb-2 font-serif tracking-tight"
            >
                Bharat Yatra <span className="text-2xl">🇮🇳</span>
            </motion.h1>

            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-gray-500 font-medium tracking-wide text-sm"
            >
                Explore India. Experience Bharat.
            </motion.p>
        </motion.div>
    );
}
