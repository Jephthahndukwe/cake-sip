const About = () => {
  return (
    <section className="py-24 bg-[#2a2420]">
      <div className="container px-6 mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Section Label */}
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-px bg-[#c8a882]"></div>
            <span className="text-[#c8a882] text-sm tracking-[0.2em] uppercase">
              About The Event
            </span>
          </div>

          {/* Main Content */}
          <div className="space-y-6 text-[#e8dfd6] text-lg md:text-xl leading-relaxed">
            <p>
              Welcome to the second edition of our signature event — <span className="text-white">Cake & Sip 2.0</span>. 
              Following the success of our first gathering, we're returning with an even more refined experience.
            </p>

            <p>
              This event brings together creativity and celebration in equal measure. Whether you're passionate 
              about baking or simply enjoy unique experiences, you'll find your place here.
            </p>

            <p>
              Learn professional cake decorating techniques, enjoy expertly crafted cocktails, participate in 
              karaoke and games, and connect with like-minded individuals in an atmosphere designed for 
              memorable moments.
            </p>

            <div className="pt-8 mt-8 border-t border-[#4a4238]">
              <p className="text-white text-xl">
                Presented by<br/>
                <span className="text-[#c8a882]">Kezz The Chef Confectionery</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;