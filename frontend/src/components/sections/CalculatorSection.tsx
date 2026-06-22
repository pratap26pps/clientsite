"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Bot, Leaf, Sparkles, TreePine, Zap } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import {
  CALCULATOR_SYSTEMS,
  calculateSavings,
  formatCurrency,
  getRecommendationMessage,
  getRecommendedSystem,
  type SystemSizeKey,
} from "@/lib/calculator";
import { cn } from "@/lib/utils";

const SYSTEM_KEYS: SystemSizeKey[] = ["6.6", "10", "13"];

export function CalculatorSection() {
  const [monthlyBill, setMonthlyBill] = useState(300);
  const [roofSpace, setRoofSpace] = useState(65);
  const [selectedSystem, setSelectedSystem] = useState<SystemSizeKey | null>(null);

  const recommendedSystem = useMemo(
    () => getRecommendedSystem(monthlyBill, roofSpace),
    [monthlyBill, roofSpace]
  );

  const activeSystem = selectedSystem ?? recommendedSystem;

  const savings = useMemo(
    () => calculateSavings(monthlyBill, activeSystem),
    [monthlyBill, activeSystem]
  );

  const recommendationText = useMemo(
    () => getRecommendationMessage(activeSystem, monthlyBill, roofSpace),
    [activeSystem, monthlyBill, roofSpace]
  );

  const handleSliderChange = (
    type: "bill" | "roof",
    value: number
  ) => {
    if (type === "bill") setMonthlyBill(value);
    else setRoofSpace(value);
    setSelectedSystem(null);
  };

  return (
    <section id="calculator" className="section-padding bg-[#0a0f1e] text-white">
      <div className="container-wide">
        <ScrollReveal>
          <SectionHeading
            dark
            eyebrow="AI-Powered Calculator"
            title="Calculate Your Solar Savings"
            description="Get instant personalized estimates powered by AI and real-time energy data."
          />
        </ScrollReveal>

        <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10">
          <ScrollReveal direction="left" className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <h3 className="font-heading text-lg font-bold text-white sm:text-xl">
              Your Details
            </h3>

            <div className="mt-8 space-y-8">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <label htmlFor="monthly-bill" className="text-sm text-white/70">
                    Monthly Electricity Bill
                  </label>
                  <span className="font-heading text-lg font-bold text-huglo-gold">
                    {formatCurrency(monthlyBill)}
                  </span>
                </div>
                <input
                  id="monthly-bill"
                  type="range"
                  min={100}
                  max={800}
                  step={10}
                  value={monthlyBill}
                  onChange={(e) =>
                    handleSliderChange("bill", Number(e.target.value))
                  }
                  className="calculator-range mt-4 w-full"
                />
                <div className="mt-2 flex justify-between text-xs text-white/40">
                  <span>$100</span>
                  <span>$800</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-4">
                  <label htmlFor="roof-space" className="text-sm text-white/70">
                    Available Roof Space
                  </label>
                  <span className="font-heading text-lg font-bold text-huglo-gold">
                    {roofSpace}m²
                  </span>
                </div>
                <input
                  id="roof-space"
                  type="range"
                  min={20}
                  max={100}
                  step={1}
                  value={roofSpace}
                  onChange={(e) =>
                    handleSliderChange("roof", Number(e.target.value))
                  }
                  className="calculator-range mt-4 w-full"
                />
                <div className="mt-2 flex justify-between text-xs text-white/40">
                  <span>20m²</span>
                  <span>100m²</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-white/70">Recommended System Size</p>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {SYSTEM_KEYS.map((key) => {
                    const system = CALCULATOR_SYSTEMS[key];
                    const isActive = activeSystem === key;
                    const isRecommended = recommendedSystem === key;
                    const fitsRoof = system.minRoof <= roofSpace;

                    return (
                      <button
                        key={key}
                        type="button"
                        disabled={!fitsRoof}
                        onClick={() => setSelectedSystem(key)}
                        className={cn(
                          "relative rounded-xl border px-3 py-4 text-center transition-all duration-200",
                          isActive
                            ? "border-huglo-gold bg-huglo-gold/15 text-huglo-gold"
                            : "border-white/10 bg-white/5 text-white/80 hover:border-white/25",
                          !fitsRoof && "cursor-not-allowed opacity-35"
                        )}
                      >
                        {isRecommended && (
                          <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-huglo-gold px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-huglo-black">
                            AI
                          </span>
                        )}
                        <span className="font-heading text-base font-bold sm:text-lg">
                          {system.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-auto rounded-xl border border-huglo-gold/20 bg-huglo-gold/5 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-huglo-gold">
                Why calculate now?
              </p>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-huglo-gold" />
                  Instant estimates based on your actual usage
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-huglo-gold" />
                  Compare system sizes and payback periods
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-huglo-gold" />
                  No obligation — get a personalised quote next
                </li>
              </ul>
              <Link href="/quote" className="btn-huglo-gold btn-sm mt-5 w-full text-center">
                Get a free quote
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1} className="flex h-full flex-col space-y-6">
            <div className="rounded-2xl border border-huglo-gold/25 bg-[linear-gradient(135deg,rgba(255,172,0,0.12),rgba(255,172,0,0.03))] p-6 sm:p-8">
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-huglo-gold/20">
                  <Bot className="size-5 text-huglo-gold" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-huglo-gold">
                    AI Recommendation
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/85 sm:text-base">
                    {recommendationText}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-huglo-gold" />
                <h3 className="font-heading text-lg font-bold text-white">
                  Your Estimated Savings
                </h3>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  { label: "Monthly Savings", value: formatCurrency(savings.monthlySavings) },
                  { label: "Annual Savings", value: formatCurrency(savings.annualSavings) },
                  { label: "Payback Period", value: `${savings.paybackYears} Years` },
                  {
                    label: "25-Year Total Savings",
                    value: formatCurrency(savings.total25Year),
                  },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    layout
                    className="rounded-xl border border-white/8 bg-white/[0.03] p-4"
                  >
                    <p className="text-xs text-white/50">{item.label}</p>
                    <p className="mt-2 font-heading text-xl font-bold text-huglo-gold sm:text-2xl">
                      {item.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <Zap className="size-4 text-huglo-gold" />
                <h3 className="font-heading text-lg font-bold text-white">
                  System Specifications
                </h3>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  {
                    label: "Panels Required",
                    value: `${savings.panels} panels`,
                    icon: Zap,
                  },
                  {
                    label: "System Cost",
                    value: formatCurrency(savings.systemCost),
                    icon: Sparkles,
                  },
                  {
                    label: "CO₂ Saved/Year",
                    value: `${savings.co2PerYear} tonnes`,
                    icon: Leaf,
                  },
                  {
                    label: "Trees Equivalent",
                    value: `${savings.trees} trees`,
                    icon: TreePine,
                  },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    layout
                    className="rounded-xl border border-white/8 bg-white/[0.03] p-4"
                  >
                    <div className="flex items-center gap-2 text-white/50">
                      <item.icon className="size-3.5" />
                      <p className="text-xs">{item.label}</p>
                    </div>
                    <p className="mt-2 font-heading text-lg font-bold text-white sm:text-xl">
                      {item.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
