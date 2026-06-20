import Link from "next/link";
import { Phone, Mail, MapPin, Sun, Share2 } from "lucide-react";
import { SITE, LOCATION_PAGES, SERVICES } from "@/lib/constants";

const socialLinks = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-wide section-padding pb-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-solar-orange">
                <Sun className="size-5 text-white" />
              </div>
              <div>
                <div className="font-heading text-lg font-bold">
                  Capital Solar Energy
                </div>
                <div className="text-xs uppercase tracking-widest text-white/50">
                  Canberra&apos;s Premium Solar
                </div>
              </div>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              {SITE.description}
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-lg border border-white/10 text-white/60 transition-colors hover:border-solar-orange hover:text-solar-orange"
                >
                  <Share2 className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-solar-gold">
              Services
            </h4>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    href={service.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-solar-gold">
              Locations
            </h4>
            <ul className="space-y-3">
              {LOCATION_PAGES.slice(0, 5).map((page) => (
                <li key={page.slug}>
                  <Link
                    href={`/locations/${page.slug}`}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-solar-gold">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={SITE.phoneHref}
                  className="flex items-center gap-3 text-sm text-white/80 transition-colors hover:text-solar-orange"
                >
                  <Phone className="size-4 shrink-0 text-solar-orange" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-3 text-sm text-white/80 transition-colors hover:text-solar-orange"
                >
                  <Mail className="size-4 shrink-0 text-solar-orange" />
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/80">
                <MapPin className="mt-0.5 size-4 shrink-0 text-solar-orange" />
                {SITE.address}
              </li>
            </ul>

            <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
              <iframe
                title="Capital Solar Energy Location"
                src="https://maps.google.com/maps?q=46+Hoskins+Street+Mitchell+ACT+2911&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="160"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[30%] contrast-[1.1]"
              />
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved. ABN
            pending. CEC Approved Retailer.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-xs text-white/40 transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-white/40 transition-colors hover:text-white"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
