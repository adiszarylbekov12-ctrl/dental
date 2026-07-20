"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Building, Settings, Armchair, Clock, ClipboardList, ShieldCheck, X } from "lucide-react";
import type { Dictionary } from "@/lib/dictionary";
import { Reveal } from "@/components/Reveal";

const icons = [Building, Settings, Armchair, Clock, ClipboardList, ShieldCheck];

const tileStyles = [
  { bg: "bg-gradient-to-br from-mist to-white", fg: "text-primary-dark" },
  { bg: "bg-gradient-to-br from-primary-light to-primary-dark", fg: "text-white" },
  { bg: "bg-gradient-to-br from-fog to-mist", fg: "text-primary-dark" },
  { bg: "bg-gradient-to-br from-primary to-accent", fg: "text-white" },
  { bg: "bg-gradient-to-br from-mist to-fog", fg: "text-primary-dark" },
  { bg: "bg-gradient-to-br from-primary-dark to-primary", fg: "text-white" },
];

export function Gallery({ dict }: { dict: Dictionary }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="section py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12">
        <Reveal className="mx-auto mb-12 max-w-[640px] text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-mist px-4 py-2 text-[13px] font-bold uppercase tracking-wide text-primary-dark">
            {dict.gallery.eyebrow}
          </span>
          <h2 className="font-display text-[clamp(1.75rem,2.6vw+1rem,2.75rem)] leading-[1.15] font-bold text-ink">
            {dict.gallery.title}
          </h2>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-2 gap-3.5 md:grid-cols-3 md:gap-4.5">
            {dict.gallery.items.map((item, i) => {
              const Icon = icons[i];
              const style = tileStyles[i];
              const isTall = i === 0 || i === 3;
              return (
                <button
                  key={item.label}
                  onClick={() => setOpenIndex(i)}
                  className={`group relative aspect-square overflow-hidden rounded-card border border-ink/8 text-left transition-all duration-450 hover:-translate-y-1 hover:shadow-card-lg ${
                    isTall ? "md:row-span-2 md:aspect-[1/2.05]" : ""
                  }`}
                >
                  <div className={`absolute inset-0 flex flex-col items-center justify-center gap-2.5 ${style.bg}`}>
                    <Icon className={`h-8.5 w-8.5 opacity-85 ${style.fg}`} />
                    <span className={`px-4 text-center text-[13px] font-bold ${style.fg}`}>{item.label}</span>
                  </div>
                  <span className="absolute right-3 top-3 rounded-full bg-white/85 px-2.75 py-1.25 text-[10.5px] font-bold text-ink/70 backdrop-blur-sm">
                    {dict.gallery.soon}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenIndex(null)}
            className="fixed inset-0 z-300 flex items-center justify-center bg-ink/90 p-6"
          >
            <button
              onClick={() => setOpenIndex(null)}
              aria-label="Close"
              className="absolute right-6 top-6 flex h-11.5 w-11.5 items-center justify-center rounded-full bg-white/12"
            >
              <X className="h-5.5 w-5.5 text-white" />
            </button>
            <motion.div
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              className={`flex aspect-[4/3] w-full max-w-[480px] flex-col items-center justify-center gap-4 rounded-card ${tileStyles[openIndex].bg}`}
            >
              {(() => {
                const Icon = icons[openIndex];
                return <Icon className={`h-14 w-14 ${tileStyles[openIndex].fg}`} />;
              })()}
              <span className={`text-lg font-bold ${tileStyles[openIndex].fg}`}>{dict.gallery.items[openIndex].label}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
