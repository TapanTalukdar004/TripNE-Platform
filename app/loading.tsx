"use client";

import Lottie from "lottie-react";
import carAnimationData from "@/public/lottie/car-animation.json";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[50] bg-zinc-950 flex flex-col items-center justify-center pointer-events-none">
      {/* 
        This is the Next.js 14 global route Suspense boundary overlay.
        It triggers automatically between routes when Next.js is fetching or rendering heavy components.
      */}
      <div className="w-64 h-64 md:w-96 md:h-96 relative flex items-center justify-center">
        <Lottie
          animationData={carAnimationData}
          loop={true}
          autoplay={true}
          className="w-full h-full object-contain drop-shadow-2xl"
        />
      </div>
      
      {/* Subtle pulsing aesthetic text underneath */}
      <div className="mt-8 flex flex-col items-center gap-2">
        <h2 className="text-xl md:text-2xl font-black text-white tracking-widest font-sans animate-pulse">
          TRIP<span className="text-blue-500">NE</span>
        </h2>
        <p className="text-zinc-500 text-xs tracking-[0.2em] uppercase">Preparing your journey...</p>
      </div>
    </div>
  );
}
