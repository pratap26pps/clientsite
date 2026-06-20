"use client";

import { motion } from "framer-motion";
import { MapPin, Shield, CheckCircle2 } from "lucide-react";
import { SERVICE_REGIONS } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/SectionHeading";

const complianceItems = [
  "CEC Approved Retailer — Clean Energy Council accredited",
  "All installations by ACT licensed electricians",
  "Full Evoenergy grid connection management",
  "Compliance with ACT building and electrical codes",
  "STC rebate processing included in every quote",
  "Net metering and feed-in tariff setup",
];

export function LocalTrustSection() {
  return (
    <section className="section-padding bg-warm-white">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Local Expertise"
          title="Canberra's Trusted Solar Partner"
          description="Deep local knowledge, ACT regulatory expertise, and hundreds of successful installations across the capital region."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="overflow-hidden rounded-3xl border border-border/60 shadow-xl">
              <iframe
                title="Capital Solar Energy Service Area - Canberra ACT"
                src="https://maps.google.com/maps?q=Canberra+ACT+Australia&t=&z=11&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="400"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[20%]"
              />
            </div>

            <div className="mt-8">
              <h3 className="flex items-center gap-2 font-heading text-xl font-bold text-charcoal">
                <MapPin className="size-5 text-solar-orange" />
                Service Regions
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {SERVICE_REGIONS.map((region) => (
                  <span
                    key={region}
                    className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-charcoal/70"
                  >
                    {region}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center"
          >
            <div className="rounded-3xl border border-border/60 bg-white p-8 lg:p-10">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-xl bg-navy">
                  <Shield className="size-6 text-solar-gold" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-charcoal">
                    ACT Compliance & Standards
                  </h3>
                  <p className="text-sm text-charcoal/60">
                    Fully licensed and accredited
                  </p>
                </div>
              </div>

              <ul className="space-y-4">
                {complianceItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-solar-orange" />
                    <span className="text-sm leading-relaxed text-charcoal/70">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { value: "500+", label: "Local Projects" },
                { value: "15+", label: "Years in ACT" },
                { value: "100%", label: "Local Team" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border/60 bg-white p-6 text-center"
                >
                  <div className="font-heading text-2xl font-bold text-solar-orange">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-medium text-charcoal/60">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
