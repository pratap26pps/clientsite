"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PACKAGE_SERVICE_OPTIONS } from "@/lib/constants";
import {
  packageQuoteFormSchema,
  type PackageQuoteFormData,
} from "@/lib/schemas";
import { cn } from "@/lib/utils";

interface PackageQuoteModalProps {
  open: boolean;
  onClose: () => void;
  defaultService?: string;
}

export function PackageQuoteModal({
  open,
  onClose,
  defaultService = "",
}: PackageQuoteModalProps) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PackageQuoteFormData>({
    resolver: zodResolver(packageQuoteFormSchema),
    defaultValues: {
      firstName: "",
      mobile: "",
      email: "",
      service: defaultService,
      address: "",
      message: "",
    },
  });

  useEffect(() => {
    if (open) {
      setSubmitted(false);
      reset({
        firstName: "",
        mobile: "",
        email: "",
        service: defaultService,
        address: "",
        message: "",
      });
    }
  }, [open, defaultService, reset]);

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

  const onSubmit = async (data: PackageQuoteFormData) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/api/quotes/package`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setSubmitted(true);
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
            aria-labelledby="package-quote-title"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl"
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-huglo-grey-light/60 bg-white px-6 py-4">
              <h2
                id="package-quote-title"
                className="font-heading text-lg font-bold text-huglo-black sm:text-xl"
              >
                Get a Quote
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
                  Quote request received
                </h3>
                <p className="mt-2 text-sm text-huglo-grey">
                  We&apos;ll be in touch shortly to discuss your solar package.
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
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    className="mt-1.5 h-11"
                    {...register("firstName")}
                    aria-invalid={!!errors.firstName}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="mobile">Mobile</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    className="mt-1.5 h-11"
                    {...register("mobile")}
                    aria-invalid={!!errors.mobile}
                  />
                  {errors.mobile && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.mobile.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    className="mt-1.5 h-11"
                    {...register("email")}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="service">Choose Service</Label>
                  <select
                    id="service"
                    className={cn(
                      "mt-1.5 h-11 w-full rounded-xl border border-input bg-white px-3.5 text-base text-huglo-black transition-colors outline-none focus-visible:border-huglo-gold focus-visible:ring-2 focus-visible:ring-huglo-gold/20 md:text-sm",
                      errors.service && "border-destructive"
                    )}
                    {...register("service")}
                    aria-invalid={!!errors.service}
                  >
                    {PACKAGE_SERVICE_OPTIONS.map((option) => (
                      <option key={option.value || "default"} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.service.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    className="mt-1.5 h-11"
                    {...register("address")}
                    aria-invalid={!!errors.address}
                  />
                  {errors.address && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea
                    id="message"
                    rows={4}
                    className="mt-1.5 rounded-xl border-input bg-white px-3.5 py-3 focus-visible:border-huglo-gold focus-visible:ring-2 focus-visible:ring-huglo-gold/20"
                    {...register("message")}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.message.message}
                    </p>
                  )}
                </div>

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
                    "Submit Quote Request"
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
