"use client";

import { motion } from "framer-motion";
import { Wallet, Home, Award, Wrench } from "lucide-react";
import { TRUST_CARDS } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/SectionHeading";

const iconMap = {
  wallet: Wallet,
  home: Home,
  award: Award,
  wrench: Wrench,
};

export function TrustSection() {
  return (
    <section className="section-padding relative overflow-hidden bg-white">
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-solar-orange/5 blur-3xl" />
      <div className="container-wide relative">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Built on Trust, Backed by Guarantees"
          description="Every system we install comes with industry-leading warranties and the personal accountability of a locally owned Canberra business."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_CARDS.map((card, index) => {
            const Icon = iconMap[card.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-warm-white p-8 shadow-sm transition-shadow hover:shadow-xl hover:shadow-navy/5"
              >
                <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-solar-orange/5 transition-transform group-hover:scale-150" />
                <div className="relative">
                  <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-navy text-solar-gold transition-colors group-hover:bg-solar-orange group-hover:text-white">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-charcoal">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal/60">
                    {card.description}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-solar-orange transition-all duration-500 group-hover:w-full" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
