import Image from "next/image";
import Link from "next/link";
import type { Locale, Dictionary } from "@/lib/dictionary";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  const waHref = getWhatsAppLink(dict);

  return (
    <footer className="bg-ink py-16 pb-8 text-white/70">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.1fr] md:gap-8">
          <div>
            <Image src="/logo.png" alt="Dr. Alimbekov" width={58} height={36} className="mb-4 h-8.5 w-auto brightness-0 invert" />
            <p className="max-w-[260px] text-[13.5px] leading-relaxed text-white/55">{dict.footer.tagline}</p>
            <div className="mt-4.5 flex gap-2.5">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9.5 w-9.5 items-center justify-center rounded-full bg-white/8 transition-colors duration-250 hover:bg-primary"
              >
                <InstagramIcon className="h-4.25 w-4.25 text-white" />
              </a>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9.5 w-9.5 items-center justify-center rounded-full bg-white/8 transition-colors duration-250 hover:bg-primary"
              >
                <WhatsAppIcon className="h-4.25 w-4.25 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-[13px] font-bold uppercase tracking-wide text-white/90">{dict.footer.navTitle}</h4>
            <ul className="flex flex-col gap-2.75">
              {[
                { id: "about", label: dict.nav.about },
                { id: "services", label: dict.nav.services },
                { id: "gallery", label: dict.nav.gallery },
                { id: "reviews", label: dict.nav.reviews },
                { id: "faq", label: dict.nav.faq },
              ].map((item) => (
                <li key={item.id}>
                  <Link href={`/${locale}#${item.id}`} className="text-sm text-white/60 transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[13px] font-bold uppercase tracking-wide text-white/90">{dict.footer.servicesTitle}</h4>
            <ul className="flex flex-col gap-2.75">
              {[dict.services.items[0], dict.services.items[4], dict.services.items[5], dict.services.items[7]].map((s) => (
                <li key={s.key}>
                  <Link href={`/${locale}#services`} className="text-sm text-white/60 transition-colors hover:text-white">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[13px] font-bold uppercase tracking-wide text-white/90">{dict.footer.contactsTitle}</h4>
            <ul className="flex flex-col gap-2.75">
              <li>
                <a href="tel:+996708022220" className="text-sm text-white/60 transition-colors hover:text-white">
                  +996 708 02 22 20
                </a>
              </li>
              <li>
                <a href="tel:+996998022228" className="text-sm text-white/60 transition-colors hover:text-white">
                  +996 998 02 22 28
                </a>
              </li>
              <li>
                <Link href={`/${locale}#contacts`} className="text-sm text-white/60 transition-colors hover:text-white">
                  {dict.contacts.cityName}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-7 text-[13px] text-white/65">
          <span>
            © {year} Dr. Alimbekov. {dict.footer.rights}
          </span>
          <span>{dict.footer.cities}</span>
        </div>
      </div>
    </footer>
  );
}