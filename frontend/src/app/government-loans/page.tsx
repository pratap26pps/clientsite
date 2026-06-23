import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { GovernmentLoansPageClient } from "./GovernmentLoansPageClient";

export const metadata: Metadata = createMetadata({
  title: "Government Loans & Solar Grants",
  description:
    "ACT Sustainable Household Scheme and NSW Home Energy Saver Program. Low-interest and zero-interest loans for solar, battery storage and home electrification.",
  path: "/government-loans",
  keywords: [
    "act sustainable household scheme",
    "act solar loan",
    "nsw home energy saver",
    "solar grants canberra",
    "battery loan act",
  ],
});

export default function GovernmentLoansPage() {
  return <GovernmentLoansPageClient />;
}
