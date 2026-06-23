"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ReviewCard } from "@/components/shared/ReviewCard";
import {
  fetchReviews,
  staticTestimonialsToReviews,
  sortReviewsTopRated,
  chunkReviews,
  type Review,
} from "@/lib/reviews";

const CARDS_PER_VIEW = 4;
const AUTO_INTERVAL = 6000;

export function TestimonialsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const loadReviews = useCallback(async () => {
    const apiReviews = await fetchReviews();
    const staticReviews = staticTestimonialsToReviews();
    const merged = sortReviewsTopRated([...staticReviews, ...apiReviews]);
    setReviews(merged);
  }, []);

  useEffect(() => {
    loadReviews();
    const onReviewSubmitted = () => loadReviews();
    window.addEventListener("review-submitted", onReviewSubmitted);
    return () => window.removeEventListener("review-submitted", onReviewSubmitted);
  }, [loadReviews]);

  const pages = useMemo(
    () => chunkReviews(reviews, CARDS_PER_VIEW),
    [reviews]
  );

  const next = useCallback(() => {
    if (pages.length <= 1) return;
    setDirection(1);
    setCurrentPage((prev) => (prev + 1) % pages.length);
  }, [pages.length]);

  const prev = () => {
    if (pages.length <= 1) return;
    setDirection(-1);
    setCurrentPage((prev) => (prev - 1 + pages.length) % pages.length);
  };

  useEffect(() => {
    if (pages.length <= 1) return;
    const timer = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(timer);
  }, [next, pages.length]);

  const currentReviews = pages[currentPage] ?? [];

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 30 : -30 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -30 : 30 }),
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

        <div className="relative mt-12 sm:mt-16">
          <div className="flex items-center gap-3 sm:gap-4">
            {pages.length > 1 && (
              <button
                onClick={prev}
                className="btn-huglo-carousel hidden shrink-0 sm:flex"
                aria-label="Previous reviews"
              >
                <ChevronLeft className="size-5" />
              </button>
            )}

            <div className="min-w-0 flex-1 overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentPage}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4"
                >
                  {currentReviews.map((review) => (
                    <ReviewCard key={review.id} review={review} compact />
                  ))}
                </motion.div>
              </AnimatePresence>

              {pages.length > 1 && (
                <div className="mt-6 flex justify-center gap-1.5">
                  {pages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setDirection(i > currentPage ? 1 : -1);
                        setCurrentPage(i);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === currentPage
                          ? "w-6 bg-huglo-gold"
                          : "w-1.5 bg-white/20 hover:bg-white/35"
                      }`}
                      aria-label={`Go to review page ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {pages.length > 1 && (
              <button
                onClick={next}
                className="btn-huglo-carousel hidden shrink-0 sm:flex"
                aria-label="Next reviews"
              >
                <ChevronRight className="size-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
