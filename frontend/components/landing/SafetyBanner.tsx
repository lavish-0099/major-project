"use client";

import { Shield, Phone, Heart, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export function SafetyBanner() {
    return (
        <section className="container mx-auto px-4 py-8 mb-16">
            <div className="bg-secondary rounded-3xl p-8 md:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
                {/* Decorative Background Circles */}
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

                <div className="flex-1 relative z-10">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium mb-4">
                        <Shield className="w-4 h-4" />
                        Safety First
                    </div>
                    <h2 className="text-4xl font-serif font-bold mb-4">Travel Safe, Travel Smart</h2>
                    <p className="text-white/80 text-lg mb-8 max-w-xl">
                        Stay informed with real-time safety updates, emergency contacts, and region-specific advisories. We&apos;ve got your back.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/safety/sos">
                            <Button className="bg-red-600 hover:bg-red-700 text-white border-0 font-bold h-12 px-8 shadow-lg shadow-red-900/20 animate-pulse hover:animate-none transition-all">
                                <span className="mr-2">SOS / Emergency</span>
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                        <Button variant="outline" className="border-white text-white hover:bg-white/10 h-12 px-6">
                            Scam Alerts
                        </Button>
                    </div>
                </div>

                <div className="flex-1 grid grid-cols-2 gap-4 w-full relative z-10">
                    {[
                        { label: "Police", number: "100", icon: Shield },
                        { label: "Ambulance", number: "102", icon: Heart },
                        { label: "Women Helpline", number: "181", icon: Phone },
                        { label: "Tourist Helpline", number: "1363", icon: Phone },
                    ].map((contact) => (
                        <a
                            key={contact.label}
                            href={`tel:${contact.number}`}
                            className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 hover:bg-white/20 transition-colors block cursor-pointer group"
                        >
                            <div className="flex items-center gap-2 text-white/70 text-sm mb-1 group-hover:text-white transition-colors">
                                <contact.icon className="w-4 h-4" />
                                {contact.label}
                            </div>
                            <div className="text-2xl font-bold">{contact.number}</div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
