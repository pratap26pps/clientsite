"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, Play } from "lucide-react";
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
    enter: (d: number) => ({ x: d > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -100 : 100, opacity: 0 }),
  };

  return (
    <section id="testimonials" className="section-padding bg-navy text-white">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Client Stories"
          title="What Canberra Homeowners Say"
          description="Real results from real customers across the ACT and Southern NSW."
          dark
        />

        <div className="relative mx-auto mt-16 max-w-4xl">
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
              <Quote className="size-10 text-solar-gold/40" />

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
                        className="size-4 fill-solar-gold text-solar-gold"
                      />
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="rounded-xl border border-solar-orange/30 bg-solar-orange/10 px-4 py-3 text-center">
                    <div className="text-xs text-white/50">Energy Savings</div>
                    <div className="font-heading text-lg font-bold text-solar-orange">
                      {testimonial.savings}
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center">
                    <div className="text-xs text-white/50">System</div>
                    <div className="text-sm font-semibold">
                      {testimonial.system}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    i === current
                      ? "w-8 bg-solar-orange"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={prev}
                className="flex size-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-white/30 hover:text-white"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                onClick={next}
                className="flex size-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-white/30 hover:text-white"
                aria-label="Next testimonial"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="group relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-solar-orange/80 text-white transition-transform group-hover:scale-110">
                  <Play className="ml-1 size-6" />
                </div>
              </div>
              <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-navy/90 p-4">
                <div className="text-sm font-medium">Video Testimonial</div>
                <div className="text-xs text-white/50">
                  Canberra homeowner #{i}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
