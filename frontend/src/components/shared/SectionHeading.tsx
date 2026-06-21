"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em]",
            dark ? "text-huglo-gold" : "text-huglo-gold"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight",
          dark ? "text-white" : "text-huglo-black"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed",
            dark ? "text-white/70" : "text-huglo-grey"
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
