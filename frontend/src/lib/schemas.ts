import { z } from "zod";

export const quoteFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Please enter your full name")
    .max(100, "Name is too long"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .regex(/^[\d\s+()-]+$/, "Please enter a valid phone number"),
  postcode: z
    .string()
    .min(4, "Please enter a valid postcode")
    .max(4, "Please enter a valid 4-digit postcode")
    .regex(/^\d{4}$/, "Postcode must be 4 digits"),
  electricityBill: z
    .string()
    .min(1, "Please select your average bill range"),
  billFile: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= 10 * 1024 * 1024,
      "File must be less than 10MB"
    )
    .refine(
      (file) =>
        !file ||
        ["image/jpeg", "image/png", "image/webp", "application/pdf"].includes(
          file.type
        ),
      "File must be JPG, PNG, WebP, or PDF"
    ),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;

export const BILL_RANGES = [
  { value: "under-300", label: "Under $300 / quarter" },
  { value: "300-500", label: "$300 – $500 / quarter" },
  { value: "500-800", label: "$500 – $800 / quarter" },
  { value: "800-1200", label: "$800 – $1,200 / quarter" },
  { value: "over-1200", label: "Over $1,200 / quarter" },
] as const;
