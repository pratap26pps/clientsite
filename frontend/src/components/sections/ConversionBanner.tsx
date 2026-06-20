"use client";

import { motion } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ConversionBanner() {
  const scrollToQuote = () => {
    document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-navy py-24 lg:py-32">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-solar-orange/20 blur-[120px]" />
        <div className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-solar-gold/10 blur-[120px]" />
      </div>

      <div className="container-wide relative px-6 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-solar-gold/30 bg-solar-gold/10 px-4 py-2 text-sm font-medium text-solar-gold">
            <Zap className="size-4" />
            Free Custom Design
          </div>

          <h2 className="font-heading mx-auto max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
            Ready for a System Engineered{" "}
            <span className="text-gradient-gold">Specially For Your Roof?</span>
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
            <Button
              onClick={scrollToQuote}
              className="group h-16 rounded-full bg-solar-orange px-10 text-base font-bold tracking-wide uppercase shadow-2xl shadow-solar-orange/40 hover:bg-solar-orange-light sm:text-lg"
            >
              <Zap className="mr-3 size-5" />
              Get a Customised Quote For Your Property
              <ArrowRight className="ml-3 size-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          <p className="mt-6 text-sm text-white/40">
            No obligation · Free on-site assessment · Response within 24 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
}
