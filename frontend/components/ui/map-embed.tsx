"use client";

interface MapEmbedProps {
    location: string;
    className?: string;
}

export function MapEmbed({ location, className = "" }: MapEmbedProps) {
    // Using Google Maps Embed API (Place mode) without an API key (using the 'q' parameter which often works for basic embedding or falls back gracefully)
    // Note: For production, a valid API Key with the Embed API enabled is recommended.
    const encodedLocation = encodeURIComponent(location);
    const mapUrl = `https://www.google.com/maps?q=${encodedLocation}&output=embed`;

    return (
        <div className={`relative w-full h-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm ${className}`}>
            <iframe
                title={`Map of ${location}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={mapUrl}
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
            />
        </div>
    );
}
