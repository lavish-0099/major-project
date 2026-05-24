"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail, Heart } from "lucide-react";

// Structured Link Arrays for better mapping and routing
const EXPLORE_LINKS = [
  { label: "Destinations", href: "/destination" },
  { label: "Trip Planner", href: "/plan-trip" },
  { label: "Transport", href: "/transport" },
  { label: "Experiences", href: "/explore" },
  { label: "Community", href: "/join" }
];

const RESOURCE_LINKS = [
  { label: "Safety Tips", href: "/safety" },
  { label: "Cultural Guide", href: "/cultural-guide" },
  { label: "Phrasebook", href: "/phrasebook" },
  { label: "Festival Calendar", href: "/festivals" },
  { label: "Help Center", href: "/help" }
];

const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Sitemap", href: "/sitemap" }
];

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 relative z-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-orange-600 text-white p-1 rounded-md">
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
              {[
                { Icon: Facebook, url: "https://facebook.com" },
                { Icon: Twitter, url: "https://twitter.com" },
                { Icon: Instagram, url: "https://instagram.com" },
                { Icon: Youtube, url: "https://youtube.com" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-orange-500 transition-colors"
                >
                  <social.Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Explore Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Explore</h3>
            <ul className="space-y-4">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-orange-500 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Resources</h3>
            <ul className="space-y-4">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-orange-500 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Details */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-orange-500 mt-1" />
                <a href="mailto:help@yatraindia.com" className="hover:underline">
                  help@yatraindia.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-orange-500 mt-1" />
                <span>1800-XXX-XXXX</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 mt-1" />
                <Link href="/map" className="hover:underline">
                  New Delhi, India
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2026 YatraIndia. Made with <Heart className="w-4 h-4 text-red-500 inline mx-1 fill-red-500" /> in India</p>
          <div className="flex gap-6">
            {LEGAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}