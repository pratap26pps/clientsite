"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MapPin, Menu, X, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#technology", label: "Technology" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToQuote = () => {
    setMobileOpen(false);
    document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-all duration-500",
          scrolled
            ? "glass-dark py-3 shadow-lg shadow-navy/10"
            : "bg-transparent py-5"
        )}
      >
        <div className="container-wide flex items-center justify-between px-6 lg:px-8">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-solar-orange shadow-lg shadow-solar-orange/30 transition-transform group-hover:scale-105">
              <Sun className="size-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <div
                className={cn(
                  "font-heading text-sm font-bold tracking-tight transition-colors",
                  scrolled ? "text-white" : "text-white"
                )}
              >
                Capital Solar
              </div>
              <div
                className={cn(
                  "text-[10px] font-medium uppercase tracking-widest transition-colors",
                  scrolled ? "text-white/60" : "text-white/70"
                )}
              >
                Energy
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-solar-orange",
                  scrolled ? "text-white/80" : "text-white/90"
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <a
              href={SITE.phoneHref}
              className={cn(
                "flex items-center gap-2 text-sm font-semibold transition-colors hover:text-solar-orange",
                scrolled ? "text-white" : "text-white"
              )}
            >
              <Phone className="size-4 text-solar-orange" />
              {SITE.phone}
            </a>
            <Button
              onClick={scrollToQuote}
              className="h-11 rounded-full bg-solar-orange px-6 font-semibold text-white shadow-lg shadow-solar-orange/30 hover:bg-solar-orange-light"
            >
              Request Free Quote
            </Button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex size-10 items-center justify-center rounded-lg text-white lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-navy pt-24 lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-white/10 py-4 text-lg font-medium text-white"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={SITE.phoneHref}
                className="flex items-center gap-2 py-4 text-lg font-semibold text-solar-orange"
              >
                <Phone className="size-5" />
                {SITE.phone}
              </a>
              <div className="flex items-center gap-2 py-4 text-sm text-white/60">
                <MapPin className="size-4" />
                {SITE.addressShort}
              </div>
              <Button
                onClick={scrollToQuote}
                className="mt-4 h-12 w-full rounded-full bg-solar-orange text-base font-semibold"
              >
                Request Free Quote
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
