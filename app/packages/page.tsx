import PackagesHero from "@/components/packages/PackagesHero";
import CustomTripPlanner from "@/components/packages/CustomTripPlanner";
import PackagesFilterLayout from "@/components/packages/PackagesFilterLayout";
import GrandTourBanner from "@/components/packages/GrandTourBanner";

export const metadata = {
  title: "Packages - TripNE",
  description: "Browse all curated tour packages across Northeast India.",
};

export default function PackagesPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center overflow-x-hidden">
      
      {/* 1. Full-Width Parallax Hero */}
      <PackagesHero />

      {/* 2. Interactive Custom Planner Form */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-24 relative z-20">
        <CustomTripPlanner />
      </section>

      {/* 3. Main Grid & Sticky Sidebar */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 relative z-10">
         <PackagesFilterLayout />
      </section>

      {/* 4. Full-Width Footer Promotion Banner */}
      <GrandTourBanner />

    </main>
  );
}
