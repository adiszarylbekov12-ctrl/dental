"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Users, Award, Star, Phone } from "lucide-react";
import type { Dictionary } from "@/lib/dictionary";
import { Button } from "@/components/Button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Reveal } from "@/components/Reveal";
import { getWhatsAppLink } from "@/lib/whatsapp";

const chatDelays = [0.2, 1.0, 2.1, 3.2, 4.0, 5.1];

const featureIcons = [ShieldCheck, Cpu, Users, Award];

function ChatBubble({
  children,
  from,
  delay,
}: {
  children: React.ReactNode;
  from: "in" | "out";
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`max-w-[84%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-snug ${
        from === "in" ? "self-start rounded-bl-md bg-fog" : "self-end rounded-br-md bg-gradient-to-br from-primary-light to-primary text-white"
      }`}
    >
      {children}
    </motion.div>
  );
}

function TypingDots({ delay, duration }: { delay: number; duration: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration, delay, times: [0, 0.2, 0.75, 1], ease: "linear" }}
      className="flex w-fit items-center gap-1 self-start rounded-2xl rounded-bl-md bg-fog px-4 py-3.5"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
          className="h-1.5 w-1.5 rounded-full bg-ink/55"
        />
      ))}
    </motion.div>
  );
}

export function Hero({ dict }: { dict: Dictionary }) {
  const waHref = getWhatsAppLink(dict);

  return (
    <section id="hero" className="relative overflow-hidden pt-10 md:pt-16 lg:pt-20">
      <div className="mx-auto grid max-w-[1200px] gap-14 px-5 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-12">
        {/* LCP-критичный блок: H1 рендерится сразу, без opacity-анимации, чтобы не задерживать LCP */}
        <div className="max-w-[560px]">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-mist px-4 py-2 text-[13px] font-bold uppercase tracking-wide text-primary-dark">
            {dict.hero.eyebrow}
          </span>
          <h1 className="mb-5 font-display text-[clamp(2.05rem,5vw+.85rem,4.1rem)] leading-[1.1] font-extrabold tracking-tight text-ink">
            {dict.hero.titleLine1}
            <br />
            {dict.hero.titleLine2}
          </h1>
          <p className="mb-8 max-w-[480px] text-[clamp(1.05rem,.5vw+1rem,1.2rem)] leading-relaxed text-ink/70">
            {dict.hero.sub}
          </p>
          <div className="flex flex-wrap gap-3.5">
            <Button href={waHref} external size="lg" icon={<WhatsAppIcon className="h-5 w-5 shrink-0" />}>
              {dict.common.bookWhatsapp}
            </Button>
            <Button href="tel:+996708022220" variant="secondary" size="lg" icon={<Phone className="h-5 w-5 shrink-0" />}>
              {dict.common.call}
            </Button>
          </div>
        </div>

        {/* Визуал тоже выше фолда — без Reveal, чтобы не гейтить отрисовку JS-анимацией */}
        <div className="relative flex min-h-[460px] items-center justify-center p-5">
          <div className="absolute inset-0 -z-10 h-[130%] w-[130%] -translate-x-[7.5%] -translate-y-[7.5%] bg-[radial-gradient(circle_at_28%_28%,var(--color-mist),transparent_60%),radial-gradient(circle_at_78%_74%,rgba(32,195,170,0.20),transparent_55%)]" />

          <div className="absolute right-1 top-1.5 z-10 flex animate-[floaty_5s_ease-in-out_infinite] items-center gap-2.5 rounded-2xl border border-ink/8 bg-white px-4 py-2.5 shadow-card-md">
            <Star className="h-5 w-5 fill-current text-primary" />
            <div>
              <b className="block text-sm leading-tight">4.9</b>
              <span className="whitespace-nowrap text-[10.5px] text-ink/55">{dict.hero.badgeRating}</span>
            </div>
          </div>

          <div className="relative z-20 w-full max-w-[360px] rounded-card border border-ink/8 bg-white px-5 pb-5.5 pt-5 shadow-card-lg">
            <div className="mb-4 flex items-center gap-2.5 border-b border-ink/8 pb-3.5">
              <div className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-mist p-1">
                <ShieldCheck className="h-5 w-5 text-primary-dark" />
              </div>
              <div>
                <div className="text-sm font-bold">Dr. Alimbekov</div>
                <div className="flex items-center gap-1.5 text-xs text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {dict.hero.chatOnline}
                </div>
              </div>
            </div>
            <div className="flex min-h-[210px] flex-col justify-end gap-2.5">
              <ChatBubble from="in" delay={chatDelays[0]}>{dict.hero.chat1}</ChatBubble>
              <TypingDots delay={chatDelays[1]} duration={1.1} />
              <ChatBubble from="out" delay={chatDelays[2]}>{dict.hero.chat2}</ChatBubble>
              <ChatBubble from="in" delay={chatDelays[3]}>{dict.hero.chat3}</ChatBubble>
              <TypingDots delay={chatDelays[4]} duration={1.1} />
              <ChatBubble from="out" delay={chatDelays[5]}>{dict.hero.chat4}</ChatBubble>
            </div>
          </div>

          <div className="absolute bottom-5.5 left-0 z-10 flex animate-[floaty_5s_ease-in-out_infinite_1.4s] items-center gap-2.5 rounded-2xl border border-ink/8 bg-white px-4 py-2.5 shadow-card-md">
            <Award className="h-5 w-5 text-primary" />
            <div>
              <b className="block text-sm leading-tight">{dict.hero.badgeExpNum}</b>
              <span className="whitespace-nowrap text-[10.5px] text-ink/55">{dict.hero.badgeExpLabel}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ниже фолда — Reveal оставляем, здесь задержка отрисовки не влияет на LCP */}
      <Reveal className="mx-auto mt-13 max-w-[1200px] border-t border-ink/8 px-5 py-8 md:px-8 lg:px-12" delay={0.1}>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {dict.features.map((label, i) => {
            const Icon = featureIcons[i];
            return (
              <div key={label} className="flex items-center gap-3">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-sm bg-mist">
                  <Icon className="h-5.5 w-5.5 text-primary-dark" />
                </div>
                <span className="text-[13.5px] font-semibold leading-tight">{label}</span>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}