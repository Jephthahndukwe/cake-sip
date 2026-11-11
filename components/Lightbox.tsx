"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import type { Photo } from "@/lib/photos";

function Overlay({ onClose, label, children }: { onClose: () => void; label: string; children: ReactNode }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus();
    };
  }, [onClose]);

  return (
    <div role="dialog" aria-modal="true" aria-label={label} className="fixed inset-0 z-[70] flex items-center justify-center bg-denim/95 p-4" onClick={onClose}>
      <button ref={closeRef} onClick={onClose} className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-raise-2" aria-label="Close">
        <X className="h-6 w-6" />
      </button>
      <div onClick={(e) => e.stopPropagation()} className="flex max-h-full w-full items-center justify-center">
        {children}
      </div>
    </div>
  );
}

/** Mixed-size rounded photo grid that opens a lightbox. */
export function PhotoGrid({ photos, layout = "mixed" }: { photos: Photo[]; layout?: "mixed" | "even" }) {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const step = (d: number) => setOpen((o) => (o === null ? o : (o + d + photos.length) % photos.length));

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // mixed: every 1st of 6 is big (2x2), every 4th is tall
  // Gap-free tiling in blocks of 8: one big (2x2), four small, one wide (2x1), two small.
  // That fills whole rows on both the 2-column (phone) and 4-column (desktop) grid.
  // Any leftover photos (fewer than 8) are laid out as small tiles.
  const fullBlocks = Math.floor(photos.length / 8) * 8;
  const span = (i: number) => {
    if (layout === "even" || i >= fullBlocks) return "";
    const k = i % 8;
    return k === 0 ? "col-span-2 row-span-2" : k === 5 ? "col-span-2" : "";
  };

  return (
    <>
      <ul className={`grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 ${layout === "even" ? "" : "auto-rows-[38vw] md:auto-rows-[15vw] xl:auto-rows-[200px]"}`}>
        {photos.map((ph, i) => (
          <li key={i} className={`${span(i)} ${layout === "even" ? "aspect-[4/5]" : ""}`}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className={`frame group block h-full w-full rounded-3xl ${i % 3 === 1 ? "frame-blush" : ""}`}
              aria-label={`Open photo: ${ph.alt}`}
            >
              <span className="relative block h-full w-full overflow-hidden rounded-[1.1rem]">
              <Image
                src={ph.src}
                alt={ph.alt}
                fill
                placeholder="blur"
                sizes={span(i).includes("col-span-2") ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                className="object-cover transition duration-700 group-hover:scale-105"
                style={{ objectPosition: ph.pos }}
              />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {open !== null && (
        <Overlay onClose={close} label={photos[open].alt}>
          <button onClick={() => step(-1)} className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-raise-2" aria-label="Previous photo">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <Image src={photos[open].src} alt={photos[open].alt} sizes="95vw" className="h-auto max-h-[85vh] w-auto max-w-full rounded-2xl object-contain" placeholder="blur" />
          <button onClick={() => step(1)} className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-raise-2" aria-label="Next photo">
            <ChevronRight className="h-6 w-6" />
          </button>
        </Overlay>
      )}
    </>
  );
}

/** "Watch highlights" button that plays the event video in a lightbox. */
export function VideoButton({ label = "Watch highlights", className = "btn btn-outline" }: { label?: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        <Play className="h-4 w-4 fill-current" aria-hidden /> {label}
      </button>
      {open && (
        <Overlay onClose={close} label="Cake & Sip highlights video">
          <video src="/video/cakeandsip.mp4" controls autoPlay playsInline className="max-h-[85vh] w-full max-w-5xl rounded-2xl bg-black">
            Your browser can&apos;t play this video.
          </video>
        </Overlay>
      )}
    </>
  );
}
