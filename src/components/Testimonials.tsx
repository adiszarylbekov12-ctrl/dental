"use client";

import { useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import type { Dictionary } from "@/lib/dictionary";
import { Reveal } from "@/components/Reveal";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

export function Testimonials({ dict }: { dict: Dictionary }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function step(dir: 1 | -1) {
    const card = scrollRef.current?.querySelector("[data-card]") as HTMLElement | null;
    const amount = (card?.offsetWidth ?? 320) + 20;
    scrollRef.current?.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  return (
    <section id="reviews" className="section bg-mist py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12">
        <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-bold uppercase tracking-wide text-primary-dark">
              {dict.testimonials.eyebrow}
            </span>
            <h2 className="font-display text-[clamp(1.75rem,2.6vw+1rem,2.75rem)] leading-[1.15] font-bold text-ink">
              {dict.testimonials.title}
            </h2>
          </div>
          <div className="hidden gap-2.5 md:flex">
            <button
              onClick={() => step(-1)}
              aria-label="Previous"
              className="flex h-11.5 w-11.5 items-center justify-center rounded-full border border-ink/15 bg-white transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-white"
            >
              <ChevronLeft className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={() => step(1)}
              aria-label="Next"
              className="flex h-11.5 w-11.5 items-center justify-center rounded-full border border-ink/15 bg-white transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-white"
            >
              <ChevronRight className="h-4.5 w-4.5" />
            </button>
          </div>
        </Reveal>

        <Reveal>
          <div ref={scrollRef} className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto py-3">
            {dict.testimonials.items.map((t) => (
              <div
                key={t.name}
                data-card
                className="flex w-[min(340px,82vw)] flex-shrink-0 snap-start flex-col rounded-card border border-ink/8 bg-white p-6.5 shadow-card-sm"
              >
                <div className="mb-4 flex gap-0.5 text-[#F5A623]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mb-5.5 flex-1 text-[14.5px] leading-relaxed text-ink">{t.text}</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-mist font-display text-sm font-bold text-primary-dark">
                    {initials(t.name)}
                  </div>
                  <div>
                    <div className="text-sm font-bold">{t.name}</div>
                    <div className="text-xs text-ink/55">{t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
