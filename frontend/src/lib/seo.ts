import type { Metadata } from "next";
import { FAQS, SITE } from "./constants";

export function createMetadata({
  title,
  description,
  path = "",
  keywords = [],
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  const url = `${SITE.url}${path}`;
  const fullTitle =
    path === "" || path === "/"
      ? `${title} | Premium Solar Canberra`
      : `${title} | ${SITE.name}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      "solar canberra",
      "solar installation canberra",
      "battery storage canberra",
      "heat pump canberra",
      "solar panels act",
      ...keywords,
    ],
    authors: [{ name: SITE.name }],
    creator: SITE.name,
    metadataBase: new URL(SITE.url),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_AU",
      url,
      siteName: SITE.name,
      title: fullTitle,
      description,
      images: [
        {
          url: `${SITE.url}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${SITE.name} - Premium Solar Canberra`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [`${SITE.url}/og-image.jpg`],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    image: `${SITE.url}/og-image.jpg`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "46 Hoskins Street",
      addressLocality: "Mitchell",
      addressRegion: "ACT",
      postalCode: "2911",
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -35.2167,
      longitude: 149.1333,
    },
    areaServed: [
      { "@type": "City", name: "Canberra" },
      { "@type": "State", name: "Australian Capital Territory" },
      { "@type": "State", name: "New South Wales" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "17:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/capitalsolarenergy",
      "https://www.instagram.com/capitalsolarenergy",
    ],
  };
}

export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Solar Panel Installation",
    provider: {
      "@type": "LocalBusiness",
      name: SITE.name,
      url: SITE.url,
    },
    areaServed: {
      "@type": "City",
      name: "Canberra",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Solar Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Solar PV Installation",
            description: "Premium Tier-1 solar panel installation for Canberra homes",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Smart Battery Storage",
            description: "Sigenergy, Sungrow, GoodWe and FoxESS battery installation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Hot Water Heat Pumps",
            description: "Energy-efficient heat pump hot water systems",
          },
        },
      ],
    },
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE.url}${item.url}`,
    })),
  };
}
