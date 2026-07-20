import { Anchor, Layers, CircleCheck, MinusCircle, Activity, Baby, Sparkles, Sun, ScanLine, MessageCircle, ArrowRight } from "lucide-react";
import type { Dictionary } from "@/lib/dictionary";
import { Reveal, RevealStagger, RevealItem } from "@/components/Reveal";
import { getWhatsAppLink } from "@/lib/whatsapp";

const icons = [Anchor, Layers, CircleCheck, MinusCircle, Activity, Baby, Sparkles, Sun, ScanLine, MessageCircle];

export function Services({ dict }: { dict: Dictionary }) {
  return (
    <section id="services" className="section bg-fog py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12">
        <Reveal className="mx-auto mb-12 max-w-[640px] text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-bold uppercase tracking-wide text-primary-dark">
            {dict.services.eyebrow}
          </span>
          <h2 className="mb-4 font-display text-[clamp(1.75rem,2.6vw+1rem,2.75rem)] leading-[1.15] font-bold text-ink">
            {dict.services.title}
          </h2>
          <p className="text-[clamp(1rem,.4vw+.95rem,1.125rem)] leading-relaxed text-ink/70">{dict.services.sub}</p>
        </Reveal>

        <RevealStagger className="grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {dict.services.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <RevealItem
                key={item.key}
                className="group flex flex-col rounded-card border border-ink/8 bg-white p-6.5 transition-all duration-400 hover:-translate-y-1.5 hover:shadow-card-lg"
              >
                <div className="mb-4 flex h-11.5 w-11.5 items-center justify-center rounded-sm bg-mist">
                  <Icon className="h-5.5 w-5.5 text-primary-dark" />
                </div>
                <h3 className="mb-1.5 text-base font-bold leading-tight text-ink">{item.name}</h3>
                <p className="mb-4.5 flex-1 text-[13.5px] leading-relaxed text-ink/70">{item.desc}</p>
                <a
                  href={getWhatsAppLink(dict, item.key)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 text-[13px] font-bold text-primary-dark"
                >
                  {dict.services.cta}
                  <ArrowRight className="h-3.75 w-3.75 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
