"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PARTNER_LOGOS } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function PartnersSection() {
  return (
    <section id="partners" className="section-padding bg-warm-white">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Trusted brands"
          title="Our Proud Partners"
          description="We install Tier-1 hardware from the world's most trusted solar manufacturers."
        />

        <div className="mt-12 grid grid-cols-2 items-center gap-6 sm:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          {PARTNER_LOGOS.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="flex h-24 items-center justify-center rounded-2xl border border-huglo-grey-light/60 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:h-28"
            >
              <Image
                src={partner.src}
                alt={partner.name}
                width={160}
                height={64}
                className="max-h-12 w-auto object-contain sm:max-h-14"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
