"use client";

import { useState } from "react";
import { X } from "lucide-react";

const galleryImages = [
  { src: "/images/gallery-decorating.jpg", alt: "Cake decorating workshop" },
  { src: "/images/gallery-cocktails.jpg", alt: "Signature cocktails" },
  { src: "/images/gallery-fun.jpg", alt: "Event atmosphere" },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section className="py-24 bg-[#f5f1ed]">
      <div className="container px-6 mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[#c8a882] text-sm tracking-[0.2em] uppercase mb-4 block">
            Gallery
          </span>
          <h2 className="font-serif text-5xl md:text-6xl text-[#2a2420] mb-6">
            Previous Event Highlights
          </h2>
          <p className="text-[#6b5d52] text-lg">
            A look back at the creativity and connections made at Cake & Sip 1.0
          </p>
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className="group relative aspect-[4/5] overflow-hidden"
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#2a2420]/0 group-hover:bg-[#2a2420]/20 transition-colors duration-300"></div>
            </button>
          ))}
        </div>

        {/* Video Section */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white p-2 border border-[#e5ddd3]">
            <div className="relative aspect-video bg-[#2a2420]">
              <video
                className="w-full h-full"
                src="/video/cakeandsip.mp4"
                controls
              />
            </div>
          </div>
          <p className="text-center text-sm text-[#8b7d72] mt-6">
            Highlights from Cake & Sip 1.0
          </p>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-[#2a2420]/95 flex items-center justify-center p-6"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative max-w-6xl w-full">
            <img 
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              className="w-full h-auto"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;