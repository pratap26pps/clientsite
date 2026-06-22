"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X } from "lucide-react";
import { SITE } from "@/lib/constants";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#packages", label: "Packages" },
  { href: "/#calculator", label: "Calculator" },
  { href: "/#process", label: "Process" },
  { href: "/#testimonials", label: "Reviews" },
  { href: "/#faq", label: "FAQ" },
];

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const darkHeader = !isHome || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
          darkHeader ? "glass-dark py-3" : "bg-transparent py-4 sm:py-5"
        )}
      >
        <div className="container-wide flex items-center justify-between px-5 sm:px-6 lg:px-8">
          <BrandLogo variant="header" />

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link-huglo">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <a
              href={SITE.phoneHref}
              className="flex items-center gap-2 text-sm font-semibold text-white/90 transition-colors duration-200 hover:text-huglo-gold"
            >
              <Phone className="size-3.5 text-huglo-gold" />
              {SITE.phone}
            </a>
            <Link href="/quote" className="btn-huglo-gold btn-sm">
              Get a quote
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex size-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="size-5" /> : (
              <div className="flex flex-col gap-1.5">
                <span className="block h-0.5 w-5 bg-white" />
                <span className="block h-0.5 w-5 bg-white" />
              </div>
            )}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-huglo-black-bg pt-20 shadow-2xl lg:hidden"
            >
              <div className="flex flex-col px-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="border-b border-white/10 py-4 text-base font-semibold text-white transition-colors hover:text-huglo-gold"
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href={SITE.phoneHref}
                  className="flex items-center gap-2 py-4 text-base font-semibold text-huglo-gold"
                >
                  <Phone className="size-4" />
                  {SITE.phone}
                </a>
                <Link
                  href="/quote"
                  onClick={() => setMobileOpen(false)}
                  className="btn-huglo-gold btn-md mt-4 w-full text-center"
                >
                  Get a quote
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
