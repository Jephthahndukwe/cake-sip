"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/site";

/** Floating rounded pill nav, frosted once you scroll. */
export default function TopBar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-3 top-3 z-50 md:inset-x-6 md:top-4">
      <div
        className={`mx-auto max-w-5xl rounded-[1.75rem] transition-all duration-300 ${
          scrolled || open ? "bg-denim/80 shadow-[0_12px_40px_-12px_rgb(0_0_0/0.6)] backdrop-blur-md" : "bg-denim/45 backdrop-blur-sm"
        }`}
      >
        <div className="flex h-14 items-center justify-between gap-3 pl-5 pr-2">
          <Link href="/" className="serif-h text-xl" aria-label="Kezz the Chef, home">
            Kezz <span className="script text-2xl text-blush">the chef</span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${pathname === l.href ? "bg-cream/15 text-cream" : "text-cream hover:bg-cream/10"}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <Link href="/tickets" className="btn btn-fill !min-h-[42px] !px-5 !py-2 text-sm">Get tickets</Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav id="mobile-menu" aria-label="Main" className="px-3 pb-3 md:hidden">
            <ul className="space-y-1">
              {[{ href: "/", label: "Home" }, ...NAV_LINKS].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={pathname === l.href ? "page" : undefined}
                    className={`serif-h block rounded-2xl px-4 py-3 text-2xl ${pathname === l.href ? "bg-magenta-fill text-white" : "hover:bg-cream/10"}`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
