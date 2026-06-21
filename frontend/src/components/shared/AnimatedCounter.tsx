"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  label: string;
  dark?: boolean;
}

export function AnimatedCounter({ value, label, dark = false }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const numericPart = parseFloat(value.replace(/[^0-9.]/g, ""));
    const suffix = value.replace(/[0-9.]/g, "");
    const isDecimal = value.includes(".");
    const duration = 2000;
    const start = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numericPart * eased;

      setDisplay(
        isDecimal
          ? current.toFixed(1) + suffix
          : Math.floor(current) + suffix
      );

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-heading text-3xl font-bold text-huglo-gold sm:text-4xl">
        {display}
      </div>
      <div
        className={`mt-2 text-sm font-medium ${dark ? "text-white/60" : "text-charcoal/60"}`}
      >
        {label}
      </div>
    </div>
  );
}
