"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, Compass, Map, User, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export function BottomNav() {
    const router = useRouter();
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Hide on scroll down
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    // Don't show on onboarding/login/splash
    if (["/welcome", "/auth/login", "/destination"].some(path => pathname.includes(path))) return null;

    const NAV_ITEMS = [
        { label: "Home", icon: Home, path: "/" },
        { label: "Explore", icon: Compass, path: "/explore" },
        { label: "Plan", icon: Sparkles, path: "/plan-trip", main: true },
        { label: "Trips", icon: Map, path: "/trips" },
        { label: "Profile", icon: User, path: "/profile" },
    ];

    return (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"}`}>
            <div className="bg-black/90 backdrop-blur-xl text-white rounded-full px-6 py-3 shadow-2xl border border-white/10 flex items-center gap-1">
                {NAV_ITEMS.map((item) => (
                    <button
                        key={item.label}
                        onClick={() => router.push(item.path)}
                        className={`relative flex flex-col items-center justify-center w-14 transition-all duration-300 ${pathname === item.path ? "text-orange-500 scale-110" : "text-gray-400 hover:text-white"
                            }`}
                    >
                        {item.main ? (
                            <div className={`-mt-8 w-12 h-12 rounded-full flex items-center justify-center border-4 border-white ${pathname === item.path ? "bg-orange-500 text-white" : "bg-gray-800 text-gray-400"}`}>
                                <item.icon className="w-5 h-5" />
                            </div>
                        ) : (
                            <item.icon className="w-6 h-6" />
                        )}
                        {!item.main && pathname === item.path && (
                            <span className="absolute -bottom-2 w-1 h-1 bg-orange-500 rounded-full" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
