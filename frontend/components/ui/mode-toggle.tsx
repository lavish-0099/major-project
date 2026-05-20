"use client"

import * as React from "react"
import { Moon, Sun, Cloud, Stars } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function ModeToggle() {
    const { setTheme, theme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const isDark = theme === "dark"

    return (
        <div className="flex items-center gap-3">
            <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className={cn(
                    "relative h-8 w-16 rounded-full transition-all duration-500 shadow-inner",
                    isDark
                        ? "bg-slate-900 border border-slate-700 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
                        : "bg-sky-400 border border-sky-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
                )}
                title="Toggle Day/Night Mode"
            >
                {/* Track Background Elements */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                    {/* Stars for Night */}
                    <div className={cn(
                        "absolute inset-0 transition-opacity duration-500 flex items-center justify-around px-1",
                        isDark ? "opacity-100" : "opacity-0"
                    )}>
                        <div className="h-1 w-1 bg-white rounded-full opacity-80 animate-pulse" />
                        <div className="h-1 w-1 bg-white rounded-full opacity-40 top-1 relative" />
                        <div className="h-1.5 w-1.5 bg-white rounded-full opacity-60" />
                    </div>

                    {/* Clouds for Day */}
                    <div className={cn(
                        "absolute inset-0 transition-opacity duration-500",
                        isDark ? "opacity-0" : "opacity-100"
                    )}>
                        <Cloud className="absolute right-1 top-1 h-3 w-3 text-white/80 fill-white/80" />
                        <Cloud className="absolute left-4 bottom-0.5 h-2 w-2 text-white/60 fill-white/60" />
                    </div>
                </div>

                {/* Thumb (Sun/Moon) */}
                <div
                    className={cn(
                        "absolute top-0.5 left-0.5 h-6.5 w-6.5 rounded-full shadow-md transition-all duration-500 flex items-center justify-center transform",
                        isDark
                            ? "translate-x-8 bg-slate-100 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                            : "translate-x-0 bg-yellow-300 shadow-[0_0_10px_rgba(253,224,71,0.8)]"
                    )}
                    style={{ width: '26px', height: '26px' }}
                >
                    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-full">
                        {/* Crater Texture for Moon */}
                        <div className={cn(
                            "absolute w-full h-full transition-opacity duration-300",
                            isDark ? "opacity-100" : "opacity-0"
                        )}>
                            <div className="absolute top-1 left-2 w-2 h-2 bg-slate-300 rounded-full opacity-50" />
                            <div className="absolute bottom-2 right-1 w-1.5 h-1.5 bg-slate-300 rounded-full opacity-50" />
                        </div>
                    </div>
                </div>
            </button>

            <span className="text-white text-sm font-medium hidden md:block tracking-wide">
                {isDark ? "Night" : "Day"}
            </span>
        </div>
    )
}
