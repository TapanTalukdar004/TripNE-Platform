"use client";

import { motion } from "framer-motion";
import { cloudinaryUrl } from "../../lib/cloudinaryUrl";

export default function PackagesHero() {
  return (
    <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Fixed Attachment */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed scale-105"
        style={{ backgroundImage: `url(${cloudinaryUrl("sikkim-himalayan-destination.jpg")})` }}
      />
      
      {/* Darkened Gradient Overlay to guarantee text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-zinc-50 dark:to-zinc-950 pointer-events-none" />

      {/* Typography Box */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center flex flex-col items-center">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-orange-400 font-sans tracking-[0.3em] text-sm uppercase mb-4"
        >
          Curated For The Explorer
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-7xl font-bold text-white mb-6 font-serif tracking-tight leading-tight"
        >
          Travel <span className="italic text-zinc-300">Packages</span>
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full mb-8 relative origin-left"
        />

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg sm:text-xl text-zinc-200 max-w-2xl leading-relaxed italic"
        >
          Expertly crafted travel experiences to explore the best of Northeast India. From serene monasteries to lush tea gardens, find your perfect escape.
        </motion.p>
      </div>
    </section>
  );
}
