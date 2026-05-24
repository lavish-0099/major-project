"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { HelpCircle, Mail, MessageSquare } from "lucide-react";

export default function HelpCenterPage() {
    const faqs = [
        { q: "How do I filter destinations by region?", a: "Navigate to our Category Rail below the main hero section and switch tags to pull contextually filtered locations instantly." },
        { q: "Is the itinerary planning module free?", a: "Yes, our customized structural trip planner engine is open for mapping customizable traveler endpoints." },
        { q: "Where can I find emergency help details?", a: "Our dedicated Safety Tips interface lists quick hotlines, transit बूथ maps, and official support addresses." }
    ];

    return (
        <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
            <Header />
            <div className="container mx-auto px-6 py-32 max-w-3xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Help Center</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-lg">Need immediate assistance mapping your travels? Find answers below.</p>
                </div>
                
                {/* FAQs */}
                <div className="space-y-6 mb-16">
                    <h2 className="text-2xl font-serif font-bold mb-4">Frequently Asked Questions</h2>
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl">
                            <div className="flex items-start gap-3">
                                <HelpCircle className="w-6 h-6 text-orange-500 shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="text-lg font-bold mb-2">{faq.q}</h3>
                                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{faq.a}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Direct Contact CTA */}
                <div className="p-8 bg-orange-50 dark:bg-zinc-900 border border-orange-100 dark:border-zinc-800 rounded-3xl text-center">
                    <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-zinc-100">Still have queries?</h3>
<p className="text-zinc-600 dark:text-zinc-400 mb-6">
  Drop our development support cell an inquiry string, and we&apos;ll reply shortly.
</p>                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl gap-2 font-semibold">
                            <Mail className="w-4 h-4" /> Email Help Desk
                        </Button>
                        <Button variant="outline" className="rounded-xl gap-2 border-zinc-300 dark:border-zinc-700">
                            <MessageSquare className="w-4 h-4" /> Live Web Chat
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}