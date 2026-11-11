// Frosting drips and sprinkles in the event's own colours.

// Drip positions/lengths as % of width and px, hand-tuned to look irregular.
const DRIPS: [number, number, number][] = [
  [4, 26, 7], [11, 44, 9], [19, 18, 6], [27, 58, 10], [36, 30, 7], [44, 70, 11], [53, 22, 6],
  [61, 48, 9], [69, 34, 8], [77, 62, 10], [85, 24, 7], [93, 50, 9],
];

/** A blush frosting band with drips and a cream highlight. Sits on the top edge of a section. */
export function Drip({ color = "#f4c7c3", className = "" }: { color?: string; className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none h-[86px] w-full ${className || "relative"}`}>
      <div className="absolute inset-x-0 top-0 h-5" style={{ background: color }} />
      <div className="absolute inset-x-0 top-1 h-1.5 rounded-full bg-cream/70" />
      {DRIPS.map(([left, len, w], i) => (
        <span
          key={i}
          className="drip-fall absolute top-4 rounded-b-full"
          style={{ left: `${left}%`, width: `${w * 2}px`, height: `${len}px`, background: color, animationDelay: `${i * 0.27}s` }}
        >
          <span className="absolute left-[22%] top-2 h-[45%] w-[22%] rounded-full bg-cream/60" />
        </span>
      ))}
    </div>
  );
}

const SPRINKLE_COLORS = ["#e0218a", "#f4c7c3", "#c9a25a", "#8fd6d2", "#fff6ee"];

/** A scatter of sprinkles. Purely decorative. */
export function Sprinkles({ className = "", count = 18, seed = 1 }: { className?: string; count?: number; seed?: number }) {
  let s = seed * 9301;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  return (
    <div aria-hidden className={`pointer-events-none absolute ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${rnd() * 100}%`,
            top: `${rnd() * 100}%`,
            width: "14px",
            height: "4px",
            background: SPRINKLE_COLORS[i % SPRINKLE_COLORS.length],
            transform: `rotate(${Math.round(rnd() * 180)}deg)`,
          }}
        />
      ))}
    </div>
  );
}
