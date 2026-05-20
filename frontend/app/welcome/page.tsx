"use client";

import { useState } from "react";
import { SplashScreen } from "@/components/onboarding/SplashScreen";
import { OnboardingCarousel } from "@/components/onboarding/OnboardingCarousel";

export default function WelcomePage() {
    const [showSplash, setShowSplash] = useState(true);

    if (showSplash) {
        return <SplashScreen onComplete={() => setShowSplash(false)} />;
    }

    return <OnboardingCarousel />;
}
