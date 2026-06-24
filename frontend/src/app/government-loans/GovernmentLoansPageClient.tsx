"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import {
  GOVERNMENT_LOANS_PAGE,
  ACT_SHS_SCHEME,
  NSW_HES_SCHEME,
} from "@/lib/page-content";

type SchemeTab = "act" | "nsw";

export function GovernmentLoansPageClient() {
  const [tab, setTab] = useState<SchemeTab>("act");

  return (
    <>
      <PageHero
        eyebrow={GOVERNMENT_LOANS_PAGE.hero.eyebrow}
        title={GOVERNMENT_LOANS_PAGE.hero.title}
        description={GOVERNMENT_LOANS_PAGE.hero.description}
      />

      <section className="border-b border-charcoal/10 bg-white py-6 sm:py-8">
        <div className="container-wide">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-charcoal/50">
            Verify eligibility on official government sites
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <a
              href={ACT_SHS_SCHEME.officialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-2xl border-2 border-huglo-green bg-huglo-green/10 px-5 py-4 shadow-sm transition-all hover:border-huglo-green hover:bg-huglo-green hover:shadow-lg hover:shadow-huglo-green/20 sm:px-6 sm:py-5"
            >
              <div>
                <span className="text-lg">🟢</span>
                <p className="mt-1 font-heading text-base font-bold text-charcoal group-hover:text-white sm:text-lg">
                  Official ACT SHS Page
                </p>
                <p className="mt-0.5 text-xs text-charcoal/60 group-hover:text-white/80 sm:text-sm">
                  ACT Sustainable Household Scheme — climatechoices.act.gov.au
                </p>
              </div>
              <ExternalLink className="size-5 shrink-0 text-huglo-green transition-colors group-hover:text-white sm:size-6" />
            </a>
            <a
              href={NSW_HES_SCHEME.officialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-2xl border-2 border-blue-600 bg-blue-50 px-5 py-4 shadow-sm transition-all hover:border-blue-600 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/20 sm:px-6 sm:py-5"
            >
              <div>
                <span className="text-lg">🔵</span>
                <p className="mt-1 font-heading text-base font-bold text-charcoal group-hover:text-white sm:text-lg">
                  Official NSW Home Energy Saver Page
                </p>
                <p className="mt-0.5 text-xs text-charcoal/60 group-hover:text-white/80 sm:text-sm">
                  NSW Home Energy Saver Program — energy.nsw.gov.au
                </p>
              </div>
              <ExternalLink className="size-5 shrink-0 text-blue-600 transition-colors group-hover:text-white sm:size-6" />
            </a>
          </div>
        </div>
      </section>

      <section className="section-padding bg-warm-white">
        <div className="container-wide">
          <div className="flex justify-center">
            <div className="inline-flex w-full max-w-xl rounded-full border border-charcoal/10 bg-white p-1 shadow-sm">
              <button
                onClick={() => setTab("act")}
                className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-all sm:px-6 ${
                  tab === "act"
                    ? "bg-[#0a0f1e] text-white shadow-md"
                    : "text-charcoal/60 hover:text-charcoal"
                }`}
              >
                🟢 {ACT_SHS_SCHEME.label}
              </button>
              <button
                onClick={() => setTab("nsw")}
                className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-all sm:px-6 ${
                  tab === "nsw"
                    ? "bg-[#0a0f1e] text-white shadow-md"
                    : "text-charcoal/60 hover:text-charcoal"
                }`}
              >
                🔵 {NSW_HES_SCHEME.label}
              </button>
            </div>
          </div>

          {tab === "act" ? <ActSchemeContent /> : <NswSchemeContent />}
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <SectionHeading
            eyebrow={GOVERNMENT_LOANS_PAGE.whyUs.eyebrow}
            title={GOVERNMENT_LOANS_PAGE.whyUs.title}
            description={GOVERNMENT_LOANS_PAGE.whyUs.description}
            align="center"
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {GOVERNMENT_LOANS_PAGE.whyUs.cards.map((card) => (
              <div key={card.title} className="card-huglo p-6 text-center">
                <span className="text-3xl">{card.icon}</span>
                <h3 className="mt-4 font-heading text-lg font-bold text-charcoal">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/quote" className="btn-huglo-gold btn-md inline-flex items-center gap-2">
              Start Your Application
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function ActSchemeContent() {
  return (
    <div className="mt-12 space-y-12">
      <div className="rounded-2xl border border-huglo-green/30 bg-huglo-green/10 p-6 sm:p-8">
        <h3 className="font-heading text-lg font-bold text-charcoal sm:text-xl">
          🚀 {ACT_SHS_SCHEME.announcement.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-charcoal/80 sm:text-base">
          {ACT_SHS_SCHEME.announcement.description}
        </p>
      </div>

      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-huglo-green">
          {ACT_SHS_SCHEME.shortLabel}
        </span>
        <h2 className="mt-2 font-heading text-3xl font-bold text-charcoal sm:text-4xl">
          {ACT_SHS_SCHEME.title}
        </h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-charcoal/70">
          {ACT_SHS_SCHEME.description}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ACT_SHS_SCHEME.benefits.map((benefit) => (
          <div key={benefit.title} className="card-huglo p-5">
            <h3 className="font-heading text-lg font-bold text-huglo-green">
              {benefit.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="font-heading text-xl font-bold text-charcoal">
            Eligible Products
          </h3>
          <ul className="mt-4 space-y-2">
            {ACT_SHS_SCHEME.eligibleProducts.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-charcoal/80">
                <Check className="mt-0.5 size-4 shrink-0 text-huglo-green" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <h4 className="font-semibold text-charcoal">
              ⚠️ {ACT_SHS_SCHEME.solarNote.title}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
              {ACT_SHS_SCHEME.solarNote.description}
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-heading text-xl font-bold text-charcoal">
            How to Apply with Capital Solar
          </h3>
          <ol className="mt-4 space-y-4">
            {ACT_SHS_SCHEME.applySteps.map((step) => (
              <li key={step.step} className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-huglo-green text-sm font-bold text-white">
                  {step.step}
                </span>
                <div>
                  <h4 className="font-semibold text-charcoal">{step.title}</h4>
                  <p className="mt-1 text-sm text-charcoal/70">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>

          <a
            href={ACT_SHS_SCHEME.officialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-huglo-green bg-huglo-green/10 px-5 py-2.5 text-sm font-bold text-huglo-green transition-colors hover:bg-huglo-green hover:text-white"
          >
            Official ACT SHS Page
            <ExternalLink className="size-4" />
          </a>
        </div>
      </div>

      <div className="rounded-2xl bg-[#0a0f1e] p-6 text-white sm:p-8">
        <h3 className="font-heading text-xl font-bold">
          {ACT_SHS_SCHEME.whyUse.title}
        </h3>
        <p className="mt-3 leading-relaxed text-white/70">
          {ACT_SHS_SCHEME.whyUse.description}
        </p>
      </div>
    </div>
  );
}

function NswSchemeContent() {
  return (
    <div className="mt-12 space-y-12">
      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
        <p className="text-sm font-semibold text-blue-900 sm:text-base">
          📢 {NSW_HES_SCHEME.banner}
        </p>
      </div>

      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-huglo-green">
          {NSW_HES_SCHEME.shortLabel}
        </span>
        <h2 className="mt-2 font-heading text-3xl font-bold text-charcoal sm:text-4xl">
          {NSW_HES_SCHEME.title}
        </h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-charcoal/70">
          {NSW_HES_SCHEME.description}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {NSW_HES_SCHEME.benefits.map((benefit) => (
          <div key={benefit.title} className="card-huglo p-5">
            <h3 className="font-heading text-lg font-bold text-huglo-green">
              {benefit.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-heading text-xl font-bold text-charcoal">
          Eligible Upgrades
        </h3>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {NSW_HES_SCHEME.eligibleUpgrades.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-charcoal/80">
              <Check className="mt-0.5 size-4 shrink-0 text-huglo-green" />
              {item}
            </li>
          ))}
        </ul>

        <a
          href={NSW_HES_SCHEME.officialLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-blue-600 bg-blue-50 px-5 py-2.5 text-sm font-bold text-blue-700 transition-colors hover:bg-blue-600 hover:text-white"
        >
          Official NSW Home Energy Saver Page
          <ExternalLink className="size-4" />
        </a>
      </div>
    </div>
  );
}
