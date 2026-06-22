"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Upload,
  X,
  CheckCircle2,
  Loader2,
  FileText,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  quoteFormSchema,
  BILL_RANGES,
  type QuoteFormData,
} from "@/lib/schemas";
import { SectionHeading } from "@/components/shared/SectionHeading";

const STEPS = ["Your Details", "Property Info", "Upload Bill"];

export function QuoteFormSection({ standalone = false }: { standalone?: boolean }) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      postcode: "",
      electricityBill: "",
    },
  });

  const billFile = watch("billFile");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("billFile", file);
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (ev) => setPreview(ev.target?.result as string);
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    }
  };

  const removeFile = () => {
    setValue("billFile", undefined);
    setPreview(null);
  };

  const nextStep = async () => {
    let fields: (keyof QuoteFormData)[] = [];
    if (step === 0) fields = ["fullName", "phone"];
    if (step === 1) fields = ["postcode", "electricityBill"];

    const valid = await trigger(fields);
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const onSubmit = async (data: QuoteFormData) => {
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("phone", data.phone);
      formData.append("postcode", data.postcode);
      formData.append("electricityBill", data.electricityBill);
      if (data.billFile) formData.append("billFile", data.billFile);

      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/api/quotes`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const progress = ((step + 1) / STEPS.length) * 100;
  const sectionClass = standalone
    ? "pb-16 lg:pb-24"
    : "section-padding bg-warm-white";

  if (submitted) {
    return (
      <section id="quote-form" className={sectionClass}>
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="form-card mx-auto max-w-lg p-10 text-center"
          >
            <CheckCircle2 className="mx-auto size-14 text-huglo-green" />
            <h3 className="mt-5 font-heading text-xl font-bold text-huglo-black sm:text-2xl">
              Quote request received
            </h3>
            <p className="mt-3 text-sm text-huglo-grey sm:text-base">
              Thank you for your enquiry. Our Canberra team will contact you
              within 24 hours with a customised solar proposal.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="quote-form" className={sectionClass}>
      <div className="container-wide">
        <SectionHeading
          eyebrow="Get in touch with our energy experts"
          title="Request your free custom quote"
          description="Tell us about your property and energy usage — we'll design a system tailored to your needs."
        />

        <div className="mx-auto mt-12 max-w-xl sm:mt-14">
          {/* Step indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {STEPS.map((label, i) => (
                <div key={label} className="flex flex-1 flex-col items-center">
                  <div
                    className={`flex size-8 items-center justify-center rounded-full text-sm font-bold transition-colors duration-300 ${
                      i <= step
                        ? "bg-huglo-gold text-huglo-black"
                        : "bg-huglo-grey-light/50 text-huglo-grey"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span
                    className={`mt-2 hidden text-center text-xs sm:block ${
                      i <= step ? "font-semibold text-huglo-black" : "text-huglo-grey"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <Progress value={progress} className="mt-4 h-1.5" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="form-card">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="step-0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      {...register("fullName")}
                      placeholder="John Smith"
                      className="mt-2 h-12"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      {...register("phone")}
                      placeholder="0413 000 000"
                      className="mt-2 h-12"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <Label htmlFor="postcode">Installation Postcode</Label>
                    <Input
                      id="postcode"
                      {...register("postcode")}
                      placeholder="2600"
                      maxLength={4}
                      className="mt-2 h-12"
                    />
                    {errors.postcode && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.postcode.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Average 3-Month Electricity Bill</Label>
                    <div className="mt-3 grid gap-2">
                      {BILL_RANGES.map((range) => (
                        <label
                          key={range.value}
                          className="flex cursor-pointer items-center gap-3 rounded-xl border border-huglo-grey-light p-4 transition-colors has-[:checked]:border-huglo-gold has-[:checked]:bg-huglo-gold/5"
                        >
                          <input
                            type="radio"
                            value={range.value}
                            {...register("electricityBill")}
                            className="accent-huglo-gold"
                          />
                          <span className="text-sm font-medium">
                            {range.label}
                          </span>
                        </label>
                      ))}
                    </div>
                    {errors.electricityBill && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.electricityBill.message}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <Label>Upload Your Electricity Bill (Optional)</Label>
                    <p className="mt-1 text-sm text-huglo-grey">
                      Helps us provide a more accurate quote. JPG, PNG, or PDF up
                      to 10MB.
                    </p>

                    {!billFile ? (
                      <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-huglo-grey-light py-10 transition-colors hover:border-huglo-gold/40 hover:bg-huglo-gold/5">
                        <Upload className="size-7 text-huglo-grey/50" />
                        <span className="mt-2 text-sm font-medium text-huglo-grey">
                          Click to upload or drag and drop
                        </span>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp,application/pdf"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    ) : (
                      <div className="mt-4 flex items-center gap-4 rounded-2xl border border-border p-4">
                        {preview ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={preview}
                            alt="Bill preview"
                            className="size-16 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="flex size-16 items-center justify-center rounded-lg bg-muted">
                            <FileText className="size-8 text-charcoal/40" />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="text-sm font-medium">
                            {billFile.name}
                          </div>
                          <div className="text-xs text-charcoal/50">
                            {(billFile.size / 1024).toFixed(0)} KB
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="flex size-8 items-center justify-center rounded-full hover:bg-muted"
                        >
                          <X className="size-4" />
                        </button>
                      </div>
                    )}
                    {errors.billFile && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.billFile.message}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row">
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="btn-huglo-outline btn-md flex-1"
                >
                  <ArrowLeft className="size-4" />
                  Back
                </button>
              )}

              {step < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn-huglo-dark btn-md flex-1"
                >
                  Continue
                  <ArrowRight className="size-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-huglo-dark btn-md flex-1"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit request
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
