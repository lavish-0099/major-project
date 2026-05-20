import { Shirt, Footprints, Hand, Utensils, Camera, Volume2 } from "lucide-react";

export function CulturalGuide() {
    const tips = [
        {
            icon: Shirt,
            category: "Religious Sites",
            title: "Dress Modestly",
            desc: "Cover shoulders and knees when visiting temples and religious sites."
        },
        {
            icon: Footprints,
            category: "Etiquette",
            title: "Remove Shoes",
            desc: "Take off footwear before entering homes, temples, and some shops."
        },
        {
            icon: Hand,
            category: "Greeting",
            title: "Greet with Namaste",
            desc: "Join palms and say 'Namaste' — a universal respectful greeting."
        },
        {
            icon: Utensils,
            category: "Dining",
            title: "Eat with Right Hand",
            desc: "The right hand is traditionally used for eating in most regions."
        },
        {
            icon: Camera,
            category: "Photography",
            title: "Ask Before Photos",
            desc: "Always seek permission before photographing people or rituals."
        },
        {
            icon: Volume2,
            category: "Religious Sites",
            title: "Maintain Silence",
            desc: "Keep voices low in temples and during prayer ceremonies."
        }
    ];

    return (
        <section className="bg-detail py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="bg-teal-100 text-teal-700 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                        Cultural Intelligence
                    </span>
                    <h2 className="text-4xl font-serif font-bold text-gray-900 mt-4 mb-2">Travel Like a Local</h2>
                    <p className="text-gray-500">Essential customs and etiquette to enhance your Indian experience</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tips.map((tip) => (
                        <div key={tip.title} className="bg-white p-6 rounded-2xl flex gap-4 items-start border border-gray-100">
                            <div className="bg-teal-50 text-teal-700 p-3 rounded-xl">
                                <tip.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{tip.category}</span>
                                <h3 className="font-bold text-lg text-gray-900 mb-1">{tip.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{tip.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
