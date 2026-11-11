"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { EVENT } from "@/lib/site";
import { lowestPrice, naira } from "@/lib/tickets";

/** Sticky "Get tickets" bar on mobile. Hidden on checkout pages, which have their own pay bar. */
export default function MobileTicketBar() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/tickets") || pathname.startsWith("/success")) return null;

  return (
    <div className={`fixed inset-x-3 bottom-3 z-40 transition-transform duration-300 md:hidden ${show ? "translate-y-0" : "translate-y-[150%]"}`}>
      <div className="flex items-center justify-between gap-3 rounded-full bg-denim/85 py-2 pl-5 pr-2 shadow-[0_10px_30px_-10px_rgb(0_0_0/0.7)] backdrop-blur-md">
        <div className="min-w-0 text-sm leading-tight">
          <p className="truncate font-bold">{EVENT.name}</p>
          <p className="text-dim">from {naira(lowestPrice)}</p>
        </div>
        <Link href="/tickets" tabIndex={show ? 0 : -1} className="btn btn-fill shrink-0 !px-5">Get tickets</Link>
      </div>
    </div>
  );
}
