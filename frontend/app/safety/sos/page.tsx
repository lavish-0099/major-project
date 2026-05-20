"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, ShieldAlert, CheckCircle2, Siren } from "lucide-react";
import { Header } from "@/components/layout/header";
import { useRouter } from "next/navigation";

export default function SOSPage() {
    const router = useRouter();
    const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

    const EMERGENCY_CONTACTS = [
        { name: "Police Control", number: "100", icon: Siren, color: "bg-red-100 text-red-600" },
        { name: "Ambulance", number: "102", icon: Phone, color: "bg-blue-100 text-blue-600" },
        { name: "Women's Helpline", number: "181", icon: ShieldAlert, color: "bg-pink-100 text-pink-600" },
    ];

    const handleSOS = () => {
        setStatus("sending");
        // Simulate GPS location fetch
        setTimeout(() => {
            const mockLat = 28.6139 + (Math.random() - 0.5) * 0.01;
            const mockLng = 77.2090 + (Math.random() - 0.5) * 0.01;
            setLocation({ lat: mockLat, lng: mockLng });
            setStatus("sent");
        }, 2500);
    };

    return (
        <div className="min-h-screen bg-red-50/50">
            <Header />

            <div className="pt-28 pb-12 container mx-auto px-4 max-w-lg">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-red-600 mb-2 flex items-center justify-center gap-2">
                        <Siren className="animate-pulse" /> EMERGENCY SOS
                    </h1>
                    <p className="text-gray-600">
                        Press the button below to share your live location with emergency contacts and authorities immediately.
                    </p>
                </div>

                {/* SOS Button */}
                <div className="flex justify-center mb-12">
                    <button
                        onClick={handleSOS}
                        disabled={status !== "idle"}
                        className={`
                            relative w-64 h-64 rounded-full flex flex-col items-center justify-center
                            transition-all duration-500 shadow-xl
                            ${status === "idle" ? "bg-red-600 hover:bg-red-700 hover:scale-105 shadow-red-500/50 cursor-pointer" : ""}
                            ${status === "sending" ? "bg-red-500 scale-95 animate-pulse cursor-wait" : ""}
                            ${status === "sent" ? "bg-green-600 scale-100 cursor-default" : ""}
                        `}
                    >
                        {/* Ripple Effect Rings when Idle/Sending */}
                        {status !== 'sent' && (
                            <>
                                <div className="absolute inset-0 rounded-full border-4 border-red-200 opacity-50 animate-ping" style={{ animationDuration: '2s' }} />
                                <div className="absolute inset-0 rounded-full border-4 border-red-300 opacity-30 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
                            </>
                        )}

                        <div className="relative z-10 text-white text-center">
                            {status === "idle" && (
                                <>
                                    <span className="block text-4xl font-black tracking-widest mb-1">SOS</span>
                                    <span className="text-sm font-medium opacity-90">TAP TO SEND HELP</span>
                                </>
                            )}
                            {status === "sending" && (
                                <>
                                    <MapPin className="w-12 h-12 mb-2 mx-auto animate-bounce" />
                                    <span className="font-bold">Locating...</span>
                                </>
                            )}
                            {status === "sent" && (
                                <>
                                    <CheckCircle2 className="w-16 h-16 mb-2 mx-auto" />
                                    <span className="font-bold text-lg">ALERT SENT</span>
                                </>
                            )}
                        </div>
                    </button>
                </div>

                {/* Status Message */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-red-100 mb-6 text-center">
                    {status === "idle" && (
                        <p className="text-gray-500 text-sm">Your location and details will be sent to Police (100) and your trusted contacts.</p>
                    )}
                    {status === "sending" && (
                        <p className="text-red-600 font-bold animate-pulse">Triangulating precise location coordinates...</p>
                    )}
                    {status === "sent" && location && (
                        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4">
                            <p className="text-green-700 font-bold">Emergency Alert Broadcasted!</p>
                            <div className="text-xs bg-gray-50 p-2 rounded border text-gray-500 font-mono">
                                Lat: {location.lat.toFixed(6)}, Lng: {location.lng.toFixed(6)}
                            </div>
                            <p className="text-sm text-gray-600">Help is on the way. Stay calm.</p>
                            <Button variant="outline" onClick={() => setStatus('idle')} className="mt-2 text-xs h-8">Reset Status</Button>
                        </div>
                    )}
                </div>

                {/* Quick Dialers */}
                <div className="space-y-4">
                    <h3 className="font-bold text-gray-800 uppercase text-xs tracking-wider ml-1">Quick Dial Emergency</h3>
                    <div className="grid grid-cols-1 gap-3">
                        {EMERGENCY_CONTACTS.map((contact) => (
                            <a
                                key={contact.number}
                                href={`tel:${contact.number}`}
                                className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all active:scale-98"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-full ${contact.color}`}>
                                        <contact.icon className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-gray-900">{contact.name}</div>
                                        <div className="text-sm text-gray-500">Dial {contact.number}</div>
                                    </div>
                                </div>
                                <div className="bg-green-50 text-green-700 px-4 py-2 rounded-full font-bold text-sm">
                                    Call
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <Button variant="ghost" className="text-gray-400 hover:text-gray-600 text-sm" onClick={() => router.back()}>
                        Cancel &amp; Return Home
                    </Button>
                </div>
            </div>
        </div>
    );
}
