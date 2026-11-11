"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PaymentService } from "@/lib/payment-service";
import {
  EXPERIENCES, PACKAGES, availableExperiences, naira, priceFor, savingFor,
  type Experience, type Package,
} from "@/lib/tickets";
import { confetti } from "@/lib/confetti";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    PaystackPop: any;
  }
}

const PAYSTACK_KEY = "pk_live_84ea73b42140d079929e4084e09b19daf2eff604";
const FLAVORS = ["VANILLA CAKE", "CHOCOLATE CAKE", "RED VELVET CAKE", "LEMON CAKE"];
const COLORS = ["BLUE", "ROYAL BLUE", "YELLOW", "RED", "BLACK", "BROWN"];
const TOPPERS = [
  { id: "SPRINKLE", name: "Sprinkle", image: "/images/cake.jpg" },
  { id: "RIBBON", name: "Ribbon", image: "/images/cake2.jpg" },
  { id: "ICE CREAM CONE", name: "Ice cream", image: "/images/cake3.jpg" },
  { id: "CHOCOLATE DRIPPING", name: "Choco drip", image: "/images/cake4.jpg" },
];

type Field = "name" | "phone" | "email";

function validate(field: Field, value: string): string {
  const v = value.trim();
  if (field === "name") return v.length >= 2 ? "" : "Tell us your name";
  if (field === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "" : "Enter a valid email";
  const digits = v.replace(/[\s()-]/g, "");
  return /^(\+?234|0)[789][01]\d{8}$/.test(digits) ? "" : "Enter a valid Nigerian phone number";
}

const inputCls =
  "w-full min-h-[52px] rounded-2xl bg-raise px-4 py-3.5 text-text font-medium placeholder:text-dim/80 transition focus:outline-none focus:ring-2 focus:ring-gold";
const labelCls = "mb-2 block text-sm font-bold";

export default function TicketForm({ initialPackage = "single" }: { initialPackage?: Package }) {
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [experience, setExperience] = useState<Experience>(availableExperiences[0] ?? "decorator");
  const [pkg, setPkg] = useState<Package>(initialPackage);
  const [details, setDetails] = useState({ name: "", phone: "", email: "" });
  const [touched, setTouched] = useState<Record<Field, boolean>>({ name: false, phone: false, email: false });
  const [cake, setCake] = useState({ cakeFlavors: [] as string[], decorationColor: "", cakeTopper: "", cakeName: "" });

  const isDecorator = experience === "decorator";
  const total = priceFor(experience, pkg) ?? 0;
  const people = PACKAGES[pkg].people;
  const errors = {
    name: validate("name", details.name),
    phone: validate("phone", details.phone),
    email: validate("email", details.email),
  };

  // Load Paystack
  useEffect(() => {
    if (window.PaystackPop) return;
    const s = document.createElement("script");
    s.src = "https://js.paystack.co/v1/inline.js";
    s.async = true;
    s.onerror = () =>
      toast({ title: "Payment couldn't load", description: "Please refresh the page and try again.", variant: "destructive" });
    document.body.appendChild(s);
  }, [toast]);

  // Show the mobile bottom bar only while the ticket section is on screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggleFlavor = (f: string) =>
    setCake((c) => ({
      ...c,
      cakeFlavors: c.cakeFlavors.includes(f) ? c.cakeFlavors.filter((x) => x !== f) : [...c.cakeFlavors, f].slice(0, 2),
    }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, phone: true, email: true });
    if (errors.name || errors.phone || errors.email) {
      toast({ title: "Almost there", description: "Fix the highlighted details first.", variant: "destructive" });
      document.getElementById(`f-${errors.name ? "name" : errors.phone ? "phone" : "email"}`)?.focus();
      return;
    }
    if (!total) return;
    if (!window.PaystackPop) {
      toast({ title: "Payment not ready", description: "Please refresh the page and try again.", variant: "destructive" });
      return;
    }

    setLoading(true);
    const reference = `CAKE_SIP_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    const amount = total; // single source: lib/tickets.ts

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_KEY,
      email: details.email.trim(),
      amount: amount * 100,
      currency: "NGN",
      ref: reference,
      metadata: {
        custom_fields: [
          { display_name: "Customer Name", variable_name: "customer_name", value: details.name.trim() },
          { display_name: "Phone Number", variable_name: "phone_number", value: details.phone.trim() },
          { display_name: "Experience", variable_name: "attendee_type", value: EXPERIENCES[experience].label },
          { display_name: "Package", variable_name: "ticket_type", value: `${PACKAGES[pkg].label} (${people})` },
        ],
      },
      callback: (response: { reference: string }) => {
        (async () => {
          try {
            const result = await PaymentService.processPayment({
              name: details.name.trim(),
              email: details.email.trim(),
              phone: details.phone.trim(),
              attendeeType: experience,
              ticketType: pkg,
              people,
              quantity: 1,
              amount,
              reference: response.reference,
              ...(isDecorator ? cake : { cakeFlavors: [], decorationColor: "", cakeTopper: "", cakeName: "" }),
              karaokeInterested: false,
              karaokeSongChoice: "",
            });
            if (!result.success) throw new Error(result.error);
          } catch (err) {
            console.error("Saving booking failed:", err);
          }
          window.location.href = `/success?reference=${encodeURIComponent(response.reference)}`;
        })();
      },
      onClose: () => {
        toast({ title: "Payment cancelled", description: "No worries, your details are still here." });
        setLoading(false);
      },
    });
    handler.openIframe();
  };

  const fieldProps = (f: Field) => ({
    id: `f-${f}`,
    name: f,
    value: details[f],
    disabled: loading,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setDetails({ ...details, [f]: e.target.value }),
    onBlur: () => setTouched((t) => ({ ...t, [f]: true })),
    "aria-invalid": touched[f] && !!errors[f],
    "aria-describedby": touched[f] && errors[f] ? `f-${f}-err` : undefined,
    className: `${inputCls} ${touched[f] && errors[f] ? "ring-2 ring-magenta" : ""}`,
  });

  const fieldError = (f: Field) =>
    touched[f] && errors[f] ? (
      <p id={`f-${f}-err`} className="mt-1.5 text-sm font-bold text-blush" role="alert">{errors[f]}</p>
    ) : null;

  const summaryLine = `${EXPERIENCES[experience].label} · ${PACKAGES[pkg].label} (${people} ${people === 1 ? "person" : "people"})`;
  const payLabel = loading ? "Opening payment..." : `Pay ${naira(total)}`;

  return (
    <section ref={sectionRef} aria-label="Ticket checkout">
      <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
        <form id="ticket-form" onSubmit={handleSubmit} noValidate className="min-w-0 space-y-14">
          {/* 1. Experience (only options with a price are shown) */}
          <fieldset>
            <legend className="script mb-4 -rotate-2 text-[1.9rem] text-magenta">pick your experience</legend>
            <div className={`grid gap-3 ${availableExperiences.length > 1 ? "sm:grid-cols-2" : ""}`}>
              {availableExperiences.map((x) => {
                const on = experience === x;
                return (
                  <label key={x} className={`relative block cursor-pointer rounded-3xl p-6 transition ${on ? "bg-raise-2 ring-2 ring-magenta" : "bg-raise hover:bg-raise-2"}`}>
                    <input type="radio" name="experience" value={x} checked={on} onChange={() => setExperience(x)} className="sr-only" disabled={loading} />
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="serif-h text-2xl">{EXPERIENCES[x].label}</div>
                        <p className="mt-1 text-dim">{EXPERIENCES[x].blurb}</p>
                      </div>
                      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${on ? "bg-magenta-fill text-white" : "bg-denim"}`}>
                        {on && <Check className="h-4 w-4" aria-hidden />}
                      </span>
                    </div>
                    <div className="mt-4 font-bold">from {naira(priceFor(x, "single")!)}</div>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* 2. Package */}
          <fieldset>
            <legend className="script mb-4 -rotate-2 text-[1.9rem] text-magenta">who&apos;s coming?</legend>
            <div className="grid gap-3 sm:grid-cols-3">
              {(Object.keys(PACKAGES) as Package[]).map((p) => {
                const on = pkg === p;
                const price = priceFor(experience, p)!;
                const save = savingFor(experience, p);
                return (
                  <label key={p} className={`relative flex cursor-pointer flex-col rounded-3xl p-6 transition ${on ? "bg-raise-2 ring-2 ring-magenta" : "bg-raise hover:bg-raise-2"}`}>
                    <input
                      type="radio"
                      name="package"
                      value={p}
                      checked={on}
                      disabled={loading}
                      className="sr-only"
                      onChange={(e) => {
                        setPkg(p);
                        const r = (e.currentTarget.closest("label") as HTMLElement).getBoundingClientRect();
                        confetti(r.left + r.width / 2, r.top + r.height / 3, 30);
                      }}
                    />
                    <span className="serif-h text-2xl">{PACKAGES[p].label}</span>
                    <span className="text-sm text-dim">{PACKAGES[p].people} {PACKAGES[p].people === 1 ? "person" : "people"}</span>
                    <span className="leather mt-6 self-start rounded-2xl px-4 py-3">
                      <span className="block text-3xl font-black tracking-tight">{naira(price)}</span>
                      <span className="block text-sm font-bold text-blush">{save > 0 ? `Save ${naira(save)}` : "Per person"}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* 3. Details */}
          <fieldset className="space-y-5">
            <legend className="script mb-4 -rotate-2 text-[1.9rem] text-gold">your details</legend>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="f-name" className={labelCls}>Full name</label>
                <input type="text" autoComplete="name" placeholder="What do we call you?" {...fieldProps("name")} />
                {fieldError("name")}
              </div>
              <div>
                <label htmlFor="f-phone" className={labelCls}>Phone (WhatsApp)</label>
                <input type="tel" autoComplete="tel" inputMode="tel" placeholder="0803 000 0000" {...fieldProps("phone")} />
                {fieldError("phone")}
              </div>
            </div>
            <div>
              <label htmlFor="f-email" className={labelCls}>Email</label>
              <input type="email" autoComplete="email" placeholder="you@email.com" {...fieldProps("email")} />
              {fieldError("email")}
              <p className="mt-1.5 text-sm text-dim">Your ticket confirmation goes here.</p>
            </div>
          </fieldset>

          {/* 4. Cake designer (decorators only) */}
          {isDecorator && (
            <fieldset className="space-y-8 rounded-3xl bg-raise p-6 sm:p-8">
              <legend className="script float-left mb-2 w-full -rotate-1 text-[1.9rem] text-blush">design your cake</legend>
              {people > 1 && (
                <p className="clear-both rounded-2xl bg-denim p-4 text-sm">
                  <strong>Heads up:</strong> this design applies to all {people} cakes in your {PACKAGES[pkg].label.toLowerCase()} package. Everyone still decorates their own cake on the day.
                </p>
              )}

              <div className="clear-both">
                <p className={labelCls} id="flavors-label">Pick two flavours <span className="font-normal text-dim">({cake.cakeFlavors.length}/2)</span></p>
                <div className="grid grid-cols-2 gap-3" role="group" aria-labelledby="flavors-label">
                  {FLAVORS.map((f) => {
                    const on = cake.cakeFlavors.includes(f);
                    return (
                      <button
                        key={f}
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggleFlavor(f)}
                        disabled={loading || (!on && cake.cakeFlavors.length >= 2)}
                        className={`flex min-h-[52px] items-center justify-between rounded-2xl px-4 py-3 text-left font-bold capitalize transition disabled:opacity-40 ${on ? "bg-magenta-fill text-white" : "bg-denim hover:bg-raise-2"}`}
                      >
                        {f.replace(" CAKE", "").toLowerCase()}
                        {on && <Check className="h-4 w-4" aria-hidden />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label htmlFor="f-color" className={labelCls}>Decoration colour <span className="font-normal text-dim">(paired with white)</span></label>
                <select id="f-color" value={cake.decorationColor} onChange={(e) => setCake({ ...cake, decorationColor: e.target.value })} className={inputCls} disabled={loading}>
                  <option value="">Choose a colour</option>
                  {COLORS.map((c) => <option key={c} value={c}>{c.charAt(0) + c.slice(1).toLowerCase()}</option>)}
                </select>
              </div>

              <div>
                <p className={labelCls} id="topper-label">Topper</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" role="radiogroup" aria-labelledby="topper-label">
                  {TOPPERS.map((t) => {
                    const on = cake.cakeTopper === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        onClick={() => setCake({ ...cake, cakeTopper: t.id })}
                        disabled={loading}
                        className={`overflow-hidden rounded-2xl bg-denim text-left transition ${on ? "ring-2 ring-magenta" : "hover:bg-raise-2"}`}
                      >
                        <span className="relative block aspect-square">
                          <Image src={t.image} alt={`${t.name} topper`} fill sizes="(min-width: 640px) 160px, 45vw" className="object-cover" />
                          {on && <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-magenta-fill text-white"><Check className="h-4 w-4" aria-hidden /></span>}
                        </span>
                        <span className="block px-3 py-2.5 text-sm font-bold">{t.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label htmlFor="f-cakename" className={labelCls}>Name on the cake <span className="font-normal text-dim">(optional)</span></label>
                <input id="f-cakename" type="text" value={cake.cakeName} onChange={(e) => setCake({ ...cake, cakeName: e.target.value })} placeholder="e.g. Chika" maxLength={20} className={inputCls} disabled={loading} />
              </div>
            </fieldset>
          )}
        </form>

        {/* Desktop order summary */}
        <aside className="hidden lg:block" aria-label="Order summary">
          <div className="rounded-3xl bg-raise p-7">
            <p className="script -rotate-2 text-[1.75rem] text-gold">your order</p>
            <p className="mt-4 text-lg font-bold">{summaryLine}</p>
            {savingFor(experience, pkg) > 0 && <p className="mt-1 text-sm font-bold text-blush">You save {naira(savingFor(experience, pkg))}</p>}
            <div className="my-6 h-px bg-gold/50" />
            <div className="flex items-end justify-between">
              <span className="text-dim">Total</span>
              <span className="text-4xl font-black tracking-tight" aria-live="polite">{naira(total)}</span>
            </div>
            <button type="submit" form="ticket-form" disabled={loading} className="btn btn-fill mt-6 w-full text-lg disabled:opacity-60">
              {loading && <Loader2 className="h-5 w-5 animate-spin" aria-hidden />} {payLabel}
            </button>
            <p className="mt-3 text-center text-xs text-dim">Secure payment by Paystack</p>
          </div>
        </aside>
      </div>

      {/* Mobile bottom bar */}
      <div className={`fixed inset-x-0 bottom-0 z-40 bg-denim/95 backdrop-blur-md transition-transform duration-300 lg:hidden ${inView ? "translate-y-0" : "translate-y-full"}`}>
        <div className="container flex items-center justify-between gap-3 py-3">
          <div className="min-w-0">
            <div className="truncate text-xs text-dim">{summaryLine}</div>
            <div className="text-2xl font-black tracking-tight" aria-live="polite">{naira(total)}</div>
          </div>
          <button type="submit" form="ticket-form" disabled={loading} tabIndex={inView ? 0 : -1} className="btn btn-fill shrink-0 disabled:opacity-60">
            {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />} {payLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
