import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description: `Privacy Policy for ${SITE.name}. Learn how we collect, use, and protect your personal information.`,
  path: "/privacy",
  noIndex: true,
});

export default function PrivacyPage() {
  return (
    <section className="section-padding bg-white pt-32">
      <div className="container-wide max-w-3xl">
        <Link
          href="/"
          className="text-sm text-solar-orange hover:underline"
        >
          ← Back to Home
        </Link>
        <h1 className="mt-6 font-heading text-4xl font-bold text-charcoal">
          Privacy Policy
        </h1>
        <div className="mt-8 space-y-6 text-charcoal/70 leading-relaxed">
          <p>
            {SITE.name} (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is
            committed to protecting your privacy. This policy outlines how we
            collect, use, and safeguard your personal information.
          </p>
          <h2 className="font-heading text-xl font-bold text-charcoal">
            Information We Collect
          </h2>
          <p>
            We collect information you provide through our quote form, including
            your name, phone number, postcode, electricity bill details, and any
            uploaded documents.
          </p>
          <h2 className="font-heading text-xl font-bold text-charcoal">
            How We Use Your Information
          </h2>
          <p>
            Your information is used solely to provide solar quotes, schedule
            consultations, and communicate about our services. We do not sell or
            share your data with third parties for marketing purposes.
          </p>
          <h2 className="font-heading text-xl font-bold text-charcoal">
            Contact
          </h2>
          <p>
            For privacy enquiries, contact us at{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="text-solar-orange hover:underline"
            >
              {SITE.email}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
