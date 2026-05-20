"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function JoinTripPage() {
    const params = useParams();
    const token = params.token as string;
    const router = useRouter();
    const { currentUser, login } = useAuth(); // Assuming useAuth exposes login
    const [status, setStatus] = useState<"loading" | "error" | "success">("loading");
    const [message, setMessage] = useState("Joining trip...");

    useEffect(() => {
        if (!token) {
            setStatus("error");
            setMessage("Invalid invite link.");
            return;
        }

        const joinTrip = async () => {
            if (!currentUser) {
                // If not logged in, we should ideally redirect to login with a state/returnURL
                // For now, we will show a message
                setStatus("error");
                setMessage("Please log in to join this trip.");
                return;
            }

            try {
                const res = await fetch("/api/trips/join", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token, userId: currentUser.uid })
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Failed to join trip");
                }

                setStatus("success");
                setMessage("Successfully joined! Redirecting...");

                // Redirect to trip details
                setTimeout(() => {
                    router.push(`/trips/${data.tripId}`);
                }, 1500);

            } catch (error: any) {
                console.error("Join error:", error);
                setStatus("error");
                setMessage(error.message);
            }
        };

        // Delay slightly to ensure auth state is settled
        const timer = setTimeout(() => {
            joinTrip();
        }, 1000);

        return () => clearTimeout(timer);

    }, [token, currentUser, router]);

    if (!currentUser) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                    <h1 className="text-2xl font-bold mb-4">Join Trip</h1>
                    <p className="text-gray-600 mb-6">You need to be logged in to join this trip.</p>
                    <Button onClick={() => router.push(`/auth/login?redirect=/join/${token}`)} className="w-full">
                        Global Login
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                {status === "loading" && (
                    <div className="flex flex-col items-center">
                        <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mb-4" />
                        <h2 className="text-xl font-semibold">Joining Trip...</h2>
                        <p className="text-gray-500 mt-2">Please wait while we add you to the group.</p>
                    </div>
                )}

                {status === "success" && (
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600 text-2xl">
                            ✓
                        </div>
                        <h2 className="text-xl font-semibold text-green-700">Success!</h2>
                        <p className="text-gray-500 mt-2">{message}</p>
                    </div>
                )}

                {status === "error" && (
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-600 text-2xl">
                            !
                        </div>
                        <h2 className="text-xl font-semibold text-red-700">Error</h2>
                        <p className="text-gray-500 mt-2 mb-6">{message}</p>
                        <Button variant="outline" onClick={() => router.push("/trips")}>
                            Go to My Trips
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
