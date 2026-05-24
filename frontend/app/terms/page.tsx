"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FileText, UserCheck, Scale, AlertCircle } from "lucide-react";

export default function TermsPage() {
    const clauses = [
        {
            icon: FileText,
            title: "Acceptance of Terms",
            desc: "By accessing and using YatraIndia, you agree to be bound by these Terms and Conditions and all applicable laws and regulations in India. If you do not agree, please stop using the portal."
        },
        {
            icon: UserCheck,
            title: "User Account Responsibilities",
            desc: "If you establish a digital profile on our platform, you are completely responsible for protecting your credentials and tracking all operational actions executing under your custom layout configuration."
        },
        {
            icon: Scale,
            title: "Intellectual Property Rules",
            desc: "All source blocks, design architectures, text modules, graphics, and custom layout frameworks are owned or authorized by YatraIndia and remain heavily protected by international copyright laws."
        },
        {
            icon: AlertCircle,
            title: "Limitation of Liability",
            desc: "YatraIndia acts as a travel discovery hub. We provide local metadata, crowd indices, and image indicators for evaluation purposes and hold no direct liability over individual transit disruptions or logistical events."
        }
    ];

    return (
        <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
            <Header />
            <div className="container mx-auto px-6 py-32 max-w-4xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Terms & Conditions</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-lg">Please read these rules carefully before navigating our platform features.</p>
                </div>

                <div className="space-y-8">
                    {clauses.map((clause, idx) => (
                        <div key={idx} className="p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl">
                            <div className="flex items-center gap-3 mb-4">
                                <clause.icon className="w-6 h-6 text-orange-500" />
                                <h3 className="text-xl font-bold font-serif">{clause.title}</h3>
                            </div>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed pl-9">{clause.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    );
}