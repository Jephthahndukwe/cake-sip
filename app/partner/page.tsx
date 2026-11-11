import type { Metadata } from "next";
import Image from "next/image";
import { Camera, Hand, Users } from "lucide-react";
import LogoWall from "@/components/LogoWall";
import EnquiryForm from "@/components/EnquiryForm";
import { Drip, Sprinkles } from "@/components/Frosting";
import { Kicker, SectionHead, Sticker } from "@/components/Deco";
import { FadeUp, InView, Words } from "@/components/Reveal";
import { PHOTOS } from "@/lib/photos";
import { EVENT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Partner with us",
  description: `Sponsor, vend or partner with ${EVENT.name}, a denim-themed cake party in Lagos.`,
  openGraph: { images: [{ url: "/og/partner.jpg", width: 1200, height: 630 }] },
  twitter: { images: ["/og/partner.jpg"] },
};

const frost = (tone: "blush" | "cream") =>
  `tone-${tone} relative isolate z-10 -mt-12 rounded-t-[2.5rem] pb-28 pt-20 md:-mt-16 md:rounded-t-[4rem] md:pb-36 md:pt-28`;
const denim = "twill relative isolate pb-28 pt-36 md:pb-36 md:pt-44";

const AUDIENCE = [
  { icon: Users, title: "Young Lagos, out together", text: "Besties, couples and friend groups who plan their weekends around experiences." },
  { icon: Camera, title: "Content all afternoon", text: "A photo-first room. Guests and creators post from arrival to cake reveal." },
  { icon: Hand, title: "Hands-on attention", text: "Guests are seated, engaged and in one place for hours, not scrolling past a banner." },
];

const TIERS = [
  { name: "Headline partner", lead: "Your name on the whole afternoon.", perks: ["Logo on the flyer, tickets and photo wall", "MC shout-outs throughout the event", "Product in every goodie bag", "Dedicated social posts before and after"], featured: true },
  { name: "Experience partner", lead: "Own one moment of the day.", perks: ["Branded activity: games, drinks or photo booth", "Logo on the partner wall", "Giveaway slot on stage", "Tagged in the event recap"] },
  { name: "Vendor & booth", lead: "Sell or sample to the room.", perks: ["A table in the venue", "Listing on the event page", "Direct access to every guest"] },
];

export default function PartnerPage() {
  return (
    <main>
      <section className="twill relative isolate pb-24 pt-32 md:pb-32 md:pt-44">
        <div className="container grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="relative z-10 lg:-mr-20">
            <Kicker>partner with us</Kicker>
            <Words as="h1" text="Put your brand in the room." accentFrom={3} className="display mt-2 text-[clamp(3rem,9vw,7.5rem)]" />
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <Sticker className="absolute -left-3 top-10 z-10 -rotate-6">past partners in the wild</Sticker>
            <div className="frame frame-blush rounded-b-[2rem] rounded-t-full">
              <InView className="photo-in relative aspect-[4/5] overflow-hidden rounded-b-[1.6rem] rounded-t-full">
                <Image src={PHOTOS.denimJacket.src} alt={PHOTOS.denimJacket.alt} fill priority placeholder="blur" sizes="(min-width: 1024px) 380px, 90vw" className="object-cover" style={{ objectPosition: "50% 20%" }} />
              </InView>
            </div>
          </div>
        </div>
      </section>

      {/* The one gradient moment */}
      <section className="wash relative isolate overflow-hidden pb-36 pt-32 md:pb-44 md:pt-40">
        <Drip className="absolute inset-x-0 top-0" />
        <Sprinkles className="right-[5%] top-24 h-40 w-48 md:w-72" seed={11} />
        <div className="container relative">
          <Kicker tone="cream">why cake &amp; sip</Kicker>
          <Words as="p" text="A full room. A full afternoon. Full attention." accentFrom={4} accentClass="text-blush" className="display mt-2 max-w-[14ch] text-[clamp(2.6rem,7.5vw,6.5rem)]" />
          <FadeUp delay={150}>
            <p className="mt-8 max-w-xl text-lg font-medium">Cake &amp; Sip is a sit-down, hands-on day party. Your brand isn&apos;t a logo people walk past; it&apos;s part of what they do, eat, drink and post.</p>
            <a href="#enquire" className="btn mt-8 bg-cream text-ink hover:bg-white">Start a conversation</a>
          </FadeUp>
        </div>
      </section>

      <section className={frost("blush")}>
        <div className="container">
          <SectionHead kicker="who's in the room" title="Your next favourite customers." accentFrom={2} align="center" />
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {AUDIENCE.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="rounded-3xl bg-raise p-7 shadow-[0_14px_40px_-20px_rgb(23_36_64/0.45)]">
                <Icon className={`h-9 w-9 ${i % 2 ? "text-gold" : "text-magenta"}`} strokeWidth={1.75} aria-hidden />
                <h3 className="serif-h mt-6 text-2xl">{title}</h3>
                <p className="mt-2 text-dim">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={denim}>
        <Drip className="absolute inset-x-0 top-0" />
        <div className="container">
          <SectionHead kicker="in good company" kickerTone="gold" title="Past partners." accentFrom={1} />
          <div className="mt-12"><LogoWall /></div>
        </div>
      </section>

      <section className={frost("cream")}>
        <div className="container">
          <SectionHead kicker="ways to partner" title="Pick your level." accentFrom={2} align="center" drip />
          <p className="mt-4 text-center text-dim">Packages are tailored to your goals. Tell us what you have in mind and we&apos;ll send pricing.</p>
          <ul className="mt-12 grid gap-5 lg:grid-cols-3">
            {TIERS.map((t) => (
              <li key={t.name} className={`flex flex-col rounded-3xl bg-raise p-7 shadow-[0_14px_40px_-20px_rgb(23_36_64/0.45)] ${t.featured ? "ring-2 ring-magenta lg:-translate-y-3" : ""}`}>
                {t.featured && <span className="mb-4 self-start rounded-full bg-mint px-3 py-1 text-xs font-extrabold text-ink">Top tier</span>}
                <h3 className="serif-h text-3xl">{t.name}</h3>
                <p className="mt-2 font-bold text-blush">{t.lead}</p>
                <ul className="mt-6 space-y-2.5">
                  {t.perks.map((p) => (
                    <li key={p} className="flex gap-3 text-dim"><span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-magenta" />{p}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="enquire" className={`${denim} scroll-mt-20`}>
        <Drip color="#fff6ee" className="absolute inset-x-0 top-0" />
        <div className="container max-w-4xl">
          <SectionHead kicker="let's make it happen" kickerTone="gold" title="Send us a note." accentFrom={3} />
          <div className="mt-10">
            <EnquiryForm
              type="partner"
              submitLabel="Send enquiry"
              successTitle="Enquiry received"
              whatsappIntro={`Hi Kezz! Partnership enquiry for ${EVENT.name}:`}
              fields={[
                { name: "name", label: "Your name", required: true, autoComplete: "name", half: true },
                { name: "company", label: "Brand or company", required: true, autoComplete: "organization", half: true },
                { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", half: true },
                { name: "phone", label: "Phone (WhatsApp)", type: "tel", required: true, autoComplete: "tel", half: true },
                { name: "interest", label: "I'm interested in", type: "select", options: ["Headline partner", "Experience partner", "Vendor & booth", "Something else"], required: true },
                { name: "message", label: "Tell us a bit more", type: "textarea", placeholder: "Your goals, products, budget range..." },
              ]}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
