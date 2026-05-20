"use client";

import { AllDestinationsComponent } from "@/components/landing/AllDestinations";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function DestinationListingPage() {
    return (
        <main className="bg-white">
            <Header />
            <AllDestinationsComponent />
            <Footer />
        </main>
        
    );
}
