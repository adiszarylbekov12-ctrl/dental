import type { Dictionary } from "@/lib/dictionary";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function FloatingWhatsApp({ dict }: { dict: Dictionary }) {
  const waHref = getWhatsAppLink(dict);

  return (
    <a
      href={waHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={dict.common.bookWhatsapp}
      className="fixed bottom-5.5 right-5.5 z-150 flex h-15 w-15 items-center justify-center rounded-full bg-gradient-to-br from-primary-light to-primary-dark text-white shadow-card-lg transition-transform duration-350 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-108"
    >
      <span className="absolute inset-0 -z-10 animate-[waPulse_2.4s_ease-out_infinite] rounded-full bg-primary opacity-55" />
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
