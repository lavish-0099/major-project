"use client";

import { Star, Calendar, MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ALL_DESTINATIONS } from "@/lib/data";

interface GridProps {
  selectedCategory?: string;
}

export function DestinationsGrid({ selectedCategory = "All" }: GridProps) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const filtered = !selectedCategory || selectedCategory === "All" 
    ? ALL_DESTINATIONS 
    : ALL_DESTINATIONS.filter(d => d.category === selectedCategory);

  const isHomePage = pathname === "/";
  const displayItems = isHomePage ? filtered.slice(0, 8) : filtered;

  return (
    <section className="container mx-auto px-4 py-12 relative z-10">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col items-center text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 dark:text-zinc-100 mb-4 transition-colors">
          {selectedCategory === "All" ? "Featured Destinations" : `${selectedCategory} Specials`}
        </h2>
        <p className="text-gray-500 dark:text-zinc-400 max-w-2xl mx-auto mb-8 text-lg transition-colors">
          Handpicked experiences for your next adventure.
        </p>
        
        {isHomePage && (
          <Link 
            href="/destination" 
            className="group flex items-center gap-2 bg-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-700 transition-all shadow-lg hover:shadow-orange-200"
          >
            <span>View All Destinations</span>
            <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        )}
      </div>

      {/* --- GRID SECTION --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-zinc-800 rounded-2xl border border-gray-100 dark:border-zinc-700 overflow-hidden shadow-sm">
              <Skeleton className="h-64 w-full" />
              <div className="p-6">
                <Skeleton className="h-6 w-3/4 mb-3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))
        ) : (
          displayItems.map((dest) => (
            <Link href={`/destination/${dest.id}`} key={dest.id}>
              <div className="group bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                <div className="relative h-64 w-full overflow-hidden">
                  <ImageWithFallback
                    src={dest.image}
                    alt={dest.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    fallbackText={dest.title}
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  {/* Card Title - Fixed for Dark Mode */}
                  <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-zinc-100 mb-2 group-hover:text-orange-600 transition-colors">
                    {dest.title}
                  </h3>
                  <div className="flex items-center gap-1 text-gray-500 dark:text-zinc-400 text-sm mb-6 transition-colors">
                    <MapPin className="w-4 h-4 text-orange-500" /> 
                    {dest.location}
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-gray-100 dark:border-zinc-700 pt-5">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-bold text-gray-900 dark:text-zinc-100">{dest.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 dark:text-zinc-400 text-xs">
                      <Calendar className="w-4 h-4 text-orange-400" /> 
                      {dest.season}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}