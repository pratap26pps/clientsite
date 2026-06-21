"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function ConversionBanner() {
  const scrollToQuote = () => {
    document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-padding relative overflow-hidden bg-huglo-black-bg">
      <div className="container-wide relative px-6 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-heading mx-auto max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready for a system engineered{" "}
            <span className="text-gradient-gold">specially for your roof?</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
            Every roof is different. We design systems around your energy usage,
            roof orientation, and budget — not off-the-shelf packages.
          </p>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-12"
          >
            <button onClick={scrollToQuote} className="btn-huglo-gold group">
              Get a quote
              <ArrowRight className="ml-2 size-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>

          <p className="mt-6 text-sm text-white/40">
            No obligation · Free on-site assessment · Response within 24 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
}
