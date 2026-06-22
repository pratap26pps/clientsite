"use client";

import { Star, Quote } from "lucide-react";
import type { Review } from "@/lib/reviews";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  review: Review;
  compact?: boolean;
  className?: string;
}

export function ReviewCard({ review, compact, className }: ReviewCardProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6",
        className
      )}
    >
      <Quote className="size-6 text-huglo-gold/30 sm:size-7" />

      <p
        className={cn(
          "mt-4 flex-1 leading-relaxed text-white/85",
          compact ? "text-sm line-clamp-5" : "text-sm sm:text-base line-clamp-6"
        )}
      >
        &ldquo;{review.text}&rdquo;
      </p>

      <div className="mt-5 border-t border-white/10 pt-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate font-heading text-sm font-bold sm:text-base">
              {review.name}
            </div>
            <div className="truncate text-xs text-white/45 sm:text-sm">
              {review.location}
            </div>
            <div className="mt-1.5 flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "size-3 sm:size-3.5",
                    i < review.rating
                      ? "fill-huglo-gold text-huglo-gold"
                      : "text-white/15"
                  )}
                />
              ))}
            </div>
          </div>

          {review.photoUrl && (
            <img
              src={review.photoUrl}
              alt={`Review by ${review.name}`}
              className="size-12 shrink-0 rounded-xl border border-white/10 object-cover sm:size-14"
            />
          )}
        </div>

        {(review.savings || review.system) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {review.savings && (
              <div className="rounded-lg border border-huglo-gold/20 bg-huglo-gold/10 px-2.5 py-1.5">
                <div className="text-[9px] uppercase tracking-wide text-white/45">
                  Savings
                </div>
                <div className="text-xs font-bold text-huglo-gold">
                  {review.savings}
                </div>
              </div>
            )}
            {review.system && (
              <div className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5">
                <div className="text-[9px] uppercase tracking-wide text-white/45">
                  System
                </div>
                <div className="text-xs font-semibold">{review.system}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
