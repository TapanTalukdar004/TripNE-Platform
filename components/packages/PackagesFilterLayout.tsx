"use client";

import { useState, useMemo } from "react";
import PackageCard from "./PackageCard";
import { Filter, SlidersHorizontal, ChevronDown } from "lucide-react";

import { PACKAGES_DATA } from "@/lib/data/packages";

const STATES = ["Assam", "Meghalaya", "Arunachal", "Nagaland", "Manipur", "Mizoram", "Tripura", "Sikkim"];

export default function PackagesFilterLayout() {
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(40000);
  const [selectedDuration, setSelectedDuration] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("recommended");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const handleStateChange = (state: string) => {
    setSelectedStates(prev => 
      prev.includes(state) ? prev.filter(s => s !== state) : [...prev, state]
    );
  };

  // Aggressive Client-Side Filtering with Dynamic Pricing Support
  const filteredAndSortedPackages = useMemo(() => {
    // 1. Calculate the starting price for every package based on the cheapest vehicle
    const packagesWithPrice = PACKAGES_DATA.map(pkg => {
      const minPrice = Math.min(...pkg.pricingOptions.map(opt => opt.totalTripCost));
      return { ...pkg, startingPrice: minPrice };
    });

    // 2. Filter
    let result = packagesWithPrice.filter(pkg => {
      const matchState = selectedStates.length === 0 || selectedStates.includes(pkg.state);
      const matchPrice = pkg.startingPrice <= priceRange;
      const matchDuration = selectedDuration === "all" || pkg.durationVal === selectedDuration;
      return matchState && matchPrice && matchDuration;
    });

    // 3. Sort
    result.sort((a, b) => {
      if (sortBy === "price_low") return a.startingPrice - b.startingPrice;
      if (sortBy === "price_high") return b.startingPrice - a.startingPrice;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // recommended
    });

    return result;
  }, [selectedStates, priceRange, selectedDuration, sortBy]);

  return (
    <div className="w-full relative">
      
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6 flex justify-between items-center bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <h3 className="font-bold text-zinc-900 dark:text-white flex items-center gap-2">
           <Filter size={18} /> Filters
        </h3>
        <button 
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded-lg text-zinc-600 dark:text-zinc-300"
        >
          <SlidersHorizontal size={20} />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start relative pb-16">
        
        {/* Left Sidebar (Sticky) */}
        <aside className={`w-full lg:w-1/4 lg:sticky lg:top-28 flex-shrink-0 transition-all ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
            
            <div className="mb-8">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                 Destination State
              </h3>
              <div className="space-y-3">
                {STATES.map(state => (
                  <label key={state} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={selectedStates.includes(state)}
                      onChange={() => handleStateChange(state)}
                      className="w-4 h-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                    />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {state}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 flex items-center justify-between">
                <span>Max Price</span>
                <span className="text-sm text-blue-600 dark:text-blue-400">₹{priceRange.toLocaleString()}</span>
              </h3>
              <input 
                type="range" 
                min="5000" 
                max="60000" 
                step="1000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-zinc-500 mt-2">
                <span>₹5K</span>
                <span>₹60K+</span>
              </div>
            </div>

            <div className="mb-2">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Duration</h3>
              <div className="space-y-3">
                {[
                  { id: "all", label: "Any Duration" },
                  { id: "short", label: "Short (1-4 Days)" },
                  { id: "medium", label: "Medium (5-8 Days)" },
                  { id: "long", label: "Long (9+ Days)" }
                ].map(opt => (
                  <label key={opt.id} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="duration"
                      value={opt.id}
                      checked={selectedDuration === opt.id}
                      onChange={(e) => setSelectedDuration(e.target.value)}
                      className="w-4 h-4 border-zinc-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                    />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {opt.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

          </div>
        </aside>

        {/* Right Main Content */}
        <div className="w-full lg:w-3/4 flex flex-col">
          
          {/* Top Control Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <p className="text-zinc-600 dark:text-zinc-400 font-medium">
              Showing <span className="font-bold text-zinc-900 dark:text-white">{filteredAndSortedPackages.length}</span> packages
            </p>

            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-500">Sort by:</span>
              <div className="relative">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg pl-4 pr-10 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500" />
              </div>
            </div>
          </div>

          {/* CSS Grid for Packages */}
          {filteredAndSortedPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAndSortedPackages.map(pkg => (
                <PackageCard key={pkg.id} {...pkg} price={pkg.startingPrice} />
              ))}
            </div>
          ) : (
            <div className="w-full py-24 text-center border border-dashed border-zinc-300 dark:border-zinc-800 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50">
              <p className="text-xl font-bold text-zinc-500 dark:text-zinc-400">No packages match your filters.</p>
              <button 
                onClick={() => {
                  setSelectedStates([]);
                  setPriceRange(40000);
                  setSelectedDuration("all");
                }}
                className="mt-4 px-6 py-2 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full font-medium text-sm hover:bg-zinc-300 dark:hover:bg-zinc-700 transition"
              >
                Clear all filters
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
