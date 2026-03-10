import Hero from "@/components/home/Hero";
import StatesGrid from "@/components/home/StatesGrid";
import DestinationsSlider from "@/components/home/DestinationsSlider";
import AboutGuide from "@/components/home/AboutGuide";
import PackagesPreview from "@/components/home/PackagesPreview";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black selection:bg-blue-200 dark:selection:bg-blue-900">
      <Hero />
      <StatesGrid />
      <DestinationsSlider />
      <AboutGuide />
      <PackagesPreview />
    </main>
  );
}
