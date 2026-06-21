"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prev = () => {
    setDirection(-1);
    setCurrent(
      (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
    );
  };

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const testimonial = TESTIMONIALS[current];

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <section id="testimonials" className="section-padding bg-huglo-black-bg text-white">
      <div className="container-wide">
        <SectionHeading
          eyebrow="What people are saying"
          title="Trusted by Canberra homeowners"
          description="Real results from real customers across the ACT and Southern NSW."
          dark
        />

        <div className="relative mx-auto mt-16 max-w-4xl">
          {/* Huglo-style circular nav buttons above carousel */}
          <div className="mb-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="btn-huglo-carousel"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="size-6 text-huglo-grey" />
            </button>
            <button
              onClick={next}
              className="btn-huglo-carousel"
              aria-label="Next testimonial"
            >
              <ChevronRight className="size-6 text-huglo-grey" />
            </button>
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm lg:p-12"
            >
              <Quote className="size-10 text-huglo-gold/40" />

              <p className="mt-6 text-xl leading-relaxed text-white/90 lg:text-2xl">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
                <div>
                  <div className="font-heading text-lg font-bold">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-white/50">
                    {testimonial.location}
                  </div>
                  <div className="mt-2 flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="size-4 fill-huglo-gold text-huglo-gold"
                      />
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="rounded-2xl border border-huglo-gold/30 bg-huglo-gold/10 px-4 py-3 text-center">
                    <div className="text-xs text-white/50">Energy Savings</div>
                    <div className="font-heading text-lg font-bold text-huglo-gold">
                      {testimonial.savings}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center">
                    <div className="text-xs text-white/50">System</div>
                    <div className="text-sm font-semibold">
                      {testimonial.system}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-8 bg-huglo-gold"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
