"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROCESS_STEPS } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (progressRef.current && timelineRef.current) {
        gsap.to(progressRef.current, {
          width: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 1,
          },
        });
      }

      gsap.utils.toArray<HTMLElement>(".process-step").forEach((step, i) => {
        gsap.from(step, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.05,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="section-padding bg-white">
      <div className="container-wide">
        <SectionHeading
          eyebrow="How We Work"
          title="From Consultation to Clean Energy in 6 Steps"
          description="A transparent, structured process designed to make your solar journey effortless."
        />

        <div ref={timelineRef} className="relative mt-20">
          <div className="absolute top-8 right-0 left-0 hidden h-0.5 bg-border lg:block">
            <div
              ref={progressRef}
              className="h-full w-0 bg-huglo-gold"
            />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {PROCESS_STEPS.map((step) => (
              <div key={step.step} className="process-step relative">
                <div className="mb-6 flex size-16 items-center justify-center rounded-2xl border-2 border-huglo-gold bg-white font-heading text-xl font-bold text-huglo-gold shadow-lg shadow-huglo-gold/10">
                  {step.step}
                </div>
                <h3 className="font-heading text-lg font-bold text-huglo-black">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-huglo-grey">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
