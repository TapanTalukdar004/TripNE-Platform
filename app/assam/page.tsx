import Image from "next/image";
import { createBooking } from "@/app/actions/booking";
import { getSession } from "@/lib/session";
import { Map, Users, CheckCircle } from "lucide-react";
import { cloudinaryUrl } from "../../lib/cloudinaryUrl";

export const metadata = {
  title: "Assam Tour Packages - TripNE",
  description: "Explore the land of the one-horned rhino and endless tea gardens."
};

export default async function AssamPage() {
  const session = await getSession();
  
  // Package Data (Hardcoded for migration demo based on legacy DB)
  const packages = [
    {
      id: "assam-wildlife",
      title: "Assam Wildlife Safari",
      days: 5,
      price: 22999,
      img: cloudinaryUrl("assam-kaziranga-rhino.jpg"),
      points: [
        "Kaziranga National Park Jeep Safari",
        "Majuli Island Cultural Tour",
        "Brahmaputra River Cruise",
        "Tea Garden Visit & Tasting"
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-black pt-28 pb-24">
      {/* Hero */}
      <div className="relative h-[500px] w-full mb-16">
        <Image 
          src={cloudinaryUrl("assam-tea-gardens.jpg")} 
          alt="Assam Tea Gardens" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-5xl sm:text-7xl font-bold text-white tracking-tight mb-4">Assam</h1>
            <p className="text-xl text-zinc-200 max-w-2xl mx-auto">
              Home of the One-Horned Rhino, endless lush tea gardens, and the mighty Brahmaputra river.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-10">Available Tours in Assam</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {packages.map(pkg => (
            <div key={pkg.id} className="bg-zinc-50 dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl flex flex-col md:flex-row">
              <div className="relative w-full md:w-2/5 h-64 md:h-auto shrink-0">
                <Image src={pkg.img} alt={pkg.title} fill className="object-cover" />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm mb-2">
                  <Map size={16} /> ASSAM TOUR
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">{pkg.title}</h3>
                
                <ul className="space-y-3 mb-8">
                  {pkg.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-zinc-600 dark:text-zinc-400 text-sm">
                      <CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-1">Starting from</p>
                    <p className="font-bold text-2xl text-zinc-900 dark:text-white">₹{pkg.price}</p>
                  </div>
                  
                  <form action={createBooking as any} className="w-full sm:w-auto flex gap-2">
                    <input type="hidden" name="packageId" value={pkg.id} />
                    <input type="hidden" name="pricePerPerson" value={pkg.price} />
                    
                    <div className="relative w-24">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                      <input 
                        type="number" 
                        name="numPeople" 
                        defaultValue={1} 
                        min={1} 
                        max={10}
                        className="w-full pl-9 pr-3 py-3 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-bold text-zinc-900 dark:text-white"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-6 py-3 font-bold transition-colors whitespace-nowrap"
                    >
                      {session ? "Book Now" : "Login to Book"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
