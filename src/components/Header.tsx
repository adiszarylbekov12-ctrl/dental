"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import type { Locale, Dictionary } from "@/lib/dictionary";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/Button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { getWhatsAppLink } from "@/lib/whatsapp";

const SECTION_IDS = ["about", "services", "gallery", "reviews", "faq", "contacts"];

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const ticking = useRef(false);

  const navItems = [
    { id: "about", label: dict.nav.about },
    { id: "services", label: dict.nav.services },
    { id: "gallery", label: dict.nav.gallery },
    { id: "reviews", label: dict.nav.reviews },
    { id: "faq", label: dict.nav.faq },
    { id: "contacts", label: dict.nav.contacts },
  ];

  useEffect(() => {
    function update() {
      setScrolled(window.scrollY > 30);
      const refLine = (headerRef.current?.offsetHeight ?? 80) + 24;
      let current: string | null = null;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= refLine) current = id;
      }
      setActiveId(current);
      ticking.current = false;
    }
    function onScroll() {
      if (!ticking.current) {
        requestAnimationFrame(update);
        ticking.current = true;
      }
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", mobileOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [mobileOpen]);

  const waHref = getWhatsAppLink(dict);

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-100 transition-all duration-350 ease-out ${scrolled ? "py-2.5" : "py-4"}`}
      >
        <div
          className={`absolute inset-0 -z-10 backdrop-blur-xl backdrop-saturate-150 transition-all duration-350 border-b ${
            scrolled ? "bg-white/86 border-ink/8 shadow-[0_8px_30px_rgba(15,35,29,0.06)]" : "bg-white/70 border-transparent"
          }`}
        />
        <div className="mx-auto grid max-w-[1200px] grid-cols-[auto_1fr_auto] items-center gap-4 px-5 md:px-8 lg:px-12">
          <Link href={`/${locale}`} className="col-start-1 flex flex-shrink-0 items-center gap-2.5">
            <Image src="/logo.png" alt="Dr. Alimbekov" width={58} height={36} className="h-9 w-auto" priority />
          </Link>

          <nav className="col-start-2 hidden min-w-0 max-w-full justify-self-center overflow-hidden rounded-full bg-fog p-1.5 [@media(min-width:1180px)]:flex">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={`/${locale}#${item.id}`}
                className={`whitespace-nowrap rounded-full px-3.5 py-2.5 text-sm font-semibold transition-colors duration-250 ${
                  activeId === item.id ? "bg-white text-ink shadow-card-sm" : "text-ink/70 hover:bg-white/70 hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="col-start-3 flex flex-shrink-0 items-center gap-2.5 justify-self-end">
            <LanguageSwitcher locale={locale} />
            <Button
              href={waHref}
              external
              icon={<WhatsAppIcon className="h-5 w-5 shrink-0" />}
              className="hidden sm:inline-flex"
            >
              {dict.common.bookShort}
            </Button>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Menu"
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-fog [@media(min-width:1180px)]:hidden"
            >
              <Menu className="h-5.5 w-5.5" />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-200 flex flex-col bg-white/98 p-6 pb-10 backdrop-blur-2xl transition-all duration-500 ease-out ${
          mobileOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-full opacity-0"
        }`}
      >
        <div className="mb-10 flex items-center justify-between">
          <Link href={`/${locale}`} onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Dr. Alimbekov" width={48} height={31} className="h-8 w-auto" />
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-fog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          {navItems.map((item, i) => (
            <Link
              key={item.id}
              href={`/${locale}#${item.id}`}
              onClick={() => setMobileOpen(false)}
              style={{ transitionDelay: mobileOpen ? `${0.08 + i * 0.06}s` : "0s" }}
              className={`border-b border-ink/8 py-3.5 font-display text-[clamp(1.3rem,5.2vw,2rem)] font-bold transition-all duration-500 ${
                mobileOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-3.5">
          <div className="self-center">
            <LanguageSwitcher locale={locale} />
          </div>
          <Button href={waHref} external size="lg" block icon={<WhatsAppIcon className="h-5 w-5 shrink-0" />}>
            {dict.common.bookWhatsapp}
          </Button>
        </div>
      </div>
    </>
  );
}
