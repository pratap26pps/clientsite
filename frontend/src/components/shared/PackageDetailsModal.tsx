"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { SOLAR_PACKAGES } from "@/lib/constants";
import { formatBillRange } from "@/lib/packages";
import { cn } from "@/lib/utils";

type Package = (typeof SOLAR_PACKAGES)[number];

interface PackageDetailsModalProps {
  open: boolean;
  onClose: () => void;
  package: Package | null;
  onGetQuote?: (defaultService: string) => void;
}

export function PackageDetailsModal({
  open,
  onClose,
  package: pkg,
  onGetQuote,
}: PackageDetailsModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && pkg && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6">
          <motion.button
            type="button"
            aria-label="Close modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-huglo-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="package-details-title"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl"
          >
            <div
              className={cn(
                "sticky top-0 flex items-start justify-between gap-4 px-6 py-5 text-white",
                pkg.headerColor
              )}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/80">
                  Package details
                </p>
                <h2
                  id="package-details-title"
                  className="mt-1 font-heading text-xl font-bold sm:text-2xl"
                >
                  {pkg.name}
                </h2>
                <p className="mt-1 text-sm text-white/85">
                  {pkg.size} · Tier 1 Solar panels · {pkg.panels}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="px-6 py-6">
              <div className="rounded-xl bg-warm-white px-4 py-3 text-sm text-huglo-grey">
                Recommended bill range:{" "}
                <span className="font-semibold text-huglo-black">
                  {formatBillRange(pkg.billMin, pkg.billMax)}
                </span>
              </div>

              <div className="mt-6 space-y-6">
                {pkg.details.map((section) => (
                  <div key={section.title}>
                    <h3 className="text-sm font-bold text-huglo-black">
                      {section.title}
                    </h3>
                    <ul className="mt-3 space-y-2.5">
                      {section.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm leading-relaxed text-huglo-grey"
                        >
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-huglo-gold" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-huglo-outline btn-md flex-1"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onGetQuote?.(pkg.defaultService);
                  }}
                  className="btn-huglo-gold btn-md flex-1"
                >
                  Get a Quote
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
