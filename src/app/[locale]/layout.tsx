import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";
import { notFound } from "next/navigation";
import { locales, isLocale, getDictionary, type Locale } from "@/lib/dictionary";
import "../globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
 
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  variable: "--font-inter",
});

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
 
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  variable: "--font-unbounded",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "ru";
  const dict = await getDictionary(locale);

  const title =
    locale === "ru"
      ? "Dr. Alimbekov — Стоматология в Бишкеке и Москве | Премиум лечение зубов"
      : "Dr. Alimbekov — Бишкек жана Москвадагы стоматология";
  const description = dict.hero.sub;

  return {
    title,
    description,
    metadataBase: new URL("https://dr-alimbekov.example.com"),
    alternates: {
      canonical: `/${locale}`,
      languages: { ru: "/ru", ky: "/ky" },
    },
    openGraph: {
      title,
      description,
      locale: locale === "ru" ? "ru_RU" : "ky_KG",
      type: "website",
    },
    icons: {
      icon: "/icon.png",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: "Dr. Alimbekov — Стоматология доктора Алимбекова",
    telephone: "+996708022220",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "улица Молдокулова, 2",
      addressLocality: "Бишкек",
      postalCode: "720082",
      addressCountry: "KG",
    },
    geo: { "@type": "GeoCoordinates", latitude: 42.833394, longitude: 74.639975 },
    openingHours: "Mo-Sa 09:00-18:00",
  };

  return (
    <html lang={locale === "ru" ? "ru" : "ky"} className={`${inter.variable} ${unbounded.variable}`}>
      <body className="bg-white text-ink font-body antialiased overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}