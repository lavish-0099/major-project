"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Shield, Eye, Lock, RefreshCw } from "lucide-react";

export default function PrivacyPolicyPage() {
    const sections = [
        {
            icon: Eye,
            title: "Information We Collect",
            desc: "We collect information you provide directly to us when creating an account, planning itineraries, or communicating with us. This includes your name, email address, and saved travel preferences."
        },
        {
            icon: Shield,
            title: "How We Use Your Data",
            desc: "Your data helps us personalize your discovery experience on YatraIndia. We use it to filter locations based on your preferences, optimize route planning, and send important service updates."
        },
        {
            icon: Lock,
            title: "Data Security & Protection",
            desc: "We implement industry-standard cryptographic measures and secure servers to shield your personal details from unauthorized access, modification, or exposure."
        },
        {
            icon: RefreshCw,
            title: "Updates to This Policy",
            desc: "We may update this privacy statement periodically to reflect changes in our service architecture or regulatory updates. We recommend checking this page regularly for changes."
        }
    ];

    return (
        <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
            <Header />
            <div className="container mx-auto px-6 py-32 max-w-4xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Privacy Policy</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-lg">Last updated: May 2026. Learn how we secure and care for your personal information.</p>
                </div>

                <div className="space-y-10">
                    {sections.map((section, idx) => (
                        <div key={idx} className="p-8 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl flex flex-col md:flex-row gap-6 items-start">
                            <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-xl text-orange-600 shrink-0">
                                <section.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-3 font-serif">{section.title}</h3>
                                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base">{section.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    );
}