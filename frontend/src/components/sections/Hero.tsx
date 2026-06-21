"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  MapPin,
  Star,
  ChevronDown,
  Zap,
} from "lucide-react";
import { TRUST_BADGES, STATS } from "@/lib/constants";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";

const badgeIcons = {
  "shield-check": ShieldCheck,
  "map-pin": MapPin,
  zap: Zap,
} as const;

const quickSteps = [
  "Enter your details and energy usage",
  "Receive a custom design and quote",
  "Professional installation and support",
];

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const scrollToQuote = () => {
    document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPackages = () => {
    document.getElementById("technology")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=85"
          alt="Modern Australian home with solar panels in Canberra"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/55 to-black/85" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="container-wide relative z-10 px-5 pt-28 pb-28 sm:px-6 sm:pt-32 lg:px-8"
      >
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-5 flex flex-wrap gap-2"
            >
              {TRUST_BADGES.map((badge) => {
                const Icon =
                  badgeIcons[badge.icon as keyof typeof badgeIcons] ?? ShieldCheck;
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
              <button
                onClick={scrollToQuote}
                className="btn-huglo-gold btn-lg group w-full sm:w-auto"
              >
                Get a quote
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
              <button
                onClick={scrollToPackages}
                className="btn-huglo-ghost btn-md w-full sm:w-auto"
              >
                Learn more
              </button>
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
            className="hero-form-card"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-huglo-gold">
              Free quote
            </p>
            <h3 className="mt-2 font-heading text-xl font-bold text-huglo-black sm:text-2xl">
              Save on your household electricity bill
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-huglo-grey">
              Tell us about your home and we&apos;ll design a system with a full
              breakdown of costs and savings.
            </p>

            <ul className="mt-6 space-y-3">
              {quickSteps.map((step, i) => (
                <li key={step} className="flex items-start gap-3 text-sm text-huglo-black">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-huglo-gold/15 text-xs font-bold text-huglo-gold">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ul>

            <button
              onClick={scrollToQuote}
              className="btn-huglo-dark btn-md mt-8 w-full"
            >
              Get started
              <ArrowRight className="size-4" />
            </button>

            <p className="mt-4 text-center text-xs text-huglo-grey">
              No obligation · Response within 24 hours
            </p>
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
