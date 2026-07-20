"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Locale } from "@/lib/dictionary";

export function LanguageSwitcher({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const pathname = usePathname();
  const rest = pathname.replace(/^\/(ru|ky)/, "") || "";

  const targets: { code: Locale; label: string }[] = [
    { code: "ru", label: "RU" },
    { code: "ky", label: "KY" },
  ];

  return (
    <div className={`flex items-center gap-0.5 rounded-full bg-fog p-1 ${compact ? "" : ""}`} role="group" aria-label="Language">
      {targets.map((t) => (
        <Link
          key={t.code}
          href={`/${t.code}${rest}`}
          className={`min-h-10 rounded-full px-3 py-2 text-[13px] font-bold transition-all duration-300 ${
            locale === t.code ? "bg-white text-primary-dark shadow-card-sm" : "text-ink/55 hover:text-ink"
          }`}
        >
          {t.label}
        </Link>
      ))}
    </div>
  );
}
