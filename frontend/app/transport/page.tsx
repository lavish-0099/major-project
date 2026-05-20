"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plane, Train, Bus, Car } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function TransportPage() {
    const [mode, setMode] = useState("flight");

    return (
        <div className="min-h-screen bg-gray-50 pb-32 pt-6">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-6">Book Travel</h1>

                {/* Mode Switcher */}
                <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 mb-8 flex gap-1">
                    <TabButton active={mode === "flight"} onClick={() => setMode("flight")} icon={Plane} label="Flight" />
                    <TabButton active={mode === "train"} onClick={() => setMode("train")} icon={Train} label="Train" />
                    <TabButton active={mode === "bus"} onClick={() => setMode("bus")} icon={Bus} label="Bus" />
                    <TabButton active={mode === "cab"} onClick={() => setMode("cab")} icon={Car} label="Cab" />
                </div>

                {/* Search Form */}
                <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">From</label>
                            <Input placeholder="Origin City" className="bg-gray-50" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">To</label>
                            <Input placeholder="Destination City" className="bg-gray-50" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Date</label>
                                <Input type="date" className="bg-gray-50" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Passengers</label>
                                <Input type="number" min="1" defaultValue="1" className="bg-gray-50" />
                            </div>
                        </div>

                        <Button className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-lg font-bold shadow-orange-200 shadow-xl mt-2">
                            Search {mode.charAt(0).toUpperCase() + mode.slice(1)}s
                        </Button>
                    </div>
                </div>

                {/* Promo / Recent */}
                <div className="mt-8">
                    <h3 className="font-bold text-gray-900 mb-4">Popular Routes</h3>
                    <div className="space-y-3">
                        <RouteCard from="Delhi" to="Mumbai" price="4,500" time="2h 10m" mode="Flight" />
                        <RouteCard from="Bangalore" to="Goa" price="1,200" time="10h 30m" mode="Bus" />
                        <RouteCard from="Jaipur" to="Delhi" price="800" time="4h 45m" mode="Train" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function TabButton({ active, onClick, icon: Icon, label }: any) {
    return (
        <button
            onClick={onClick}
            className={`flex-1 flex flex-col items-center justify-center py-3 rounded-xl transition-all ${active ? "bg-black text-white shadow-md" : "text-gray-400 hover:bg-gray-50"}`}
        >
            <Icon className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">{label}</span>
        </button>
    )
}

function RouteCard({ from, to, price, time, mode }: any) {
    return (
        <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
            <div>
                <div className="flex items-center gap-2 font-bold text-gray-900">
                    {from} <span className="text-gray-300">→</span> {to}
                </div>
                <div className="text-xs text-gray-400 mt-1">{mode} • {time}</div>
            </div>
            <div className="text-right">
                <div className="font-bold text-orange-600">₹{price}</div>
            </div>
        </div>
    )
}
