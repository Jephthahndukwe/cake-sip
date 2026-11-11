"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, MapPin, Calendar, Share2 } from "lucide-react";
import { EVENT, MAP_URL, SITE_URL, SOCIAL } from "@/lib/site";
import { confetti } from "@/lib/confetti";
import { EXPERIENCES, PACKAGES, naira, type Experience, type Package } from "@/lib/tickets";

type Booking = {
  name?: string;
  attendeeType?: Experience;
  ticketType?: Package;
  people?: number;
  amount?: number;
  reference: string;
};

export default function SuccessPage() {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "missing">("loading");

  useEffect(() => {
    const reference = new URLSearchParams(window.location.search).get("reference");
    if (!reference) {
      window.location.replace("/");
      return;
    }
    fetch(`/api/payments?reference=${encodeURIComponent(reference)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        setBooking(j?.success ? { ...j.data, reference } : { reference });
        setState(j?.success ? "ready" : "missing");
        setTimeout(() => confetti(window.innerWidth / 2, window.innerHeight / 4, 70), 200);
      })
      .catch(() => {
        setBooking({ reference });
        setState("missing");
      });
  }, []);

  const shareText = `I just copped my ticket for ${EVENT.name}: ${EVENT.theme} 💙 ${EVENT.dateShort}, ${EVENT.time}. Come with me, bestie! ${SITE_URL}`;
  const whatsapp = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  const firstName = booking?.name?.split(" ")[0];

  const rows: [string, string][] = booking
    ? [
        ...(booking.attendeeType ? [["Experience", EXPERIENCES[booking.attendeeType]?.label ?? booking.attendeeType] as [string, string]] : []),
        ...(booking.ticketType
          ? [["Package", `${PACKAGES[booking.ticketType]?.label ?? booking.ticketType} (${booking.people ?? PACKAGES[booking.ticketType]?.people} ${booking.people === 1 ? "person" : "people"})`] as [string, string]]
          : []),
        ...(typeof booking.amount === "number" ? [["Paid", naira(booking.amount)] as [string, string]] : []),
        ["Reference", booking.reference],
      ]
    : [];

  return (
    <main className="twill flex min-h-screen items-center pb-24 pt-28">
      <div className="container max-w-3xl">
        <section className="wash relative isolate overflow-hidden rounded-[2.5rem] px-6 py-14 text-center sm:px-12">
          <CheckCircle2 className="mx-auto h-14 w-14" aria-hidden />
          <p className="script mt-6 -rotate-2 text-[2rem] text-cream">payment successful!</p>
          <h1 className="display mt-4 text-[clamp(2.8rem,11vw,6rem)]">
            You&apos;re in{firstName ? `, ${firstName}` : ""}!
          </h1>
          <p className="mx-auto mt-5 max-w-md text-lg font-medium">
            Your {EVENT.name} ticket is confirmed. Now go find your best denim.
          </p>
        </section>

        <section className="mt-6 rounded-3xl bg-raise p-7 sm:p-9" aria-labelledby="summary-title">
          <h2 id="summary-title" className="serif-h text-2xl">Booking summary</h2>
          {state === "loading" ? (
            <p className="mt-4 text-dim">Loading your booking…</p>
          ) : (
            <dl className="mt-4 space-y-2">
              {rows.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 rounded-2xl bg-denim px-4 py-3">
                  <dt className="text-dim">{k}</dt>
                  <dd className="break-all text-right font-bold">{v}</dd>
                </div>
              ))}
            </dl>
          )}
          {state === "missing" && (
            <p className="mt-3 text-sm text-dim">
              We couldn&apos;t load the full details just now, but your payment went through. Keep your reference and message us on{" "}
              <a href={SOCIAL.whatsapp.url} target="_blank" rel="noopener noreferrer" className="font-bold text-blush underline">WhatsApp</a> if you need anything.
            </p>
          )}
          <div className="my-6 h-px bg-gold/50" />
          <div className="space-y-3">
            <p className="flex items-start gap-3"><Calendar className="h-5 w-5 shrink-0 text-blush" aria-hidden /> {EVENT.dateLong}, {EVENT.time}</p>
            <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-blush">
              <MapPin className="h-5 w-5 shrink-0 text-blush" aria-hidden /> {EVENT.venue}, {EVENT.address}
            </a>
          </div>
        </section>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-fill flex-1 text-lg">
            <Share2 className="h-5 w-5" aria-hidden /> Bring your bestie
          </a>
          <Link href="/" className="btn btn-outline flex-1 text-lg">Back to the site</Link>
        </div>
      </div>
    </main>
  );
}
