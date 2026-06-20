import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Phone } from "lucide-react";
import { LOCATION_PAGES, SITE } from "@/lib/constants";
import {
  createMetadata,
  breadcrumbSchema,
  serviceSchema,
} from "@/lib/seo";
import { JsonLd } from "@/components/shared/JsonLd";
import { QuoteFormSection } from "@/components/sections/QuoteFormSection";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return LOCATION_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = LOCATION_PAGES.find((p) => p.slug === slug);
  if (!page) return {};

  return createMetadata({
    title: page.title,
    description: page.description,
    path: `/locations/${page.slug}`,
    keywords: [...page.keywords],
  });
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const page = LOCATION_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: page.title, url: `/locations/${page.slug}` },
          ]),
          serviceSchema(),
        ]}
      />

      <section className="bg-navy pt-32 pb-20 text-white">
        <div className="container-wide px-6 lg:px-8">
          <nav className="mb-6 text-sm text-white/50">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{page.title}</span>
          </nav>
          <h1 className="font-heading max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {page.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/70">
            {page.description}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#quote-form"
              className="inline-flex h-12 items-center rounded-full bg-solar-orange px-8 font-semibold text-white shadow-lg shadow-solar-orange/30 transition-colors hover:bg-solar-orange-light"
            >
              Get Free Quote
              <ArrowRight className="ml-2 size-4" />
            </a>
            <a
              href={SITE.phoneHref}
              className="inline-flex h-12 items-center rounded-full border border-white/30 bg-white/10 px-8 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <Phone className="mr-2 size-4" />
              {SITE.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide max-w-3xl">
          <h2 className="font-heading text-3xl font-bold text-charcoal">
            Why Choose Capital Solar Energy for {page.title}?
          </h2>
          <div className="mt-6 space-y-4 text-charcoal/70 leading-relaxed">
            <p>
              As a CEC Approved Retailer based in Mitchell ACT, Capital Solar
              Energy has been serving Canberra and Southern NSW homeowners for
              over 15 years. We specialise in premium Tier-1 solar systems,
              smart battery storage, and energy-efficient heat pumps.
            </p>
            <p>
              Every system we install is custom-engineered for your specific
              roof, energy consumption patterns, and budget. Our licensed
              electricians handle everything from design through grid
              commissioning — including all ACT regulatory approvals.
            </p>
            <p>
              Contact us today for a free, no-obligation consultation and
              discover how much you could save with premium solar in Canberra.
            </p>
          </div>
        </div>
      </section>

      <QuoteFormSection />
    </>
  );
}
