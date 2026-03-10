"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-[center_top] bg-no-repeat"
        style={{ backgroundImage: "url('/images/mylong.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto flex flex-col items-center mt-12 md:mt-20">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-xs sm:text-sm md:text-base text-zinc-300 font-medium tracking-[0.3em] uppercase mb-4 font-sans"
        >
          Welcome to the Unexplored
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
          className="text-5xl sm:text-6xl md:text-8xl font-playfair font-black text-white leading-tight mb-6 md:mb-8 drop-shadow-2xl"
        >
          Discover <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Northeast</span> India
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-xl sm:text-2xl md:text-3xl text-zinc-200 font-medium mb-10 flex flex-col sm:flex-row items-center gap-2 sm:gap-4"
        >
          <span>WANDER <span className="text-yellow-400">MORE</span></span>
          <span className="hidden sm:inline text-zinc-400">•</span>
          <span>SPEND <span className="text-blue-400">LESS</span></span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link 
            href="/packages"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white transition-all duration-300 bg-blue-600 rounded-full hover:bg-blue-500 hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] overflow-hidden"
          >
            <span className="relative flex items-center gap-2">
              EXPLORE PACKAGES
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70"
      >
        <span className="text-xs uppercase tracking-widest font-semibold">Scroll to discover</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  );
}
