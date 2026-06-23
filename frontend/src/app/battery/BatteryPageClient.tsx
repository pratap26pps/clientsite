"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import {
  BATTERY_PAGE,
  BATTERY_PRODUCTS,
  type BatteryTag,
} from "@/lib/page-content";
import { cn } from "@/lib/utils";

const tagColors: Record<BatteryTag["color"], string> = {
  purple: "bg-purple-100 text-purple-700",
  pink: "bg-pink-100 text-pink-700",
  green: "bg-emerald-100 text-emerald-700",
  teal: "bg-teal-100 text-teal-700",
};

export function BatteryPageClient() {
  return (
    <>
      <PageHero
        eyebrow={BATTERY_PAGE.hero.eyebrow}
        title={BATTERY_PAGE.hero.title}
        description={BATTERY_PAGE.hero.description}
        secondaryCta={BATTERY_PAGE.hero.secondaryCta}
      />

      <section className="section-padding bg-warm-white">
        <div className="container-wide">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-huglo-green">
                {BATTERY_PAGE.advantage.eyebrow}
              </span>
              <h2 className="mt-3 font-heading text-3xl font-bold text-charcoal sm:text-4xl">
                {BATTERY_PAGE.advantage.title}
              </h2>
              <p className="mt-4 leading-relaxed text-charcoal/70">
                {BATTERY_PAGE.advantage.description}
              </p>
              <Link
                href="/government-loans"
                className="btn-huglo-outline btn-md mt-8 inline-flex items-center gap-2"
              >
                Explore Government Loans
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
              <Image
                src={BATTERY_PAGE.advantage.image}
                alt="Home battery storage system"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <SectionHeading
            eyebrow={BATTERY_PAGE.lineup.eyebrow}
            title={BATTERY_PAGE.lineup.title}
            description={BATTERY_PAGE.lineup.description}
            align="center"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {BATTERY_PRODUCTS.map((product) => (
              <article
                key={product.id}
                className="card-huglo flex flex-col overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
                  {product.image && (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                  {product.badge && (
                    <span className="absolute top-3 right-3 rounded-full bg-huglo-gold px-3 py-1 text-xs font-bold text-huglo-black">
                      {product.badgeIcon} {product.badge}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {product.tags.map((tag) => (
                      <span
                        key={tag.label}
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                          tagColors[tag.color]
                        )}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs font-semibold uppercase tracking-wider text-charcoal/50">
                    {product.brand}
                  </p>
                  <h3 className="mt-1 font-heading text-xl font-bold text-charcoal">
                    {product.name}
                  </h3>

                  <ul className="mt-4 flex-1 space-y-2.5">
                    {product.features.map((feature) => (
                      <li key={feature.title} className="text-sm leading-snug">
                        <span className="font-semibold text-charcoal">
                          {feature.title}:
                        </span>{" "}
                        <span className="text-charcoal/70">
                          {feature.description}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-4 border-t border-charcoal/10 pt-4 text-xs leading-relaxed text-charcoal/60">
                    <span className="font-semibold text-charcoal/80">
                      Ideal For:
                    </span>{" "}
                    {product.idealFor}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/quote" className="btn-huglo-gold btn-md inline-flex items-center gap-2">
              Get a Battery Storage Quote
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
