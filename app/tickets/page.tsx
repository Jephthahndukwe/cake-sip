import type { Metadata } from "next";
import { ArrowUpRight, Calendar, Clock, MapPin, Shirt } from "lucide-react";
import TicketForm from "@/components/TicketForm";
import { Drip, Sprinkles } from "@/components/Frosting";
import { Kicker, SectionHead } from "@/components/Deco";
import { Words } from "@/components/Reveal";
import { EVENT, MAP_URL } from "@/lib/site";
import { PACKAGES, type Package } from "@/lib/tickets";

export const metadata: Metadata = {
  title: "Tickets",
  description: `Cop your ${EVENT.name} ticket. Single, Bestie or Squad packages. ${EVENT.dateLong}, ${EVENT.time}, ${EVENT.venue}.`,
  openGraph: { images: [{ url: "/og/tickets.jpg", width: 1200, height: 630 }] },
  twitter: { images: ["/og/tickets.jpg"] },
};

export default async function TicketsPage({ searchParams }: { searchParams: Promise<{ package?: string }> }) {
  const { package: pkgParam } = await searchParams;
  const initialPackage = (pkgParam && pkgParam in PACKAGES ? pkgParam : "single") as Package;

  const details = [
    { icon: Calendar, label: "Date", value: EVENT.dateLong },
    { icon: Clock, label: "Time", value: `${EVENT.time}. Come early for pics` },
    { icon: Shirt, label: "Dress code", value: EVENT.dressCode },
  ];

  return (
    <main>
      {/* The one gradient moment */}
      <section className="wash relative isolate overflow-hidden pb-36 pt-32 md:pb-44 md:pt-40">
        <Sprinkles className="right-[5%] top-28 h-40 w-48 md:w-72" seed={5} />
        <div className="container relative">
          <Kicker tone="cream">{EVENT.name} · {EVENT.theme}</Kicker>
          <Words as="h1" text="Cop your ticket." accentFrom={2} accentClass="text-blush" className="display mt-2 text-[clamp(3.25rem,11vw,9rem)]" />
          <p className="mt-6 max-w-xl text-lg font-medium">Cake Decorator tickets include your own cake to decorate and take home. Bigger squads save more.</p>
        </div>
      </section>

      {/* Event details: cream frosting layer */}
      <section className="tone-cream relative isolate z-10 -mt-12 rounded-t-[2.5rem] pb-24 pt-16 md:-mt-16 md:rounded-t-[4rem] md:pt-24">
        <div className="container">
          <SectionHead kicker="the need-to-knows" title="Save the date." accentFrom={2} align="center" size="text-[clamp(2.4rem,6vw,4.5rem)]" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {details.map(({ icon: Icon, label, value }) => (
              <li key={label} className="rounded-3xl bg-raise p-6 shadow-[0_14px_40px_-20px_rgb(23_36_64/0.45)]">
                <Icon className="h-6 w-6 text-magenta" aria-hidden />
                <p className="mt-4 text-sm font-bold text-dim">{label}</p>
                <p className="serif-h mt-1 text-xl">{value}</p>
              </li>
            ))}
            <li>
              <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="group block h-full rounded-3xl bg-raise p-6 shadow-[0_14px_40px_-20px_rgb(23_36_64/0.45)] transition hover:-translate-y-1">
                <MapPin className="h-6 w-6 text-magenta" aria-hidden />
                <p className="mt-4 text-sm font-bold text-dim">Venue</p>
                <p className="serif-h mt-1 text-xl">{EVENT.venue}</p>
                <p className="text-sm text-dim">{EVENT.address}</p>
                <p className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-blush">
                  Open in Maps <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
                </p>
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Checkout: denim with cream drips */}
      <section className="twill relative isolate pb-28 pt-36 md:pt-44">
        <Drip color="#fff6ee" className="absolute inset-x-0 top-0" />
        <div className="container">
          <TicketForm initialPackage={initialPackage} />
        </div>
      </section>
    </main>
  );
}
