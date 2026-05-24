"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Compass, Heart, Shield, Users, Award, MapPin } from "lucide-react";
import Image from "next/image";

const CORE_VALUES = [
  {
    icon: Compass,
    title: "Authentic Discovery",
    desc: "We dive deep beyond common tourist trails to bring you true, unfiltered experiences from every corner of India.",
  },
  {
    icon: Heart,
    title: "Atithi Devo Bhava",
    desc: "Embodying our timeless heritage where a guest is treated with divine hospitality, care, and absolute respect.",
  },
  {
    icon: Shield,
    title: "Responsible Wandering",
    desc: "Promoting green footprints, sustainable ecotourism, and supporting local grassroots economies.",
  },
];

const STATS = [
  { value: "50+", label: "Curated Destinations" },
  { value: "100k+", label: "Happy Explorers" },
  { value: "4.9/5", label: "Average Rating" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
      <Header />

      {/* --- HERO BANNER SECTION --- */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-orange-50/60 via-white to-zinc-50 dark:from-orange-950/10 dark:via-zinc-950 dark:to-zinc-950 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <span className="text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-widest bg-orange-50 dark:bg-orange-950/40 px-4 py-1.5 rounded-full shadow-sm">
            Our Journey
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mt-6 mb-6 tracking-tight text-zinc-900 dark:text-white">
            Redefining Travel Across <span className="text-orange-600 dark:text-orange-500">Incredible India</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg md:text-xl leading-relaxed font-light">
            YatraIndia is a digital compass designed to bridge passionate explorers with the magnificent tapestry of Indian heritage, landscapes, and local narratives.
          </p>
        </div>
      </section>

      {/* --- CORE STORY SEGMENT --- */}
      <section className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Aesthetic Editorial Layout Box */}
          <div className="relative h-[450px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-900 group">
            <Image
              src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200&auto=format&fit=crop"
              alt="Taj Mahal Culture and Heritage"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <div className="flex items-center gap-1.5 text-xs text-orange-400 font-bold mb-1">
                <MapPin className="w-3.5 h-3.5" /> AGRA, INDIA
              </div>
              <p className="font-serif text-lg font-medium opacity-90">Preserving timeless monuments through interactive storytelling.</p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
              Who We Are
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base">
              Born out of a deep reverence for the subcontinent's unmatched diversity, YatraIndia simplifies complex itineraries into elegant, intuitive discoveries. From the frozen high-altitude lakes of Ladakh to the serene emerald backwaters of Kerala, we believe every coordinate tells an ancient story.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base">
              Whether you are looking for architectural marvels of ancient dynasties, raw Himalayan adrenaline splits, or pristine beach islands, our ecosystem empowers you with local context, crowd densities, and optimal weather analytics.
            </p>

            {/* Micro Stats Display */}
            <div className="grid grid-cols-3 gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-8 mt-4">
              {STATS.map((stat, idx) => (
                <div key={idx} className="text-center md:text-left">
                  <p className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400">{stat.value}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-1 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* --- MISSION VALUES CORNER --- */}
      <section className="bg-white dark:bg-zinc-900 py-20 border-y border-zinc-200/50 dark:border-zinc-800/40 transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-serif font-bold mb-4 text-zinc-900 dark:text-zinc-100">Our Core Principles</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">The digital compass guidance standard guiding every development layer of our experience framework.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CORE_VALUES.map((value, idx) => (
              <div 
                key={idx} 
                className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-zinc-100">{value.title}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- BOTTOM TEAM CTA CORNER --- */}
      <section className="container mx-auto px-4 py-20 max-w-4xl text-center">
        <div className="bg-gradient-to-br from-orange-600 to-amber-600 text-white rounded-[2rem] p-12 shadow-2xl relative overflow-hidden group">
          
          {/* Subtle Accent Background Radial Design */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="relative z-10 space-y-6 max-w-xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">Ready to map your next epic adventure?</h2>
            <p className="opacity-90 text-sm md:text-base font-light leading-relaxed">
              Unlock access to verified real-time crowd filters, seamless interactive navigation tools, and premium localized travel itineraries.
            </p>
            <div className="pt-4">
              <a 
                href="/destination" 
                className="inline-block bg-white text-orange-600 px-8 py-3.5 rounded-full font-bold text-sm shadow-md hover:bg-zinc-50 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Start Exploring Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}