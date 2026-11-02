import { HeroSlider } from "@/components/home/hero-slider";
import { CategoryGrid } from "@/components/home/category-grid";
import { FeaturedStudios } from "@/components/home/featured-studios";
import { HowItWorksSection } from "@/components/home/how-it-works-section";
import { HostGuaranteeSection } from "@/components/home/host-guarantee-section";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      {/* 1. Interactive 3-Slide Hero Slider */}
      <HeroSlider />

      {/* 2. Five Visual Category Cards */}
      <CategoryGrid />

      {/* 3. Six Top-Rated/Newest Featured Studios from MongoDB */}
      <FeaturedStudios />

      {/* 4. Four-Step Booking Workflow */}
      <HowItWorksSection />

      {/* 5. Host Standards & Platform Guarantees */}
      <HostGuaranteeSection />
    </div>
  );
}
