"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { cloudinaryUrl } from "../../lib/cloudinaryUrl";

const statesData = [
  { name: "Arunachal Pradesh", img: cloudinaryUrl("arunachal-pradesh-landscape.jpg"), tag: "Dawn-Lit Mountains" },
  { name: "Assam", img: cloudinaryUrl("assam-tea-gardens.jpg"), tag: "One-Horned Rhino & Tea" },
  { name: "Meghalaya", img: cloudinaryUrl("meghalaya-living-root-bridge.jpg"), tag: "Abode of Clouds" },
  { name: "Nagaland", img: cloudinaryUrl("nagaland-festival-tribes.webp"), tag: "Land of Festivals" },
  { name: "Sikkim", img: cloudinaryUrl("sikkim-monastery-kanchenjunga.jpg"), tag: "Himalayan Wonderland" },
  { name: "Tripura", img: cloudinaryUrl("tripura-ujjayanta-palace.jpg"), tag: "Rich History" },
  { name: "Mizoram", img: cloudinaryUrl("mizoram-rolling-hills.webp"), tag: "Land of Highlanders" },
  { name: "Manipur", img: cloudinaryUrl("manipur-loktak-lake.jpg"), tag: "The Jeweled Land" }
];

export default function StatesGrid() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % statesData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-zinc-50 dark:bg-zinc-950 overflow-hidden rounded-3xl my-6 lg:my-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Left Side: Text */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-4 md:space-y-6"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-zinc-900 dark:text-zinc-100">
            Explore the Eight Jewels:<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
              Seven Sisters & One Brother
            </span>
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl">
            Discover the unique charm of Northeast India, a region encompassing eight distinct states. Often called the &quot;Seven Sisters&quot; along with their &quot;brother&quot; state Sikkim, each offers a vibrant tapestry of culture, breathtaking landscapes, and unforgettable adventures.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 text-zinc-800 dark:text-zinc-200">
            {statesData.map((state, i) => (
              <li key={i} className="flex flex-col border-l-2 border-blue-500 pl-4">
                <strong className="text-lg">{state.name}</strong>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">{state.tag}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right Side: Cross-fade Image */}
        <div className="relative h-[600px] w-full hidden sm:block rounded-3xl overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image 
                src={statesData[currentIndex].img} 
                alt={statesData[currentIndex].name} 
                fill 
                className="object-cover" 
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2 font-serif">{statesData[currentIndex].name}</h3>
                  <p className="text-lg text-zinc-200">{statesData[currentIndex].tag}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
