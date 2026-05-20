"use client";

import { Calendar, Wallet, ArrowRight, Trash2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Trip {
    id: string;
    destination: string;
    startDate: string;
    endDate: string;
    budget: string;
    travelers: string;
    imageUrl?: string;
}

interface TripCardProps {
    trip: Trip;
    onDelete: (id: string) => void;
    onView?: (id: string) => void;
}

export default function TripCard({ trip, onDelete, onView }: TripCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            layout
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group flex flex-col relative"
        >
            {/* Delete Button - Only visible on hover/focus for cleaner look, or always visible on touch */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(trip.id);
                }}
                className="absolute top-3 right-3 z-10 p-2.5 bg-white/10 backdrop-blur-md text-white rounded-full 
                          opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-[-10px] group-hover:translate-y-0
                          hover:bg-red-500 border border-white/20 shadow-lg hover:shadow-red-500/30"
                title="Delete Trip"
                aria-label="Delete Trip"
            >
                <Trash2 className="w-4 h-4" />
            </button>

            {/* Image Section */}
            <div className="h-48 bg-gray-200 relative overflow-hidden group-hover:h-52 transition-all duration-500 ease-in-out">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-[1]" />

                {/* Background (Color fallbacks for now, can be replaced with actual images) */}
                <div className={`absolute inset-0 bg-gradient-to-br from-orange-400 to-pink-500 opacity-90 transition-transform duration-700 group-hover:scale-110`} />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 p-5 w-full z-10 text-white">
                    <div className="flex items-center gap-2 mb-1 opacity-90">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium tracking-wide uppercase">Trip to</span>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-white drop-shadow-sm leading-tight group-hover:translate-x-1 transition-transform duration-300">
                        {trip.destination}
                    </h3>
                </div>

                {/* Chips */}
                <div className="absolute top-3 left-3 z-10 flex gap-2">
                    <div className="bg-black/20 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/10 shadow-sm">
                        {trip.travelers} Travelers
                    </div>
                </div>
            </div>

            {/* Details Section */}
            <div className="p-5 flex-1 flex flex-col bg-white relative">
                <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 text-gray-600 text-sm group-hover:text-gray-900 transition-colors">
                        <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                            <Calendar className="w-4 h-4" />
                        </div>
                        <span className="font-medium">{trip.startDate} - {trip.endDate}</span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600 text-sm group-hover:text-gray-900 transition-colors">
                        <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                            <Wallet className="w-4 h-4" />
                        </div>
                        <span className="font-medium">{trip.budget}</span>
                    </div>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-50">
                    <Button
                        onClick={() => onView && onView(trip.id)}
                        className="w-full bg-gray-50 hover:bg-gray-900 text-gray-900 hover:text-white border border-gray-200 hover:border-gray-900
                                 rounded-xl transition-all duration-300 flex items-center justify-between group/btn"
                    >
                        <span className="font-medium">View Itinerary</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
