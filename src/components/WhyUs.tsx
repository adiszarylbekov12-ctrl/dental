import { ScanLine, Droplet, ShieldCheck, Award, Tag, Building2 } from "lucide-react";
import type { Dictionary } from "@/lib/dictionary";
import { Reveal, RevealStagger, RevealItem } from "@/components/Reveal";

const icons = [ScanLine, Droplet, ShieldCheck, Award, Tag, Building2];

export function WhyUs({ dict }: { dict: Dictionary }) {
  return (
    <section id="whyus" className="section bg-mist py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12">
        <Reveal className="mx-auto mb-12 max-w-[640px] text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-bold uppercase tracking-wide text-primary-dark">
            {dict.whyUs.eyebrow}
          </span>
          <h2 className="font-display text-[clamp(1.75rem,2.6vw+1rem,2.75rem)] leading-[1.15] font-bold text-ink">
            {dict.whyUs.title}
          </h2>
        </Reveal>

        <RevealStagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dict.whyUs.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <RevealItem
                key={item.title}
                className="rounded-card border border-ink/8 bg-white p-7.5 transition-all duration-400 hover:-translate-y-1.5 hover:border-transparent hover:shadow-card-lg"
              >
                <div className="mb-4.5 flex h-13 w-13 items-center justify-center rounded-sm bg-mist">
                  <Icon className="h-6.5 w-6.5 text-primary-dark" />
                </div>
                <h3 className="mb-2 text-[17px] font-bold leading-tight text-ink">{item.title}</h3>
                <p className="text-sm leading-relaxed text-ink/70">{item.text}</p>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
