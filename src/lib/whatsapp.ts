import type { Dictionary } from "@/lib/dictionary";

export const WHATSAPP_NUMBER = "996708022220";

/**
 * Builds a wa.me deep link with a pre-filled, localized message.
 * If serviceKey is provided and matches an item in dict.services.items,
 * the message references that specific service; otherwise a generic
 * booking message is used.
 */
export function getWhatsAppLink(dict: Dictionary, serviceKey?: string): string {
  let message = dict.whatsapp.generic;

  if (serviceKey) {
    const service = dict.services.items.find((item) => item.key === serviceKey);
    if (service) {
      message = `${dict.whatsapp.servicePrefix}${service.name}${dict.whatsapp.serviceSuffix}`;
    }
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
