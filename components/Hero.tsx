"use client";

import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";

const Hero = () => {
  const scrollToTickets = () => {
    setTimeout(() => {
      const ticketForm = document.getElementById('ticket-form');
      
      if (ticketForm) {
        ticketForm.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        
        const rect = ticketForm.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetY = rect.top + scrollTop - 100;
        
        window.scrollTo({
          top: targetY,
          behavior: 'smooth'
        });
      } else {
        window.scrollTo({
          top: window.innerHeight * 1.5,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <section className="relative min-h-screen py-8 flex items-center overflow-hidden bg-[#2a2420]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero-cake-sip.jpg" 
          alt="Cake & Sip Event" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a2420]/85 via-[#2a2420]/75 to-[#2a2420]"></div>
      </div>

      {/* Subtle decorative element */}
      <div className="absolute top-32 right-[10%] w-1 h-24 bg-[#c8a882]/20"></div>

      {/* Content */}
      <div className="container relative z-10 px-6 mx-auto">
        <div className="max-w-5xl">
          {/* Edition Label */}
          <div className="mb-8">
            <span className="px-4 py-2 border border-[#c8a882]/30 text-[#c8a882] text-xs tracking-[0.2em] uppercase">
              Second Edition
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-7xl md:text-8xl lg:text-9xl font-normal mb-8 text-[#f5f1ed] leading-[0.9] tracking-tight">
            Cake & Sip
            <span className="block text-5xl md:text-6xl text-[#c8a882] mt-3">2.0</span>
          </h1>

          {/* Tagline */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-px bg-[#c8a882]/40"></div>
            <p className="text-[#e8dfd6] text-xl md:text-2xl font-light tracking-wide">
              Learn. Decorate. Vibe. Eat.
            </p>
          </div>

          {/* Description */}
          <p className="text-[#d4cbc0] text-lg md:text-xl max-w-2xl mb-12 leading-relaxed font-light">
            An afternoon of cake decorating, craft cocktails, live music, and genuine connections. 
            A celebration of creativity in an intimate setting.
          </p>

          {/* Event Details */}
          <div className="flex flex-wrap gap-8 mb-12 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#c8a882]/30 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#c8a882]" />
              </div>
              <span className="text-[#d4cbc0]">April 6, 2026</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#c8a882]/30 flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#c8a882]" />
              </div>
              <span className="text-[#d4cbc0]">2:00 PM</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#c8a882]/30 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#c8a882]" />
              </div>
              <span className="text-[#d4cbc0]">Location Revealed</span>
            </div>
          </div>

          {/* CTA */}
          <Button 
            onClick={scrollToTickets}
            className="group px-10 py-6 bg-[#c8a882] hover:bg-[#b89872] text-[#2a2420] font-medium text-base tracking-wide transition-all duration-300 cursor-pointer"
          >
            Reserve Your Seat
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce">
        <span className="text-[#c8a882]/50 text-xs tracking-wider uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#c8a882]/40 to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;