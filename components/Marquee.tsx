const words = ["Denim's Drip", "Decorate your own cake", "Sip & chill", "Music", "Games", "Giveaways", "Photo moments", "Denim on denim"];

const Marquee = ({ tilt = "-rotate-2", pink = false }: { tilt?: string; pink?: boolean }) => (
  <div className={`relative z-20 -my-6 ${tilt} overflow-hidden border-y-4 border-denim-950 ${pink ? "bg-hotpink" : "bg-gold"} py-3`}>
    <div className="flex w-max animate-marquee">
      {[...words, ...words].map((w, i) => (
        <span key={i} className={`mx-6 font-[family-name:var(--font-display)] text-2xl uppercase whitespace-nowrap ${pink ? "text-white" : "text-denim-950"}`}>
          {w} <span className="ml-6">✦</span>
        </span>
      ))}
    </div>
  </div>
);

export default Marquee;
