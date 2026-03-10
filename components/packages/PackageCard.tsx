"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Clock } from "lucide-react";

interface PackageCardProps {
  id: string;
  title: string;
  state: string;
  duration: string;
  price: number;
  rating: number;
  description: string;
  imgUrl: string;
}

export default function PackageCard({
  id,
  title,
  state,
  duration,
  price,
  rating,
  description,
  imgUrl
}: PackageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl group flex flex-col h-full"
    >
      {/* Top Image Section */}
      <div className="relative h-56 w-full overflow-hidden">
        <motion.div
          className="w-full h-full"
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
        >
          <Image
            src={imgUrl}
            alt={title}
            fill
            className="object-cover"
          />
        </motion.div>
        
        {/* Floating Rating Badge */}
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 z-10 border border-zinc-100 dark:border-zinc-800">
          <Star size={14} className="fill-amber-500 text-amber-500" />
          <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{rating}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-grow flex flex-col">
        {/* Metadata row */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mb-3 font-medium">
          <div className="flex items-center gap-1.5">
            <MapPin size={15} className="text-orange-500" />
            <span>{state}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={15} className="text-blue-500" />
            <span>{duration}</span>
          </div>
        </div>

        {/* Title & Desc */}
        <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white font-serif mb-3 leading-tight group-hover:text-blue-600 dark:group-hover:text-amber-400 transition-colors">
          {title}
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
          {description}
        </p>

        {/* Price & Actions Bottom */}
        <div className="mt-auto">
          <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4 mb-5 flex items-end justify-between">
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium tracking-wide uppercase mb-1">Starting From</p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">₹{price.toLocaleString()}</p>
            </div>
          </div>

          <Link 
            href={`/packages/${id}`}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 dark:bg-zinc-800 dark:border-zinc-700 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-bold text-sm text-center transition-all active:scale-95 block"
          >
            View Full Tour Package
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
