"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle2, Loader2, Star, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { reviewFormSchema, type ReviewFormData } from "@/lib/schemas";
import { submitReview } from "@/lib/reviews";
import { cn } from "@/lib/utils";

interface ReviewSubmitModalProps {
  open: boolean;
  onClose: () => void;
  onSubmitted?: () => void;
}

function StarRating({
  value,
  onChange,
  disabled,
}: {
  value: number;
  onChange: (rating: number) => void;
  disabled?: boolean;
}) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={disabled}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(star)}
          className="p-0.5 transition-transform hover:scale-110 disabled:opacity-50"
          aria-label={`Rate ${star} stars`}
        >
          <Star
            className={cn(
              "size-8 transition-colors",
              (hover || value) >= star
                ? "fill-huglo-gold text-huglo-gold"
                : "text-huglo-grey-light"
            )}
          />
        </button>
      ))}
    </div>
  );
}

export function ReviewSubmitModal({
  open,
  onClose,
  onSubmitted,
}: ReviewSubmitModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      name: "",
      location: "",
      rating: 0,
      text: "",
      savings: "",
      system: "",
    },
  });

  const photoFile = watch("photo");

  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setSubmitError(null);
      setPhotoPreview(null);
      reset({
        name: "",
        location: "",
        rating: 0,
        text: "",
        savings: "",
        system: "",
      });
    }
  }, [open, reset]);

  useEffect(() => {
    if (!photoFile) {
      setPhotoPreview(null);
      return;
    }
    const url = URL.createObjectURL(photoFile);
    setPhotoPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [photoFile]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const onSubmit = async (data: ReviewFormData) => {
    setSubmitError(null);
    const result = await submitReview({
      name: data.name,
      location: data.location,
      rating: data.rating,
      text: data.text,
      savings: data.savings,
      system: data.system,
      photo: data.photo,
    });

    if (result.success) {
      setSubmitted(true);
      onSubmitted?.();
    } else {
      setSubmitError(result.error || "Failed to submit review");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6">
          <motion.button
            type="button"
            aria-label="Close modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-huglo-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl"
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-huglo-grey-light/60 bg-white px-6 py-4">
              <h2
                id="review-modal-title"
                className="font-heading text-lg font-bold text-huglo-black sm:text-xl"
              >
                Share Your Review
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="flex size-9 items-center justify-center rounded-full text-huglo-grey transition-colors hover:bg-huglo-grey-light/40 hover:text-huglo-black"
              >
                <X className="size-5" />
              </button>
            </div>

            {submitted ? (
              <div className="px-6 py-10 text-center">
                <CheckCircle2 className="mx-auto size-14 text-huglo-green" />
                <h3 className="mt-5 font-heading text-xl font-bold text-huglo-black">
                  Thank you for your review!
                </h3>
                <p className="mt-2 text-sm text-huglo-grey">
                  Your feedback has been published and will appear in our
                  testimonials section.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-huglo-gold btn-md mt-8"
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5 px-6 py-6"
              >
                <div>
                  <Label>Your Rating</Label>
                  <Controller
                    name="rating"
                    control={control}
                    render={({ field }) => (
                      <div className="mt-2">
                        <StarRating
                          value={field.value}
                          onChange={field.onChange}
                          disabled={isSubmitting}
                        />
                      </div>
                    )}
                  />
                  {errors.rating && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.rating.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="review-name">Your Name</Label>
                  <Input
                    id="review-name"
                    className="mt-1.5 h-11"
                    {...register("name")}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="review-location">Location</Label>
                  <Input
                    id="review-location"
                    placeholder="e.g. Belconnen, ACT"
                    className="mt-1.5 h-11"
                    {...register("location")}
                    aria-invalid={!!errors.location}
                  />
                  {errors.location && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.location.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="review-text">Your Review</Label>
                  <Textarea
                    id="review-text"
                    rows={4}
                    placeholder="Tell us about your experience with Capital Solar Energy..."
                    className="mt-1.5 rounded-xl border-input bg-white px-3.5 py-3 focus-visible:border-huglo-gold focus-visible:ring-2 focus-visible:ring-huglo-gold/20"
                    {...register("text")}
                    aria-invalid={!!errors.text}
                  />
                  {errors.text && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.text.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="review-savings">Savings (optional)</Label>
                    <Input
                      id="review-savings"
                      placeholder="e.g. 80% bill reduction"
                      className="mt-1.5 h-11"
                      {...register("savings")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="review-system">System (optional)</Label>
                    <Input
                      id="review-system"
                      placeholder="e.g. 10kW Solar System"
                      className="mt-1.5 h-11"
                      {...register("system")}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="review-photo">Upload Photo (optional)</Label>
                  <div className="mt-1.5">
                    <label
                      htmlFor="review-photo"
                      className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-huglo-grey-light/80 px-4 py-3 transition-colors hover:border-huglo-gold/50 hover:bg-huglo-gold/5"
                    >
                      <Upload className="size-5 shrink-0 text-huglo-gold" />
                      <span className="text-sm text-huglo-grey">
                        {photoFile ? photoFile.name : "JPG, PNG or WebP up to 5MB"}
                      </span>
                    </label>
                    <input
                      id="review-photo"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="sr-only"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        setValue("photo", file, { shouldValidate: true });
                      }}
                    />
                    {photoPreview && (
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="mt-3 h-24 w-24 rounded-xl border border-huglo-grey-light/60 object-cover"
                      />
                    )}
                    {errors.photo && (
                      <p className="mt-1 text-xs text-destructive">
                        {errors.photo.message}
                      </p>
                    )}
                  </div>
                </div>

                {submitError && (
                  <p className="text-sm text-destructive">{submitError}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-huglo-gold btn-md w-full"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Review"
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
