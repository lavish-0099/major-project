import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail, Heart } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="bg-primary text-white p-1 rounded-md">
                                <span className="font-bold text-xl px-1">Y</span>
                            </div>
                            <span className="text-xl font-bold text-white">
                                Yatra<span className="text-orange-500">India</span>
                            </span>
                        </div>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Your trusted companion for exploring the incredible diversity of India. From the Himalayas to the Indian Ocean, we guide you every step of the way.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="hover:text-primary transition-colors">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Explore */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Explore</h3>
                        <ul className="space-y-4">
                            {["Destinations", "Trip Planner", "Transport", "Experiences", "Community"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="hover:text-primary transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Resources</h3>
                        <ul className="space-y-4">
                            {["Safety Tips", "Cultural Guide", "Phrasebook", "Festival Calendar", "Help Center"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="hover:text-primary transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Contact</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-primary mt-1" />
                                <span>help@yatraindia.com</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-primary mt-1" />
                                <span>1800-XXX-XXXX</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-primary mt-1" />
                                <span>New Delhi, India</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                    <p>© 2024 YatraIndia. Made with <Heart className="w-4 h-4 text-red-500 inline mx-1 fill-red-500" /> in India</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                        <Link href="#" className="hover:text-white transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
