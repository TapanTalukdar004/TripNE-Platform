"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useEffect } from "react";
import { cloudinaryUrl } from "../../lib/cloudinaryUrl";

const destinations = [
  { name: "Mizoram", img: cloudinaryUrl("mizoram-hills-view.jpg") },
  { name: "Arunachal Pradesh", img: cloudinaryUrl("arunachal-pradesh-unseen-beauty.jpg") },
  { name: "Assam", img: cloudinaryUrl("assam-travel-destination.jpg") },
  { name: "Meghalaya", img: cloudinaryUrl("meghalaya-tourism-clouds.jpg") },
  { name: "Nagaland", img: cloudinaryUrl("nagaland-dzuko-valley.jpg") },
  { name: "Sikkim", img: cloudinaryUrl("sikkim-himalayan-destination.jpg") },
  { name: "Manipur", img: cloudinaryUrl("manipur-jewel-of-india.webp") },
  { name: "Tripura", img: cloudinaryUrl("tripura-agartala-palace.jpg") }
];

export default function DestinationsSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 600 : 320;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      if (e.shiftKey) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <section className="py-12 md:py-24 bg-white dark:bg-black overflow-hidden relative">
      {/* Animated Shape-Shifting Blob Background */}
      <div className="absolute top-[10%] left-[10%] w-[80%] h-[80%] animate-shifting-blob blur-[80px] md:blur-[120px] pointer-events-none z-0 mix-blend-multiply dark:mix-blend-screen opacity-90 dark:opacity-100" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12 flex flex-col items-center text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-2xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 md:mb-4 font-serif"
        >
          POPULAR DESTINATIONS
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2 }}
          className="text-lg text-zinc-700 dark:text-zinc-300 max-w-2xl italic font-serif"
        >
          &quot;Discover the unseen beauty and diverse cultures of Northeast India. Your next adventure awaits!&quot;
        </motion.p>
      </div>

      <div className="relative w-full">
        {/* Navigation Buttons */}
        <div className="absolute top-1/2 -translate-y-[calc(50%+24px)] left-2 sm:left-4 lg:left-8 z-20 pointer-events-none hidden md:block">
          <button 
            onClick={() => scroll('left')}
            className="pointer-events-auto p-3 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/10 shadow-xl transition-all hover:scale-110 active:scale-95"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
        </div>
        <div className="absolute top-1/2 -translate-y-[calc(50%+24px)] right-2 sm:right-4 lg:right-8 z-20 pointer-events-none hidden md:block">
          <button 
            onClick={() => scroll('right')}
            className="pointer-events-auto p-3 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/10 shadow-xl transition-all hover:scale-110 active:scale-95"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 px-4 sm:px-8 lg:px-12 hide-scrollbar w-full scroll-smooth"
        >
        {destinations.map((dest, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="snap-center shrink-0 w-[280px] sm:w-[320px] h-[400px] relative rounded-3xl overflow-hidden group shadow-lg"
          >
            <Image 
              src={dest.img} 
              alt={dest.name} 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-2xl font-bold text-white mb-2">{dest.name}</h3>
              <Link 
                href={`/destinations/${dest.name.toLowerCase().split(' ')[0]}`}
                className="opacity-0 group-hover:opacity-100 flex items-center gap-2 text-blue-400 font-medium transition-opacity duration-300"
              >
                Explore <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        ))}
        </div>
      </div>
    </section>
  );
}
