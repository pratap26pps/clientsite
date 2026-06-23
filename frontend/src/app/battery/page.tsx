import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { BatteryPageClient } from "./BatteryPageClient";

export const metadata: Metadata = createMetadata({
  title: "Battery Storage Canberra",
  description:
    "Canberra winter-proof battery storage from Tesla, Sigenergy, Sungrow, GoodWe and FoxESS. Blackout protection, tariff arbitrage, and government loan support.",
  path: "/battery",
  keywords: [
    "battery storage canberra",
    "home battery canberra",
    "sungrow battery canberra",
    "foxess battery canberra",
    "tesla powerwall canberra",
  ],
});

export default function BatteryPage() {
  return <BatteryPageClient />;
}
