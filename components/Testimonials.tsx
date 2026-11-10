const reviews = [
  { name: "Charity C.", text: "It was 10/10 minus nothing — from the hall decorations to the karaoke, music, the funny MC... My favorite part was when I had to ice my own cake. First time doing that in my life!", c: "bg-cream text-denim-950", r: "-rotate-2" },
  { name: "Ibrahim I.", text: "The cake decorating section was not only fun but also inspiring. I left with new ideas I'm excited to try. I look forward to attending more!", c: "bg-gold text-denim-950", r: "rotate-2" },
  { name: "Joel J.", text: "Fun, vibrant and welcoming. I left feeling proud of my decorated cake even if it was not 100% 😂 Major snack highlight: the crunchy chin-chin!", c: "bg-hotpink text-white", r: "-rotate-1" },
];

const Testimonials = () => (
  <section className="denim py-24">
    <div className="container px-5">
      <div className="text-center mb-14">
        <p className="font-[family-name:var(--font-marker)] text-gold text-2xl rotate-2">don&apos;t take our word for it</p>
        <h2 className="font-[family-name:var(--font-display)] uppercase text-5xl sm:text-7xl text-cream">The receipts</h2>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {reviews.map((t) => (
          <figure key={t.name} className={`${t.c} ${t.r} relative rounded-3xl rounded-bl-none p-7 sticker transition hover:rotate-0`}>
            <span className="absolute -top-6 left-6 font-[family-name:var(--font-display)] text-7xl leading-none opacity-80">&ldquo;</span>
            <blockquote className="mt-4 font-medium leading-relaxed">{t.text}</blockquote>
            <figcaption className="mt-5 font-[family-name:var(--font-marker)] text-lg">— {t.name}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
