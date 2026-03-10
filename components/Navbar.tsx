"use client";

import Link from "next/link";
import { User, LogOut, ChevronDown, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <>
      <motion.header 
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md shadow-sm border-b border-zinc-200 dark:border-zinc-800 py-0" 
          : "bg-transparent border-transparent py-4"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className={`text-2xl font-bold tracking-tighter transition-colors ${isScrolled ? "text-zinc-900 dark:text-zinc-100" : "text-white"}`}>
          TRIP<span className="text-blue-500">NE</span>
        </Link>

        {/* Navigation Links */}
        <ul className={`hidden md:flex items-center gap-1 font-medium transition-colors ${isScrolled ? "text-zinc-600 dark:text-zinc-300" : "text-zinc-100 drop-shadow-md"}`} onMouseLeave={() => setHoveredIndex(null)}>
          {[
            { name: "Home", path: "/" },
            { name: "Destinations", path: "/destinations" },
            { name: "Packages", path: "/packages" },
            { name: "Why Choose Us", path: "/why-us" },
          ].map((link, idx) => (
            <li key={idx} className="relative px-4 py-2 cursor-pointer flex flex-col justify-end" onMouseEnter={() => setHoveredIndex(idx)}>
              <Link href={link.path} className={`relative z-10 transition-colors duration-300 pb-1 ${hoveredIndex === idx ? (isScrolled ? "text-orange-600 dark:text-orange-400" : "text-white text-shadow-sm") : ""}`}>
                {link.name}
              </Link>
              {/* Animated underline from center */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] flex justify-center">
                <motion.div
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-700 dark:from-orange-400 dark:to-amber-600 rounded-full"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ 
                    width: hoveredIndex === idx ? "100%" : "0%",
                    opacity: hoveredIndex === idx ? 1 : 0 
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
            </li>
          ))}
        </ul>

        {/* Action Area (Desktop) */}
        <div className="hidden md:flex items-center gap-4 relative" ref={dropdownRef}>
          {isLoggedIn ? (
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-1 pr-3 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors border border-zinc-200 dark:border-zinc-700"
              >
                {session?.user?.image ? (
                  <Image src={session.user.image} alt="Avatar" width={32} height={32} className="rounded-full" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    <User size={16} />
                  </div>
                )}
                <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200 truncate max-w-[100px]">
                  {session?.user?.name?.split(' ')[0] || "User"}
                </span>
                <ChevronDown size={14} className={`text-zinc-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-3 w-64 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl dark:shadow-black/50 border border-zinc-100 dark:border-zinc-800 overflow-hidden"
                  >
                    <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex flex-col items-center text-center">
                       {session?.user?.image && (
                         <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-zinc-200 dark:border-zinc-700 mb-2">
                           <Image src={session.user.image} alt="Avatar" width={64} height={64} className="w-full h-full object-cover" />
                         </div>
                       )}
                       <p className="font-semibold text-zinc-900 dark:text-zinc-100">{session?.user?.name}</p>
                       <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 truncate w-full">{session?.user?.email}</p>
                    </div>
                    
                    <div className="p-2 flex flex-col gap-1">
                      <Link href="/account" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-colors">
                         <User size={16} className="text-blue-500" /> My Account
                      </Link>
                      <button 
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/20 text-sm font-medium text-red-600 dark:text-red-400 transition-colors w-full text-left"
                      >
                         <LogOut size={16} /> Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow-md shadow-blue-600/20 transition-all hover:shadow-lg hover:shadow-blue-600/30 active:scale-95"
            >
              Account
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className={`p-2 rounded-full focus:outline-none transition-colors ${isScrolled ? "text-zinc-900 dark:text-zinc-100" : "text-white"}`}
            aria-label="Open Mobile Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>
      </motion.header>

      {/* Mobile Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <span className="text-2xl font-bold tracking-tighter text-white">TRIP<span className="text-blue-500">NE</span></span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                aria-label="Close Mobile Menu"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col">
              <div className="flex flex-col gap-6 text-xl font-medium text-zinc-300">
                {[
                  { name: "Home", path: "/" },
                  { name: "Destinations", path: "/destinations" },
                  { name: "Packages", path: "/packages" },
                  { name: "Why Choose Us", path: "/why-us" },
                ].map((link, idx) => (
                  <Link 
                    key={idx} 
                    href={link.path} 
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-zinc-800">
                {isLoggedIn ? (
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                      {session?.user?.image ? (
                         <div className="w-12 h-12 rounded-full overflow-hidden border border-zinc-700">
                           <Image src={session.user.image} alt="Avatar" width={48} height={48} className="w-full h-full object-cover" />
                         </div>
                       ) : (
                         <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white">
                           <User size={24} />
                         </div>
                       )}
                       <div>
                         <p className="font-semibold text-zinc-100">{session?.user?.name}</p>
                         <p className="text-sm text-zinc-500 truncate">{session?.user?.email}</p>
                       </div>
                    </div>
                    <Link 
                      href="/account" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 text-zinc-200 transition-colors"
                    >
                      <User size={20} className="text-blue-500" /> My Account
                    </Link>
                    <button 
                      onClick={() => { setMobileMenuOpen(false); signOut({ callbackUrl: '/' }); }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-950/20 hover:bg-red-950/40 text-red-400 transition-colors text-left"
                    >
                      <LogOut size={20} /> Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center px-6 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors block"
                  >
                    Sign In / Create Account
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
