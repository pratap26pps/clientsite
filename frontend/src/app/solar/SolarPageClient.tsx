"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SOLAR_PAGE } from "@/lib/page-content";

type SolarTab = "panels" | "inverters";

export function SolarPageClient() {
  const [tab, setTab] = useState<SolarTab>("panels");
  const active = SOLAR_PAGE.tabs[tab];

  return (
    <>
      <PageHero
        eyebrow={SOLAR_PAGE.hero.eyebrow}
        title={SOLAR_PAGE.hero.title}
        description={SOLAR_PAGE.hero.description}
      />

      <section className="section-padding bg-warm-white">
        <div className="container-wide">
          <SectionHeading
            eyebrow={SOLAR_PAGE.education.eyebrow}
            title={SOLAR_PAGE.education.title}
            description={SOLAR_PAGE.education.description}
            align="center"
          />

          <div className="mt-10 flex justify-center">
            <div className="inline-flex rounded-full border border-charcoal/10 bg-white p-1 shadow-sm">
              {(["panels", "inverters"] as const).map((id) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 sm:px-7 ${
                    tab === id
                      ? "bg-[#0a0f1e] text-white shadow-md"
                      : "text-charcoal/60 hover:text-charcoal"
                  }`}
                >
                  {id === "panels" ? "☀️ Solar Panels" : "⚡ Smart Inverters"}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-14"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-huglo-green">
                  {active.eyebrow}
                </span>
                <h2 className="mt-3 font-heading text-3xl font-bold text-charcoal sm:text-4xl">
                  {active.title}
                </h2>
                <p className="mt-4 leading-relaxed text-charcoal/70">
                  {active.description}
                </p>

                <ul className="mt-8 space-y-3">
                  {active.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-huglo-green/15">
                        <Check className="size-3 text-huglo-green" />
                      </span>
                      <span className="text-sm leading-relaxed text-charcoal/80 sm:text-base">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-16 text-center">
            <Link href="/quote" className="btn-huglo-gold btn-md inline-flex items-center gap-2">
              Get Your Custom Solar Quote
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
