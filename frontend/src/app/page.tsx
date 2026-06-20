import { Hero } from "@/components/sections/Hero";
import { TrustSection } from "@/components/sections/TrustSection";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { ConversionBanner } from "@/components/sections/ConversionBanner";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { LocalTrustSection } from "@/components/sections/LocalTrustSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { QuoteFormSection } from "@/components/sections/QuoteFormSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustSection />
      <TechnologySection />
      <ConversionBanner />
      <ServicesSection />
      <ProcessSection />
      <LocalTrustSection />
      <TestimonialsSection />
      <FAQSection />
      <QuoteFormSection />
    </>
  );
}
