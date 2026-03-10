"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Lock scrolling immediately when the component mounts
    document.body.style.overflow = "hidden";

    const minLoadTime = 1800; // Force 1.8s minimum beautiful intro display
    const startTime = Date.now();

    const finishLoading = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsedTime);

      setTimeout(() => {
        setIsLoading(false);
        // Release scroll lock after the exit animation completes (~800ms)
        setTimeout(() => {
          document.body.style.overflow = "";
        }, 800);
      }, remainingTime);
    };

    // 2. Wait for either the full document to load, or just fallback if it's already complete
    if (document.readyState === "complete") {
      finishLoading();
    } else {
      window.addEventListener("load", finishLoading);
      // Fallback safeguard in case 'load' never fires on a weird cache state
      const fallbackTimer = setTimeout(finishLoading, 4000);
      
      return () => {
        window.removeEventListener("load", finishLoading);
        clearTimeout(fallbackTimer);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="global-preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} // Buttery smooth custom bezier
          className="fixed inset-0 z-[9999] bg-zinc-950 flex flex-col items-center justify-center pointer-events-none"
        >
          {/* Logo Reveal Sequence */}
          <div className="overflow-hidden mb-6">
            <motion.h1 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-widest font-sans"
            >
              TRIP<span className="text-blue-500 relative after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-2 after:h-2 after:bg-orange-500 after:rounded-full after:-ml-3 line-height-none">NE</span>
            </motion.h1>
          </div>

          {/* Minimalist Loading Bar */}
          <div className="w-48 h-[2px] bg-zinc-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.2, 
                ease: "easeInOut" 
              }}
              className="w-full h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
