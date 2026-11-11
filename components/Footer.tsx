import Link from "next/link";
import { EVENT, NAV_LINKS, SOCIAL } from "@/lib/site";
import { Drip } from "./Frosting";

export default function Footer() {
  return (
    <footer className="twill relative overflow-hidden bg-denim pb-28 pt-32 md:pb-12">
      <Drip className="absolute inset-x-0 top-0" />
      <div className="container relative">
        <p className="display text-[13.5vw] md:text-[11vw] xl:text-[10rem]">
          See you <br className="sm:hidden" />in <span className="text-magenta">denim.</span>
        </p>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          <div>
            <p className="script -rotate-2 text-2xl text-blush">the event</p>
            <p className="mt-3 text-lg font-bold">{EVENT.name}: {EVENT.theme}</p>
            <p className="text-dim">{EVENT.dateLong}, {EVENT.time}</p>
            <p className="text-dim">{EVENT.venue}, {EVENT.city}</p>
          </div>
          <div>
            <p className="script -rotate-2 text-2xl text-blush">say hi</p>
            <ul className="mt-3 space-y-1.5">
              {Object.values(SOCIAL).map((s) => (
                <li key={s.label}>
                  <a href={s.url} target={s.url.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="font-bold hover:text-blush">
                    <span className="text-dim font-medium">{s.label}:</span> {s.handle}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="script -rotate-2 text-2xl text-blush">explore</p>
            <ul className="mt-3 space-y-1.5">
              {[{ href: "/", label: "Home" }, ...NAV_LINKS].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-bold hover:text-blush">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-16 text-sm text-dim">© {new Date().getFullYear()} {EVENT.brand}. Made in Lagos.</p>
      </div>
    </footer>
  );
}
