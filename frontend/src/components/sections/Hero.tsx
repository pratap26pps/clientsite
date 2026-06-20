"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  MapPin,
  Star,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TRUST_BADGES, STATS } from "@/lib/constants";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";

const badgeIcons = {
  "shield-check": ShieldCheck,
  "map-pin": MapPin,
  zap: ShieldCheck,
} as const;

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      const el = containerRef.current?.querySelector("[data-parallax]");
      if (el instanceof HTMLElement) {
        el.style.transform = `translate(${x}px, ${y}px)`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-navy/30" />
      </motion.div>

      <div
        data-parallax
        className="pointer-events-none absolute top-1/4 right-0 hidden h-[500px] w-[500px] rounded-full bg-solar-orange/10 blur-[120px] transition-transform duration-300 lg:block"
      />

      <motion.div
        style={{ y: contentY, opacity }}
        className="container-wide relative z-10 px-6 pt-32 pb-20 lg:px-8"
      >
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 flex flex-wrap gap-3"
          >
            {TRUST_BADGES.map((badge) => {
              const Icon =
                badgeIcons[badge.icon as keyof typeof badgeIcons] ?? ShieldCheck;
              return (
                <span
                  key={badge.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm"
                >
                  <Icon className="size-3.5 text-solar-gold" />
                  {badge.label}
                </span>
              );
            })}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-4xl leading-[1.1] font-bold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            Lower Your Canberra Energy Bills with{" "}
            <span className="text-gradient-gold">Premium, Locally Installed</span>{" "}
            Solar.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl"
          >
            Capital Solar Energy provides Tier-1 solar systems, smart battery
            storage, and energy-efficient heat pumps custom-designed for Canberra
            and Southern NSW homes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button
              onClick={scrollToQuote}
              className="group h-14 rounded-full bg-solar-orange px-8 text-base font-semibold shadow-xl shadow-solar-orange/30 hover:bg-solar-orange-light"
            >
              Get Instant Quote
              <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              onClick={scrollToPackages}
              variant="outline"
              className="h-14 rounded-full border-white/30 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/20"
            >
              View Packages
            </Button>
          </motion.div>

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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-8 flex items-center gap-2"
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="size-4 fill-solar-gold text-solar-gold"
                />
              ))}
            </div>
            <span className="text-sm text-white/70">
              Rated 4.9/5 by Canberra homeowners
            </span>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <ChevronDown className="size-6 animate-bounce text-white/50" />
      </motion.div>
    </section>
  );
}
