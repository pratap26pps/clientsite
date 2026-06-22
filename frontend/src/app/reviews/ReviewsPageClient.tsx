"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ReviewCard } from "@/components/shared/ReviewCard";
import {
  fetchReviews,
  staticTestimonialsToReviews,
  sortReviewsTopRated,
  type Review,
} from "@/lib/reviews";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const loadReviews = useCallback(async () => {
    setLoading(true);
    const apiReviews = await fetchReviews();
    const staticReviews = staticTestimonialsToReviews();
    const merged = sortReviewsTopRated([...staticReviews, ...apiReviews]);
    setReviews(merged);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadReviews();
    const onReviewSubmitted = () => loadReviews();
    window.addEventListener("review-submitted", onReviewSubmitted);
    return () => window.removeEventListener("review-submitted", onReviewSubmitted);
  }, [loadReviews]);

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : "5.0";

  return (
    <div className="min-h-screen bg-huglo-black-bg pt-24 text-white sm:pt-28">
      <div className="container-wide section-padding">
        <SectionHeading
          eyebrow="Customer Reviews"
          title="See what our customers say"
          description="Browse all reviews from Canberra homeowners who chose Capital Solar Energy."
          dark
        />

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 rounded-full border border-huglo-gold/25 bg-huglo-gold/10 px-4 py-2">
            <Star className="size-4 fill-huglo-gold text-huglo-gold" />
            <span className="font-heading text-sm font-bold text-huglo-gold">
              {avgRating} average
            </span>
            <span className="text-sm text-white/50">
              · {reviews.length} reviews
            </span>
          </div>
          <Link href="/#testimonials" className="btn-huglo-gold btn-sm">
            Back to homepage
          </Link>
        </div>

        {loading ? (
          <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-2xl border border-white/10 bg-white/[0.04]"
              />
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <p className="mt-16 text-center text-white/50">
            No reviews yet. Be the first to share your experience!
          </p>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
