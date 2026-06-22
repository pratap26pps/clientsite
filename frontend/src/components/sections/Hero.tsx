"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  CircleDollarSign,
  ShieldCheck,
  MapPin,
  Star,
  Zap,
} from "lucide-react";
import { HERO_SHOWCASE, TRUST_BADGES, STATS } from "@/lib/constants";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";

const badgeIcons = {
  "shield-check": ShieldCheck,
  "map-pin": MapPin,
  zap: Zap,
} as const;

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative overflow-hidden bg-[#0a0f1e] pt-24 pb-16 sm:pt-28 sm:pb-20 lg:min-h-[100svh] lg:pt-32 lg:pb-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,107,0,0.08),transparent_50%)]" />

      <motion.div
        style={{ opacity }}
        className="container-wide relative z-10 px-5 sm:px-6 lg:px-8"
      >
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-10 xl:gap-14">
          <div className="max-w-xl lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-5 flex flex-wrap gap-2"
            >
              {TRUST_BADGES.map((badge) => {
                const Icon =
                  badgeIcons[badge.icon as keyof typeof badgeIcons] ??
                  ShieldCheck;
                return (
                  <span
                    key={badge.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm"
                  >
                    <Icon className="size-3 text-huglo-gold" />
                    {badge.label}
                  </span>
                );
              })}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-[2rem] leading-[1.12] font-bold tracking-tight text-white sm:text-5xl lg:text-[3.25rem]"
            >
              Your energy mate for{" "}
              <span className="text-gradient-gold">Canberra solar</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-5 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg"
            >
              Premium solar, battery storage, and heat pumps — custom-designed
              for Canberra and Southern NSW homes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link
                href="/quote"
                className="btn-huglo-gold btn-lg group w-full sm:w-auto"
              >
                Get a quote
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/#packages"
                className="btn-huglo-ghost btn-md w-full sm:w-auto"
              >
                View packages
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 flex items-center gap-2"
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="size-3.5 fill-huglo-gold text-huglo-gold sm:size-4"
                  />
                ))}
              </div>
              <span className="text-xs text-white/60 sm:text-sm">
                Rated 4.9/5 by Canberra homeowners
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full lg:pl-2 xl:pl-4"
          >
            <div className="rounded-[1.5rem] bg-[#060a14] p-1.5 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.65)] sm:rounded-[1.75rem] sm:p-2">
              <div className="relative aspect-[16/10] min-h-[240px] overflow-hidden rounded-[1.125rem] sm:min-h-[300px] sm:rounded-[1.375rem] lg:min-h-[340px] xl:min-h-[380px]">
                <Image
                  src={HERO_SHOWCASE.image}
                  alt={HERO_SHOWCASE.imageAlt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />

                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.55 }}
                  className="absolute left-2 top-2 z-20 sm:left-3 sm:top-3"
                >
                  <div className="rounded-md bg-[#ff6b00] px-2 py-1 shadow-[0_0_16px_rgba(255,107,0,0.4)] sm:px-2.5 sm:py-1.5">
                    <span className="flex items-center gap-1 whitespace-nowrap text-[8px] font-bold uppercase tracking-wide text-white sm:text-[10px]">
                      <Star className="size-2.5 fill-white text-white sm:size-3" />
                      {HERO_SHOWCASE.cecBadge}
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.65 }}
                  className="absolute right-2 top-2 z-10 max-w-[44%] sm:right-3 sm:top-3 sm:max-w-[11.5rem]"
                >
                  <div className="flex items-center gap-2 rounded-xl bg-white/95 px-2 py-1.5 shadow-[0_8px_24px_-6px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:gap-2.5 sm:px-2.5 sm:py-2">
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#fff8eb] sm:size-8">
                      <Star className="size-3.5 fill-[#ffac00] text-[#ffac00]" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-heading text-sm font-bold leading-none text-huglo-black sm:text-base">
                        {HERO_SHOWCASE.familiesCount}
                      </p>
                      <p className="mt-0.5 text-[8px] leading-tight text-huglo-grey sm:text-[10px]">
                        {HERO_SHOWCASE.familiesLabel}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.75 }}
                  className="absolute bottom-2 left-2 z-10 max-w-[48%] sm:bottom-3 sm:left-3 sm:max-w-[12.5rem]"
                >
                  <div className="flex items-center gap-2 rounded-xl bg-white/95 px-2 py-1.5 shadow-[0_8px_24px_-6px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:gap-2.5 sm:px-2.5 sm:py-2">
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#ecfdf3] sm:size-8">
                      <CircleDollarSign className="size-3.5 text-[#22c55e]" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-heading text-sm font-bold leading-none text-huglo-black sm:text-base">
                        {HERO_SHOWCASE.savingsAmount}
                      </p>
                      <p className="mt-0.5 text-[8px] leading-tight text-huglo-grey sm:text-[10px]">
                        {HERO_SHOWCASE.savingsLabel}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.85 }}
                  className="absolute bottom-2 right-2 z-10 sm:bottom-3 sm:right-3"
                >
                  <div className="flex items-center gap-1.5 rounded-full bg-[#101010]/90 px-2.5 py-1.5 backdrop-blur-sm sm:gap-2 sm:px-3 sm:py-1.5">
                    <span className="relative flex size-1.5 sm:size-2">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#22c55e] opacity-60" />
                      <span className="relative inline-flex size-full rounded-full bg-[#22c55e]" />
                    </span>
                    <span className="whitespace-nowrap text-[8px] font-medium text-white sm:text-[10px]">
                      {HERO_SHOWCASE.availability}
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-14 grid grid-cols-2 gap-6 border-t border-white/10 pt-10 sm:grid-cols-4 sm:gap-8"
        >
          {STATS.map((stat) => (
            <AnimatedCounter
              key={stat.label}
              value={stat.value}
              label={stat.label}
              dark
            />
          ))}
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1.5 lg:flex">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
          Scroll
        </span>
        <ChevronDown className="scroll-indicator size-4 text-white/40" />
      </div>
    </section>
  );
}
