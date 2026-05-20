"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle2, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export default function VerifyEmailPage() {
    const router = useRouter();
    const { currentUser, resendVerificationEmail, reloadUser, logout } = useAuth();
    const [sending, setSending] = useState(false);
    const [checking, setChecking] = useState(false);
    const [message, setMessage] = useState("");
    const [isVerified, setIsVerified] = useState(false);

    // Redirect to home if no user
    useEffect(() => {
        if (!currentUser) {
            router.push("/auth/login");
        }
    }, [currentUser, router]);

    // Check if already verified
    useEffect(() => {
        if (currentUser?.emailVerified) {
            setIsVerified(true);
            setTimeout(() => {
                router.push("/");
            }, 2000);
        }
    }, [currentUser, router]);

    const handleResendEmail = async () => {
        setSending(true);
        setMessage("");

        try {
            const continueUrl = `${window.location.origin}/auth/verify-email`;
            await resendVerificationEmail(continueUrl);
            setMessage("Verification email sent! Please check your inbox.");
        } catch (error: any) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setSending(false);
        }
    };

    const handleCheckVerification = async () => {
        setChecking(true);
        setMessage("");

        try {
            const verified = await reloadUser();
            if (verified) {
                setIsVerified(true);
                setMessage("Email verified successfully! Redirecting...");
                setTimeout(() => {
                    router.push("/");
                }, 2000);
            } else {
                setMessage("Email not verified yet. Please check your inbox and click the verification link.");
            }
        } catch (error: any) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setChecking(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        router.push("/auth/login");
    };

    if (!currentUser) {
        return null;
    }

    if (isVerified) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-center"
                >
                    <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Verified! ✨</h1>
                    <p className="text-gray-600">Redirecting you to the app...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative flex flex-col bg-white overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md w-full text-center"
                >
                    {/* Email Icon */}
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Mail className="w-10 h-10 text-white" />
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl font-serif font-bold text-gray-900 mb-3">
                        Verify Your Email 📧
                    </h1>
                    <p className="text-gray-600 mb-8 text-lg">
                        We&apos;ve sent a verification email to:
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4 mb-8">
                        <p className="font-semibold text-gray-900">{currentUser.email}</p>
                    </div>

                    {/* Instructions */}
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8 text-left">
                        <h3 className="font-bold text-gray-900 mb-3">📋 Next Steps:</h3>
                        <ol className="space-y-2 text-sm text-gray-700">
                            <li>1. Check your email inbox (and spam folder)</li>
                            <li>2. Click the verification link in the email</li>
                            <li>3. Come back here and click &quot;I&apos;ve Verified My Email&quot;</li>
                        </ol>
                    </div>

                    {/* Message */}
                    {message && (
                        <div className={`p-3 mb-4 text-sm rounded-lg ${message.startsWith("Error")
                            ? "text-red-600 bg-red-50"
                            : "text-green-600 bg-green-50"
                            }`}>
                            {message}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="space-y-3">
                        <Button
                            onClick={handleCheckVerification}
                            disabled={checking}
                            className="w-full h-14 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white rounded-xl shadow-lg shadow-orange-500/20 text-lg font-semibold"
                        >
                            {checking ? (
                                <>
                                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                                    Checking...
                                </>
                            ) : (
                                "I&apos;ve Verified My Email"
                            )}
                        </Button>

                        <Button
                            onClick={handleResendEmail}
                            disabled={sending}
                            variant="outline"
                            className="w-full h-12 rounded-xl border-gray-200 hover:bg-gray-50"
                        >
                            {sending ? "Sending..." : "Resend Verification Email"}
                        </Button>
                    </div>

                    {/* Logout Option */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <button
                            onClick={handleLogout}
                            className="text-sm text-gray-500 hover:text-gray-700 font-medium"
                        >
                            Logout and use a different account
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
