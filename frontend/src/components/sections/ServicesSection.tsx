"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sun, Battery, Thermometer, ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/SectionHeading";

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
          eyebrow="Our Services"
          title="Complete Energy Solutions for Your Home"
          description="From solar generation to storage and hot water — we deliver end-to-end energy systems engineered for Canberra conditions."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Link href={service.href} className="group block h-full">
                  <div className="relative h-full overflow-hidden rounded-3xl border border-border/60 bg-white p-10 transition-all duration-500 hover:border-solar-orange/30 hover:shadow-2xl hover:shadow-navy/5">
                    <motion.div
                      className="mb-8 flex size-16 items-center justify-center rounded-2xl bg-navy text-solar-gold"
                      whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                    >
                      <Icon className="size-7" />
                    </motion.div>

                    <h3 className="font-heading text-2xl font-bold text-charcoal">
                      {service.title}
                    </h3>
                    <p className="mt-4 leading-relaxed text-charcoal/60">
                      {service.description}
                    </p>

                    <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-solar-orange">
                      Learn more
                      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>

                    <div className="absolute -right-8 -bottom-8 size-32 rounded-full bg-solar-orange/5 transition-transform duration-500 group-hover:scale-150" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
