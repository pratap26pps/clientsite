"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Phone,
  TrendingUp,
  DollarSign,
  Battery,
  Lock,
  Sun,
} from "lucide-react";
import { SAVINGS_SECTION, SITE } from "@/lib/constants";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const featureIcons = {
  trending: TrendingUp,
  dollar: DollarSign,
  battery: Battery,
  lock: Lock,
} as const;

export function TrustSection() {
  return (
    <section className="bg-white">
      <div className="container-wide section-padding">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left — image + before/after card */}
          <ScrollReveal direction="left" className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[5/6]">
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&q=85"
                alt="Canberra home with keys — household electricity savings"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Before / After overlay card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute right-4 -bottom-6 left-4 rounded-2xl bg-white p-5 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.18)] ring-1 ring-black/5 sm:right-6 sm:left-6 sm:p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-center">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-huglo-grey">
                    Before
                  </p>
                  <p className="mt-1 font-heading text-3xl font-bold text-huglo-salmon sm:text-4xl">
                    {SAVINGS_SECTION.beforeAmount}
                  </p>
                </div>

                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-huglo-gold/15">
                  <ArrowRight className="size-5 text-huglo-gold" />
                </div>

                <div className="text-center">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-huglo-grey">
                    After
                  </p>
                  <p className="mt-1 font-heading text-3xl font-bold text-huglo-green sm:text-4xl">
                    {SAVINGS_SECTION.afterAmount}
                  </p>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Right — copy + features + CTA */}
          <ScrollReveal direction="right" delay={0.1}>
            <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight text-huglo-black sm:text-4xl lg:text-[2.75rem]">
              {SAVINGS_SECTION.title}{" "}
              <span className="text-huglo-gold">{SAVINGS_SECTION.titleHighlight}</span>
            </h2>

            <p className="mt-5 text-base leading-relaxed text-huglo-grey sm:text-lg">
              {SAVINGS_SECTION.description}
            </p>

            <ul className="mt-8 space-y-5">
              {SAVINGS_SECTION.features.map((feature, i) => {
                const Icon =
                  featureIcons[feature.icon as keyof typeof featureIcons] ??
                  TrendingUp;
                return (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex gap-4"
                  >
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-warm-white ring-1 ring-huglo-grey-light/60">
                      <Icon className="size-5 text-huglo-grey" strokeWidth={1.75} />
                    </div>
                    <p className="pt-0.5 text-sm leading-relaxed text-huglo-black/80 sm:text-base">
                      {feature.text}
                    </p>
                  </motion.li>
                );
              })}
            </ul>

            <Link
              href="/quote"
              className="btn-huglo-gold btn-lg group mt-10 w-full sm:w-auto"
            >
              {SAVINGS_SECTION.cta}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Spacer for overlapping before/after card */}
        <div className="h-8 lg:h-4" />
      </div>

      {/* Dark savings footer bar */}
      <div className="bg-huglo-black-bg">
        <div className="container-wide flex flex-col items-start justify-between gap-4 px-5 py-5 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p className="max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
            {SAVINGS_SECTION.footerNote}
          </p>
          <div className="flex shrink-0 items-center gap-3">
            <a
              href={SITE.phoneHref}
              className="btn-huglo-outline btn-sm !border-white/20 !bg-transparent !text-white hover:!border-huglo-gold hover:!bg-white/5 hover:!text-white"
            >
              <Phone className="size-4" />
              Call Now
            </a>
            <Link
              href="/quote"
              className="flex size-10 items-center justify-center rounded-full bg-huglo-gold text-huglo-black transition-colors hover:bg-white"
              aria-label="Get a quote"
            >
              <Sun className="size-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
