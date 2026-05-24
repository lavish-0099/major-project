"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Heart, Landmark, Languages, Sparkles } from "lucide-react";

export default function CulturalGuidePage() {
    const pillars = [
        { icon: Landmark, title: "Sacred Spaces", desc: "Remove footwear before entering temples, shrines, or mosques. Dress modestly covering shoulders and knees." },
        { icon: Heart, title: "Social Etiquette", desc: "The traditional greeting 'Namaste' with folded palms is universally appreciated across the subcontinent." },
        { icon: Languages, title: "Diversity", desc: "Every state boasts unique languages, art forms, and traditions. Approach local variations with openness." },
        { icon: Sparkles, title: "Dining Customs", desc: "Many traditional regions appreciate eating with your right hand. Hospitality ('Atithi Devo Bhava') runs deep." }
    ];

    return (
        <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
            <Header />
            <div className="container mx-auto px-6 py-32 max-w-4xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Cultural Etiquette Guide</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-lg">Embrace and respect the rich multi-ethnic heritage of Incredible India.</p>
                </div>
                <div className="space-y-6">
                    {pillars.map((item, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row items-start gap-4 p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl">
                            <div className="bg-orange-50 dark:bg-orange-950/30 p-3 rounded-xl text-orange-600 shrink-0">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    );
}