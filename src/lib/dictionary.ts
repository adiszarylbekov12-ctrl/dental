import "server-only";
import type ruDict from "@/dictionaries/ru.json";

export const locales = ["ru", "ky"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ru";

export type Dictionary = typeof ruDict;

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  ru: () => import("@/dictionaries/ru.json").then((m) => m.default),
  ky: () => import("@/dictionaries/ky.json").then((m) => m.default as Dictionary),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const load = loaders[locale] ?? loaders[defaultLocale];
  return load();
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
