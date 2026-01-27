"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";

const EventDetails = () => {
  const eventDate = new Date('2026-04-06T14:00:00');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-[#f5f1ed]">
      {/* Section Header */}
      <div className="container px-6 mx-auto mb-16">
        <div className="max-w-3xl">
          <span className="text-[#c8a882] text-sm tracking-[0.2em] uppercase mb-4 block">
            Event Details
          </span>
          <h2 className="font-serif text-5xl md:text-6xl text-[#2a2420] mb-6">
            Mark Your Calendar
          </h2>
          <p className="text-[#6b5d52] text-lg leading-relaxed">
            Join us for an afternoon of creativity, connection, and celebration. Limited spots available.
          </p>
        </div>
      </div>

      {/* Countdown */}
      <div className="container px-6 mx-auto mb-20">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#2a2420] p-4 md:p-16">
            <h3 className="text-[#c8a882] text-sm tracking-[0.2em] uppercase mb-10 text-center">
              Event Starts In
            </h3>
            <div className="grid grid-cols-4 gap-6">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="bg-[#3a342e] border border-[#4a4238] py-4  md:p-6 mb-3">
                    <div className="font-serif text-4xl md:text-6xl text-[#f5f1ed]">
                      {item.value.toString().padStart(2, '0')}
                    </div>
                  </div>
                  <div className="text-[#c8a882] text-xs tracking-wider uppercase">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Event Info Cards */}
      <div className="container px-6 mx-auto">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 border border-[#e5ddd3] hover:border-[#c8a882] transition-colors duration-300">
            <Calendar className="w-8 h-8 text-[#c8a882] mb-6" />
            <h4 className="text-xs tracking-[0.2em] uppercase text-[#8b7d72] mb-3">Date</h4>
            <p className="text-2xl text-[#2a2420]">April 6<br/>2026</p>
          </div>

          <div className="bg-white p-8 border border-[#e5ddd3] hover:border-[#c8a882] transition-colors duration-300">
            <Clock className="w-8 h-8 text-[#c8a882] mb-6" />
            <h4 className="text-xs tracking-[0.2em] uppercase text-[#8b7d72] mb-3">Time</h4>
            <p className="text-2xl text-[#2a2420]">2:00 PM<br/>Prompt</p>
          </div>

          <div className="bg-white p-8 border border-[#e5ddd3] hover:border-[#c8a882] transition-colors duration-300">
            <MapPin className="w-8 h-8 text-[#c8a882] mb-6" />
            <h4 className="text-xs tracking-[0.2em] uppercase text-[#8b7d72] mb-3">Venue</h4>
            <p className="text-2xl text-[#2a2420]">Revealed<br/>Upon Purchase</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;