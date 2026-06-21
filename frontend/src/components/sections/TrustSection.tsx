"use client";

import { motion } from "framer-motion";
import { Wallet, Home, Award, Wrench } from "lucide-react";
import { TRUST_CARDS } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/shared/ScrollReveal";

const iconMap = {
  wallet: Wallet,
  home: Home,
  award: Award,
  wrench: Wrench,
};

export function TrustSection() {
  return (
    <section className="section-padding relative overflow-hidden bg-white">
      <div className="container-wide relative">
        <SectionHeading
          eyebrow="What you can expect"
          title="Built on trust, backed by guarantees"
          description="From the first consultation through to seamless installation and beyond, we offer comprehensive support ensuring an efficient, hassle-free experience."
        />

        <StaggerContainer className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_CARDS.map((card) => {
            const Icon = iconMap[card.icon as keyof typeof iconMap];
            return (
              <StaggerItem key={card.title}>
                <motion.div
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="group card-huglo relative h-full overflow-hidden p-8"
                >
                  <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-huglo-black-bg text-huglo-gold transition-colors duration-300 group-hover:bg-huglo-gold group-hover:text-huglo-black">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-huglo-black">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-huglo-grey">
                    {card.description}
                  </p>
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-huglo-gold transition-all duration-500 group-hover:w-full" />
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
