import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { SolarPageClient } from "./SolarPageClient";

export const metadata: Metadata = createMetadata({
  title: "Premium Solar Systems Canberra",
  description:
    "Next-generation N-Type solar panels and smart hybrid inverters for Canberra homes. Jinko, Trina, Sungrow and Fronius — tailored to your home.",
  path: "/solar",
  keywords: [
    "solar panels canberra",
    "solar inverters canberra",
    "n-type solar panels",
    "jinko tiger neo canberra",
  ],
});

export default function SolarPage() {
  return <SolarPageClient />;
}
