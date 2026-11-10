"use client";

import { useState } from "react";
import { X } from "lucide-react";

const galleryImages = [
  { src: "/images/CakeImg.jpeg", alt: "Guests decorating cakes", cap: "cake bosses 🎂", r: "-rotate-3" },
  { src: "/images/CakeImg2.jpeg", alt: "Drinks at Cake & Sip", cap: "sip sip hooray", r: "rotate-2" },
  { src: "/images/CakeImg3.jpeg", alt: "Event atmosphere", cap: "the vibes were vibing", r: "-rotate-1" },
];

const Gallery = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="denim-light py-24 text-denim-950">
      <div className="container px-5">
        <div className="mb-14">
          <p className="font-[family-name:var(--font-marker)] text-hotpink text-2xl -rotate-2">throwback!</p>
          <h2 className="font-[family-name:var(--font-display)] uppercase text-5xl sm:text-7xl leading-[0.9]">Past editions</h2>
        </div>

        <div className="grid gap-10 sm:grid-cols-3 mb-16">
          {galleryImages.map((img, i) => (
            <button key={img.src} onClick={() => setSelected(i)} className={`${img.r} bg-cream p-3 pb-12 sticker transition hover:rotate-0 hover:scale-105 relative cursor-pointer`}>
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-20 bg-gold/80 rotate-2" />
              <img src={img.src} alt={img.alt} className="aspect-square w-full object-cover" />
              <span className="absolute bottom-3 left-0 right-0 font-[family-name:var(--font-marker)] text-lg text-denim-800">{img.cap}</span>
            </button>
          ))}
        </div>

        <div className="mx-auto max-w-3xl rounded-3xl bg-denim-800 p-3 stitch sticker rotate-1">
          <video src="/video/cakeandsip.mp4" controls playsInline className="w-full rounded-2xl" />
        </div>
      </div>

      {selected !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-denim-950/90 p-4" onClick={() => setSelected(null)}>
          <button className="absolute top-6 right-6 rounded-full bg-hotpink p-2 text-white" aria-label="Close"><X /></button>
          <img src={galleryImages[selected].src} alt={galleryImages[selected].alt} className="max-h-[85vh] max-w-full rounded-2xl" />
        </div>
      )}
    </section>
  );
};

export default Gallery;
