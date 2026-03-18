import LoadingScreen from "@/components/sections/LoadingScreen";
import HeroSection from "@/components/HeroSection";
import MarqueeTicker from "@/components/sections/MarqueeTicker";
import BikeShowcase from "@/components/BikeShowcase";
import BikeConfigurator from "@/components/sections/BikeConfigurator";
import TechnologyDeepDive from "@/components/sections/TechnologyDeepDive";
import SpeedTest from "@/components/sections/SpeedTest";
import MaterialsAndCraft from "@/components/sections/MaterialsAndCraft";
import TestimonialSlider from "@/components/TestimonialSlider";
import SocialProofWall from "@/components/sections/SocialProofWall";
import ComparisonTable from "@/components/sections/ComparisonTable";
import LimitedDrop from "@/components/sections/LimitedDrop";
import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <PageTransition>
        <div className="bg-black min-h-screen">
          <HeroSection />

          <MarqueeTicker />

          <ScrollReveal direction="up" delay={0.1}>
            <BikeShowcase />
          </ScrollReveal>

          <BikeConfigurator />

          <TechnologyDeepDive />

          <SpeedTest />

          <ScrollReveal direction="up" delay={0.1}>
            <MaterialsAndCraft />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <TestimonialSlider />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <ComparisonTable />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <LimitedDrop />
          </ScrollReveal>
        </div>
      </PageTransition>
    </>
  );
}
