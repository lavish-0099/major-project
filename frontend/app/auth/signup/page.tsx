"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, User, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

export default function SignupPage() {
    const router = useRouter();
    const { signup, googleLogin } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const form = e.target as HTMLFormElement;
        const name = (form.elements[0] as HTMLInputElement).value;
        const email = (form.elements[1] as HTMLInputElement).value;
        // For this demo, we'll ask for password as well or set a default one, 
        // but typically you'd add a password field.
        // Let's add password field to the UI actually.
        const password = (form.elements[2] as HTMLInputElement).value;

        try {
            await signup(email, password, name);
            router.push("/auth/verify-email");
        } catch (err: any) {
            setError("Failed to create account: " + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await googleLogin();
            router.push("/");
        } catch (err: any) {
            console.error("Google login error:", err);
            setError("Google login failed: " + (err.message || err));
        }
    }

    return (
        <div className="min-h-screen relative flex flex-col bg-white overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            {/* Header */}
            <div className="px-6 pt-8 pb-4">
                <button
                    onClick={() => router.back()}
                    className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-800" />
                </button>
            </div>

            <div className="flex-1 flex flex-col px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Create Account <span className="text-3xl">✨</span></h1>
                    <p className="text-gray-500 font-medium">Join Yatra to plan your dream trips.</p>
                </motion.div>

                {error && <div className="p-3 mb-4 text-sm text-red-500 bg-red-50 rounded-lg">{error}</div>}

                {/* Form */}
                <form onSubmit={handleSignup} className="space-y-6 flex-1">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input type="text" required placeholder="John Doe" className="pl-12 font-medium" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input type="email" required placeholder="john@example.com" className="pl-12 font-medium" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Password</label>
                            <div className="relative">
                                <Input type="password" required placeholder="••••••••" className="pl-4 font-medium" />
                            </div>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-14 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white rounded-xl shadow-lg shadow-orange-500/20 text-lg font-semibold"
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating Account..." : "Sign Up"}
                    </Button>

                    <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-dashed border-gray-300"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-400 font-bold tracking-widest">Or sign up with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <Button type="button" onClick={handleGoogleLogin} variant="outline" className="h-12 rounded-xl border-gray-200 hover:bg-gray-50 hover:text-black hover:border-gray-300">


                            <Image src="https://www.svgrepo.com/show/475656/google-color.svg" width={20} height={20} className="mr-2" alt="Google" />
                            Google
                        </Button>
                    </div>


                    <div className="text-center pb-8">
                        <p className="text-sm text-gray-500 font-medium">
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={() => router.push("/auth/login")}
                                className="text-orange-600 font-bold hover:underline"
                            >
                                Log In
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
