import { Cake, Martini, Music, Gamepad2, Gift, Camera } from "lucide-react";

const items = [
  { icon: Cake, title: "Decorate your own cake", text: "Pipe it, drip it, top it. Take your masterpiece home.", c: "bg-hotpink", r: "-rotate-2" },
  { icon: Martini, title: "Sip & chill", text: "Sweet drinks flowing all afternoon.", c: "bg-gold text-denim-950", r: "rotate-2" },
  { icon: Music, title: "Music", text: "Back-to-back jams. Dancing is basically mandatory.", c: "bg-denim-500", r: "-rotate-1" },
  { icon: Gamepad2, title: "Games", text: "Silly, competitive, loud. Prizes on the line.", c: "bg-cream text-denim-950", r: "rotate-1" },
  { icon: Gift, title: "Giveaways", text: "Goodies from our partners. Someone's leaving lucky.", c: "bg-hotpink", r: "rotate-2" },
  { icon: Camera, title: "Photo moments", text: "A denim backdrop made for your next profile pic.", c: "bg-gold text-denim-950", r: "-rotate-2" },
];

const Highlights = () => (
  <section className="denim-dark pt-28 pb-24">
    <div className="container px-5">
      <div className="text-center mb-16">
        <p className="font-[family-name:var(--font-marker)] text-gold text-2xl rotate-[-3deg]">what&apos;s going down</p>
        <h2 className="font-[family-name:var(--font-display)] uppercase text-5xl sm:text-7xl text-cream">
          The <span className="text-hotpink">line-up</span>
        </h2>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: Icon, title, text, c, r }) => (
          <div key={title} className={`${c} ${r} stitch rounded-3xl p-8 sticker transition duration-300 hover:rotate-0 hover:-translate-y-2 animate-wiggle text-white`}>
            <div className="flex items-center justify-between">
              <Icon className="h-12 w-12" strokeWidth={2.2} />
              <span className="rivet" />
            </div>
            <h3 className="mt-6 font-[family-name:var(--font-display)] text-3xl uppercase leading-none">{title}</h3>
            <p className="mt-3 font-medium opacity-90">{text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Highlights;
