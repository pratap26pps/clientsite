import { Hero } from "@/components/sections/Hero";
import { TrustSection } from "@/components/sections/TrustSection";
import { PackagesSection } from "@/components/sections/PackagesSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { CalculatorSection } from "@/components/sections/CalculatorSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { LocalTrustSection } from "@/components/sections/LocalTrustSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustSection />
      <PackagesSection />
      <PartnersSection />
      <CalculatorSection />
      <ProcessSection />
      <LocalTrustSection />
      <TestimonialsSection />
      <FAQSection />
    </>
  );
}
