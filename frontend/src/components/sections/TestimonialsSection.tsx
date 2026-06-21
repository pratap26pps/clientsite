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
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  const testimonial = TESTIMONIALS[current];

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -40 : 40, opacity: 0 }),
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

        <div className="relative mx-auto mt-12 max-w-3xl sm:mt-16">
          <div className="flex items-stretch gap-3 sm:gap-4">
            <button
              onClick={prev}
              className="btn-huglo-carousel self-center"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="size-5" />
            </button>

            <div className="min-w-0 flex-1">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8"
                >
                  <Quote className="size-8 text-huglo-gold/30" />

                  <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="font-heading font-bold">{testimonial.name}</div>
                      <div className="text-sm text-white/45">{testimonial.location}</div>
                      <div className="mt-1.5 flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="size-3.5 fill-huglo-gold text-huglo-gold"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="rounded-xl border border-huglo-gold/20 bg-huglo-gold/10 px-3 py-2 text-center">
                        <div className="text-[10px] uppercase tracking-wide text-white/45">
                          Savings
                        </div>
                        <div className="font-heading text-sm font-bold text-huglo-gold">
                          {testimonial.savings}
                        </div>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center">
                        <div className="text-[10px] uppercase tracking-wide text-white/45">
                          System
                        </div>
                        <div className="text-sm font-semibold">{testimonial.system}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-5 flex justify-center gap-1.5">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > current ? 1 : -1);
                      setCurrent(i);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-6 bg-huglo-gold"
                        : "w-1.5 bg-white/20 hover:bg-white/35"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={next}
              className="btn-huglo-carousel self-center"
              aria-label="Next testimonial"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
