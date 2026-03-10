"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Send, Map, CalendarDays, Home, Sparkles } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const NORTHEAST_STATES = [
  "Assam", "Meghalaya", "Arunachal", 
  "Nagaland", "Manipur", "Mizoram", 
  "Tripura", "Sikkim"
];

const DURATIONS = [
  "Short (1-4 Days)",
  "Medium (5-8 Days)",
  "Long (9-14 Days)",
  "Extended (15+ Days)"
];

const ACCOMMODATIONS = [
  "Budget Options",
  "Standard 3-Star",
  "Premium 4-Star",
  "Luxury 5-Star & Resorts",
  "Homestays & Eco-Camps"
];

export default function CustomTripPlanner() {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [duration, setDuration] = useState("");
  const [accommodation, setAccommodation] = useState("");
  const [travelVision, setTravelVision] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();

  // Pre-fill user data if they are logged in
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      if (session.user.name && !customerName) setCustomerName(session.user.name);
      if (session.user.email && !customerEmail) setCustomerEmail(session.user.email);
    }
  }, [status, session]);

  const handleStateToggle = (state: string) => {
    setSelectedStates(prev => 
      prev.includes(state) ? prev.filter(s => s !== state) : [...prev, state]
    );
  };

  const handleQuoteRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Intercept unauthenticated users
    if (status === "unauthenticated") {
      toast.info("Authentication Required", {
        description: "Please login or create an account to get a custom quote.",
        duration: 5000,
        icon: '🔐'
      });
      router.push('/login');
      return;
    }

    if (!customerName || !customerEmail) {
      toast.error("Please provide your Name and Email so we can send your quote.");
      return;
    }

    // 2. Validate email matches session email for security
    if (status === "authenticated" && session?.user?.email) {
      if (customerEmail.toLowerCase().trim() !== session.user.email.toLowerCase().trim()) {
         toast.error("Security Check Failed", {
           description: "The email provided must exactly match your logged-in account's email.",
           duration: 5000,
         });
         return;
      }
    }
    if (selectedStates.length === 0) {
      toast.error("Please select at least one destination state.");
      return;
    }
    if (!duration || !accommodation) {
      toast.error("Please fill in duration and accommodation preferences.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          customerEmail,
          destinations: selectedStates,
          duration,
          accommodation,
          travelVision
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate quote');
      }

      toast.success("AI Quote Generated & Sent!", {
        description: `Your custom itinerary for ${selectedStates.join(", ")} has been successfully planned by our elite Concierge AI and emailed directly to your inbox.`,
        duration: 8000,
        icon: '✈️'
      });
      
      // Reset form but strictly keep the session credentials
      setSelectedStates([]);
      setDuration("");
      setAccommodation("");
      setTravelVision("");

    } catch (error: any) {
      console.error(error);
      toast.error("Pipeline Failed", {
        description: error.message || "An unexpected error occurred while processing your quote.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-zinc-900 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden text-white border border-zinc-800">
      
      {/* Decorative Accent Ring */}
      <div className="absolute -top-32 -right-32 w-64 h-64 border-[40px] border-orange-500/10 rounded-full blur-[2px] pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row gap-8 lg:gap-12">
        
        {/* Planner Header Context */}
        <div className="w-full md:w-1/3 flex flex-col h-full space-y-8">
          
          {/* Main Title Block */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
              <Map size={14} /> Plan Your Way
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight leading-tight">
              Custom Trip <br />
              <span className="text-orange-400 italic font-light drop-shadow-lg">Planner</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Tell us exactly where you want to go and what you want to experience. We&apos;ll stitch together the perfect custom itinerary for you at the best rates in Northeast India.
            </p>
          </div>

          {/* Aesthetic Divider */}
          <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-amber-700 rounded-full" />

          {/* Value Propositions / Trust Badges Removed to Balance Layout */}

          {/* Bottom Trust Note */}
          <div className="bg-zinc-800/50 border border-zinc-700/50 p-4 rounded-2xl flex items-start gap-3 mt-auto">
            <Sparkles size={20} className="text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-zinc-400 leading-relaxed font-medium">
              Every request is reviewed by our <span className="text-white font-bold">Assam-based</span> travel specialists before confirming your itinerary.
            </p>
          </div>

        </div>

        {/* Planner Interactive Form */}
        <form onSubmit={handleQuoteRequest} className="w-full md:w-2/3 space-y-8">
          
          {/* Section 0: Traveler Identity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                 Full Name
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3.5 text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-shadow"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                 Email Address
              </label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3.5 text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-shadow"
              />
            </div>
          </div>

          {/* Section 1: Destinations */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
               Select Destinations
            </label>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {NORTHEAST_STATES.map((state) => {
                const isActive = selectedStates.includes(state);
                return (
                  <button
                    key={state}
                    type="button"
                    onClick={() => handleStateToggle(state)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      isActive 
                        ? 'bg-orange-500 text-zinc-900 shadow-md shadow-orange-500/20 ring-2 ring-orange-500/50' 
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700'
                    }`}
                  >
                    {state}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Section 2: Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                 <CalendarDays size={16} className="text-blue-400" /> Preferred Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3.5 text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-shadow appearance-none cursor-pointer"
              >
                <option value="" disabled>Select Duration</option>
                {DURATIONS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                 <Home size={16} className="text-orange-400" /> Accommodation
              </label>
              <select
                value={accommodation}
                onChange={(e) => setAccommodation(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3.5 text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-shadow appearance-none cursor-pointer"
              >
                <option value="" disabled>Select Style</option>
                {ACCOMMODATIONS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>

          {/* Section 3: Travel Vision (AI Input) */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
               <Sparkles size={16} className="text-purple-400" /> Your Travel Vision
            </label>
            <textarea
              value={travelVision}
              onChange={(e) => setTravelVision(e.target.value)}
              rows={4}
              placeholder="Tell us about your dream trip... specific places you want to visit, dietary needs, or activities you love (e.g., wildlife photography, local food tours)."
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3.5 text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-shadow resize-y"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-all sm:w-auto w-full justify-center ${
                isSubmitting 
                  ? 'bg-zinc-700 text-zinc-500 cursor-not-allowed' 
                  : 'bg-white text-zinc-900 hover:bg-zinc-100 hover:shadow-xl hover:shadow-white/10 active:scale-95'
              }`}
            >
              {isSubmitting ? 'Sending Request...' : 'Get Custom Quote'}
              {!isSubmitting && <Send size={16} />}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
