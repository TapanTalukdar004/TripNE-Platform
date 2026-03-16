import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { cloudinaryUrl } from "../../lib/cloudinaryUrl";

export const metadata = {
  title: "Why Choose Us - TripNE",
  description: "Why TripNE is the best choice for exploring Northeast India."
};

const reasons = [
  {
    title: "Expert Local Knowledge",
    desc: "Our team consists of locals who know every hidden trail, local custom, and secret viewpoint across the 8 states."
  },
  {
    title: "Sustainable Travel",
    desc: "We prioritize eco-friendly tourism that supports local communities without harming the pristine environments."
  },
  {
    title: "Curated Experiences",
    desc: "We don't do cookie-cutter tours. Every itinerary is carefully crafted to offer authentic, immersive cultural experiences."
  },
  {
    title: "24/7 On-Ground Support",
    desc: "From the moment you arrive until your departure, our team is constantly available to ensure your safety and comfort."
  }
];

export default function WhyUsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight">
            Why Choose <span className="text-blue-600">TripNE?</span>
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            We don't just show you the Northeast; we help you experience its soul.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Image Grid */}
          <div className="grid grid-cols-2 gap-4 h-[600px]">
            <div className="col-span-1 row-span-2 relative rounded-3xl overflow-hidden shadow-2xl">
              <Image src={cloudinaryUrl("northeast-india-hero-banner-3.png")} alt="Traveler" fill className="object-cover" />
            </div>
            <div className="col-span-1 relative rounded-3xl overflow-hidden shadow-xl">
              <Image src={cloudinaryUrl("northeast-india-hero-banner-2.png")} alt="Landscape" fill className="object-cover" />
            </div>
            <div className="col-span-1 relative rounded-3xl overflow-hidden shadow-xl">
              <Image src={cloudinaryUrl("northeast-india-hero-banner-4.png")} alt="Culture" fill className="object-cover" />
            </div>
          </div>

          {/* Right: Content text */}
          <div className="space-y-10">
            {reasons.map((reason, i) => (
              <div key={i} className="flex gap-4">
                <div className="shrink-0 mt-1">
                  <CheckCircle2 className="text-blue-600 dark:text-blue-400" size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">{reason.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">{reason.desc}</p>
                </div>
              </div>
            ))}

            <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
               <Link 
                href="/packages"
                className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white transition-all duration-300 bg-blue-600 rounded-full hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/30"
              >
                Browse Our Packages
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
