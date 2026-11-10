const About = () => (
  <section className="relative denim-light text-denim-950 pt-24 pb-28">
    <div className="container px-5 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <p className="font-[family-name:var(--font-marker)] text-hotpink text-2xl -rotate-2">ok so... what is it?</p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] uppercase text-5xl sm:text-7xl leading-[0.9]">
          Frosting, fits <br /> &amp; full vibes.
        </h2>
        <p className="mt-6 text-lg leading-relaxed max-w-lg">
          Cake &amp; Sip is back for round three and we&apos;re going <b>full denim</b>. Pull out your best jeans,
          jackets, skirts — the more blue the better. You&apos;ll decorate your very own cake (no skills needed, we
          gotchu), sip something sweet, dance, play games and leave with a cake <i>and</i> a camera roll full of drip.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[
          { n: "3.0", l: "Edition", c: "bg-hotpink text-white rotate-[-4deg]" },
          { n: "1", l: "Cake each", c: "bg-gold text-denim-950 rotate-[3deg] mt-8" },
          { n: "100%", l: "Denim", c: "bg-denim-800 text-cream rotate-[-2deg]" },
        ].map((s) => (
          <div key={s.l} className={`${s.c} stitch stitch-white rounded-2xl p-5 text-center sticker`}>
            <div className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl">{s.n}</div>
            <div className="text-xs font-bold uppercase tracking-widest mt-1">{s.l}</div>
          </div>
        ))}
        <div className="col-span-3 rounded-2xl bg-denim-950 p-6 text-cream rotate-1 sticker">
          <p className="font-[family-name:var(--font-marker)] text-gold text-xl">Dress code check ✔</p>
          <p className="mt-2 text-sm">Denim jacket? Yes. Jeans? Yes. Denim bucket hat? Absolutely yes. Show up in anything but denim and you&apos;re getting side-eye (lovingly).</p>
        </div>
      </div>
    </div>
  </section>
);

export default About;
