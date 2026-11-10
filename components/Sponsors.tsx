const sponsors = ["Logus Investment Limited", "Nelos Stores", "Depalatables", "Tiens", "Mandyglo Creations"];
const tilts = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "-rotate-2"];
const colors = ["bg-cream text-denim-950", "bg-gold text-denim-950", "bg-hotpink text-white", "bg-denim-500 text-white", "bg-cream text-denim-950"];

const Sponsors = () => (
  <section className="denim-dark py-20">
    <div className="container px-5 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.4em] text-denim-300">Sponsored / partnered by</p>
      <p className="font-[family-name:var(--font-marker)] text-gold text-xl mt-1">big love to our people 💙</p>
      <div className="mt-10 flex flex-wrap justify-center gap-5">
        {sponsors.map((s, i) => (
          <span key={s} className={`${tilts[i]} ${colors[i]} rounded-full px-6 py-3 font-[family-name:var(--font-display)] uppercase text-lg sticker transition hover:rotate-0 hover:scale-110`}>
            {s}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default Sponsors;
