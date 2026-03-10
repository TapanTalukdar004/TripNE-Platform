"use client";

import { notFound } from "next/navigation";
import { statesData, StateData } from "@/lib/data/states";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Leaf, Mountain, Waves, Flame, MapPin, ArrowRight } from "lucide-react";

// Helper to map string icon names to Lucide components
const IconMap: Record<string, any> = {
  Leaf,
  Mountain,
  Waves,
  Flame,
};

export default function StateDestinationPage({ params }: { params: Promise<{ state: string }> }) {
  const unwrappedParams = use(params);
  // Validate State ID
  const stateId = unwrappedParams.state.toLowerCase();
  const data: StateData | undefined = statesData[stateId];

  if (!data) {
    notFound();
  }

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white/20 pb-24">
      
      {/* 
        =========================================
        SECTION 1: CINEMATIC HERO
        =========================================
      */}
      <section className="relative h-screen w-full overflow-hidden flex items-end justify-center pb-32">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={data.heroImage}
            alt={data.name}
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />
          {/* Heavy bottom gradient to ensure text pops */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 
              className="text-7xl md:text-9xl font-black tracking-tighter uppercase font-serif"
              style={{ textShadow: `0 0 40px ${data.accentColor}40` }}
            >
              {data.name}
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-zinc-300 font-light tracking-wide">
              {data.tagline}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="w-px h-24 mx-auto mt-12 bg-gradient-to-b from-white/50 to-transparent"
          />
        </div>
      </section>

      {/* 
        =========================================
        SECTION 2: ABOUT & FAMOUS FOR GRID
        =========================================
      */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-24 space-y-24">
        
        {/* About Intro */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          <h2 className="text-3xl font-serif">Welcome to <span style={{ color: data.accentColor }}>{data.name}</span></h2>
          <p className="text-lg text-zinc-400 leading-relaxed font-light">
            {data.aboutText}
          </p>
        </motion.div>

        {/* Famous For Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.famousFor.map((item, idx) => {
            const Icon = IconMap[item.icon] || MapPin;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-zinc-900/50 backdrop-blur border border-zinc-800 p-8 rounded-2xl hover:bg-zinc-900 transition-colors group"
                style={{ '--hover-accent': data.accentColor } as React.CSSProperties}
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-6 transition-colors"
                  style={{ backgroundColor: `${data.accentColor}20`, color: data.accentColor }}
                >
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 
        =========================================
        SECTION 3: POPULAR DESTINATIONS (STAGGERED)
        =========================================
      */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-24">
        <div className="mb-20 text-center">
          <h2 className="text-4xl font-serif font-bold mb-4">Must Visit <span style={{ color: data.accentColor }}>Places</span></h2>
          <p className="text-zinc-500">The crown jewels of the {data.name} itinerary.</p>
        </div>

        <div className="space-y-32">
          {data.popularDestinations.map((dest, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
                
                {/* Image Side */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full lg:w-1/2 relative aspect-[4/3] rounded-3xl overflow-hidden group bg-zinc-900"
                >
                  <div className="absolute inset-0 bg-zinc-800 animate-pulse" />
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={idx <= 1}
                    unoptimized
                  />
                  <div className="absolute inset-0 border border-white/10 rounded-3xl z-10 pointer-events-none" />
                </motion.div>

                {/* Content Side */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="w-full lg:w-1/2 space-y-6"
                >
                  <div className="inline-flex px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase border" style={{ color: data.accentColor, borderColor: `${data.accentColor}40`, backgroundColor: `${data.accentColor}10` }}>
                    Destination 0{idx + 1}
                  </div>
                  <h3 className="text-4xl font-serif font-bold">{dest.name}</h3>
                  <p className="text-zinc-400 leading-relaxed text-lg">
                    {dest.description}
                  </p>
                  
                  <ul className="grid grid-cols-2 gap-4 pt-4">
                    {dest.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-center gap-2 text-sm text-zinc-300">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: data.accentColor }} />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </motion.div>

              </div>
            );
          })}
        </div>
      </section>

      {/* 
        =========================================
        SECTION 4: DYNAMIC PACKAGES PLACEHOLDER
        =========================================
      */}
      <section className="bg-zinc-950 py-32 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-serif font-bold">Ready to explore {data.name}?</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Browse our curated trips, or let our AI concierge build a custom itinerary matching your exact travel vision to this beautiful state.
          </p>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/packages"
              className="px-8 py-4 rounded-full font-bold text-zinc-900 transition-transform active:scale-95"
              style={{ backgroundColor: data.accentColor }}
            >
              View Tour Packages
            </Link>
            <Link 
              href="/custom-plan"
              className="px-8 py-4 rounded-full font-bold text-white border border-zinc-700 hover:bg-zinc-800 transition-all"
            >
              Get Custom Quote
            </Link>
          </div>
        </div>
      </section>

      {/* 
        =========================================
        SECTION 5: CULTURAL HERITAGE
        =========================================
      */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-32">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-8 pr-4"
          >
            <h2 className="text-4xl font-serif font-bold">The Cultural <br/><span style={{ color: data.accentColor }}>Heritage</span></h2>
            <p className="text-zinc-400 leading-relaxed text-lg">
              {data.culture.text}
            </p>
            <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
              <p className="text-sm text-zinc-500 uppercase font-bold tracking-wider mb-2">Best Time to Visit</p>
              <p className="text-white font-medium">{data.culture.bestTimeToVisit}</p>
            </div>
          </motion.div>

          {/* Dynamic 4-Image Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 grid-rows-2 gap-4 h-[600px] mt-8 lg:mt-0">
            {data.culture.images.map((img, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                className="relative rounded-3xl overflow-hidden group shadow-2xl bg-zinc-900"
              >
                <div className="absolute inset-0 bg-zinc-800 animate-pulse" />
                <Image 
                  src={img} 
                  alt={`Culture highlighting aspect ${idx + 1}`} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  unoptimized 
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </motion.div>
            ))}
          </div>
          
        </div>
      </section>

    </main>
  );
}
