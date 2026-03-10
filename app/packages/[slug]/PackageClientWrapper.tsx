"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Clock, MapPin, CalendarDays, CheckCircle, BedDouble, Camera, CheckCircle2, XCircle, Star, Info } from "lucide-react";
import { TourPackage } from "@/lib/data/packages";
import DynamicPricingCard from "@/components/packages/DynamicPricingCard";

export default function PackageClientWrapper({ pkg }: { pkg: TourPackage }) {
  const [activeTab, setActiveTab] = useState<"overview" | "itinerary" | "accommodation" | "gallery">("overview");

  const TABS = [
    { id: "overview", label: "Overview", icon: MapPin },
    { id: "itinerary", label: "Itinerary", icon: CalendarDays },
    { id: "accommodation", label: "Accommodation", icon: BedDouble },
    { id: "gallery", label: "Gallery", icon: Camera },
  ];

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      
      {/* Cinematic Hero */}
      <section className="relative w-full h-[60vh] sm:h-[75vh] flex items-end">
        <div className="absolute inset-0">
          <Image 
            src={pkg.imgUrl} 
            alt={pkg.title} 
            fill 
            className="object-cover"
            priority
          />
          {/* Heavy bottom gradient fading to #0a0a0a */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
        </div>
        
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest text-green-400 border border-green-400/30 rounded-full bg-green-400/10">
                {pkg.state}
              </span>
              <span className="flex items-center gap-1.5 text-sm font-medium text-zinc-300">
                <Clock size={16} className="text-blue-400" />
                {pkg.duration}
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-serif text-white tracking-tight leading-tight max-w-4xl">
              {pkg.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start relative">
          
          {/* Left Column: Details & Tabs */}
          <div className="w-full lg:w-2/3">
            
            {/* Elegant Tab Navigation */}
            <div className="flex overflow-x-auto hide-scrollbar gap-2 sm:gap-4 mb-10 pb-2 border-b border-zinc-900">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`relative px-4 py-3 rounded-xl flex items-center gap-2 text-sm sm:text-base font-semibold transition-colors whitespace-nowrap ${
                      isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50"
                    }`}
                  >
                    <Icon size={18} className={isActive ? "text-orange-400" : ""} />
                    {tab.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeTabPill"
                        className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tab Content Display */}
            <div className="min-h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  
                  {activeTab === "overview" && (
                    <div className="space-y-12 pb-8">
                      {/* 1. Main Overview Paragraph */}
                      <p className="text-zinc-300 text-lg sm:text-xl leading-relaxed font-light">
                        {pkg.overview}
                      </p>

                      {/* 2. Tour Highlights Grid */}
                      <div className="space-y-4">
                        <h4 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
                          <Star className="text-orange-400" size={24} /> Tour Highlights
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {pkg.highlights.map((highlight, idx) => (
                            <div key={idx} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 flex items-start gap-3 hover:bg-zinc-900 transition-colors group">
                              <div className="w-8 h-8 rounded-full bg-orange-500/10 flex flex-shrink-0 items-center justify-center border border-orange-500/20 group-hover:bg-orange-500/20 transition-colors">
                                <Star size={14} className="text-orange-400" />
                              </div>
                              <p className="text-sm sm:text-base text-zinc-300 pt-1 leading-snug">{highlight}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 3. Included vs Excluded */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Includes */}
                        <div className="space-y-4">
                           <h4 className="text-xl font-bold text-white mb-4">What's Included</h4>
                           <ul className="space-y-3">
                             {pkg.includes.map((item, idx) => (
                               <li key={idx} className="flex items-start gap-3 text-zinc-300 text-sm sm:text-base">
                                 <CheckCircle2 className="text-green-500 flex-shrink-0 mt-0.5" size={18} />
                                 <span>{item}</span>
                               </li>
                             ))}
                           </ul>
                        </div>
                        {/* Excludes */}
                        <div className="space-y-4">
                           <h4 className="text-xl font-bold text-white mb-4">What's Excluded</h4>
                           <ul className="space-y-3">
                             {pkg.excludes.map((item, idx) => (
                               <li key={idx} className="flex items-start gap-3 text-zinc-400 text-sm sm:text-base">
                                 <XCircle className="text-red-400/80 flex-shrink-0 mt-0.5" size={18} />
                                 <span>{item}</span>
                               </li>
                             ))}
                           </ul>
                        </div>
                      </div>

                      {/* 4. Travel Information (Glass Card) */}
                      <div className="bg-gradient-to-br from-blue-900/20 to-zinc-900/50 border border-blue-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                           <Info size={120} />
                         </div>
                         <h4 className="text-white font-bold text-xl mb-4 flex items-center gap-2 relative z-10">
                           <Info className="text-blue-400" size={24}/> Essential Travel Information
                         </h4>
                         <p className="text-zinc-300 text-sm sm:text-base leading-relaxed relative z-10">
                           {pkg.travelInformation}
                         </p>
                      </div>

                    </div>
                  )}

                  {activeTab === "itinerary" && (
                    <div className="space-y-4">
                      {pkg.itinerary.map((day) => (
                        <div key={day.day} className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 sm:p-6 group hover:bg-zinc-900/80 transition-colors">
                          <div className="flex flex-col sm:flex-row gap-4 sm:items-start">
                            <div className="flex-shrink-0 pt-1">
                              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 font-bold font-serif">
                                D{day.day}
                              </span>
                            </div>
                            <div>
                              <h4 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                                {day.title}
                              </h4>
                              <ul className="space-y-2">
                                {day.activities.map((act, i) => (
                                  <li key={i} className="flex items-start gap-2 text-zinc-400 text-sm">
                                    <CheckCircle size={14} className="text-green-500/70 shrink-0 mt-0.5" />
                                    <span>{act}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "accommodation" && (
                    <div className="space-y-4">
                       <p className="text-zinc-400 mb-6">Experience the finest carefully vetted stays throughout your journey.</p>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {pkg.accommodations.map((acc, i) => (
                          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm flex flex-col items-start gap-3">
                            <BedDouble size={24} className="text-blue-400 mb-2" />
                            <div>
                              <h4 className="text-white font-bold text-lg leading-tight">{acc.name}</h4>
                              <p className="text-zinc-400 text-sm">{acc.type}</p>
                            </div>
                            <span className="mt-auto inline-block px-3 py-1 bg-zinc-800 rounded-md text-xs font-semibold text-zinc-300">
                              {acc.nightCount} {acc.nightCount === 1 ? 'Night' : 'Nights'}
                            </span>
                          </div>
                        ))}
                       </div>
                    </div>
                  )}

                  {activeTab === "gallery" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {pkg.gallery.map((img, i) => (
                        <div key={i} className="relative h-64 rounded-2xl overflow-hidden border border-white/10">
                          <Image src={img} alt={`Gallery ${i}`} fill className="object-cover hover:scale-105 transition-transform duration-700" />
                        </div>
                      ))}
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* Right Column: Pricing Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-28">
              <DynamicPricingCard 
                pricingOptions={pkg.pricingOptions} 
                packageId={pkg.id} 
              />
            </div>
          </div>

        </div>
      </section>
      
    </div>
  );
}
