import { Cake, Wine, Mic2, Gamepad2, Music, UtensilsCrossed } from "lucide-react";

const highlights = [
  {
    icon: Cake,
    title: "Cake Decorating",
    description: "Master professional decorating techniques and create your own masterpiece to take home"
  },
  {
    icon: Wine,
    title: "Craft Cocktails",
    description: "Enjoy signature cocktails crafted by expert mixologists throughout the afternoon"
  },
  {
    icon: Mic2,
    title: "Karaoke",
    description: "Showcase your vocals or cheer on others in our lively karaoke sessions"
  },
  {
    icon: Gamepad2,
    title: "Games",
    description: "Participate in engaging activities designed to spark connections"
  },
  {
    icon: Music,
    title: "Live Entertainment",
    description: "Dance and groove to carefully curated music all afternoon long"
  },
  {
    icon: UtensilsCrossed,
    title: "Refreshments",
    description: "Indulge in a selection of delicious food and treats"
  }
];

const Highlights = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container px-6 mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[#c8a882] text-sm tracking-[0.2em] uppercase mb-4 block">
            What's Included
          </span>
          <h2 className="font-serif text-5xl md:text-6xl text-[#2a2420] mb-6">
            The Complete Experience
          </h2>
          <p className="text-[#6b5d52] text-lg leading-relaxed">
            Every detail has been carefully curated to ensure an unforgettable afternoon.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <div 
                key={index}
                className="group p-8 border border-[#e5ddd3] hover:border-[#c8a882] transition-all duration-300"
              >
                <Icon className="w-10 h-10 text-[#c8a882] mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl text-[#2a2420] mb-4">
                  {highlight.title}
                </h3>
                <p className="text-[#6b5d52] leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Highlights;