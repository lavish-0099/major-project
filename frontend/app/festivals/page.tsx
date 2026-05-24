"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CalendarDays, MapPin } from "lucide-react";

export default function FestivalCalendarPage() {
    const festivals = [
        { name: "Diwali", location: "Pan-India", timing: "October / November", description: "The festival of lights symbolizing the victory of light over dark." },
        { name: "Holi", location: "Pan-India (Major in North)", timing: "March", description: "The vibrant spring festival celebrating unity, joy, and fields of colors." },
        { name: "Durga Puja", location: "Kolkata, West Bengal", timing: "October", description: "Breathtaking socio-cultural celebrations featuring magnificent artistic pandals." },
        { name: "Pushkar Camel Fair", location: "Pushkar, Rajasthan", timing: "November", description: "Massive cultural gathering hosting livestock transactions and traditional folk arts." },
        { name: "Onam", location: "Kerala", timing: "August / September", description: "Harvest celebration featuring legendary boat races and elaborate flower patterns." }
    ];

    return (
        <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
            <Header />
            <div className="container mx-auto px-6 py-32 max-w-4xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">India Festival Calendar</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-lg">Plan your itineraries around rich celebrations and unforgettable events.</p>
                </div>
                <div className="relative border-l border-zinc-200 dark:border-zinc-800 pl-6 ml-4 space-y-12">
                    {festivals.map((fest, idx) => (
                        <div key={idx} className="relative group">
                            <div className="absolute -left-10 top-1 bg-orange-600 text-white p-2 rounded-full ring-4 ring-white dark:ring-zinc-950 group-hover:scale-110 transition-transform">
                                <CalendarDays className="w-4 h-4" />
                            </div>
                            <div className="p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-sm">
                                <span className="text-sm font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wide">{fest.timing}</span>
                                <h3 className="text-2xl font-bold mt-1 mb-2">{fest.name}</h3>
                                <div className="flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400 mb-3">
                                    <MapPin className="w-4 h-4 text-zinc-400" /> {fest.location}
                                </div>
                                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{fest.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    );
}