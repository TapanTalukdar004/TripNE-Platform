"use client";

import { useState } from "react";
import { PricingOption } from "@/lib/data/packages";
import { CheckCircle2, Users, IndianRupee, ShieldCheck } from "lucide-react";

interface DynamicPricingCardProps {
  pricingOptions: PricingOption[];
  packageId: string;
}

export default function DynamicPricingCard({ pricingOptions, packageId }: DynamicPricingCardProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  
  // Guard clause if data is malformed
  if (!pricingOptions || pricingOptions.length === 0) return null;

  const currentOption = pricingOptions[selectedIdx];
  const perPersonCost = Math.round(currentOption.totalTripCost / currentOption.capacity);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          Select Your Vehicle
        </h3>

        {/* Vehicle Selection Toggles */}
        <div className="flex flex-col gap-3 mb-8">
          {pricingOptions.map((opt, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedIdx(idx)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                  isSelected 
                    ? 'border-green-500/50 bg-green-500/10 shadow-[0_0_15px_rgba(34,197,94,0.1)]' 
                    : 'border-zinc-800 bg-zinc-800/50 hover:bg-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div>
                  <p className={`font-semibold text-sm sm:text-base ${isSelected ? 'text-green-400' : 'text-zinc-200 group-hover:text-white'}`}>
                    {opt.vehicleType}
                  </p>
                  <p className="text-xs text-zinc-500 flex items-center gap-1 mt-1">
                    <Users size={12} /> Up to {opt.capacity} persons
                  </p>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                  isSelected ? 'border-green-500 bg-green-500' : 'border-zinc-600'
                }`}>
                  {isSelected && <CheckCircle2 size={12} className="text-zinc-900" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Calculation Hook Output */}
        <div className="border-t border-zinc-800 pt-6 mb-8">
          <p className="text-zinc-400 text-sm font-medium mb-1 tracking-wide uppercase">Total Trip Cost</p>
          <p className="text-4xl font-bold text-white mb-3 tracking-tight font-serif flex items-baseline gap-1">
            {formatPrice(currentOption.totalTripCost)}
          </p>
          
          {/* THE HOOK */}
          <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4 inline-block w-full text-center">
            <p className="text-green-400 font-bold text-lg sm:text-xl transform hover:scale-105 transition-transform cursor-default">
              That&apos;s only {formatPrice(perPersonCost)} per person!
            </p>
          </div>
        </div>

        {/* Benefits List */}
        <ul className="space-y-3 mb-8 text-sm text-zinc-400">
          <li className="flex items-start gap-2">
            <ShieldCheck size={16} className="text-blue-400 shrink-0 mt-0.5" />
            <span>Dedicated expert local driver-guide included.</span>
          </li>
          <li className="flex items-start gap-2">
            <ShieldCheck size={16} className="text-blue-400 shrink-0 mt-0.5" />
            <span>Fuel, tolls, and inter-state permits fully covered.</span>
          </li>
          <li className="flex items-start gap-2">
            <ShieldCheck size={16} className="text-blue-400 shrink-0 mt-0.5" />
            <span>Hassle-free border permit processing.</span>
          </li>
        </ul>

        {/* Glowing CTA */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-green-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500" />
          <button 
            className="w-full relative bg-zinc-900 border border-zinc-700 text-white font-bold py-4 rounded-full text-sm uppercase tracking-wider hover:bg-zinc-800 transition-colors"
            onClick={() => {
              const params = new URLSearchParams({
                vehicle: currentOption.vehicleType,
                capacity: currentOption.capacity.toString(),
                cost: currentOption.totalTripCost.toString()
              });
              window.location.href = `/booking/${packageId}?${params.toString()}`;
            }}
          >
            Request to Book 
          </button>
        </div>
        
      </div>
    </div>
  );
}
