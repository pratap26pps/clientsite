"use client";

import { motion } from "framer-motion";
import { MapPin, Shield, CheckCircle2 } from "lucide-react";
import { SERVICE_REGIONS } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

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
          eyebrow="Local expertise"
          title="Canberra's trusted solar partner"
          description="Deep local knowledge, ACT regulatory expertise, and hundreds of successful installations across the capital region."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <ScrollReveal direction="left">
            <div className="overflow-hidden rounded-3xl border border-huglo-grey-light shadow-xl">
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
              <h3 className="flex items-center gap-2 font-heading text-xl font-bold text-huglo-black">
                <MapPin className="size-5 text-huglo-gold" />
                Service Regions
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {SERVICE_REGIONS.map((region) => (
                  <span
                    key={region}
                    className="rounded-full border border-huglo-grey-light bg-white px-4 py-2 text-sm font-medium text-huglo-grey transition-colors duration-300 hover:border-huglo-gold hover:text-huglo-black"
                  >
                    {region}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="flex flex-col justify-center">
              <div className="card-huglo p-8 lg:p-10">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-huglo-black-bg">
                    <Shield className="size-6 text-huglo-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-huglo-black">
                      ACT Compliance & Standards
                    </h3>
                    <p className="text-sm text-huglo-grey">
                      Fully licensed and accredited
                    </p>
                  </div>
                </div>

                <ul className="space-y-4">
                  {complianceItems.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-huglo-gold" />
                      <span className="text-sm leading-relaxed text-huglo-grey">
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
                  <motion.div
                    key={stat.label}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="card-huglo p-6 text-center"
                  >
                    <div className="font-heading text-2xl font-bold text-huglo-gold">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-xs font-medium text-huglo-grey">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
