import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = createMetadata({
  title: "Terms of Service",
  description: `Terms of Service for ${SITE.name}. Read our terms and conditions for solar installation services.`,
  path: "/terms",
  noIndex: true,
});

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <div className="mt-8 space-y-6 text-charcoal/70 leading-relaxed">
          <p>
            These terms govern your use of {SITE.name}&apos;s website and
            services. By using our website or requesting a quote, you agree to
            these terms.
          </p>
          <h2 className="font-heading text-xl font-bold text-charcoal">
            Quotes & Consultations
          </h2>
          <p>
            All quotes provided are estimates based on information supplied and
            site assessment. Final pricing may vary based on site conditions,
            equipment selection, and regulatory requirements.
          </p>
          <h2 className="font-heading text-xl font-bold text-charcoal">
            Warranties
          </h2>
          <p>
            We provide a 10-year workmanship warranty on all installations.
            Product warranties are provided by respective manufacturers and
            vary by component.
          </p>
          <h2 className="font-heading text-xl font-bold text-charcoal">
            Contact
          </h2>
          <p>
            For questions about these terms, contact us at{" "}
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
