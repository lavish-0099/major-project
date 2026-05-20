"use client";

import { Button } from "../ui/button";
import { Building2, Sunset, Mountain, Trees, Music, Sparkles, Map } from "lucide-react";

const CATEGORIES = [
    { label: "All", icon: Map },
    { label: "Heritage", icon: Building2 },
    { label: "Temples", icon: Building2 },
    { label: "Adventure", icon: Mountain },
    { label: "Beaches", icon: Sunset },
    { label: "Wildlife", icon: Trees },
    { label: "Festivals", icon: Music },
    { label: "Hidden Gems", icon: Sparkles },
];

interface RailProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryRail({ activeCategory, onCategoryChange }: RailProps) {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {CATEGORIES.map((cat) => (
                    <Button
                        key={cat.label}
                        variant={activeCategory === cat.label ? "default" : "secondary"}
                        onClick={() => onCategoryChange(cat.label)}
                        className={`rounded-full px-6 gap-2 ${
                            activeCategory === cat.label
                            ? "bg-orange-600 text-white hover:bg-orange-700 shadow-md transform scale-105"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        } transition-all duration-300`}
                    >
                        <cat.icon className="w-4 h-4" />
                        {cat.label}
                    </Button>
                ))}
            </div>
        </div>
    );
}