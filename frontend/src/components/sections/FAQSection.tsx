"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function FAQSection() {
  return (
    <section id="faq" className="section-padding bg-white">
      <div className="container-wide">
        <SectionHeading
          eyebrow="FAQ"
          title="Common questions about solar in Canberra"
          description="Everything you need to know about solar installation, batteries, rebates, and our process."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-16 max-w-3xl"
        >
          <Accordion className="space-y-3">
            {FAQS.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="rounded-2xl border border-huglo-grey-light bg-warm-white px-6 transition-all duration-300 data-[state=open]:border-huglo-gold/30 data-[state=open]:shadow-lg data-[state=open]:shadow-huglo-black/5"
              >
                <AccordionTrigger className="py-5 text-left font-heading text-base font-semibold text-huglo-black hover:no-underline lg:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 leading-relaxed text-huglo-grey">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
