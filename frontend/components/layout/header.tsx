"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Search, Globe, User } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useAuth } from "@/context/AuthContext";

export function Header() {
    const { currentUser } = useAuth();
    return (
        <header className="absolute top-0 z-50 w-full pt-6">
            <div className="container relative mx-auto flex items-center justify-between px-6">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-serif font-bold text-white tracking-tight">
                        Yatra<span className="text-orange-400">.</span>
                    </span>
                </div>

                {/* Centered Pill Navigation */}
                <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 bg-black/20 backdrop-blur-md border border-white/10 p-1.5 rounded-full">
                    <Link
                        href="/explore"
                        className="text-sm font-medium text-white/90 px-5 py-2 rounded-full hover:bg-white/10 transition-all duration-300"
                    >
                        Destinations
                    </Link>
                    <Link
                        href="/plan-trip"
                        className="text-sm font-medium text-white/90 px-5 py-2 rounded-full hover:bg-white/10 transition-all duration-300"
                    >
                        Plan Trip
                    </Link>
                    <Link
                        href="/about"
                        className="text-sm font-medium text-white/90 px-5 py-2 rounded-full hover:bg-white/10 transition-all duration-300"
                    >
                        About
                    </Link>
                </nav>

                {/* Right Actions */}
                <div className="hidden md:flex items-center gap-4">
                    {currentUser ? (
                        <Link href="/profile">
                            <Button className="bg-white text-black hover:bg-gray-100 rounded-full px-4 flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>Profile</span>
                            </Button>
                        </Link>
                    ) : (
                        <Link href="/auth/login">
                            <Button variant="ghost" className="text-white hover:bg-white/10 rounded-full">
                                Sign In
                            </Button>
                        </Link>
                    )}

                    {!currentUser && (
                        <Link href="/auth/signup">
                            <Button className="bg-white text-black hover:bg-gray-100 rounded-full px-6">
                                Sign Up
                            </Button>
                        </Link>
                    )}
                    <ModeToggle />
                </div>

                {/* Mobile Menu Icon (Placeholder) */}
                <div className="md:hidden text-white">
                    <Search className="w-6 h-6" />
                </div>
            </div>
        </header>
    );
}
