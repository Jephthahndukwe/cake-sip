"use client";

import { Calendar, Clock, MapPin, Sparkles } from "lucide-react";

export const scrollToTickets = () => {
  const el = document.getElementById("ticket-form");
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 40, behavior: "smooth" });
};

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden denim">
      {/* Nav */}
      <nav className="relative z-20 container px-5 pt-6 flex items-center justify-between">
        <span className="font-[family-name:var(--font-marker)] text-xl text-cream">
          Kezz <span className="text-gold">the chef</span>
        </span>
        <button
          onClick={scrollToTickets}
          className="hidden sm:inline-flex items-center gap-2 rounded-full bg-hotpink px-5 py-2 text-sm font-bold uppercase tracking-wider text-white sticker transition hover:-rotate-3"
        >
          Grab a ticket
        </button>
      </nav>

      {/* Floating stickers */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute left-[4%] top-[22%] hidden lg:block animate-float" style={{ ["--r" as string]: "-12deg" }}>
          <span className="rounded-full bg-gold px-4 py-2 font-[family-name:var(--font-marker)] text-denim-950 sticker">no boring fits!</span>
        </div>
        <div className="absolute right-[6%] bottom-[14%] hidden md:block animate-float" style={{ ["--r" as string]: "8deg", animationDelay: "1s" }}>
          <span className="rounded-lg bg-cream px-4 py-2 font-[family-name:var(--font-marker)] text-hotpink sticker">bring your bestie 👯‍♀️</span>
        </div>
      </div>

      <div className="relative z-10 container px-5 pt-10 pb-24 grid lg:grid-cols-[1.15fr_1fr] gap-10 items-center">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-dashed border-gold/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-gold">
            <Sparkles className="h-4 w-4" /> Kezz the chef presents
          </p>

          <h1 className="font-[family-name:var(--font-display)] uppercase leading-[0.85]">
            <span className="block text-[22vw] sm:text-[9rem] lg:text-[10rem] text-gold-shine drop-shadow-[0_6px_0_rgba(0,0,0,.5)]">Cake</span>
            <span className="relative flex items-end gap-3">
              <span className="font-[family-name:var(--font-marker)] normal-case text-[16vw] sm:text-[7rem] text-hotpink -rotate-6 drop-shadow-[0_4px_0_rgba(0,0,0,.5)]">&amp;</span>
              <span className="text-[22vw] sm:text-[9rem] lg:text-[10rem] text-denim-shine [-webkit-text-stroke:2px_#cfe0ff] drop-shadow-[0_6px_0_rgba(0,0,0,.5)]">Sip</span>
              <span className="font-[family-name:var(--font-marker)] normal-case text-[12vw] sm:text-[5rem] text-hotpink rotate-[-8deg] mb-4">3.0</span>
            </span>
          </h1>

          <div className="mt-6 relative inline-block">
            <p className="font-[family-name:var(--font-display)] text-4xl sm:text-6xl uppercase text-cream">
              Denim&apos;s{" "}
              <span className="relative font-[family-name:var(--font-marker)] normal-case text-denim-300">
                Drip
                <span className="absolute -bottom-6 right-3 h-3 w-2 rounded-b-full bg-denim-300 animate-drip" />
              </span>
            </p>
            <p className="mt-3 inline-block -rotate-1 bg-denim-500 px-4 py-1 text-sm font-bold uppercase tracking-[0.4em] text-white">
              Dress code: denim on denim
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {[
              { icon: Calendar, text: "Sat · April 3rd, 2027", rot: "-rotate-2" },
              { icon: Clock, text: "2PM sharp", rot: "rotate-1" },
              { icon: MapPin, text: "Dini Connection Hall", rot: "-rotate-1" },
            ].map(({ icon: Icon, text, rot }) => (
              <span key={text} className={`${rot} inline-flex items-center gap-2 rounded-xl bg-denim-950/70 px-4 py-3 text-sm font-bold text-cream border-2 border-dashed border-gold/60`}>
                <Icon className="h-4 w-4 text-gold" /> {text}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <button
              onClick={scrollToTickets}
              className="chunky rounded-2xl bg-hotpink px-8 py-5 font-[family-name:var(--font-display)] text-2xl uppercase tracking-wide text-white transition-all cursor-pointer"
            >
              Get my ticket →
            </button>
            <span className="font-[family-name:var(--font-marker)] text-gold text-lg rotate-[-4deg]">from ₦28,500!</span>
          </div>
        </div>

        {/* Flyer as a "patch" */}
        <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
          <div className="absolute -inset-4 rotate-6 rounded-[2rem] bg-hotpink/80" />
          <div className="relative -rotate-3 rounded-[2rem] bg-denim-700 p-3 stitch sticker transition hover:rotate-0">
            <img src="/images/flyer-3.jpg" alt="Cake & Sip 3.0 Denim's Drip flyer" className="rounded-[1.5rem] w-full" />
          </div>
          <div className="absolute -top-6 -left-6 flex h-24 w-24 items-center justify-center rounded-full bg-gold text-center font-[family-name:var(--font-display)] text-denim-950 uppercase leading-none sticker animate-spin-slow">
            <span className="text-sm">3rd<br /><span className="text-2xl">edition</span></span>
          </div>
          <div className="absolute top-6 right-4 flex gap-2"><span className="rivet" /><span className="rivet" /></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
