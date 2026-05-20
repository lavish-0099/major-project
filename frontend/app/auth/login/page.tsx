"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

export default function LoginPage() {
    const router = useRouter();
    const { login, googleLogin } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const form = e.target as HTMLFormElement;
            const email = (form.elements[0] as HTMLInputElement).value;
            const password = (form.elements[1] as HTMLInputElement).value;
            await login(email, password);
            router.push("/");
        } catch (err: any) {
            const errorMessage = err.message || "Failed to login";

            // Check if it's an email verification error
            if (errorMessage.includes("verify your email")) {
                setError(errorMessage + " Click below to resend the verification email.");
            } else {
                setError("Failed to login: " + errorMessage);
            }
            setIsLoading(false);
        }
    };

    const handleResendVerification = () => {
        router.push("/auth/verify-email");
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
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

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
                    <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Welcome Back <span className="text-3xl">🙏</span></h1>
                    <p className="text-gray-500 font-medium">Log in to continue your journey.</p>
                </motion.div>


                {error && (
                    <div className="p-3 mb-4 text-sm text-red-500 bg-red-50 rounded-lg">
                        {error}
                        {error.includes("verify your email") && (
                            <button
                                onClick={handleResendVerification}
                                className="block mt-2 text-sm font-semibold text-orange-600 hover:underline"
                            >
                                → Go to verification page
                            </button>
                        )}
                    </div>
                )}


                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-6 flex-1">
                    <div className="space-y-4">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Email Address</label>
                                <Input type="email" placeholder="john@example.com" className="font-medium" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Password</label>
                                <Input type="password" placeholder="••••••••" className="font-medium" />
                            </div>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-14 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white rounded-xl shadow-lg shadow-orange-500/20 text-lg font-semibold"
                        disabled={isLoading}
                    >
                        {isLoading ? "Verifying..." : "Continue"}
                    </Button>

                    <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-dashed border-gray-300"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-400 font-bold tracking-widest">Or login with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button type="button" onClick={handleGoogleLogin} variant="outline" className="h-12 rounded-xl border-gray-200 hover:bg-gray-50 hover:text-black hover:border-gray-300">


                            <Image src="https://www.svgrepo.com/show/475656/google-color.svg" width={20} height={20} className="mr-2" alt="Google" />
                            Google
                        </Button>
                        <Button type="button" variant="outline" className="h-12 rounded-xl border-gray-200 hover:bg-gray-50 hover:text-black hover:border-gray-300">
                            <Image src="https://www.svgrepo.com/show/512317/github-142.svg" width={20} height={20} className="mr-2" alt="Apple" />
                            Apple
                        </Button>
                    </div>
                </form>
            </div>

            {/* Footer */}
            <div className="p-6 text-center">
                <button
                    onClick={() => router.push("/")}
                    className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                >
                    Skip login for now
                </button>
                <div className="mt-6">
                    <p className="text-sm text-gray-500 font-medium">
                        Don&apos;t have an account?{" "}
                        <button
                            onClick={() => router.push("/auth/signup")}
                            className="text-orange-600 font-bold hover:underline"
                        >
                            Sign Up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
