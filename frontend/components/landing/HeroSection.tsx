"use client";

import { Button } from "../ui/button";
import Image from "next/image";
import { Calendar, MapPin, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export function HeroSection() {
    const router = useRouter();

    return (
        <div className="relative min-h-[110vh] w-full flex flex-col items-center justify-center overflow-hidden pt-32 pb-40 md:pb-48">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-white/90 z-10" />
                <Image
                    src="https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2070&auto=format&fit=crop"
                    alt="Taj Mahal Background"
                    fill
                    priority
                    className="object-cover object-center transition-transform duration-10000 hover:scale-105"
                    sizes="100vw"
                />
            </div>

            <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-5xl mx-auto w-full">

                {/* --- CONNECTED FEATURED BUBBLES --- */}
                <div className="flex items-center justify-center gap-3 md:gap-6 mb-8 md:mb-12 perspective-1000">
                    {[
                        { id: 9, name: "Ladakh", img: "/Tourism/Leh Ladakh (Ladakh).jpeg" },
                        { id: 18, name: "Jaipur", img: "/Tourism/Amer Fort(Jaipur, Rajasthan).jpeg" },
                        { id: 38, name: "Kerala", img: "/Tourism/Munnar Tea Gardens (Kerala).jpeg" }
                    ].map((place, i) => (
                        <div
                            key={place.name}
                            onClick={() => router.push(`/destination/${place.id}`)}
                            className={`relative group w-20 h-20 md:w-32 md:h-32 rounded-2xl md:rounded-3xl overflow-hidden glass-card p-1 transition-transform duration-500 hover:-translate-y-2 cursor-pointer ${
                                i === 1 ? 'scale-110 z-10' : 'scale-90 opacity-90 hover:opacity-100'
                            }`}
                        >
                            <div className="w-full h-full rounded-xl md:rounded-2xl overflow-hidden relative">
                                <Image
                                    src={place.img}
                                    alt={place.name}
                                    fill
                                    priority={i === 1} // Priority for center (Jaipur) image
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 20vw"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                <span className="absolute bottom-1 md:bottom-2 left-0 right-0 text-[10px] md:text-sm text-center text-white font-medium drop-shadow-md">
                                    {place.name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-medium text-white mb-6 drop-shadow-xl tracking-tight leading-tight">
                    Discover the Wild <br />
                    Beauty of <span className="italic">India</span>
                </h1>

                <p className="text-white/90 text-sm sm:text-base md:text-xl max-w-xl mx-auto mb-10 font-light tracking-wide drop-shadow-md px-4">
                    Explore curated destinations, plan your perfect trip, and uncover the wonders of India&apos;s nature in just one click.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto px-4">
                    <Button
                        onClick={() => router.push("/plan-trip")}
                        className="w-full sm:w-auto h-12 md:h-14 px-8 rounded-full bg-black text-white hover:bg-gray-900 border border-white/10 shadow-xl text-base md:text-lg font-medium transition-transform hover:scale-105"
                    >
                        Plan My Trip
                    </Button>
                    <Button 
                        onClick={() => router.push("/destination")}
                        className="w-full sm:w-auto h-12 md:h-14 px-8 rounded-full bg-white text-black hover:bg-gray-100 border border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] text-base md:text-lg font-medium transition-all duration-300 hover:scale-105 group relative overflow-hidden shadow-lg"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Explore Destinations
                            <Search className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Button>
                </div>
            </div>

            {/* Bottom Fade Gradient for content blending */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent z-10" />
        </div>
    );
}