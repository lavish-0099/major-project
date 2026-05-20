import { Train, Bus, Plane, Car, Bike, Hotel } from "lucide-react";

const TRANSPORT_OPTIONS = [
    {
        icon: Train,
        color: "bg-orange-500",
        title: "Indian Railways",
        desc: "Book trains, check PNR status, live running status",
        link: "https://www.irctc.co.in",
    },
    {
        icon: Bus,
        color: "bg-green-500",
        title: "Bus Services",
        desc: "State & private buses, RedBus integration",
        link: "https://www.redbus.in",
    },
    {
        icon: Plane,
        color: "bg-teal-600",
        title: "Flights",
        desc: "Compare prices, book domestic flights",
        link: "https://www.skyscanner.co.in",
    },
    {
        icon: Car,
        color: "bg-yellow-500",
        title: "Cab & Taxi",
        desc: "Auto fare calculator, cab bookings",
        link: "https://www.olacabs.com",
    },
    {
        icon: Bike,
        color: "bg-red-500",
        title: "Bike Rentals",
        desc: "Two-wheeler rentals for local exploration",
        link: "https://www.rentrip.in",
    },
    {
        icon: Hotel,
        color: "bg-blue-500",
        title: "Hotels",
        desc: "Find and book hotels at best prices",
        link: "https://www.booking.com",
    },
];

export function TransportHub() {
    return (
        <section className="container mx-auto px-4 py-16">
            {/* Header */}
            <div className="text-center mb-12">
                <span className="bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                    Transport Hub
                </span>
                <h2 className="text-4xl font-serif font-bold text-gray-900 mt-4 mb-2">
                    Get Around India
                </h2>
                <p className="text-gray-500">
                    All your transport needs in one place — trains, buses, flights, hotels, and more
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {TRANSPORT_OPTIONS.map((opt) => (
                    <a
                        key={opt.title}
                        href={opt.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center"
                    >
                        {/* Icon */}
                        <div
                            className={`${opt.color} w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}
                        >
                            <opt.icon className="w-6 h-6" />
                        </div>

                        {/* Title */}
                        <h3 className="font-bold text-gray-900 mb-2">
                            {opt.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-gray-500 mb-4 h-10">
                            {opt.desc}
                        </p>

                        {/* CTA */}
                        <div className="flex items-center justify-center text-primary text-sm font-semibold group-hover:gap-2 transition-all">
                            Explore <span className="ml-1">→</span>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}