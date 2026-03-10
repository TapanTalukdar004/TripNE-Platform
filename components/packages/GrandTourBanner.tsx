"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, CalendarDays } from "lucide-react";

export default function GrandTourBanner() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-[#212124] dark:bg-zinc-900 rounded-xl overflow-hidden shadow-2xl flex flex-col border border-zinc-800/80"
      >
        {/* Top Image Section - Purely Static Layout */}
        <div className="relative w-full h-[250px] sm:h-[350px]">
          <Image 
            src="/images/northeast-explorer.webp"
            alt="Northeast Explorer Grand Tour"
            fill
            className="object-cover object-[center_30%]"
            priority
          />
          {/* Top Left Badge */}
          <div className="absolute top-4 left-4 sm:top-5 sm:left-5 bg-[#4B90E3] opacity-95 text-white px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wide z-10 shadow-sm">
            Grand Tour
          </div>
        </div>

        {/* Bottom Content Section */}
        <div className="p-6 sm:p-8 flex flex-col">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F2F2F2] tracking-normal font-sans">
              Northeast Grand Explorer - All 8 States
            </h2>
            <div className="flex flex-col sm:items-end">
              <div className="text-2xl sm:text-[28px] font-bold text-[#4B90E3] tracking-tight">
                ₹3,20,000
              </div>
              <span className="text-xs text-zinc-500 mt-1 dark:text-zinc-400 font-medium">Starting from (Per Vehicle - Max 4 Pax)</span>
            </div>
          </div>

          {/* Meta Info Row */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[#9A9A9A] text-xs sm:text-[13px] mb-5 font-semibold">
            <span className="flex items-center gap-1">
              <MapPin size={14} className="text-[#4B90E3]" />
              All 8 Northeast States
            </span>
            <span className="flex items-center gap-1">
              <CalendarDays size={14} className="text-[#4B90E3]" />
              18 Days / 17 Nights
            </span>
          </div>

          {/* Details */}
          <p className="text-[#888888] text-[13px] sm:text-sm leading-[1.7] mb-7 font-sans">
            Experience the ultimate Northeast India journey spanning all eight states. From Assam&apos;s majestic Kaziranga to Meghalaya&apos;s living root bridges, Arunachal&apos;s ancient monasteries to Nagaland&apos;s vibrant tribes, Manipur&apos;s floating lake to Tripura&apos;s palaces, Mizoram&apos;s hills to Sikkim&apos;s Himalayas. This comprehensive tour combines comfortable accommodations, expert insights, and unforgettable experiences.
          </p>

          {/* Bottom Action Row */}
          <div className="border-t border-[#333335] pt-5 mt-auto">
            <Link 
              href="/packages/northeast-grand-explorer"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 dark:bg-zinc-800 dark:border-zinc-700 dark:hover:bg-zinc-700 text-white font-bold text-sm text-center transition-all active:scale-95 block"
            >
              View Full Tour Package
            </Link>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
