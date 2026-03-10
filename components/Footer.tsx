import Link from "next/link";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 py-16 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="text-3xl font-bold tracking-tighter text-white">
              TRIP<span className="text-blue-500">NE</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Wander more, spend less. Your gateway to exploring the unseen beauty of the eight jewels of Northeast India.
            </p>
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-colors duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-blue-400 hover:text-white transition-colors duration-300">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight size={14} className="text-blue-500" /> Home</Link></li>
              <li><Link href="/destinations" className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight size={14} className="text-blue-500" /> Destinations</Link></li>
              <li><Link href="/packages" className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight size={14} className="text-blue-500" /> Packages</Link></li>
              <li><Link href="/why-us" className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight size={14} className="text-blue-500" /> Why Us</Link></li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Popular States</h3>
            <ul className="grid grid-cols-2 gap-3">
              <li><Link href="/assam" className="hover:text-white transition-colors">Assam</Link></li>
              <li><Link href="/arunachal" className="hover:text-white transition-colors">Arunachal</Link></li>
              <li><Link href="/meghalaya" className="hover:text-white transition-colors">Meghalaya</Link></li>
              <li><Link href="/nagaland" className="hover:text-white transition-colors">Nagaland</Link></li>
              <li><Link href="/sikkim" className="hover:text-white transition-colors">Sikkim</Link></li>
              <li><Link href="/manipur" className="hover:text-white transition-colors">Manipur</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-blue-500 shrink-0 mt-0.5" />
                <span>Azara, Guwahati<br />Assam 781017</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-blue-500 shrink-0" />
                <span>+91 123 456 7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-blue-500 shrink-0" />
                <span>contact@tripne.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-800 text-sm text-center flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} TripNE. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
