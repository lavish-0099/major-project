"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Star } from "lucide-react";
import { motion } from "framer-motion";
import { MapEmbed } from "@/components/ui/map-embed";
import Image from "next/image";
import { ALL_DESTINATIONS } from "@/lib/data";

// Helper to provide attraction images based on category since the main list 
// doesn't have 3 specific sub-attractions for all 50 items yet.
const getGenericAttractions = (category: string) => [
    { name: "Local Market", img: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=500&auto=format&fit=crop" },
    { name: "Heritage Site", img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=500&auto=format&fit=crop" },
];

export default function DestinationPage() {
    const params = useParams();
    const router = useRouter();
    
    // 1. Get the ID from URL and normalize it
    const rawId = params.id as string;
    const slug = rawId.toLowerCase().replace(/-/g, " ");

    // 2. Find the destination in our data.ts list (matching by title or ID)
    const destination = ALL_DESTINATIONS.find(
        (d) => d.title.toLowerCase() === slug || d.id.toString() === rawId
    );

    // 3. Fallback if not found
    if (!destination) {
        return (
            <div className="min-h-screen flex items-center justify-center flex-col gap-4">
                <h1 className="text-2xl font-bold">Destination Not Found</h1>
                <p className="text-gray-500">We couldn&apos;t find "{slug}" in our database.</p>
                <Button onClick={() => router.push("/")}>Go Home</Button>
            </div>
        );
    }

    // 4. Map the new data format to your existing UI needs
    const displayData = {
        name: destination.title,
        tagline: `${destination.category} in ${destination.location.split(',')[0]}`,
        description: `Experience the best of ${destination.title} located in ${destination.location}. This ${destination.category} destination is best visited during ${destination.season}. It currently has a ${destination.crowd.toLowerCase()} crowd level, making it a perfect time for travelers seeking a ${destination.rating} rated experience.`,
        image: destination.image,
        rating: destination.rating,
        location: destination.location,
        attractions: getGenericAttractions(destination.category)
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-[60vh] overflow-hidden">
                <div className="absolute inset-0 bg-black/30 z-10" />
                <Image
                    src={displayData.image}
                    alt={displayData.name}
                    fill
                    priority
                    className="object-cover"
                    border-rounded="none"
                    sizes="100vw"
                />
                <div className="absolute top-0 left-0 w-full p-6 z-20">
                    <Button variant="ghost" onClick={() => router.back()} className="text-white hover:bg-white/20 gap-2 bg-black/20 backdrop-blur-md">
                        <ArrowLeft className="w-5 h-5" /> Back
                    </Button>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-20 text-white bg-gradient-to-t from-black/80 to-transparent pt-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-2">{displayData.name}</h1>
                        <p className="text-xl md:text-2xl font-light opacity-90 mb-4">{displayData.tagline}</p>
                        <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                            <span className="font-bold">{displayData.rating}</span>
                            <span className="text-white/60 text-sm">({destination.reviews} reviews)</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-6 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="md:col-span-2">
                            <h2 className="text-2xl font-bold mb-4 font-serif text-gray-900">About {displayData.name}</h2>
                            <p className="text-gray-600 leading-relaxed text-lg mb-8">
                                {displayData.description}
                            </p>

                            <h3 className="text-xl font-bold mb-6 font-serif">What to expect</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {displayData.attractions.map((place: any, idx: number) => (
                                    <div key={idx} className="group cursor-pointer rounded-xl overflow-hidden relative h-48 shadow-lg hover:shadow-xl transition-all">
                                        <Image
                                            src={place.img}
                                            alt={place.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            sizes="(max-width: 640px) 100vw, 50vw"
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10" />
                                        <div className="absolute bottom-4 left-4 text-white font-bold drop-shadow-md">
                                            {place.name}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Map Section */}
                            <h3 className="text-xl font-bold mb-6 font-serif mt-12">Location</h3>
                            <div className="h-80 rounded-2xl overflow-hidden border border-gray-100 shadow-inner">
                                <MapEmbed location={`${displayData.name}, ${displayData.location}`} />
                            </div>
                        </div>

                        {/* Sidebar / CTA */}
                        <div className="relative">
                            <div className="sticky top-24 rounded-2xl border border-gray-100 shadow-xl p-6 bg-white">
                                <div className="mb-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${destination.crowdColor}`}>
                                        {destination.crowd} Crowd
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Ready to visit?</h3>
                                <p className="text-gray-500 text-sm mb-6">Best time: <strong>{destination.season}</strong>. Start planning your customized itinerary to {displayData.name} today.</p>

                                <Button
                                    onClick={() => router.push("/plan-trip")}
                                    className="w-full h-12 bg-orange-600 text-white hover:bg-orange-700 rounded-xl font-bold transition-colors"
                                >
                                    Plan Trip Now
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


