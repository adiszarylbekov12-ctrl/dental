"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Dictionary } from "@/lib/dictionary";
import { Reveal } from "@/components/Reveal";

export function Faq({ dict }: { dict: Dictionary }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12">
        <Reveal className="mx-auto mb-12 max-w-[640px] text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-mist px-4 py-2 text-[13px] font-bold uppercase tracking-wide text-primary-dark">
            {dict.faq.eyebrow}
          </span>
          <h2 className="font-display text-[clamp(1.75rem,2.6vw+1rem,2.75rem)] leading-[1.15] font-bold text-ink">
            {dict.faq.title}
          </h2>
        </Reveal>

        <Reveal className="mx-auto max-w-[760px]">
          {dict.faq.items.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.q} className={`border-b border-ink/8 ${i === 0 ? "border-t" : ""}`}>
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left text-base font-semibold text-ink"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-primary transition-transform duration-400 ${open ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-450 ease-out ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 pr-6.5 text-[14.5px] leading-relaxed text-ink/70">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
