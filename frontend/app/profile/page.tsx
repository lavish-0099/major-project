"use client";

import { Button } from "@/components/ui/button";
import { User, Settings, LogOut, Map, Heart, CreditCard, HelpCircle, ChevronRight, Bell, Calendar, X, Save } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc, collection, getCountFromServer } from "firebase/firestore";

import { db } from "@/lib/firebase";
import Image from "next/image";

export default function ProfilePage() {
    const { currentUser, logout } = useAuth();
    const router = useRouter();
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [tripCount, setTripCount] = useState(0);
    const [isEditing, setIsEditing] = useState(false);

    const [editForm, setEditForm] = useState({ name: "", phone: "" });

    useEffect(() => {
        if (!currentUser) {
            router.push("/auth/login");
            return;
        }

        async function fetchUserData() {
            if (currentUser) {
                try {
                    // Fetch User Details
                    const docRef = doc(db, "users", currentUser.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setUserData(data);
                        setEditForm({ name: data.name || "", phone: data.phone || "" });
                    }

                    // Fetch Trip Count
                    const tripsColl = collection(db, "users", currentUser.uid, "trips");
                    const snapshot = await getCountFromServer(tripsColl);
                    setTripCount(snapshot.data().count);

                } catch (error) {
                    console.error("Error fetching user data:", error);
                } finally {
                    setLoading(false);
                }
            }
        }


        fetchUserData();
    }, [currentUser, router]);

    const handleLogout = async () => {
        try {
            await logout();
            router.push("/");
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    const handleUpdateProfile = async () => {
        if (!currentUser) return;
        try {
            const docRef = doc(db, "users", currentUser.uid);
            await updateDoc(docRef, {
                name: editForm.name,
                phone: editForm.phone
            });
            setUserData({ ...userData, name: editForm.name, phone: editForm.phone });
            setIsEditing(false);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        }
    };



    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;
    }

    if (!currentUser) return null;

    return (
        <div className="min-h-screen bg-gray-50 pb-32 relative">
            {/* Header Profile Section */}
            <div className="bg-white border-b border-gray-100 pt-10 pb-8 rounded-b-[2.5rem] shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full blur-3xl -mr-10 -mt-10" />
                <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl -ml-10 -mt-10" />

                <div className="container mx-auto px-6 flex flex-col items-center text-center relative z-10">
                    <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl bg-gray-200 overflow-hidden mb-4 relative group">


                        <Image
                            src={userData?.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"}
                            alt="Profile"
                            fill
                            className="object-cover"
                        />

                    </div>

                    <button onClick={() => setIsEditing(true)} className="text-xs text-orange-600 font-medium mb-3 hover:underline">
                        Edit Profile Details
                    </button>

                    <h1 className="text-2xl font-bold text-gray-900 mb-1">{userData?.name || "User"}</h1>
                    <p className="text-gray-500 text-sm font-medium mb-4">{userData?.phone || currentUser.email}</p>

                    <div className="flex gap-4 w-full justify-center">
                        <div className="bg-orange-50 px-6 py-3 rounded-2xl border border-orange-100 flex flex-col items-center min-w-[100px]">
                            <span className="text-xl font-bold text-orange-600">{tripCount}</span>
                            <span className="text-xs text-gray-500 uppercase tracking-wide font-bold">Trips</span>
                        </div>
                        <div className="bg-blue-50 px-6 py-3 rounded-2xl border border-blue-100 flex flex-col items-center min-w-[100px]">
                            <span className="text-xl font-bold text-blue-600">0</span>
                            <span className="text-xs text-gray-500 uppercase tracking-wide font-bold">Reviews</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu Options */}
            <div className="container mx-auto px-4 mt-6 space-y-6">

                {/* Section 1 */}
                <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
                    <MenuItem icon={Map} label="My Trips" color="text-blue-600" bg="bg-blue-50" onClick={() => router.push("/trips")} badge={tripCount > 0 ? tripCount.toString() : undefined} />
                    <MenuItem icon={Heart} label="Wishlist" color="text-red-500" bg="bg-red-50" badge="0" />
                    <MenuItem icon={Calendar} label="Upcoming Bookings" color="text-orange-600" bg="bg-orange-50" onClick={() => router.push("/bookings")} />
                </div>

                {/* Section 2 */}
                <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
                    <MenuItem icon={CreditCard} label="Payments &amp; Wallets" color="text-purple-600" bg="bg-purple-50" />
                    <MenuItem icon={Bell} label="Notifications" color="text-yellow-600" bg="bg-yellow-50" />
                    <MenuItem icon={Settings} label="Settings" color="text-gray-600" bg="bg-gray-100" />
                </div>

                {/* Section 3 */}
                <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
                    <MenuItem icon={HelpCircle} label="Help &amp; Support" color="text-cyan-600" bg="bg-cyan-50" />
                    <div onClick={handleLogout} className="p-3 flex items-center gap-4 cursor-pointer hover:bg-gray-50 rounded-xl transition-colors group">
                        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                            <LogOut className="w-5 h-5" />
                        </div>
                        <div className="flex-1 font-medium text-red-500">Log Out</div>
                    </div>
                </div>

                <div className="text-center text-xs text-gray-400 pb-4">
                    App Version 1.0.0 • Made in 🇮🇳
                </div>
            </div>

            {/* Edit Profile Modal */}
            {isEditing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl scale-100 animate-in zoom-in-95">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
                            <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={editForm.name}
                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    value={editForm.phone}
                                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    placeholder="Enter your phone number"
                                />
                            </div>
                            <Button onClick={handleUpdateProfile} className="w-full bg-black text-white hover:bg-gray-800 rounded-xl py-6 text-lg font-medium shadow-lg mt-4">
                                <Save className="w-4 h-4 mr-2" /> Save Changes
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function MenuItem({ icon: Icon, label, badge, color, bg, onClick }: any) {
    return (
        <div onClick={onClick} className="p-3 flex items-center gap-4 cursor-pointer hover:bg-gray-50 rounded-xl transition-colors group border-b border-gray-50 last:border-0">
            <div className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 font-medium text-gray-900">{label}</div>
            {badge && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{badge}</span>
            )}
            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500" />
        </div>
    )
}
