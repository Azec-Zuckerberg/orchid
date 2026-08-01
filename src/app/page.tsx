import { CtaCard } from "@/components/CtaCard";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { Hero } from "@/components/home/Hero";
import { LiveCounts } from "@/components/home/LiveCounts";
import { Testimonials } from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Testimonials />
      <FeaturesSection />
      <LiveCounts />
      <CtaCard />
    </>
  );
}
