const Footer = () => (
  <footer className="denim-dark border-t-4 border-dashed border-gold/60 pt-16 pb-10 text-cream">
    <div className="container px-5">
      <div className="grid gap-10 md:grid-cols-2 items-end">
        <div>
          <h3 className="font-[family-name:var(--font-display)] uppercase text-6xl leading-none">
            <span className="text-gold-shine">Cake</span> <span className="font-[family-name:var(--font-marker)] normal-case text-hotpink">&amp;</span>{" "}
            <span className="text-denim-300">Sip</span> <span className="font-[family-name:var(--font-marker)] normal-case text-hotpink text-4xl">3.0</span>
          </h3>
          <p className="mt-3 font-[family-name:var(--font-marker)] text-denim-300 text-xl">Denim&apos;s Drip — see you in blue 💙</p>
          <p className="mt-4 text-sm text-cream/60">By Kezz The Chef Confectionery.</p>
        </div>
        <div className="md:text-right space-y-1 font-bold">
          <p>Saturday, April 3rd 2027 · 2PM</p>
          <p>Dini Connection Hall</p>
          <div className="flex md:justify-end gap-5 pt-3 text-gold">
            <a href="https://instagram.com/Kezz_thechef" target="_blank" rel="noopener noreferrer" className="hover:text-hotpink">@Kezz_thechef</a>
            <a href="https://www.instagram.com/ktccakeandsip" target="_blank" rel="noopener noreferrer" className="hover:text-hotpink">@ktccakeandsip</a>
          </div>
        </div>
      </div>
      <p className="mt-12 text-center text-xs text-cream/40">© {new Date().getFullYear()} Kezz The Chef Confectionery</p>
    </div>
  </footer>
);

export default Footer;
