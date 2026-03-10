"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Users, Hotel, MapPin, Route } from "lucide-react";

const features = [
  {
    title: "Genuine Local Support",
    desc: "Connect with local communities and guides for authentic experiences and support.",
    icon: Users,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30"
  },
  {
    title: "Best Hotels & Lodges",
    desc: "Access curated recommendations for comfortable stays, from luxury resorts to cozy homestays.",
    icon: Hotel,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30"
  },
  {
    title: "Explore Unknown Locations",
    desc: "Venture beyond the typical tourist spots to uncover hidden waterfalls, villages, and viewpoints.",
    icon: MapPin,
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/30"
  },
  {
    title: "Tailored Itineraries",
    desc: "Get personalized travel plans designed around your interests, budget, and travel style.",
    icon: Route,
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-950/30"
  }
];

export default function AboutGuide() {
  return (
    <section className="py-24 bg-white dark:bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side: Features */}
          <div className="w-full lg:w-1/2 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 leading-tight">
                Discover Northeast India with our <span className="text-blue-600">Guide</span>
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg">
                We provide end-to-end support to ensure your journey through the eight jewels is seamless, safe, and utterly unforgettable.
              </p>
            </motion.div>

            <div className="space-y-8">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-6 group"
                  >
                    <div className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center ${feature.bg} ${feature.color} transition-transform group-hover:scale-110 duration-300`}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{feature.title}</h4>
                      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{feature.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Image with Parallax floating elements */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative h-[600px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <Image 
              src="/images/northeast-india-tour-guide.jpg" 
              alt="Northeast India Tour Guide" 
              fill 
              className="object-cover" 
            />
            
            {/* Overlay Gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent" />
            
            {/* Floating badge */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-8 right-8 bg-white/90 dark:bg-black/80 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-[200px]"
            >
              <div className="flex -space-x-3 mb-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-zinc-800 bg-zinc-200 overflow-hidden relative">
                    <Image src={`/images/northeast-tour-highlight-${i}.jpg`} alt={`Traveler ${i}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">10k+ Happy<br/>Travelers</p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
