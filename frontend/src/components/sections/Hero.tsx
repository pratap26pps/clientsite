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
  DollarSign,
  Zap,
} from "lucide-react";
import { TRUST_BADGES, STATS } from "@/lib/constants";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { cn } from "@/lib/utils";

const badgeIcons = {
  "shield-check": ShieldCheck,
  "map-pin": MapPin,
  zap: Zap,
} as const;

const floatingBadges = [
  { icon: ShieldCheck, label: "Australian owned" },
  { icon: DollarSign, label: "Electricity savings" },
  { icon: MapPin, label: "Local energy experts" },
];

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollToQuote = () => {
    document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPackages = () => {
    document.getElementById("technology")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center overflow-hidden"
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/50 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity }}
        className="container-wide relative z-10 px-6 pt-32 pb-24 lg:px-8"
      >
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Hero text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 flex flex-wrap gap-3"
            >
              {TRUST_BADGES.map((badge, i) => {
                const Icon =
                  badgeIcons[badge.icon as keyof typeof badgeIcons] ?? ShieldCheck;
                return (
                  <motion.span
                    key={badge.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm"
                  >
                    <Icon className="size-3.5 text-huglo-gold" />
                    {badge.label}
                  </motion.span>
                );
              })}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-4xl leading-[1.1] font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Your energy mate for{" "}
              <span className="text-gradient-gold">Canberra solar</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/75"
            >
              Capital Solar Energy is your one-stop energy shop — premium solar,
              battery storage, and heat pumps custom-designed for Canberra and
              Southern NSW homes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <button onClick={scrollToQuote} className="btn-huglo-gold group">
                Get a quote
                <ArrowRight className="ml-2 size-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button onClick={scrollToPackages} className="btn-huglo-ghost">
                Learn more
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-8 flex items-center gap-2"
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-huglo-gold text-huglo-gold"
                  />
                ))}
              </div>
              <span className="text-sm text-white/70">
                Rated 4.9/5 by Canberra homeowners
              </span>
            </motion.div>
          </div>

          {/* Right: Hero form card (Huglo-style) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="hero-form-card"
          >
            <h3 className="font-heading text-xl font-bold text-huglo-black">
              Save on your household electricity bill
            </h3>
            <p className="mt-2 text-sm text-huglo-grey">
              Get a free, no-obligation quote tailored to your home and energy usage.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-huglo-grey">
                  Your suburb
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mitchell, ACT"
                  className="w-full rounded-xl border border-huglo-grey-light bg-huglo-black/[0.03] px-4 py-3 text-sm text-huglo-black placeholder:text-huglo-grey/60 focus:border-huglo-gold focus:outline-none focus:ring-2 focus:ring-huglo-gold/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-huglo-grey">
                  Quarterly electricity bill
                </label>
                <div className="relative">
                  <span className="absolute top-1/2 left-4 -translate-y-1/2 text-sm text-huglo-grey">
                    $
                  </span>
                  <input
                    type="text"
                    placeholder="500"
                    className="w-full rounded-xl border border-huglo-grey-light bg-huglo-black/[0.03] py-3 pr-4 pl-8 text-sm text-huglo-black placeholder:text-huglo-grey/60 focus:border-huglo-gold focus:outline-none focus:ring-2 focus:ring-huglo-gold/20"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={scrollToQuote}
              className="btn-huglo-dark mt-6 w-full !py-4"
            >
              Continue
              <ArrowRight className="ml-2 size-5" />
            </button>

            <p className="mt-4 text-center text-xs text-huglo-grey">
              Free quote · No obligation · Response within 24 hours
            </p>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 sm:grid-cols-4"
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

      {/* Floating trust badges (Huglo hero icons) */}
      <div className="pointer-events-none absolute inset-0 z-[5] hidden lg:block">
        {floatingBadges.map((badge, i) => (
          <motion.div
            key={badge.label}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 + i * 0.2, duration: 0.5 }}
            className={cn(
              "animate-float absolute flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm",
              i === 0 && "top-[30%] right-[8%]",
              i === 1 && "top-[45%] right-[5%] animate-float-delay-1",
              i === 2 && "top-[60%] right-[10%] animate-float-delay-2"
            )}
          >
            <badge.icon className="size-3.5 text-huglo-gold" />
            {badge.label}
          </motion.div>
        ))}
      </div>

      {/* Scroll down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-white/50">
          Scroll down
        </span>
        <ChevronDown className="scroll-indicator size-5 text-white/50" />
      </motion.div>
    </section>
  );
}