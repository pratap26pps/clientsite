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
import { Button } from "@/components/ui/button";
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

export function QuoteFormSection() {
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

  if (submitted) {
    return (
      <section id="quote-form" className="section-padding bg-warm-white">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto max-w-lg rounded-3xl border border-border/60 bg-white p-12 text-center shadow-xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircle2 className="mx-auto size-16 text-green-500" />
            </motion.div>
            <h3 className="mt-6 font-heading text-2xl font-bold text-charcoal">
              Quote Request Received!
            </h3>
            <p className="mt-3 text-charcoal/60">
              Thank you for your enquiry. Our Canberra team will contact you
              within 24 hours with a customised solar proposal.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="quote-form" className="section-padding bg-warm-white">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Get in touch with our energy experts"
          title="Request your free custom quote"
          description="Tell us about your property and energy usage — we'll design a system tailored to your needs."
        />

        <div className="mx-auto mt-16 max-w-2xl">
          <div className="mb-8">
            <div className="mb-3 flex justify-between text-sm font-medium text-huglo-grey">
              {STEPS.map((label, i) => (
                <span
                  key={label}
                  className={i <= step ? "font-semibold text-huglo-gold" : ""}
                >
                  {i + 1}. {label}
                </span>
              ))}
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="hero-form-card !bg-white"
          >
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
                          className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-4 transition-colors has-[:checked]:border-solar-orange has-[:checked]:bg-solar-orange/5"
                        >
                          <input
                            type="radio"
                            value={range.value}
                            {...register("electricityBill")}
                            className="accent-solar-orange"
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
                    <p className="mt-1 text-sm text-charcoal/50">
                      Helps us provide a more accurate quote. JPG, PNG, or PDF up
                      to 10MB.
                    </p>

                    {!billFile ? (
                      <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border py-12 transition-colors hover:border-solar-orange/50 hover:bg-solar-orange/5">
                        <Upload className="size-8 text-charcoal/30" />
                        <span className="mt-3 text-sm font-medium text-charcoal/60">
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

            <div className="mt-8 flex gap-4">
              {step > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep((s) => s - 1)}
                  className="h-12 flex-1"
                >
                  <ArrowLeft className="mr-2 size-4" />
                  Back
                </Button>
              )}

              {step < STEPS.length - 1 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="btn-huglo-dark !h-12 flex-1 !py-0"
                >
                  Continue
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={submitting}
                  className="btn-huglo-dark !h-12 flex-1 !py-0"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Quote Request
                      <ArrowRight className="ml-2 size-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
