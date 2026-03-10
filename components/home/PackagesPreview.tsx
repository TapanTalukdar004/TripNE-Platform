"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Map } from "lucide-react";

const packages = [
  {
    title: "Meghalaya Adventure Explorer",
    state: "Meghalaya",
    duration: "6 Day Tour",
    price: "₹29,999",
    img: "/images/meghalaya-dawki-river.jpg",
    desc: "Explore the magical land of clouds. Trek to living root bridges, swim in crystal clear rivers, experience Khasi culture.",
    link: "/meghalaya"
  },
  {
    title: "Assam Wildlife Safari",
    state: "Assam",
    duration: "5 Day Tour",
    price: "₹22,999",
    img: "/images/assam-kaziranga-rhino.jpg",
    desc: "Experience rich wildlife, focusing on the one-horned rhino at Kaziranga and the unique cultural heritage of Majuli Island.",
    link: "/tours/assam-wildlife"
  },
  {
    title: "Arunachal Cultural Discovery",
    state: "Arunachal Pradesh",
    duration: "8 Day Tour",
    price: "₹34,999",
    img: "/images/arunachal-cultural-tour.jpg",
    desc: "Discover unexplored Arunachal Pradesh with visits to ancient monasteries, tribal villages, and stunning mountain landscapes.",
    link: "/tours/arunachal-discovery"
  }
];

export default function PackagesPreview() {
  return (
    <section 
      className="py-12 md:py-24 relative"
      style={{
        backgroundImage: "url('/images/sikkim-himalayan-destination.jpg')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm z-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-16 gap-4 md:gap-6">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 md:mb-4"
            >
              POPULAR PACKAGES
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-zinc-500 italic font-serif"
            >
              &quot;Embark on curated journeys through the heart of Northeast India - experiences crafted for memories that last a lifetime.&quot;
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link 
              href="/packages"
              className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-500 transition-colors"
            >
              View All Packages <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-xl shadow-zinc-200/50 dark:shadow-none border border-zinc-100 dark:border-zinc-800 group group-hover:shadow-2xl transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src={pkg.img} 
                  alt={pkg.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  {pkg.duration}
                </div>
                <div className="absolute top-4 left-4 bg-blue-600 px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1">
                  <Map size={12} /> {pkg.state}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-锌-100 mb-3 group-hover:text-blue-600 transition-colors">
                  {pkg.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6 line-clamp-3">
                  {pkg.desc}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="font-bold text-lg text-zinc-900 dark:text-white">
                    {pkg.price} <span className="text-xs text-zinc-500 font-normal">/ person</span>
                  </div>
                  <Link 
                    href={pkg.link}
                    className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-colors"
                  >
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
            <Link 
              href="/packages"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-500 transition-colors"
            >
              View All Packages <ArrowRight size={18} />
            </Link>
        </div>
      </div>
    </section>
  );
}
