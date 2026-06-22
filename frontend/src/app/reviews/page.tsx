import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import ReviewsPage from "./ReviewsPageClient";

export const metadata: Metadata = createMetadata({
  title: "Customer Reviews",
  description:
    "Read reviews from Canberra homeowners who chose Capital Solar Energy for their solar installation.",
  path: "/reviews",
});

export default function Page() {
  return <ReviewsPage />;
}
