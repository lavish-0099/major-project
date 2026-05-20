"use client";

import { Button } from "@/components/ui/button";
import { Shield, Phone, Heart, MapPin, AlertTriangle, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SafetyPage() {
    const router = useRouter();
    const [isSharing, setIsSharing] = useState(false);

    const toggleSharing = () => {
        setIsSharing(!isSharing);
        if (!isSharing) {
            alert("Emergency Location Sharing Enabled! (Simulation)");
        }
    };

    const EMERGENCY_CONTACTS = [
        { label: "Police", number: "100", icon: Shield, color: "bg-blue-600 hover:bg-blue-700" },
        { label: "Ambulance", number: "102", icon: Heart, color: "bg-red-600 hover:bg-red-700" },
        { label: "Women Helpline", number: "181", icon: Phone, color: "bg-pink-600 hover:bg-pink-700" },
        { label: "Tourist Helpline", number: "1363", icon: AlertTriangle, color: "bg-orange-600 hover:bg-orange-700" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-6 pb-32 pt-12">
            <div className="max-w-md mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="w-6 h-6" />
                    </Button>
                    <h1 className="text-3xl font-bold text-gray-900">SOS &amp; Safety</h1>
                </div>

                {/* Main SOS Button */}
                <div className="mb-8 text-center">
                    <button
                        onClick={() => window.location.href = "tel:112"}
                        className="w-48 h-48 rounded-full bg-red-100 flex items-center justify-center mx-auto border-8 border-red-50 animate-pulse shadow-xl active:scale-95 transition-transform"
                    >
                        <div className="w-36 h-36 rounded-full bg-gradient-to-br from-red-600 to-red-500 shadow-inner flex flex-col items-center justify-center text-white">
                            <span className="text-4xl font-black tracking-widest">SOS</span>
                            <span className="text-sm font-medium mt-1">Tap to Call 112</span>
                        </div>
                    </button>
                    <p className="text-gray-500 mt-6 text-sm">
                        Tap only in case of extreme emergency.
                    </p>
                </div>

                {/* Location Sharing */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Live Location</h3>
                                <p className="text-xs text-gray-500">{isSharing ? "Sharing active" : "Not sharing"}</p>
                            </div>
                        </div>
                        <div
                            onClick={toggleSharing}
                            className={`w-12 h-7 rounded-full p-1 cursor-pointer transition-colors ${isSharing ? "bg-green-500" : "bg-gray-200"}`}
                        >
                            <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${isSharing ? "translate-x-5" : "translate-x-0"}`} />
                        </div>
                    </div>
                    {isSharing && (
                        <div className="text-xs bg-green-50 text-green-700 p-3 rounded-xl border border-green-100">
                            Location shared with emergency contacts.
                        </div>
                    )}
                </div>

                {/* Quick Dial Grid */}
                <h3 className="font-bold text-gray-900 mb-4 px-1">Quick Dial</h3>
                <div className="grid grid-cols-2 gap-4">
                    {EMERGENCY_CONTACTS.map((contact) => (
                        <a
                            key={contact.number}
                            href={`tel:${contact.number}`}
                            className={`${contact.color} text-white p-4 rounded-xl shadow-lg shadow-black/5 active:scale-95 transition-all flex flex-col items-center justify-center gap-2`}
                        >
                            <contact.icon className="w-6 h-6" />
                            <span className="font-bold">{contact.label}</span>
                            <span className="text-xs opacity-80">{contact.number}</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
