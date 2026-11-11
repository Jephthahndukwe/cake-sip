import type { ReactNode } from "react";
import { Words } from "./Reveal";

/** Handwritten kicker that sits slightly rotated above a heading. */
export function Kicker({ children, tone = "magenta", className = "" }: { children: ReactNode; tone?: "magenta" | "gold" | "cream"; className?: string }) {
  const color = tone === "gold" ? "text-gold" : tone === "cream" ? "text-cream" : "text-magenta";
  return <p className={`script inline-block -rotate-3 text-[1.75rem] sm:text-[2.1rem] ${color} ${className}`}>{children}</p>;
}

/** Edition sticker, e.g. "3.0". Magenta, rotated, gold ring. */
export function EditionBadge({ children, className = "", size = "md" }: { children: ReactNode; className?: string; size?: "sm" | "md" | "lg" }) {
  const s = size === "lg" ? "h-[1.05em] min-w-[1.05em] text-[0.42em]" : size === "sm" ? "h-14 w-14 text-xl" : "h-20 w-20 text-3xl";
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-magenta-fill px-[0.15em] font-sans font-extrabold tracking-tight text-white shadow-[4px_5px_0_rgb(0_0_0/0.3)] ring-[3px] ring-gold ring-offset-2 ring-offset-transparent ${s} ${className}`}
    >
      {children}
    </span>
  );
}

/** Small tilted sticker that sits beside a heading. */
export function Sticker({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-block rounded-full bg-magenta-fill px-4 py-2 text-sm font-extrabold text-white shadow-[3px_4px_0_rgb(0_0_0/0.3)] ring-2 ring-gold ${className}`}>
      {children}
    </span>
  );
}

/** A short blush drip under a heading. */
export function MiniDrip({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 160 34" className={`h-8 w-40 ${className}`}>
      <path
        d="M0 4h160v6c-6 0-7 10-12 10s-5-10-12-10-6 20-12 20-6-20-13-20-6 7-12 7-6-7-13-7-7 15-13 15-6-15-13-15-6 9-12 9-6-9-13-9-6 12-12 12-6-12-11-12-5 6-10 6S5 10 0 10Z"
        fill="#f4c7c3"
      />
      <rect x="0" y="4" width="160" height="2.5" rx="1.25" fill="#fff6ee" opacity=".8" />
    </svg>
  );
}

/** Section header with varied alignment and optional sticker/drip. */
export function SectionHead({
  kicker,
  kickerTone = "magenta",
  title,
  accentFrom,
  align = "left",
  sticker,
  drip,
  as = "h2",
  className = "",
  size = "text-[clamp(2.6rem,7.5vw,5.75rem)]",
}: {
  kicker: string;
  kickerTone?: "magenta" | "gold" | "cream";
  title: string;
  accentFrom?: number;
  align?: "left" | "center";
  sticker?: string;
  drip?: boolean;
  as?: "h1" | "h2";
  className?: string;
  size?: string;
}) {
  const center = align === "center";
  return (
    <div className={`relative ${center ? "text-center" : ""} ${className}`}>
      <Kicker tone={kickerTone}>{kicker}</Kicker>
      <div className={`relative mt-1 ${center ? "mx-auto" : ""} max-w-4xl`}>
        <Words as={as} text={title} accentFrom={accentFrom} className={`display ${size}`} />
        {sticker && <Sticker className={`mt-4 rotate-6 sm:absolute sm:-top-6 sm:mt-0 ${center ? "sm:-right-2" : "sm:right-0"}`}>{sticker}</Sticker>}
      </div>
      {drip && <MiniDrip className={`mt-2 ${center ? "mx-auto" : ""}`} />}
    </div>
  );
}
