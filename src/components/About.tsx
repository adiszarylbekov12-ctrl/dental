import Image from "next/image";
import { MapPin } from "lucide-react";
import type { Dictionary } from "@/lib/dictionary";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";

export function About({ dict }: { dict: Dictionary }) {
  return (
    <section id="about" className="section py-16 md:py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 md:px-8 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-16 lg:px-12">
        <Reveal className="max-w-[480px]">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-mist px-4 py-2 text-[13px] font-bold uppercase tracking-wide text-primary-dark">
            {dict.about.eyebrow}
          </span>
          <h2 className="mb-4 font-display text-[clamp(1.75rem,2.6vw+1rem,2.75rem)] leading-[1.15] font-bold text-ink">
            {dict.about.title}
          </h2>
          <p className="text-[clamp(1rem,.4vw+.95rem,1.125rem)] leading-relaxed text-ink/70">{dict.about.text}</p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-white px-4 py-2.5 text-[13.5px] font-semibold">
              <MapPin className="h-4 w-4 text-primary" /> {dict.contacts.cityName}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-white px-4 py-2.5 text-[13.5px] font-semibold">
              <MapPin className="h-4 w-4 text-primary" /> Москва
            </span>
          </div>
        </Reveal>

        <Reveal className="flex flex-col gap-5" delay={0.1}>
          <div className="relative aspect-[5/4] overflow-hidden rounded-card border border-ink/8 shadow-card-md">
            <Image
              src="https://picsum.photos/seed/dralimbekov-clinic-about/700/560"
              alt="Dr. Alimbekov"
              fill
              sizes="(min-width: 1024px) 500px, 100vw"
              className="object-cover"
              quality={80}
            />
            <span className="absolute right-3.5 top-3.5 rounded-full bg-white/85 px-2.5 py-1.5 text-[10.5px] font-bold text-ink/70 backdrop-blur-sm">
              {dict.gallery.soon}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {dict.about.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-card border border-ink/8 bg-white px-5.5 py-6.5 shadow-card-sm transition-all duration-400 hover:-translate-y-1 hover:shadow-card-md"
              >
                <div className="mb-2 font-display text-[clamp(1.8rem,2.4vw+1rem,2.4rem)] font-extrabold leading-none text-primary-dark">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[13.5px] font-medium text-ink/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
