import type { MetadataRoute } from "next";
import { locales } from "@/lib/dictionary";

const BASE_URL = "https://dr-alimbekov.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === "ru" ? 1 : 0.9,
  }));
}
