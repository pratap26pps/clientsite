"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin } from "lucide-react";
import { SITE, SERVICES } from "@/lib/constants";
import { BrandLogo } from "@/components/shared/BrandLogo";

export function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-huglo-black-bg text-white">
      <div className="container-wide section-padding pb-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <BrandLogo variant="footer" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              {SITE.description}
            </p>
            <p className="mt-6 text-sm text-white/40">
              Made with care by the Capital Solar team
            </p>
          </div>

          <div className="lg:col-span-3">
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-huglo-gold">
              Services
            </h4>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    href={service.href}
                    className="text-sm text-white/60 transition-colors duration-300 hover:text-huglo-gold"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-huglo-gold">
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={SITE.phoneHref}
                  className="flex items-center gap-3 text-sm text-white/80 transition-colors duration-300 hover:text-huglo-gold"
                >
                  <Phone className="size-4 shrink-0 text-huglo-gold" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-3 text-sm text-white/80 transition-colors duration-300 hover:text-huglo-gold"
                >
                  <Mail className="size-4 shrink-0 text-huglo-gold" />
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/80">
                <MapPin className="mt-0.5 size-4 shrink-0 text-huglo-gold" />
                {SITE.address}
              </li>
            </ul>

            <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
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
            © {new Date().getFullYear()} {SITE.name}. All rights reserved. CEC
            Approved Retailer.
          </p>
          <div className="flex flex-wrap gap-6">
            <Link
              href="/government-loans"
              className="text-xs font-semibold text-huglo-gold transition-colors duration-300 hover:text-white"
            >
              Gov&apos;t Loans
            </Link>
            <Link
              href="/reviews"
              className="text-xs text-white/40 transition-colors duration-300 hover:text-white"
            >
              Reviews
            </Link>
            <Link
              href="/privacy"
              className="text-xs text-white/40 transition-colors duration-300 hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-white/40 transition-colors duration-300 hover:text-white"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
