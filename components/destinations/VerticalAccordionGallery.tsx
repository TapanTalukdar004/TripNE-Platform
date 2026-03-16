"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { PlayCircle } from "lucide-react";
import { cloudinaryUrl } from "../../lib/cloudinaryUrl";

const destinationsData = [
  {
    id: "arunachal",
    name: "Arunachal Pradesh",
    subtitle: "The Land of Dawn-Lit Mountains",
    youtubeId: "xq7WEDyJw0Q",
    imgUrl: cloudinaryUrl("arunachal-pradesh-landscape.jpg"),
  },
  {
    id: "assam",
    name: "Assam",
    subtitle: "The Land of Red River and Blue Hills",
    youtubeId: "faFLYg2wnxA",
    imgUrl: cloudinaryUrl("assam-tea-gardens.jpg"),
  },
  {
    id: "meghalaya",
    name: "Meghalaya",
    subtitle: "The Abode of Clouds",
    youtubeId: "vNz8CGrd8aQ",
    imgUrl: cloudinaryUrl("yngksiar-waterfalls-meghalaya-india.jpg"),
  },
  {
    id: "nagaland",
    name: "Nagaland",
    subtitle: "The Land of Festivals",
    youtubeId: "mZ43EhC_Lfk",
    imgUrl: cloudinaryUrl("nagaland-festival-tribes.webp"),
  },
  {
    id: "sikkim",
    name: "Sikkim",
    subtitle: "The Himalayan Wonderland",
    youtubeId: "xYiEi1-Ftb4",
    imgUrl: cloudinaryUrl("sikkim-monastery-kanchenjunga.jpg"),
  },
  {
    id: "tripura",
    name: "Tripura",
    subtitle: "The Pearl of the East",
    youtubeId: "e0AK_54eFRc",
    start: 67,
    end: 175,
    imgUrl: cloudinaryUrl("tripura-ujjayanta-palace.jpg"),
  },
  {
    id: "mizoram",
    name: "Mizoram",
    subtitle: "The Land of Highlanders",
    youtubeId: "ui_Vft118Yk",
    start: 124,
    end: 195,
    imgUrl: cloudinaryUrl("mizoram-rolling-hills.webp"),
  },
  {
    id: "manipur",
    name: "Manipur",
    subtitle: "The Jeweled Land",
    youtubeId: "-WsD_Oy-ShI",
    imgUrl: cloudinaryUrl("manipur-loktak-lake.jpg"),
  }
];

export default function VerticalAccordionGallery() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [loadedVideos, setLoadedVideos] = useState<Set<string>>(new Set());
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const handleMouseEnter = (id: string) => {
    setHoveredId(id);
    const video = videoRefs.current[id];
    if (video) {
        video.currentTime = 0;
        video.play().catch(e => console.debug("Video play error", e));
    }
  };

  const handleMouseLeave = () => {
    if (hoveredId) {
        const video = videoRefs.current[hoveredId];
        if (video) video.pause();
    }
    setHoveredId(null);
  };

  const handleVideoLoad = (id: string) => {
    setTimeout(() => {
      setLoadedVideos(prev => new Set(prev).add(id));
    }, 600); // Slight delay to ensure buffering starts
  };

  const handleClick = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      const el = e.currentTarget;
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }, 50);
    }
    setHoveredId(hoveredId === id ? null : id);
  };

  return (
    <section className="w-full bg-[#EFEFE8] dark:bg-zinc-950 pt-0 pb-16 relative overflow-hidden transition-colors duration-1000 flex flex-col items-center justify-start">
      

      
      <div 
        className="max-w-[1600px] mx-auto px-2 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center"
        onMouseLeave={handleMouseLeave}
      >
        
        <div className="mt-0 lg:mt-4 mb-4 text-center min-h-[240px] flex flex-col items-center justify-end w-full relative">
          <AnimatePresence mode="wait">
            {hoveredId ? (
              <motion.div
                key={hoveredId}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15, transition: { duration: 0.2 } }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col items-center"
              >
                <p className="text-zinc-500 dark:text-zinc-400 font-sans text-xs sm:text-sm tracking-[0.2em] uppercase mb-2">
                  Explore Destinations
                </p>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif text-zinc-900 dark:text-white tracking-tight leading-none mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
                  {destinationsData.find(d => d.id === hoveredId)?.name}
                </h3>
                <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-300 font-sans italic mb-4">
                  {destinationsData.find(d => d.id === hoveredId)?.subtitle}
                </p>
                <Link href={`/destinations/${hoveredId}`}>
                  <motion.button
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-zinc-700 hover:border-zinc-400 text-zinc-300 hover:text-white transition-all bg-transparent backdrop-blur-sm group"
                  >
                    <span className="text-sm font-semibold tracking-wide">Explore {destinationsData.find(d => d.id === hoveredId)?.name}</span>
                    <PlayCircle size={16} className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="default-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-end h-full mb-4 px-4"
              >
                <h2 className="text-4xl md:text-6xl font-serif text-zinc-800 dark:text-zinc-200 tracking-tight italic" style={{ fontFamily: "Playfair Display, serif" }}>
                  Featured Work
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 mt-4 max-w-2xl mx-auto text-sm md:text-base font-light leading-relaxed">
                  Experience the Eight Jewels of NE India through cinematic journeys. High-fidelity visuals streamed globally with zero lag.
                </p>
                <p className="text-blue-500 mt-6 tracking-widest text-xs sm:text-sm uppercase font-bold animate-pulse">
                  Hover to preview cinematic
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-row w-full h-[60vh] md:h-[50vh] min-h-[400px] max-h-[600px] gap-2 md:gap-3 items-center justify-start md:justify-center group/container mt-4 sm:mt-16 overflow-x-auto md:overflow-hidden snap-x snap-mandatory hide-scrollbar px-4 md:px-0">
          {destinationsData.map((dest, index) => {
            const isHovered = hoveredId === dest.id;
            const isLoaded = loadedVideos.has(dest.id);
            const isAnythingHovered = hoveredId !== null;
            const yOffset = isHovered ? 0 : (index % 2 === 0 ? -16 : 16);
            const scaleYSize = isHovered ? 1 : (index % 2 === 0 ? 0.95 : 0.9);

            return (
              <motion.div
                key={dest.id}
                onMouseEnter={() => handleMouseEnter(dest.id)}
                onClick={(e) => handleClick(dest.id, e)}
                animate={{
                  y: yOffset,
                  scaleY: scaleYSize
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`relative overflow-hidden cursor-pointer group h-full bg-zinc-200 dark:bg-zinc-900 shadow-xl rounded-2xl md:rounded-none shrink-0 snap-center transition-all duration-700 ${
                  isHovered 
                    ? "w-[75vw] md:w-auto md:flex-[8_1_0%]" 
                    : isAnythingHovered 
                      ? "w-[15vw] md:w-auto md:flex-[1_1_0%]" 
                      : "w-[25vw] md:w-auto md:flex-[2_1_0%]"
                }`}
                style={{ minHeight: "60px" }}
              >
                {/* Image Overlay */}
                <div className={`absolute inset-0 w-full h-full transition-all duration-1000 z-0 ${
                  isHovered && (isLoaded || !dest.youtubeId) 
                    ? ((dest as any).isShorts ? 'opacity-60 blur-xl scale-110' : 'opacity-0') 
                    : 'opacity-100'
                }`}>
                    <Image
                      src={dest.imgUrl}
                      alt={dest.name}
                      fill
                      className="object-cover opacity-75 grayscale-[100%] contrast-[130%] sepia-[30%] brightness-[1.1] blur-[0.5px] mix-blend-multiply dark:mix-blend-lighten pointer-events-none scale-[1.02]"
                    />
                </div>

                {/* Media Layer (YouTube or Local) */}
                {isHovered && (
                  <div className={`absolute inset-0 w-full h-full z-10 transition-opacity duration-1000 ${isLoaded || !dest.youtubeId ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <iframe
                          src={`https://www.youtube.com/embed/${dest.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${dest.youtubeId}&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1${(dest as any).start ? `&start=${(dest as any).start}` : ''}${(dest as any).end ? `&end=${(dest as any).end}` : ''}`}
                          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none ${(dest as any).isShorts ? 'h-full aspect-[9/16] w-auto shadow-2xl' : 'w-[300%] h-[120%]'}`}
                          allow="autoplay; encrypted-media"
                          onLoad={() => handleVideoLoad(dest.id)}
                        />
                    </div>
                  </div>
                )}
                
                <div 
                  className={`absolute inset-0 bg-[#D3D0C5]/20 dark:bg-zinc-900/40 mix-blend-overlay pointer-events-none transition-opacity duration-1000 z-20 ${
                    isHovered ? 'opacity-0' : 'opacity-100'
                  }`}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

