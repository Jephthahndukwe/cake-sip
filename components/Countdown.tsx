"use client";

import { useEffect, useState } from "react";

function split(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return { days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), mins: Math.floor((s % 3600) / 60), secs: s % 60 };
}

/**
 * Live countdown. `initialMs` is computed on the server so the first paint shows
 * real numbers, never 00 00 00 00.
 */
export default function Countdown({ target, initialMs }: { target: string; initialMs: number }) {
  const [ms, setMs] = useState(initialMs);

  useEffect(() => {
    const t = new Date(target).getTime();
    const tick = () => setMs(t - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  if (ms <= 0) {
    return <p className="serif-h text-3xl text-blush">It&apos;s party time. See you inside!</p>;
  }

  const parts = split(ms);
  const units: [keyof typeof parts, string][] = [["days", "Days"], ["hours", "Hrs"], ["mins", "Mins"], ["secs", "Secs"]];

  return (
    <div role="timer" aria-label={`${parts.days} days, ${parts.hours} hours and ${parts.mins} minutes to go`} className="flex gap-2 sm:gap-3">
      {units.map(([k, label]) => {
        const v = String(parts[k]).padStart(2, "0");
        return (
          <div key={k} className="min-w-[4.25rem] rounded-2xl bg-denim/80 px-3 py-2.5 text-center backdrop-blur-sm sm:min-w-[5.5rem] sm:px-4 sm:py-3" aria-hidden>
            <span key={v} className="flip block text-3xl font-black tabular-nums tracking-tight text-text sm:text-5xl" suppressHydrationWarning>
              {v}
            </span>
            <span className="label text-[0.65rem] text-blush">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
