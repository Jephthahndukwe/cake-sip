import { Instagram, Phone, Mail, Music2 } from "lucide-react";

const links = [
  { href: "https://wa.me/2348064358275", icon: Phone, label: "WhatsApp", value: "+234 806 435 8275", c: "bg-[#25D366] text-denim-950", r: "-rotate-2" },
  { href: "https://www.instagram.com/ktccakeandsip", icon: Instagram, label: "Instagram", value: "@ktccakeandsip", c: "bg-hotpink text-white", r: "rotate-2" },
  { href: "https://www.tiktok.com/@kezz_thechef", icon: Music2, label: "TikTok", value: "Kezz_thechef / ktccakeandsip", c: "bg-cream text-denim-950", r: "-rotate-1" },
  { href: "mailto:kezzthechef@gmail.com", icon: Mail, label: "Email", value: "Slide into the inbox", c: "bg-gold text-denim-950", r: "rotate-1" },
];

const Contact = () => (
  <section className="denim-light py-24 text-denim-950">
    <div className="container px-5">
      <div className="text-center mb-14">
        <p className="font-[family-name:var(--font-marker)] text-hotpink text-2xl -rotate-2">questions? we don&apos;t bite</p>
        <h2 className="font-[family-name:var(--font-display)] uppercase text-5xl sm:text-7xl">Holla at us</h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {links.map(({ href, icon: Icon, label, value, c, r }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={`${c} ${r} stitch stitch-white rounded-3xl p-7 sticker transition hover:rotate-0 hover:-translate-y-2`}>
            <Icon className="h-9 w-9" />
            <div className="mt-5 text-xs font-bold uppercase tracking-[0.3em] opacity-80">{label}</div>
            <div className="mt-1 text-lg font-bold break-words">{value}</div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default Contact;
