"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { motion } from "framer-motion";
import { ImageOff, RefreshCw } from "lucide-react";

interface ImageWithFallbackProps extends ImageProps {
    fallbackText?: string;
}

export function ImageWithFallback({ src, alt, fallbackText = "Image Unavailable", className, ...props }: ImageWithFallbackProps) {
    const [error, setError] = useState(false);
    const [imgSrc, setImgSrc] = useState(src);

    const handleError = () => {
        setError(true);
    };

    if (error) {
        return (
            <div className={`relative flex flex-col items-center justify-center bg-secondary/5 overflow-hidden ${className}`}>
                {/* Animated Background Pattern */}
                <motion.div
                    className="absolute inset-0 opacity-20"
                    animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                    style={{
                        backgroundImage: "radial-gradient(circle, #808080 1px, transparent 1px)",
                        backgroundSize: "20px 20px"
                    }}
                />

                {/* Animated Icon */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="z-10 bg-white/50 backdrop-blur-sm p-4 rounded-full shadow-sm"
                >
                    <ImageOff className="w-8 h-8 text-gray-400" />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="z-10 mt-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                    {fallbackText}
                </motion.p>
            </div>
        );
    }

    return (
        <Image
            {...props}
            src={imgSrc}
            alt={alt}
            className={className}
            onError={handleError}
        />
    );
}
