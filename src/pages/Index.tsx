import HeroSection from "@/components/HeroSection";
import WhatWeShip from "@/components/WhatWeShip";
import GlobalShipping from "@/components/GlobalShipping";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <WhatWeShip />
      <GlobalShipping />
      <CTASection />
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} eL Vision Group — Export Global. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
