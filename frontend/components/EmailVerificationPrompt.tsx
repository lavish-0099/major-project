"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function EmailVerificationPrompt() {
    const { currentUser, sendVerificationEmail, isEmailVerified } = useAuth();
    const [sending, setSending] = useState(false);
    const [message, setMessage] = useState("");

    const handleResendVerification = async () => {
        setSending(true);
        setMessage("");

        try {
            // Optional: Add a continue URL to redirect back to your app
            const continueUrl = `${window.location.origin}/profile`;
            await sendVerificationEmail(continueUrl);
            setMessage("Verification email sent! Please check your inbox.");
        } catch (error: any) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setSending(false);
        }
    };

    // Don't show if user is not logged in or email is already verified
    if (!currentUser || isEmailVerified()) {
        return null;
    }

    return (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="ml-3 flex-1">
                    <p className="text-sm text-yellow-700">
                        Please verify your email address. A verification email was sent to <strong>{currentUser.email}</strong>.
                    </p>
                    <div className="mt-2">
                        <button
                            onClick={handleResendVerification}
                            disabled={sending}
                            className="text-sm font-medium text-yellow-700 hover:text-yellow-600 underline disabled:opacity-50"
                        >
                            {sending ? "Sending..." : "Resend verification email"}
                        </button>
                    </div>
                    {message && (
                        <p className={`mt-2 text-sm ${message.startsWith("Error") ? "text-red-600" : "text-green-600"}`}>
                            {message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
