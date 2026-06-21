"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X } from "lucide-react";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#technology", label: "Products" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#faq", label: "Resources" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const scrollToQuote = () => {
    setMobileOpen(false);
    document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-all duration-500",
          scrolled
            ? "glass-dark py-3 shadow-lg shadow-black/20"
            : "bg-transparent py-5"
        )}
      >
        <div className="container-wide flex items-center justify-between px-6 lg:px-8">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-huglo-gold transition-transform duration-300 group-hover:scale-105">
              <span className="font-heading text-lg font-bold text-huglo-black">C</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-heading text-sm font-bold tracking-tight text-white">
                Capital Solar
              </div>
              <div className="text-[10px] font-medium uppercase tracking-widest text-white/60">
                Energy
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link-huglo">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <a
              href={SITE.phoneHref}
              className="flex items-center gap-2 text-sm font-semibold text-white transition-colors duration-300 hover:text-huglo-gold"
            >
              <Phone className="size-4 text-huglo-gold" />
              {SITE.phone}
            </a>
            <button onClick={scrollToQuote} className="btn-huglo-gold !px-6 !py-3 !text-sm">
              Get a quote
            </button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative flex size-10 items-center justify-center lg:hidden"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="size-6 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-1.5"
                >
                  <span className="block h-0.5 w-6 bg-white" />
                  <span className="block h-0.5 w-6 bg-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-huglo-black-bg pt-24 lg:hidden"
          >
            <nav className="flex flex-col px-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="border-b border-white/10 py-5 text-lg font-semibold text-white transition-colors hover:text-huglo-gold"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href={SITE.phoneHref}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05, duration: 0.3 }}
                className="flex items-center gap-2 py-5 text-lg font-semibold text-huglo-gold"
              >
                <Phone className="size-5" />
                {SITE.phone}
              </motion.a>
              <motion.button
                onClick={scrollToQuote}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="btn-huglo-gold mt-6 w-full"
              >
                Get a quote
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
