"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { PlayCircle } from "lucide-react";

const destinationsData = [
  {
    id: "arunachal",
    name: "Arunachal Pradesh",
    subtitle: "The Land of Dawn-Lit Mountains",
    videoUrl: "/videos/destinations/arunachal_pradesh.mp4",
    imgUrl: "/images/arunachal-pradesh-landscape.jpg",
  },
  {
    id: "assam",
    name: "Assam",
    subtitle: "The Land of Red River and Blue Hills",
    videoUrl: "/videos/destinations/assam.mp4",
    imgUrl: "/images/assam-tea-gardens.jpg",
  },
  {
    id: "meghalaya",
    name: "Meghalaya",
    subtitle: "The Abode of Clouds",
    videoUrl: "/videos/destinations/meghalaya.mp4",
    imgUrl: "/images/yngksiar-waterfalls-meghalaya-india.jpg",
  },
  {
    id: "nagaland",
    name: "Nagaland",
    subtitle: "The Land of Festivals",
    videoUrl: "/videos/destinations/nagaland.mp4",
    imgUrl: "/images/nagaland-festival-tribes.webp",
  },
  {
    id: "sikkim",
    name: "Sikkim",
    subtitle: "The Himalayan Wonderland",
    videoUrl: "/videos/destinations/sikkim.mp4",
    imgUrl: "/images/sikkim-monastery-kanchenjunga.jpg",
  },
  {
    id: "tripura",
    name: "Tripura",
    subtitle: "The Pearl of the East",
    videoUrl: "/videos/destinations/tripura.mp4",
    imgUrl: "/images/tripura-ujjayanta-palace.jpg",
  },
  {
    id: "mizoram",
    name: "Mizoram",
    subtitle: "The Land of Highlanders",
    videoUrl: "/videos/destinations/mizoram.mp4",
    imgUrl: "/images/mizoram-rolling-hills.webp",
  },
  {
    id: "manipur",
    name: "Manipur",
    subtitle: "The Jeweled Land",
    videoUrl: "/videos/destinations/manipur.mp4",
    imgUrl: "/images/manipur-loktak-lake.jpg",
  }
];

export default function VerticalAccordionGallery() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const handleMouseEnter = (id: string) => {
    setHoveredId(id);
    const video = videoRefs.current[id];
    if (video) {
        // Play from start on hover
        video.currentTime = 0;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            // Suppress "play() request was interrupted by a call to pause()" errors
            console.debug("Video playback interrupted by quick hover.", error);
          });
        }
    }
  };

  const handleMouseLeave = () => {
    if (hoveredId) {
        const video = videoRefs.current[hoveredId];
        if (video) video.pause();
    }
    setHoveredId(null);
  };

  const handleClick = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    // on mobile, natively scroll the element to center when clicked
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      const el = e.currentTarget;
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }, 50);
    }

    if (hoveredId === id) {
        const video = videoRefs.current[id];
        if (video) video.pause();
        setHoveredId(null);
    } else {
        if (hoveredId) {
            const prevVideo = videoRefs.current[hoveredId];
            if (prevVideo) prevVideo.pause();
        }
        setHoveredId(id);
        const video = videoRefs.current[id];
        if (video) {
            video.currentTime = 0;
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise.catch((error) => {
                console.debug("Video playback interrupted by quick tap.", error);
              });
            }
        }
    }
  };

  return (
    <section className="w-full bg-[#EFEFE8] dark:bg-zinc-950 pt-0 pb-16 relative overflow-hidden transition-colors duration-1000 flex flex-col items-center justify-start">
      
      {/* Background ambient texture for Alan Menken vibe */}
      <div className="absolute inset-0 opacity-40 mix-blend-multiply dark:mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('/images/noise.png')" }} />
      
      <div 
        className="max-w-[1600px] mx-auto px-2 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center"
        onMouseLeave={handleMouseLeave}
      >
        
        {/* Text Display Section Moved Above Gallery */}
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
                
                <motion.p
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 0.2, duration: 0.5 }}
                   className="text-xs md:text-sm text-zinc-500 max-w-xl mx-auto mb-4 px-4"
                >
                  Discover the breathtaking landscapes, vibrant cultural heritage, and hidden gems of {destinationsData.find(d => d.id === hoveredId)?.name}. Let your journey begin.
                </motion.p>

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
                  We specialize in crafting unforgettable journeys across the Eight Jewels of Northeast India. Each destination holds ancient secrets, untouched wilderness, and vibrant cultures waiting to be explored.
                </p>
                <p className="text-blue-500 mt-6 tracking-widest text-xs sm:text-sm uppercase font-bold animate-pulse">
                  Tap or hover over the slices below to begin
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Accordion Container - Scrollable Row for Mobile */}
        <div className="flex flex-row w-full h-[60vh] md:h-[50vh] min-h-[400px] max-h-[600px] gap-2 md:gap-3 items-center justify-start md:justify-center group/container mt-4 sm:mt-16 overflow-x-auto md:overflow-hidden snap-x snap-mandatory hide-scrollbar px-4 md:px-0">
          {destinationsData.map((dest, index) => {
            const isHovered = hoveredId === dest.id;
            const isAnythingHovered = hoveredId !== null;
            
            // Stagger logic: evens go up, odds go down.
            // Using yOffset to move the element.
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
                className={`relative overflow-hidden cursor-pointer group h-full bg-zinc-200 dark:bg-zinc-900 shadow-xl rounded-2xl md:rounded-none shrink-0 snap-center ${
                  isHovered 
                    ? "w-[75vw] md:w-auto md:flex-[8_1_0%]" 
                    : isAnythingHovered 
                      ? "w-[15vw] md:w-auto md:flex-[1_1_0%]" 
                      : "w-[25vw] md:w-auto md:flex-[2_1_0%]"
                }`}
                style={{ 
                  minHeight: "60px",
                  transition: "width 0.8s cubic-bezier(0.16, 1, 0.3, 1), flex 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
                }} 
              >
                {/* Pencil Sketched Image Overlay (Un-hovered State) */}
                <div className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${isHovered ? 'opacity-0 z-0' : 'opacity-100 z-10'}`}>
                    <Image
                      src={dest.imgUrl}
                      alt={dest.name}
                      fill
                      className="object-cover opacity-75 grayscale-[100%] contrast-[130%] sepia-[30%] brightness-[1.1] blur-[0.5px] mix-blend-multiply dark:mix-blend-lighten pointer-events-none scale-[1.02]"
                    />
                </div>

                {/* Looping Video Background (Hovered State) */}
                <video
                  ref={(el) => {
                      videoRefs.current[dest.id] = el;
                  }}
                  src={dest.videoUrl}
                  loop
                  muted
                  playsInline
                  onTimeUpdate={(e) => {
                    if (e.currentTarget.currentTime >= 120) {
                      e.currentTarget.currentTime = 0;
                    }
                  }}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 z-0 ${
                    isHovered 
                      ? 'opacity-100 filter-none scale-100' 
                      : 'opacity-0 scale-105'
                  }`}
                />
                
                {/* Subtle overlay */}
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
