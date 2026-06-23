import Link from "next/link";
import { ArrowRight, Phone, Zap } from "lucide-react";
import { SITE } from "@/lib/constants";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  secondaryCta?: { label: string; href: string };
};

export function PageHero({
  eyebrow,
  title,
  description,
  secondaryCta,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#0a0f1e] pt-28 pb-16 sm:pt-32 sm:pb-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(43,169,133,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,172,0,0.06)_0%,transparent_50%)]" />

      <div className="container-wide relative z-10 px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-huglo-green/30 bg-huglo-green/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-huglo-green">
            {eyebrow}
          </span>

          <h1 className="mt-6 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          <p className="mt-5 text-base leading-relaxed text-white/70 sm:text-lg">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/quote" className="btn-huglo-gold btn-md inline-flex items-center gap-2">
              Get a Free Quote
              <Zap className="size-4" />
            </Link>
            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                className="btn-huglo-ghost btn-md inline-flex items-center gap-2"
              >
                {secondaryCta.label}
                <ArrowRight className="size-4" />
              </Link>
            ) : (
              <a
                href={SITE.phoneHref}
                className="btn-huglo-ghost btn-md inline-flex items-center gap-2"
              >
                <Phone className="size-4" />
                Call {SITE.phone}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
