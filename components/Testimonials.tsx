"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Charity C.",
    text: "This actually will be my first time attending such event and I can boldly say it was awesome. Fun filled, educative and relaxing. As a cake lover, i was super excited when I got to know about the event. It was 10/10 minus nothing from the hall decorations to the karaoke, music, the funny mc, di, the photographer and videographer and ofcos the beautiful host. Loved the way you were looking awesomely beautiful and the way you spoke. My favorite part of the event was when I had to ice my own cake and design it too. First time doing that in my life and I was able to achieve that cos you were a good teacher. The drink was nice, the rice was tasty, was super Happy to be among those who stayed behind fot the after party and I had ice cream, in general it was a great event. Looking forward to the KTC Cake and sip 2.0 May Jehovah enlarge your coast and take you to a higher level Thanks once again and yes I have followed you on TikTok and Instagram.", 
    location: "Lagos"
  },
  {
    name: "Ibrahim I",
    text: "From start to finish, the event was thoughtfully organized and executed. The attention to detail was evident in every aspect, from the engaging speakers and informative sessions to the warm atmosphere that fostered connection and collaboration among attendees. I particularly enjoyed the cake decorating section, It was not only fun but also inspiring, and I left with new insights and ideas that I am excited to implement in my own work. Thank you once again for all the hard work and dedication that went into making this event a success. I look forward to attending more events in the future @kezz_thechef",
    location: "Abuja"
  },
  {
    name: "Joel J",
    text: "I had such an amazing experience at the Cake & Sip event! From start to finish, the atmosphere was fun, vibrant, and welcoming. The organizers did a fantastic job creating a relaxing space where everyone could unwind, get creative, and enjoy themselves. The cake decorating session was the highlight for me. The instructor was patient, friendly, and incredibly skilled making the entire process enjoyable, even for beginners like myself. All the materials were well-prepared, and the guidance was easy to follow. I left feeling proud of my decorated cake even if it was not 100% The drinks, food nd snacks were refreshing, major snack highlight for me was the crunchy chin-chin that was part of our home take gifts. It was the perfect blend of creativity, relaxation, and socializing. I would absolutely recommend this event to anyone looking to try something new, bond with friends, or simply enjoy a delightful and stress-free outing. I'm already looking forward to the next one!",
    location: "Lagos"
  },
  {
    name: "Oluchi 0",
    text: "I had such an amazing experience at the Cake & Sip event! From start to finish, the atmosphere was fun, vibrant, and welcoming. The organizers did a fantastic job creating a relaxing space where everyone could unwind, get creative, and enjoy themselves. The cake decorating session was the highlight for me. The instructor was patient, friendly, and incredibly skilled making the entire process enjoyable, even for beginners like myself. All the materials were well-prepared, and the guidance was easy to follow. I left feeling proud of my decorated cake even if it was not 100% The drinks, food nd snacks were refreshing, major snack highlight for me was the crunchy chin-chin that was part of our home take gifts. It was the perfect blend of creativity, relaxation, and socializing. I would absolutely recommend this event to anyone looking to try something new, bond with friends, or simply enjoy a delightful and stress-free outing. I'm already looking forward to the next one!",
    location: "Port Harcourt"
  },
  // {
  //   name: "Amina K.",
  //   text: "I came alone but left with friends. The event creates such a warm, welcoming atmosphere that makes it easy to connect with others.",
  //   location: "Abuja"
  // },
  // {
  //   name: "Tunde B.",
  //   text: "As someone who's never decorated a cake before, I was amazed at what I could create. The instructors were patient and encouraging.",
  //   location: "Lagos"
  // }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  const getCurrentTestimonials = () => {
    const start = currentIndex * testimonialsPerPage;
    return testimonials.slice(start, start + testimonialsPerPage);
  };

  return (
    <section className="py-24 bg-white">
      <div className="container px-6 mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[#c8a882] text-sm tracking-[0.2em] uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="font-serif text-5xl md:text-6xl text-[#2a2420] mb-6">
            What Guests Say
          </h2>
          <p className="text-[#6b5d52] text-lg">
            Hear from those who experienced Cake & Sip 1.0
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 w-12 h-12 bg-[#c8a882] hover:bg-[#b89872] text-white rounded-full flex items-center justify-center transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={totalPages <= 1}
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 w-12 h-12 bg-[#c8a882] hover:bg-[#b89872] text-white rounded-full flex items-center justify-center transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={totalPages <= 1}
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Testimonials Grid */}
          <div className="overflow-hidden">
            <div 
              className="flex gap-8 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="flex-shrink-0 w-full md:w-1/3 p-8 border border-[#e5ddd3] hover:border-[#c8a882] transition-colors duration-300"
                >
                  {/* Quote mark */}
                  <div className="text-[#c8a882] text-5xl font-serif leading-none mb-6">"</div>
                  
                  {/* Text */}
                  <p className="text-[#6b5d52] leading-relaxed mb-8">
                    {testimonial.text}
                  </p>
                  
                  {/* Author */}
                  <div className="pt-6 border-t border-[#e5ddd3]">
                    <p className="text-[#2a2420] text-lg mb-1">
                      {testimonial.name}
                    </p>
                    <p className="text-[#8b7d72] text-sm">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'bg-[#c8a882] w-8'
                    : 'bg-[#e5ddd3] hover:bg-[#c8a882]/50'
                }`}
                aria-label={`Go to testimonial page ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;