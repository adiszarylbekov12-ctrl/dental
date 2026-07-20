import { isLocale, getDictionary } from "@/lib/dictionary";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { WhyUs } from "@/components/WhyUs";
import { Services } from "@/components/Services";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { Contacts } from "@/components/Contacts";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Header locale={locale} dict={dict} />
      <main>
        <Hero dict={dict} />
        <About dict={dict} />
        <WhyUs dict={dict} />
        <Services dict={dict} />
        <Gallery dict={dict} />
        <Testimonials dict={dict} />
        <Faq dict={dict} />
        <Contacts dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
      <FloatingWhatsApp dict={dict} />
    </>
  );
}
