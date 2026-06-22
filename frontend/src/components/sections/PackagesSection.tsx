"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle2, Sparkles, DollarSign } from "lucide-react";
import { SOLAR_PACKAGES } from "@/lib/constants";
import {
  formatBillRange,
  getRecommendedPackageId,
  parseBillAmount,
} from "@/lib/packages";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PackageQuoteModal } from "@/components/shared/PackageQuoteModal";
import { cn } from "@/lib/utils";

export function PackagesSection() {
  const [billInput, setBillInput] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const billAmount = useMemo(() => parseBillAmount(billInput), [billInput]);
  const recommendedId = useMemo(
    () => getRecommendedPackageId(billAmount),
    [billAmount]
  );

  const recommendedPackage = SOLAR_PACKAGES.find((pkg) => pkg.id === recommendedId);

  const toggleExpanded = (id: string) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  const openQuote = (defaultService: string) => {
    setSelectedService(defaultService);
    setQuoteOpen(true);
  };

  return (
    <>
      <section id="packages" className="relative overflow-hidden bg-warm-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,172,0,0.08),transparent_55%)]" />

        <div className="container-wide relative section-padding">
          <ScrollReveal>
            <SectionHeading
              title={
                <>
                  Decide which{" "}
                  <span className="text-huglo-gold">package</span> will suit your
                  needs
                </>
              }
              description="Enter your average 3-month electricity bill and we’ll highlight the solar system size best matched to your home."
            />
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="mx-auto mt-10 max-w-2xl">
            <div className="rounded-2xl border border-huglo-grey-light/80 bg-white p-5 shadow-sm sm:p-6">
              <label
                htmlFor="bill-input"
                className="block text-center text-sm font-semibold text-huglo-black sm:text-base"
              >
                What is your average electricity bill for 3 months (AUD)?
              </label>

              <div className="relative mx-auto mt-4 max-w-sm">
                <DollarSign className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-huglo-gold" />
                <input
                  id="bill-input"
                  type="text"
                  inputMode="decimal"
                  value={billInput}
                  onChange={(e) => setBillInput(e.target.value)}
                  placeholder="e.g. 680"
                  className="w-full rounded-full border border-huglo-grey-light bg-warm-white py-3.5 pr-4 pl-11 text-center text-lg font-semibold text-huglo-black placeholder:font-normal placeholder:text-huglo-grey/50 focus:border-huglo-gold focus:outline-none focus:ring-2 focus:ring-huglo-gold/20"
                />
              </div>

              <AnimatePresence mode="wait">
                {recommendedPackage ? (
                  <motion.div
                    key={recommendedPackage.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="mt-4 flex items-start justify-center gap-2 rounded-xl bg-huglo-gold/10 px-4 py-3 text-center"
                  >
                    <Sparkles className="mt-0.5 size-4 shrink-0 text-huglo-gold" />
                    <p className="text-sm leading-relaxed text-huglo-black">
                      Based on{" "}
                      <strong className="font-semibold">
                        ${billAmount?.toLocaleString()}
                      </strong>
                      , we recommend the{" "}
                      <strong className="font-semibold text-huglo-gold">
                        {recommendedPackage.name}
                      </strong>{" "}
                      ({recommendedPackage.size}) package.
                    </p>
                  </motion.div>
                ) : (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 text-center text-xs text-huglo-grey sm:text-sm"
                  >
                    Typical ranges: Small{" "}
                    {formatBillRange(
                      SOLAR_PACKAGES[0].billMin,
                      SOLAR_PACKAGES[0].billMax
                    )}{" "}
                    · Medium{" "}
                    {formatBillRange(
                      SOLAR_PACKAGES[1].billMin,
                      SOLAR_PACKAGES[1].billMax
                    )}{" "}
                    · Big Family{" "}
                    {formatBillRange(
                      SOLAR_PACKAGES[2].billMin,
                      SOLAR_PACKAGES[2].billMax
                    )}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {SOLAR_PACKAGES.map((pkg) => {
              const isExpanded = expandedId === pkg.id;
              const isRecommended = recommendedId === pkg.id;
              const hasSelection = recommendedId !== null;
              const isDimmed = hasSelection && !isRecommended;

              return (
                <div
                  key={pkg.id}
                  id={`package-card-${pkg.id}`}
                  className={cn(
                    "relative flex flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-300 ease-out",
                    isRecommended
                      ? "z-10 -translate-y-1 border-[3px] border-huglo-gold bg-[linear-gradient(180deg,rgba(255,172,0,0.08)_0%,#ffffff_28%)] shadow-[0_24px_60px_-20px_rgba(255,172,0,0.55)]"
                      : "border-huglo-grey-light/70 shadow-sm",
                    isDimmed && "scale-[0.97] opacity-40"
                  )}
                >
                  {isRecommended && (
                    <div className="absolute top-3 right-3 z-20 rounded-full bg-huglo-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-huglo-black shadow-md sm:text-xs">
                      Recommended
                    </div>
                  )}

                  <div
                    className={cn(
                      "px-4 py-3.5 text-center text-sm font-bold text-white sm:text-base",
                      pkg.headerColor,
                      isRecommended && "ring-2 ring-inset ring-white/25"
                    )}
                  >
                    {pkg.name}
                  </div>

                  <div className="flex flex-1 flex-col p-6 text-center">
                    <p
                      className={cn(
                        "font-heading text-4xl font-bold text-huglo-black",
                        isRecommended && "text-huglo-gold"
                      )}
                    >
                      {pkg.size}
                    </p>
                    <p className="mt-3 text-sm font-medium text-huglo-black">
                      Tier 1 Solar panels
                    </p>
                    <p className="mt-1 text-sm text-huglo-grey">{pkg.panels}</p>

                    <p
                      className={cn(
                        "mt-4 rounded-full px-3 py-1.5 text-[11px] sm:text-xs",
                        isRecommended
                          ? "bg-huglo-gold/15 font-semibold text-huglo-black"
                          : "bg-warm-white text-huglo-grey"
                      )}
                    >
                      Bill range:{" "}
                      <span
                        className={cn(
                          isRecommended
                            ? "text-huglo-gold"
                            : "font-semibold text-huglo-black"
                        )}
                      >
                        {formatBillRange(pkg.billMin, pkg.billMax)}
                      </span>
                    </p>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-6 space-y-5 border-t border-huglo-grey-light/60 pt-6 text-left">
                            {pkg.details.map((section) => (
                              <div key={section.title}>
                                <h4 className="text-sm font-bold text-huglo-black">
                                  {section.title}
                                </h4>
                                <ul className="mt-2 space-y-2">
                                  {section.items.map((item) => (
                                    <li
                                      key={item}
                                      className="flex items-start gap-2 text-xs leading-relaxed text-huglo-grey sm:text-sm"
                                    >
                                      <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-huglo-gold" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row sm:justify-center">
                      <button
                        type="button"
                        onClick={() => toggleExpanded(pkg.id)}
                        className={cn(
                          "btn-huglo-outline btn-sm flex-1 sm:flex-none",
                          (isExpanded || isRecommended) && "border-huglo-gold"
                        )}
                      >
                        View More
                        <ChevronDown
                          className={cn(
                            "size-4 transition-transform duration-200",
                            isExpanded && "rotate-180"
                          )}
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => openQuote(pkg.defaultService)}
                        className={cn(
                          "btn-huglo-gold btn-sm flex-1 sm:flex-none",
                          isRecommended && "shadow-lg ring-2 ring-huglo-gold/30"
                        )}
                      >
                        Get a Quote
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <PackageQuoteModal
        open={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        defaultService={selectedService}
      />
    </>
  );
}
