import VerticalAccordionGallery from "@/components/destinations/VerticalAccordionGallery";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cloudinaryUrl } from "../../lib/cloudinaryUrl";

export const metadata = {
  title: "Destinations - TripNE",
  description: "Explore all destinations in Northeast India."
};

export default function DestinationsPage() {
  return (
    <main className="min-h-screen bg-[#EFEFE8] dark:bg-zinc-950 pt-24 pb-0 flex flex-col items-center">
      
      {/* Accordion Scrollytelling Showcase with Dynamic Top Header */}
      <VerticalAccordionGallery />

      {/* About Northeast India Section */}
      <section className="relative w-full py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#EFEFE8] dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
        
        {/* Animated Background Blob */}
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[70%] rounded-[100%] blur-[100px] animate-color-blob pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
          
          {/* Left Side: Overlapping Images Layout */}
          <div className="w-full lg:w-1/2 relative h-[500px] sm:h-[600px] flex items-center justify-center">
            
            {/* Image 1: Bihu */}
            <div className="absolute top-[5%] left-[5%] w-[55%] h-[50%] rounded-xl overflow-hidden shadow-2xl z-10 border-4 border-[#EFEFE8] dark:border-zinc-950 transition-transform duration-500 hover:scale-105 hover:z-40">
              <Image src={cloudinaryUrl("bihu.jpg")} alt="Bihu Dance" fill className="object-cover" />
            </div>
            
            {/* Image 2: Caves (overlaps 1 and 3) */}
            <div className="absolute bottom-[5%] right-[5%] w-[60%] h-[55%] rounded-xl overflow-hidden shadow-2xl z-30 border-4 border-[#EFEFE8] dark:border-zinc-950 transition-transform duration-500 hover:scale-105 hover:z-40">
              <Image src={cloudinaryUrl("caves.jpg")} alt="Northeast Caves" fill className="object-cover" />
            </div>

            {/* Image 3: Mask (underneath) */}
            <div className="absolute top-[40%] left-[0%] w-[45%] h-[40%] rounded-xl overflow-hidden shadow-xl z-20 border-4 border-[#EFEFE8] dark:border-zinc-950 transition-transform duration-500 hover:scale-105 hover:z-40">
              <Image src={cloudinaryUrl("mask.jpg")} alt="Traditional Mask" fill className="object-cover" />
            </div>

            {/* Image 4: Arunachal highlight */}
            <div className="absolute top-[10%] right-[0%] w-[35%] h-[35%] rounded-xl overflow-hidden shadow-lg z-0 border-4 border-[#EFEFE8] dark:border-zinc-950 transition-transform duration-500 hover:scale-110 hover:z-40">
              <Image src={cloudinaryUrl("arunachal1.png")} alt="Arunachal Tribe" fill className="object-cover" />
            </div>
          </div>

          {/* Right Side: Enhanced Typography Text */}
          <div className="w-full lg:w-1/2 space-y-8">
            <h4 className="text-orange-600 dark:text-orange-400 font-semibold tracking-widest uppercase text-sm mb-3 font-sans">
              The Eight Jewels
            </h4>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-zinc-900 dark:text-white tracking-tight font-serif mb-6">
              About <br className="hidden sm:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-700 italic pr-2">Northeast</span> India
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-amber-700 rounded-full mb-8 shadow-sm" />
            
            <div className="space-y-6 text-zinc-600 dark:text-zinc-300 text-lg sm:text-xl leading-relaxed font-sans">
              <p className="first-letter:text-5xl sm:first-letter:text-6xl first-letter:font-serif first-letter:text-orange-600 dark:first-letter:text-orange-400 first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                Northeast India, often called the &quot;Seven Sisters&quot; plus Sikkim, comprises eight states: Assam, Meghalaya, Arunachal Pradesh, Nagaland, Manipur, Mizoram, Tripura, and Sikkim. This region is one of the most culturally diverse areas in Asia.
              </p>
              <p>
                With over <span className="font-semibold text-zinc-900 dark:text-white relative inline-block group">
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-orange-700 dark:group-hover:text-amber-300">220 ethnic groups</span>
                  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-orange-400/50 -z-0 transition-all duration-300 group-hover:h-full group-hover:bg-orange-400/20 rounded-sm"></span>
                </span> and languages, it&apos;s a unique blend of cultures and landscapes. From Assam&apos;s tea gardens to Meghalaya&apos;s root bridges, Arunachal&apos;s monasteries to Nagaland&apos;s festivals, each state offers distinct experiences.
              </p>
              <p className="text-zinc-500 dark:text-zinc-400 text-base italic border-l-4 border-amber-500 pl-4 py-2 bg-gradient-to-r from-amber-500/10 to-transparent">
                Blessed with stunning natural beauty – dense forests, mighty rivers, waterfalls, and the Eastern Himalayas – Northeast India is a hidden paradise for travelers seeking authentic culture and unspoiled nature.
              </p>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
