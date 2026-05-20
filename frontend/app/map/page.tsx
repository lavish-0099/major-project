"use client";

import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Search, BedDouble, Utensils, Hospital, ShieldAlert } from "lucide-react";

export default function MapPage() {
    return (
        <div className="min-h-screen bg-gray-50 relative">
            {/* Map Placeholder */}
            <div className="absolute inset-0 bg-gray-200 z-0">
                <div className="w-full h-full flex items-center justify-center opacity-10"
                    style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                >
                </div>
                {/* Mock Map Markers */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-16 h-16 rounded-full bg-blue-500/30 animate-pulse flex items-center justify-center">
                        <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-xl"></div>
                    </div>
                </div>
            </div>

            {/* UI Overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between pb-24">

                {/* Top Controls */}
                <div className="p-4 pt-12 pointer-events-auto">
                    <div className="bg-white rounded-2xl shadow-lg p-2 flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <div className="text-[10px] font-bold text-gray-400 uppercase">Current Location</div>
                            <div className="text-sm font-bold text-gray-900">Connaught Place, New Delhi</div>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-100 cursor-pointer">
                            <Search className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* Bottom Controls */}
                <div className="p-4 pointer-events-auto overflow-x-auto">
                    <div className="flex gap-3 pb-2">
                        <CategoryPill icon={BedDouble} label="Hotels" active />
                        <CategoryPill icon={Utensils} label="Food" />
                        <CategoryPill icon={Hospital} label="Hospital" />
                        <CategoryPill icon={ShieldAlert} label="Police" />
                    </div>

                    {/* Nearby Card */}
                    <div className="bg-white p-4 rounded-2xl shadow-xl border border-gray-100 mt-2 flex gap-4 items-center">
                        <div className="w-16 h-16 rounded-xl bg-gray-100 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=200&auto=format&fit=crop')" }}></div>
                        <div className="flex-1">
                            <h3 className="font-bold text-gray-900">The Imperial Hotel</h3>
                            <p className="text-xs text-gray-500">Luxury Hotel • 0.5 km away</p>
                            <div className="flex gap-1 mt-1">
                                <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">Open</span>
                                <span className="text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded font-bold">⭐ 4.8</span>
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-blue-500/30 shadow-lg">
                            <Navigation className="w-5 h-5" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CategoryPill({ icon: Icon, label, active }: any) {
    return (
        <div className={`flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg border border-white/20 backdrop-blur-md cursor-pointer transition-transform active:scale-95 whitespace-nowrap
            ${active ? "bg-black text-white" : "bg-white text-gray-700"}`}
        >
            <Icon className="w-4 h-4" />
            <span className="text-xs font-bold">{label}</span>
        </div>
    )
}
