"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { Map, Compass, BookOpen, FileCode } from "lucide-react";

export default function SitemapPage() {
    const architecture = [
        {
            icon: Compass,
            title: "Core Core Portals",
            links: [
                { label: "Home Base Layout", href: "/" },
                { label: "All Indian Destinations", href: "/destination" },
                { label: "Custom Trip Planner", href: "/plan-trip" }
            ]
        },
        {
            icon: Map,
            title: "Travel Exploration Segments",
            links: [
                { label: "Transport Hub", href: "/transport" },
                { label: "Interactive Map Directory", href: "/map" },
                { label: "Curated Local Experiences", href: "/explore" },
                { label: "Premium Hotel Aggregators", href: "/hotels" }
            ]
        },
        {
            icon: BookOpen,
            title: "Resources & Knowledge Bases",
            links: [
                { label: "Travel Safety Guidelines", href: "/safety" },
                { label: "Cultural Etiquette Guide", href: "/cultural-guide" },
                { label: "Local Conversational Phrasebook", href: "/phrasebook" },
                { label: "India Festival Calendars", href: "/festivals" },
                { label: "Central Help Support Cell", href: "/help" }
            ]
        },
        {
            icon: FileCode,
            title: "Corporate & Legal Baselines",
            links: [
                { label: "Privacy Policies", href: "/privacy" },
                { label: "Terms & Conditions Guidelines", href: "/terms" },
                { label: "System Structural Sitemap", href: "/sitemap" }
            ]
        }
    ];

    return (
        <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
            <Header />
            <div className="container mx-auto px-6 py-32 max-w-4xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">System Sitemap</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-lg">A clean, transparent blueprint map indexing all endpoints inside YatraIndia.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {architecture.map((group, idx) => (
                        <div key={idx} className="p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-sm">
                            <div className="flex items-center gap-2 mb-4 border-b border-zinc-200 dark:border-zinc-800 pb-3">
                                <group.icon className="w-5 h-5 text-orange-500" />
                                <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">{group.title}</h2>
                            </div>
                            <ul className="space-y-3">
                                {group.links.map((link, lIdx) => (
                                    <li key={lIdx}>
                                        <Link
                                            href={link.href}
                                            className="text-zinc-600 dark:text-zinc-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors inline-block text-base font-medium"
                                        >
                                            → {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    );
}