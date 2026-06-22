import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { QuoteFormSection } from "@/components/sections/QuoteFormSection";

export const metadata: Metadata = createMetadata({
  title: "Request Your Free Custom Quote",
  description:
    "Get a free, no-obligation solar quote tailored to your Canberra home. Tell us about your property and energy usage.",
  path: "/quote",
});

export default function QuotePage() {
  return (
    <div className="bg-warm-white pt-24 sm:pt-28">
      <div className="container-wide px-5 pb-2 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-sm font-medium text-huglo-grey transition-colors hover:text-huglo-gold"
        >
          ← Back to home
        </Link>
      </div>
      <QuoteFormSection standalone />
    </div>
  );
}
