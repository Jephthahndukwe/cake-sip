// Event facts, handles and feature flags. Everything on the site reads from here.

export const SITE_URL = "https://kezzthechef.com.ng";

export const EVENT = {
  name: "Cake & Sip 3.0",
  brand: "Kezz the Chef Confectionery",
  theme: "Denim's Vibe",
  // 2PM West Africa Time (UTC+1)
  startISO: "2027-04-03T14:00:00+01:00",
  dateLong: "Saturday, 3 April 2027",
  dateShort: "Sat 3 Apr 2027",
  time: "2PM WAT",
  venue: "Dini Connection Hall",
  // TODO(owner): confirm the full street address.
  address: "7/11 Oludegun Avenue, Airport Road, Ikeja, Lagos",
  city: "Lagos, Nigeria",
  dressCode: "All denim. No exceptions.",
};

export const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${EVENT.venue}, ${EVENT.address}`,
)}`;

export const SOCIAL = {
  instagram: { label: "Instagram", handle: "@ktccakeandsip", url: "https://www.instagram.com/ktccakeandsip" },
  tiktok: { label: "TikTok", handle: "@kezz_thechef", url: "https://www.tiktok.com/@kezz_thechef" },
  whatsapp: { label: "WhatsApp", handle: "+234 806 435 8275", url: "https://wa.me/2348064358275", number: "2348064358275" },
  email: { label: "Email", handle: "kezzthechef@gmail.com", url: "mailto:kezzthechef@gmail.com" },
};

// Add `logo: "/images/sponsors/<file>.png"` (transparent PNG or SVG) to swap the name for a logo.
export const SPONSORS: { name: string; logo?: string }[] = [
  { name: "Logus Investment Limited" },
  { name: "Nelos Stores" },
  { name: "Depalatables" },
  { name: "Tiens" },
  { name: "Mandyglo Creations" },
];

/** Custom cake orders page. Off unless NEXT_PUBLIC_ENABLE_ORDERS=true. */
export const ORDERS_ENABLED = process.env.NEXT_PUBLIC_ENABLE_ORDERS === "true";

export const NAV_LINKS = [
  { href: "/tickets", label: "Tickets" },
  { href: "/past-editions", label: "Past editions" },
  { href: "/partner", label: "Partner with us" },
  ...(ORDERS_ENABLED ? [{ href: "/order", label: "Cake orders" }] : []),
];
