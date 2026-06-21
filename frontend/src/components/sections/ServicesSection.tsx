"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sun, Battery, Thermometer, ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/shared/ScrollReveal";

const iconMap = {
  sun: Sun,
  battery: Battery,
  thermometer: Thermometer,
};

export function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-warm-white">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Our services"
          title="Complete energy solutions for your home"
          description="From solar generation to storage and hot water — we deliver end-to-end energy systems engineered for Canberra conditions."
        />

        <StaggerContainer className="mt-16 grid gap-8 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            return (
              <StaggerItem key={service.id}>
                <Link href={service.href} className="group block h-full">
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="card-huglo relative h-full overflow-hidden p-10"
                  >
                    <div className="mb-8 flex size-16 items-center justify-center rounded-2xl bg-huglo-black-bg text-huglo-gold transition-colors duration-300 group-hover:bg-huglo-gold group-hover:text-huglo-black">
                      <Icon className="size-7" />
                    </div>

                    <h3 className="font-heading text-2xl font-bold text-huglo-black">
                      {service.title}
                    </h3>
                    <p className="mt-4 leading-relaxed text-huglo-grey">
                      {service.description}
                    </p>

                    <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-huglo-gold">
                      Learn more
                      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
