// Single source of truth for ticket pricing. Used by the ticket cards, the
// order summary, the Paystack amount and the server-side check in /api/payments.

export type Experience = "decorator" | "guest";
export type Package = "single" | "bestie" | "squad";

export const PACKAGES: Record<Package, { label: string; people: number; blurb: string }> = {
  single: { label: "Single", people: 1, blurb: "Just you and your fit" },
  bestie: { label: "Bestie", people: 2, blurb: "You + one (bestie or boo)" },
  squad: { label: "Squad", people: 4, blurb: "The whole group chat" },
};

type PriceTable = Record<Package, number>;

export const EXPERIENCES: Record<Experience, { label: string; blurb: string; prices: PriceTable | null }> = {
  decorator: {
    label: "Cake Decorator",
    blurb: "Decorate your own cake and take it home, plus all the vibes.",
    prices: { single: 28500, bestie: 55000, squad: 100000 },
  },
  guest: {
    label: "Vibes Only",
    blurb: "Sips, music, games and giveaways. No decorating station.",
    // Set prices here to switch this option on, e.g. { single: 15000, bestie: 28000, squad: 52000 }.
    prices: null,
  },
};

export const availableExperiences = (Object.keys(EXPERIENCES) as Experience[]).filter(
  (e) => EXPERIENCES[e].prices !== null,
);

/** Price in Naira, or null if that combination isn't on sale. */
export function priceFor(experience: Experience, pkg: Package): number | null {
  const prices = EXPERIENCES[experience]?.prices;
  return prices && pkg in prices ? prices[pkg] : null;
}

/** How much a package saves versus buying single tickets. */
export function savingFor(experience: Experience, pkg: Package): number {
  const price = priceFor(experience, pkg);
  const single = priceFor(experience, "single");
  if (price === null || single === null) return 0;
  return Math.max(0, single * PACKAGES[pkg].people - price);
}

export const lowestPrice = Math.min(
  ...availableExperiences.flatMap((e) => Object.values(EXPERIENCES[e].prices as PriceTable)),
);

export const naira = (n: number) => `₦${n.toLocaleString("en-NG")}`;
