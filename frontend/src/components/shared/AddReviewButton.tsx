"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { PenLine } from "lucide-react";
import { ReviewSubmitModal } from "./ReviewSubmitModal";

export function AddReviewButton() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="fixed bottom-5 left-4 z-[9000] flex items-center gap-2 rounded-full bg-white px-4 py-3 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.45)] sm:bottom-6 sm:left-6 sm:px-5"
        aria-label="Add your review"
      >
        <PenLine className="size-4 text-huglo-gold sm:size-5" />
        <span className="text-xs font-bold text-huglo-black sm:text-sm">
          Add your review
        </span>
      </motion.button>

      <ReviewSubmitModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmitted={() => {
          window.dispatchEvent(new CustomEvent("review-submitted"));
        }}
      />
    </>
  );
}
