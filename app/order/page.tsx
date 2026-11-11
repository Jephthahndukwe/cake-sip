import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Kicker } from "@/components/Deco";
import { Drip } from "@/components/Frosting";
import EnquiryForm from "@/components/EnquiryForm";
import { FadeUp, Words } from "@/components/Reveal";
import { PHOTOS } from "@/lib/photos";
import { EVENT, ORDERS_ENABLED } from "@/lib/site";

export const metadata: Metadata = {
  title: "Custom cake orders",
  description: `Order a custom cake from ${EVENT.brand}, Lagos.`,
  openGraph: { images: [{ url: "/og/order.jpg", width: 1200, height: 630 }] },
  twitter: { images: ["/og/order.jpg"] },
};

export default function OrderPage() {
  // Built behind a feature flag; turn on with NEXT_PUBLIC_ENABLE_ORDERS=true.
  if (!ORDERS_ENABLED) notFound();

  return (
    <main>
      <section className="relative isolate h-[80svh] min-h-[560px] overflow-hidden bg-denim">
        <Image src={PHOTOS.showpiece.src} alt={PHOTOS.showpiece.alt} fill priority placeholder="blur" sizes="100vw" className="object-cover" style={{ objectPosition: PHOTOS.showpiece.pos }} />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-denim via-denim/80 to-transparent" />
        <div className="container relative flex h-full flex-col justify-end pb-12">
          <Kicker tone="gold">{EVENT.brand}</Kicker>
          <h1 className="display mt-4 text-[clamp(3rem,12vw,10rem)]">Custom <span className="text-magenta">cakes.</span></h1>
        </div>
      </section>

      <section className="wash relative isolate pb-32 pt-20 md:pb-40 md:pt-28">
        <div className="container">
          <Kicker tone="cream">birthdays, weddings, just because</Kicker>
          <Words as="p" text="Tell us the vibe. We'll bake it." accentFrom={4} accentClass="text-blush" className="display mt-5 max-w-[14ch] text-[clamp(2.6rem,8vw,7rem)]" />
        </div>
      </section>

      <section className="twill relative isolate pb-28 pt-36 md:pt-44">
        <Drip className="absolute inset-x-0 top-0" />
        <div className="container max-w-4xl">
          <Kicker>tell us about your cake</Kicker>
          <FadeUp>
            <p className="mt-4 text-lg text-dim">Share the details and a reference picture if you have one. We&apos;ll reply with options and a quote.</p>
          </FadeUp>
          <div className="mt-10">
            <EnquiryForm
              type="order"
              submitLabel="Send my cake request"
              successTitle="Cake request received"
              whatsappIntro={`Hi Kezz! I'd like a custom cake:`}
              fields={[
                { name: "name", label: "Your name", required: true, autoComplete: "name", half: true },
                { name: "phone", label: "Phone (WhatsApp)", type: "tel", required: true, autoComplete: "tel", half: true },
                { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", half: true },
                { name: "occasion", label: "Occasion", type: "select", options: ["Birthday", "Wedding", "Anniversary", "Baby shower", "Corporate", "Other"], required: true, half: true },
                { name: "eventDate", label: "Date needed", type: "date", required: true, half: true },
                { name: "flavour", label: "Flavour", type: "select", options: ["Vanilla", "Chocolate", "Red velvet", "Lemon", "Mix it up"], half: true },
                { name: "size", label: "Size", type: "select", options: ["6 inch (10-12 people)", "8 inch (20-25 people)", "10 inch (35-40 people)", "Tiered", "Not sure yet"] },
                { name: "notes", label: "Design notes", type: "textarea", placeholder: "Colours, theme, text on the cake, dietary needs..." },
                { name: "image", label: "Reference image", type: "file", hint: "PNG, JPG or WebP up to 3MB." },
              ]}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
