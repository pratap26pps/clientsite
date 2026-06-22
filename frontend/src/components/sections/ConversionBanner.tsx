"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function ConversionBanner() {
  return (
    <section className="section-padding relative overflow-hidden bg-huglo-black-bg">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,172,0,0.06),transparent_70%)]" />

      <div className="container-wide relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-heading mx-auto max-w-3xl text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Ready for a system engineered{" "}
            <span className="text-gradient-gold">for your roof?</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base text-white/55 sm:text-lg">
            Every roof is different. We design around your usage, orientation,
            and budget — not off-the-shelf packages.
          </p>

          <Link
            href="/quote"
            className="btn-huglo-gold btn-lg group mt-8 inline-flex"
          >
            Get a quote
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>

          <p className="mt-4 text-xs text-white/35 sm:text-sm">
            No obligation · Free on-site assessment · Response within 24 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
}
