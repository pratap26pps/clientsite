"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Battery, Zap, ChevronRight } from "lucide-react";
import {
  SOLAR_PANELS,
  INVERTERS,
  BATTERIES,
} from "@/lib/constants";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";

type MainTab = "generation" | "storage";
type GenTab = "jinko" | "trina" | "sungrow" | "fronius";
type StorageTab = "sigenergy" | "sungrow";

export function TechnologySection() {
  const [mainTab, setMainTab] = useState<MainTab>("generation");
  const [genTab, setGenTab] = useState<GenTab>("jinko");
  const [storageTab, setStorageTab] = useState<StorageTab>("sigenergy");

  const currentGenProduct =
    genTab === "jinko" || genTab === "trina"
      ? SOLAR_PANELS.find((p) => p.id === genTab)
      : INVERTERS.find((i) => i.id === genTab);

  const currentStorageProduct = BATTERIES.find((b) => b.id === storageTab);

  return (
    <section id="technology" className="section-padding bg-huglo-black-bg text-white">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Buy solar & batteries"
          title="Premium technology for your home"
          description="Australian owned. Advanced solar design. Tier-1 hardware from the world's finest manufacturers."
          dark
        />

        <div className="mt-12 flex justify-center">
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
            {[
              { id: "generation" as const, label: "Solar Generation", icon: Sun },
              { id: "storage" as const, label: "Battery Storage", icon: Battery },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setMainTab(id)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300",
                  mainTab === id
                    ? "bg-huglo-gold text-huglo-black shadow-lg"
                    : "text-white/60 hover:text-white"
                )}
              >
                <Icon className="size-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {mainTab === "generation" ? (
            <motion.div
              key="generation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 grid items-center gap-12 lg:grid-cols-2"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative aspect-[4/3] overflow-hidden rounded-3xl"
              >
                <Image
                  src="/products/solar-array.jpg"
                  alt="Premium solar panel installation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-huglo-black-bg/80 via-transparent to-transparent" />
              </motion.div>

              <div>
                <div className="mb-6 flex flex-wrap gap-2">
                  {[
                    { id: "jinko" as const, label: "Jinko Tiger Neo" },
                    { id: "trina" as const, label: "Trina Vertex S+" },
                    { id: "sungrow" as const, label: "Sungrow" },
                    { id: "fronius" as const, label: "Fronius" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setGenTab(tab.id)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
                        genTab === tab.id
                          ? "border-huglo-gold bg-huglo-gold/10 text-huglo-gold"
                          : "border-white/10 text-white/60 hover:border-white/30 hover:text-white"
                      )}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {currentGenProduct && (
                    <motion.div
                      key={genTab}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span className="text-xs font-bold uppercase tracking-widest text-huglo-gold">
                        {currentGenProduct.brand}
                      </span>
                      <h3 className="mt-2 font-heading text-3xl font-bold">
                        {currentGenProduct.name}
                      </h3>
                      <p className="mt-4 leading-relaxed text-white/70">
                        {currentGenProduct.description}
                      </p>

                      <div className="mt-8 grid grid-cols-2 gap-4">
                        {"efficiency" in currentGenProduct && (
                          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <div className="text-xs text-white/50">Efficiency</div>
                            <div className="mt-1 font-heading text-xl font-bold text-huglo-gold">
                              {currentGenProduct.efficiency}
                            </div>
                          </div>
                        )}
                        {"capacity" in currentGenProduct && (
                          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <div className="text-xs text-white/50">Capacity</div>
                            <div className="mt-1 font-heading text-xl font-bold text-huglo-gold">
                              {currentGenProduct.capacity}
                            </div>
                          </div>
                        )}
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                          <div className="text-xs text-white/50">Highlight</div>
                          <div className="mt-1 text-sm font-semibold">
                            {currentGenProduct.highlight}
                          </div>
                        </div>
                        {"warranty" in currentGenProduct && (
                          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <div className="text-xs text-white/50">Warranty</div>
                            <div className="mt-1 font-heading text-xl font-bold text-huglo-gold">
                              {currentGenProduct.warranty}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="storage"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 grid items-center gap-12 lg:grid-cols-2"
            >
              <div className="order-2 lg:order-1">
                <div className="mb-6 flex gap-2">
                  {[
                    { id: "sigenergy" as const, label: "Sigenergy" },
                    { id: "sungrow" as const, label: "Sungrow SBR" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setStorageTab(tab.id)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
                        storageTab === tab.id
                          ? "border-huglo-gold bg-huglo-gold/10 text-huglo-gold"
                          : "border-white/10 text-white/60 hover:border-white/30 hover:text-white"
                      )}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {currentStorageProduct && (
                    <motion.div
                      key={storageTab}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span className="text-xs font-bold uppercase tracking-widest text-huglo-gold">
                        {currentStorageProduct.brand}
                      </span>
                      <h3 className="mt-2 font-heading text-3xl font-bold">
                        {currentStorageProduct.name}
                      </h3>
                      <p className="mt-4 leading-relaxed text-white/70">
                        {currentStorageProduct.description}
                      </p>

                      <div className="mt-8 grid grid-cols-2 gap-4">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                          <div className="text-xs text-white/50">Capacity</div>
                          <div className="mt-1 font-heading text-xl font-bold text-huglo-gold">
                            {currentStorageProduct.capacity}
                          </div>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                          <div className="text-xs text-white/50">Highlight</div>
                          <div className="mt-1 text-sm font-semibold">
                            {currentStorageProduct.highlight}
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 flex items-center gap-3 rounded-2xl border border-huglo-gold/30 bg-huglo-gold/10 p-4">
                        <Zap className="size-5 text-huglo-gold" />
                        <span className="text-sm text-white/80">
                          Store daytime solar and power your home through outages
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative order-1 aspect-[4/3] overflow-hidden rounded-3xl lg:order-2"
              >
                <Image
                  src="/products/battery-advantage.jpg"
                  alt="Home battery storage system"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-huglo-black-bg/80 via-transparent to-transparent" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 flex items-center justify-center gap-2 text-sm text-white/50"
        >
          <ChevronRight className="size-4 text-huglo-gold" />
          All products installed by licensed CEC-accredited electricians
        </motion.div>
      </div>
    </section>
  );
}
