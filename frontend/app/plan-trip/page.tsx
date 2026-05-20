"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Wallet, Check, Sparkles, ArrowLeft, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/header";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
// Used standard alert instead of sonner because it was not in package.json


export default function PlanTrip() {
    const router = useRouter();
    const { currentUser } = useAuth();

    useEffect(() => {
        if (!currentUser) {
            router.push("/auth/signup");
        }
    }, [currentUser, router]);

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [result, setResult] = useState<any>(null);

    const [form, setForm] = useState({
        destination: "",
        startDate: "",
        endDate: "",
        travelers: 1,
        budget: "",
        interests: [] as string[],
    });

    // Custom budget state
    const [isCustomBudget, setIsCustomBudget] = useState(false);
    const [customBudgetAmount, setCustomBudgetAmount] = useState("");

    const INTERESTS = [
        { id: "adventure", label: "Adventure", icon: "🏔" },
        { id: "beaches", label: "Beaches", icon: "🏖" },
        { id: "spiritual", label: "Spiritual", icon: "🛕" },
        { id: "nature", label: "Nature", icon: "🌲" },
        { id: "food", label: "Food", icon: "🍴" },
        { id: "culture", label: "Culture", icon: "🏛" },
    ];

    const BUDGETS = [
        "₹10,000 - ₹20,000",
        "₹20,000 - ₹40,000",
        "₹40,000+",
    ];

    const isFormValid = () => {
        return (
            form.destination.trim() !== "" &&
            form.startDate !== "" &&
            form.endDate !== "" &&
            form.travelers > 0 &&
            (form.budget !== "" || (isCustomBudget && customBudgetAmount.trim() !== "")) &&
            form.interests.length > 0
        );
    };

    const generateTrip = async () => {
        if (!isFormValid()) return;

        setLoading(true);
        const finalBudget = isCustomBudget ? `₹${customBudgetAmount}` : form.budget;

        try {
            const res = await fetch("/api/plan-trip", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, budget: finalBudget }),
            });
            const data = await res.json();
            setResult(data);
            setStep(2);
        } catch (error) {
            console.error("Failed to generate trip", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleInterest = (id: string) => {
        setForm(prev => {
            const interests = prev.interests.includes(id)
                ? prev.interests.filter(i => i !== id)
                : [...prev.interests, id];
            return { ...prev, interests };
        });
    };

    const saveTrip = async () => {
        if (!currentUser) {
            alert("Please login to save your trip.");
            router.push("/auth/login");
            return;
        }

        if (!result) return;

        setSaving(true);
        try {
            await addDoc(collection(db, "users", currentUser.uid, "trips"), {
                destination: form.destination,
                startDate: form.startDate,
                endDate: form.endDate,
                budget: result.estimatedCost,
                travelers: form.travelers,
                itinerary: result.itinerary,
                createdAt: new Date(),
                status: 'planned'
            });
            alert("Trip saved successfully!");
            router.push("/trips");
        } catch (error: any) {
            console.error("Error saving trip:", error);
            alert("Failed to save trip: " + (error.message || error));
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen font-sans relative">
            {/* Background */}
            {/* Background */}
            <div className="fixed inset-0 z-0">
                {/* Premium Indian-inspired Gradient Base - Increased Opacity */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF9933]/20 via-orange-50/50 to-[#138808]/20 z-0" />

                {/* Subtle Geometric Pattern (CSS Radial Gradient) - Increased Opacity */}
                <div className="absolute inset-0 z-10 opacity-[0.08]"
                    style={{
                        backgroundImage: `radial-gradient(#000080 1.5px, transparent 1.5px)`,
                        backgroundSize: '24px 24px'
                    }}
                />

                {/* Soft Ambient Glows */}
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-orange-100/40 to-transparent z-10" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-100/40 blur-[100px] z-10 rounded-full" />
            </div>

            <div className="relative z-10">
                <Header />
                <div className="pt-32 pb-20 container mx-auto px-4">

                    {step === 1 && (
                        <div className="max-w-3xl mx-auto">
                            <div className="mb-8 flex items-center justify-between">
                                <Button variant="ghost" onClick={() => router.back()} className="hover:bg-white/50 gap-2">
                                    <ArrowLeft className="w-4 h-4" /> Back
                                </Button>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-4 text-gray-900">Plan Your Dream Trip</h1>
                            <p className="text-center text-gray-500 mb-12">Tell us your preferences and let our AI craft the perfect itinerary.</p>

                            <div className="glass-card p-8 md:p-10 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 bg-white/40 backdrop-blur-xl border-white/60 shadow-xl">

                                {/* Destination */}
                                <div className="space-y-4">
                                    <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
                                        Where to? <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative group">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors h-5 w-5" />
                                        <input
                                            type="text"
                                            placeholder="e.g. Kashmir, Goa, Jaipur"
                                            className="w-full bg-white/70 border border-gray-200 rounded-xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-lg font-medium placeholder:text-gray-400"
                                            value={form.destination}
                                            onChange={e => setForm({ ...form, destination: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Dates & Travelers */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Start Date <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                min={new Date().toISOString().split("T")[0]}
                                                className="w-full bg-white/70 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-primary transition-all cursor-pointer font-medium text-gray-700"
                                                value={form.startDate}
                                                onChange={e => setForm({ ...form, startDate: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">End Date <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                min={form.startDate || new Date().toISOString().split("T")[0]}
                                                className="w-full bg-white/70 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-primary transition-all cursor-pointer font-medium text-gray-700"
                                                value={form.endDate}
                                                onChange={e => setForm({ ...form, endDate: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Travelers <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                            <input
                                                type="number"
                                                min="1"
                                                className="w-full bg-white/70 border border-gray-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-primary transition-all font-medium"
                                                value={form.travelers}
                                                onChange={e => {
                                                    const val = parseInt(e.target.value);
                                                    if (val > 0) setForm({ ...form, travelers: val });
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Budget */}
                                <div className="space-y-4">
                                    <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">Budget Range <span className="text-red-500">*</span></label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                        {BUDGETS.map(b => (
                                            <div
                                                key={b}
                                                onClick={() => {
                                                    setForm({ ...form, budget: b });
                                                    setIsCustomBudget(false);
                                                }}
                                                className={`cursor-pointer rounded-xl p-3 border transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium
                                                    ${!isCustomBudget && form.budget === b
                                                        ? "bg-primary text-white border-primary shadow-lg scale-105"
                                                        : "bg-white/70 border-gray-200 hover:border-primary/50 text-gray-600 hover:bg-white"
                                                    }`}
                                            >
                                                {b}
                                            </div>
                                        ))}
                                        <div
                                            onClick={() => setIsCustomBudget(true)}
                                            className={`cursor-pointer rounded-xl p-3 border transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium
                                                ${isCustomBudget
                                                    ? "bg-primary text-white border-primary shadow-lg scale-105"
                                                    : "bg-white/70 border-gray-200 hover:border-primary/50 text-gray-600 hover:bg-white"
                                                }`}
                                        >
                                            Custom
                                        </div>
                                    </div>
                                    {isCustomBudget && (
                                        <div className="animate-in fade-in slide-in-from-top-2">
                                            <input
                                                type="text"
                                                placeholder="Enter Budget Amount (e.g. 50000)"
                                                className="w-full bg-white/70 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-primary transition-all font-medium"
                                                value={customBudgetAmount}
                                                onChange={(e) => setCustomBudgetAmount(e.target.value)}
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Interests */}
                                <div className="space-y-4">
                                    <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">Interests <span className="text-red-500">*</span></label>
                                    <div className="flex flex-wrap gap-3">
                                        {INTERESTS.map(interest => (
                                            <div
                                                key={interest.id}
                                                onClick={() => toggleInterest(interest.id)}
                                                className={`cursor-pointer rounded-full px-5 py-2 border transition-all duration-300 flex items-center gap-2 text-sm font-medium select-none
                                                    ${form.interests.includes(interest.id)
                                                        ? "bg-black text-white border-black shadow-lg scale-105"
                                                        : "bg-white/70 border-gray-200 hover:border-gray-400 text-gray-600 hover:bg-white"
                                                    }`}
                                            >
                                                <span>{interest.icon}</span>
                                                {interest.label}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Button
                                    onClick={generateTrip}
                                    disabled={loading || !isFormValid()}
                                    className={`w-full h-14 text-lg rounded-xl shadow-xl transition-all hover:scale-[1.02] active:scale-95 text-white
                                        ${isFormValid()
                                            ? "bg-gradient-to-r from-primary to-orange-600 hover:to-orange-700 shadow-orange-500/20 cursor-pointer"
                                            : "bg-gray-300 cursor-not-allowed shadow-none"
                                        }`}
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">Generating Plan... <Sparkles className="animate-spin w-5 h-5" /></span>
                                    ) : (
                                        "Generate My Trip Plan"
                                    )}
                                </Button>
                            </div>
                        </div>
                    )}

                    {step === 2 && result && (
                        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
                            <div className="mb-8 flex items-center justify-between">
                                <Button variant="ghost" onClick={() => setStep(1)} className="hover:bg-white/50 gap-2">
                                    <ArrowLeft className="w-4 h-4" /> Edit Plan
                                </Button>
                            </div>

                            <div className="text-center mb-10">
                                <span className={`glass-icon px-4 py-1 rounded-full font-bold uppercase tracking-wide text-xs mb-4 inline-block ${result.success ? "text-orange-600" : "text-red-500"}`}>
                                    {result.success ? "Itinerary Ready" : "Error"}
                                </span>
                                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                                    {result.success ? `Trip to ${form.destination}` : "Planning Failed"}
                                </h1>
                                {result.success && <p className="text-gray-500 font-medium">Estimated budget: {result.estimatedCost}</p>}
                                {!result.success && <p className="text-red-500 font-medium">{result.message || "Something went wrong. Please try again."}</p>}
                            </div>

                            {result.success && result.itinerary ? (
                                <div className="space-y-6">
                                    {result.itinerary.map((item: any, index: number) => (
                                        <div key={item.day || index} className="glass-card p-6 md:p-8 flex flex-col md:flex-row gap-6 relative overflow-hidden group hover:border-primary/30 transition-colors bg-white/60">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-primary/10" />

                                            <div className="flex-shrink-0">
                                                <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xl shadow-inner border border-orange-200">
                                                    Day {item.day || index + 1}
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold mb-2 text-gray-900">{item.title || "Explore &amp; Enjoy"}</h3>
                                                <p className="text-gray-600 leading-relaxed">{item.plan}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                result.success && (
                                    <div className="text-center p-8 glass-card bg-white/50">
                                        <p className="text-gray-500">No itinerary details available. Please try again.</p>
                                    </div>
                                )
                            )}

                            <div className="mt-12 flex justify-center gap-4">
                                <Button onClick={() => setStep(1)} variant="outline" className="rounded-full border-gray-300 h-12 px-8 bg-white/50 backdrop-blur-sm hover:bg-white">
                                    Plan Another Trip
                                </Button>
                                {result.success && (
                                    <Button
                                        onClick={saveTrip}
                                        disabled={saving}
                                        className="rounded-full bg-black text-white px-8 h-12 shadow-lg hover:bg-gray-800"
                                    >
                                        {saving ? "Saving..." : "Save Itinerary"}
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
