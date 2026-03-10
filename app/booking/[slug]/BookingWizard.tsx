"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { TourPackage } from "@/lib/data/packages";
import { Calendar, Users, UserCircle, CreditCard, ShieldCheck, ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";
import Image from "next/image";

interface BookingWizardProps {
  pkg: TourPackage;
  defaultVehicle: string;
  defaultCapacity: number;
  defaultCost: number;
}

export default function BookingWizard({
  pkg,
  defaultVehicle,
  defaultCapacity,
  defaultCost,
}: BookingWizardProps) {
  const router = useRouter();

  // Step tracking
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  // Form State
  const [startDate, setStartDate] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [leadTraveler, setLeadTraveler] = useState({ name: "", email: "", phone: "" });
  const [guestNames, setGuestNames] = useState<string[]>([]);
  
  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Formatting helpers
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, totalSteps));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleGuestCountChange = (delta: number) => {
    const newCount = Math.max(1, Math.min(guestCount + delta, defaultCapacity));
    setGuestCount(newCount);
    
    // Adjust empty strings in guest array
    if (newCount > guestCount) {
      setGuestNames([...guestNames, ...Array(newCount - guestCount).fill("")]);
    } else {
      setGuestNames(guestNames.slice(0, newCount - 1));
    }
  };

  const handleGuestNameChange = (index: number, val: string) => {
    const newNames = [...guestNames];
    newNames[index] = val;
    setGuestNames(newNames);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId: pkg.id,
          vehicleType: defaultVehicle,
          startDate: new Date(startDate),
          totalGuests: guestCount,
          leadTraveler,
          guestNames: guestNames.filter(n => n.trim() !== ""),
          totalCost: defaultCost,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          // Send them to homepage or profile
          router.push("/");
        }, 4000);
      } else {
        alert("There was an issue processing your booking request.");
      }
    } catch (e) {
      console.error(e);
      alert("Network error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step Content Renderers
  const renderStep1 = () => (
    <div className="space-y-8">
       <div>
         <h2 className="text-2xl font-serif font-bold text-white mb-2">Trip Configuration</h2>
         <p className="text-zinc-400 text-sm">When do you want to start this adventure?</p>
       </div>
       
       <div className="space-y-6">
         {/* Date Picker (Native styled) */}
         <div>
           <label className="block text-zinc-300 text-sm font-medium mb-2 flex items-center gap-2">
             <Calendar size={16} className="text-blue-400" /> Expected Start Date
           </label>
           <input 
             type="date"
             value={startDate}
             onChange={(e) => setStartDate(e.target.value)}
             className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all custom-calendar-icon"
             required
           />
         </div>

         {/* Guest Counter */}
         <div>
           <label className="block text-zinc-300 text-sm font-medium mb-2 flex items-center gap-2">
             <Users size={16} className="text-orange-400" /> Number of Travelers
           </label>
           <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-2 w-fit">
             <button 
               onClick={() => handleGuestCountChange(-1)}
               disabled={guestCount <= 1}
               className="w-10 h-10 rounded-lg flex items-center justify-center bg-zinc-800 disabled:opacity-50 text-white hover:bg-zinc-700 transition"
             >
               -
             </button>
             <span className="text-xl font-bold text-white w-8 text-center">{guestCount}</span>
             <button 
               onClick={() => handleGuestCountChange(1)}
               disabled={guestCount >= defaultCapacity}
               className="w-10 h-10 rounded-lg flex items-center justify-center bg-zinc-800 disabled:opacity-50 text-white hover:bg-zinc-700 transition"
             >
               +
             </button>
           </div>
           <p className="text-xs text-zinc-500 mt-2">Maximum capacity for {defaultVehicle} is {defaultCapacity} guests.</p>
         </div>
       </div>

       <div className="pt-6">
         <button 
           onClick={handleNext}
           disabled={!startDate}
           className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
         >
           Continue <ChevronRight size={18} />
         </button>
       </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8">
       <div>
         <h2 className="text-2xl font-serif font-bold text-white mb-2">Traveler Details</h2>
         <p className="text-zinc-400 text-sm">Who is the primary contact for this trip?</p>
       </div>

       <div className="space-y-6">
         {/* Lead Traveler */}
         <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <h3 className="text-white font-bold flex items-center gap-2"><UserCircle size={18} className="text-blue-400" /> Lead Traveler</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-400 text-xs mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={leadTraveler.name}
                  onChange={(e) => setLeadTraveler({...leadTraveler, name: e.target.value})}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-green-400"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-xs mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  value={leadTraveler.phone}
                  onChange={(e) => setLeadTraveler({...leadTraveler, phone: e.target.value})}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-green-400"
                  placeholder="+91 9876543210"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-zinc-400 text-xs mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={leadTraveler.email}
                  onChange={(e) => setLeadTraveler({...leadTraveler, email: e.target.value})}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-green-400"
                  placeholder="john@example.com"
                />
              </div>
            </div>
         </div>

         {/* Additional Guests */}
         {guestCount > 1 && (
           <div className="space-y-4">
             <h3 className="text-white font-bold text-sm px-2">Additional Flow Travelers ({guestCount - 1})</h3>
             {Array.from({ length: guestCount - 1 }).map((_, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <label className="block text-zinc-400 text-xs mb-2">Guest {idx + 2} Full Name</label>
                  <input 
                    type="text" 
                    value={guestNames[idx] || ""}
                    onChange={(e) => handleGuestNameChange(idx, e.target.value)}
                    className="w-full sm:w-1/2 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-400"
                    placeholder="Jane Doe"
                  />
                </div>
             ))}
           </div>
         )}
       </div>

       <div className="pt-6 flex items-center justify-between">
         <button 
           onClick={handleBack}
           className="text-zinc-400 flex items-center gap-1 hover:text-white transition"
         >
           <ChevronLeft size={18} /> Back
         </button>
         <button 
           onClick={handleNext}
           disabled={!leadTraveler.name || !leadTraveler.email || !leadTraveler.phone}
           className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 disabled:opacity-50 transition"
         >
           Continue <ChevronRight size={18} />
         </button>
       </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8">
       <div>
         <h2 className="text-2xl font-serif font-bold text-white mb-2">Secure Reservation</h2>
         <p className="text-zinc-400 text-sm">Review our placeholder gateway architecture.</p>
       </div>

       <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 relative overflow-hidden group">
         <div className="absolute -top-32 -right-32 w-64 h-64 bg-green-500/5 rounded-full blur-[80px]" />
         
         <div className="relative z-10 space-y-6">
           <div className="flex items-start justify-between">
             <div className="flex items-center gap-3">
               <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                 <CreditCard className="text-green-400" />
               </div>
               <div>
                 <p className="text-white font-bold">Standard Payment Gateway</p>
                 <p className="text-zinc-500 text-xs">Powered by Stripe / Razorpay</p>
               </div>
             </div>
           </div>

           <div className="border border-zinc-800 rounded-xl p-4 bg-black/50 pointer-events-none opacity-60">
             <div className="h-10 border border-zinc-700 rounded bg-zinc-900/[0.2] mb-3 relative flex items-center px-4">
                 <span className="text-zinc-600 text-sm">Card Number: **** **** **** ****</span>
             </div>
             <div className="grid grid-cols-2 gap-3">
               <div className="h-10 border border-zinc-700 rounded bg-zinc-900/[0.2] flex items-center px-4"><span className="text-zinc-600 text-sm">MM/YY</span></div>
               <div className="h-10 border border-zinc-700 rounded bg-zinc-900/[0.2] flex items-center px-4"><span className="text-zinc-600 text-sm">CVC</span></div>
             </div>
           </div>

           <div className="flex items-center justify-center gap-2 text-xs text-green-500/80 mb-4 px-2">
             <ShieldCheck size={14} /> 256-bit Secure Encryption connection mapping
           </div>
         </div>
       </div>

       <div className="pt-6 flex items-center justify-between">
         <button onClick={handleBack} className="text-zinc-400 flex items-center gap-1 hover:text-white transition">
           <ChevronLeft size={18} /> Back
         </button>
         <button 
           onClick={handleSubmit}
           disabled={isSubmitting}
           className="bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-full font-bold shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all flex justify-center items-center min-w-[200px]"
         >
           {isSubmitting ? (
             <span className="animate-pulse">Processing...</span>
           ) : (
             "Confirm Booking Request"
           )}
         </button>
       </div>
    </div>
  );

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center"
        >
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="text-green-500 w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Request Received!</h2>
          <p className="text-zinc-400 text-sm mb-6">
            Your booking request for {pkg.title} has been securely logged. Our experts will contact {leadTraveler.name} shortly to finalize the dates and payment mapping.
          </p>
          <p className="text-xs text-zinc-600">Redirecting you back home...</p>
        </motion.div>
      </div>
    );
  }

  // Define Steps map
  const stepRenderer: Record<number, () => JSX.Element> = {
    1: renderStep1,
    2: renderStep2,
    3: renderStep3,
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Ribbon */}
        <div className="flex items-center gap-4 mb-10">
          <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition">
            <ChevronLeft size={20} className="text-white" />
          </button>
          <div>
            <h1 className="text-white font-serif text-xl sm:text-3xl font-bold">{pkg.title}</h1>
            <p className="text-zinc-500 text-sm tracking-wide uppercase mt-1">Booking Initialization</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Form Left Column */}
          <div className="lg:col-span-7">
            {/* Step Indicators */}
            <div className="flex items-center gap-2 mb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex-1">
                  <div className={`h-1.5 rounded-full transition-colors duration-500 ${step >= i ? 'bg-blue-500' : 'bg-zinc-800'}`} />
                  <p className={`text-[10px] mt-2 font-bold uppercase tracking-wider ${step >= i ? 'text-blue-400' : 'text-zinc-600'}`}>
                    Step {i}
                  </p>
                </div>
              ))}
            </div>

            {/* Form Sliding Area */}
            <div className="relative min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {stepRenderer[step]()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Order Summary Right Column */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-24 bg-gradient-to-b from-zinc-900 to-[#111] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
              <div className="relative h-40 w-full opacity-60">
                <Image src={pkg.imgUrl} alt={pkg.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
              </div>
              
              <div className="p-6 sm:p-8 -mt-10 relative z-10">
                <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center pb-4 border-b border-zinc-800/50">
                    <span className="text-zinc-400 text-sm">Trip Details</span>
                    <span className="text-white text-sm font-medium text-right max-w-[60%]">{pkg.duration}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-zinc-800/50">
                    <span className="text-zinc-400 text-sm">Start Date</span>
                    <span className="text-white text-sm font-medium">{startDate ? new Date(startDate).toLocaleDateString() : "Pending"}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-zinc-800/50">
                    <span className="text-zinc-400 text-sm">Vehicle</span>
                    <span className="text-white text-sm font-medium text-right max-w-[60%]">{defaultVehicle}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-zinc-800/50">
                    <span className="text-zinc-400 text-sm">Travelers</span>
                    <span className="text-white text-sm font-medium">{guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}</span>
                  </div>
                </div>

                <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                  <div className="flex justify-between items-end">
                    <span className="text-zinc-300 font-medium">Total Amount</span>
                    <span className="text-3xl font-serif font-bold text-white">{formatPrice(defaultCost)}</span>
                  </div>
                  <p className="text-green-400 text-xs mt-2 text-right">Includes all taxes and ILP permits</p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
