"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MessageSquare } from "lucide-react";

export default function PhrasebookPage() {
    const phrases = [
        { english: "Hello / Respectful Greeting", local: "Namaste (नमस्ते)", situation: "Universal Greeting" },
        { english: "Thank You", local: "Dhanyavaad (धन्यवाद) / Shukriya", situation: "Expressing Gratitude" },
        { english: "How much does this cost?", local: "Yeh kitne ka hai? (यह कितने का है?)", situation: "Shopping & Markets" },
        { english: "Where is the station?", local: "Station kahan hai? (स्टेशन कहाँ है?)", situation: "Navigation" },
        { english: "Help me please", local: "Kripya meri madad kijiye (कृपया मेरी मदद कीजिए)", situation: "Urgent Support" },
        { english: "Water", local: "Paani (पानी)", situation: "Dining & Basics" }
    ];

    return (
        <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
            <Header />
            <div className="container mx-auto px-6 py-32 max-w-4xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Local Phrasebook</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-lg">Handy conversational expressions to bridge links with local communities.</p>
                </div>
                <div className="overflow-hidden border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-sm">
                    <table className="w-full text-left border-collapse bg-zinc-50 dark:bg-zinc-900">
                        <thead>
                            <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold">
                                <th className="p-4">English Context</th>
                                <th className="p-4">Phonetic Translation</th>
                                <th className="p-4 hidden sm:table-cell">Context</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
                            {phrases.map((p, idx) => (
                                <tr key={idx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                                    <td className="p-4 font-medium">{p.english}</td>
                                    <td className="p-4 text-orange-600 dark:text-orange-400 font-mono">{p.local}</td>
                                    <td className="p-4 text-zinc-500 dark:text-zinc-400 hidden sm:table-cell text-sm">{p.situation}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </main>
    );
}