import { MapPin, Phone, Clock, Building } from "lucide-react";
import type { Dictionary } from "@/lib/dictionary";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function Contacts({ dict }: { dict: Dictionary }) {
  const waHref = getWhatsAppLink(dict);

  return (
    <section id="contacts" className="section bg-fog py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12">
        <Reveal className="mx-auto mb-12 max-w-[640px] text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-bold uppercase tracking-wide text-primary-dark">
            {dict.contacts.eyebrow}
          </span>
          <h2 className="font-display text-[clamp(1.75rem,2.6vw+1rem,2.75rem)] leading-[1.15] font-bold text-ink">
            {dict.contacts.title}
          </h2>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-1 overflow-hidden rounded-card border border-ink/8 bg-white shadow-card-md md:grid-cols-[1.15fr_1fr]">
            <div className="h-[280px] w-full md:h-auto md:min-h-full">
              <iframe
                src="https://www.google.com/maps?q=42.833394,74.639975&hl=ru&z=16&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bishkek map"
                className="h-full w-full border-0"
              />
            </div>
            <div className="flex flex-col justify-center p-8.5">
              <h3 className="mb-4.5 flex items-center gap-2.5 text-xl font-bold">
                <MapPin className="h-5.5 w-5.5 text-primary" /> {dict.contacts.cityName}
              </h3>
              <div className="mb-3 flex items-start gap-3 text-sm text-ink/70">
                <Building className="mt-0.5 h-4.5 w-4.5 flex-shrink-0 text-primary" />
                <span>{dict.contacts.address}</span>
              </div>
              <div className="mb-3 flex items-start gap-3 text-sm text-ink/70">
                <Phone className="mt-0.5 h-4.5 w-4.5 flex-shrink-0 text-primary" />
                <span>
                  <a href="tel:+996708022220" className="font-semibold text-ink">
                    +996 708 02 22 20
                  </a>
                  ,{" "}
                  <a href="tel:+996998022228" className="font-semibold text-ink">
                    +996 998 02 22 28
                  </a>
                </span>
              </div>
              <div className="mb-5 flex items-start gap-3 text-sm text-ink/70">
                <Clock className="mt-0.5 h-4.5 w-4.5 flex-shrink-0 text-primary" />
                <span>{dict.contacts.hours}</span>
              </div>
              <Button href={waHref} external block icon={<WhatsAppIcon className="h-5 w-5 shrink-0" />}>
                {dict.common.bookWhatsapp}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
