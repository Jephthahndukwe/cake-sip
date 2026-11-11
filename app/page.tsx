import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Cake, Camera, Gift, Heart, Music, Users } from "lucide-react";
import Countdown from "@/components/Countdown";
import LogoWall from "@/components/LogoWall";
import { Drip, Sprinkles } from "@/components/Frosting";
import { EditionBadge, Kicker, SectionHead, Sticker } from "@/components/Deco";
import { FadeUp, InView, Words } from "@/components/Reveal";
import { PhotoGrid, VideoButton } from "@/components/Lightbox";
import { EVENT } from "@/lib/site";
import { PHOTOS, type Photo } from "@/lib/photos";
import { EXPERIENCES, PACKAGES, naira, priceFor, savingFor, type Package } from "@/lib/tickets";

// Re-render at most once a minute so the server-rendered countdown stays fresh.
export const revalidate = 60;

const WHO = [
  { icon: Users, title: "Besties", text: "Matching denim, matching cakes, one shared camera roll." },
  { icon: Heart, title: "Couples", text: "A date where you both get dessert and the bragging rights." },
  { icon: Cake, title: "Cake lovers", text: "First-timer or frosting pro, you leave with a cake you made." },
  { icon: Camera, title: "Content creators", text: "Pink rooms, denim fits and moments built for your feed." },
];

const LINEUP: { title: string; text: string; photo?: Photo; icon?: typeof Music }[] = [
  { title: "Decorate your own cake", text: "Pipe it, drip it, top it. Your masterpiece goes home with you.", photo: PHOTOS.hands },
  { title: "Sip & chill", text: "Sweet, fruity drinks flowing all afternoon.", photo: PHOTOS.sip },
  { title: "Games", text: "Silly, loud and competitive, with prizes on the line.", photo: PHOTOS.balloon },
  { title: "Music", text: "Back-to-back jams. Dancing is basically mandatory.", icon: Music },
  { title: "Giveaways", text: "Goodies from our partners. Someone is leaving lucky.", icon: Gift },
  { title: "Photo moments", text: "A denim backdrop made for your next profile picture.", icon: Camera },
];

/** A frosting layer that overlaps the section above with a rounded top. */
const frost = (tone: "blush" | "cream") =>
  `tone-${tone} relative isolate z-10 -mt-12 rounded-t-[2.5rem] pb-28 pt-20 md:-mt-16 md:rounded-t-[4rem] md:pb-36 md:pt-28`;
/** A denim layer with frosting dripping onto it from the layer above. */
const denim = "twill relative isolate pb-28 pt-36 md:pb-36 md:pt-44";

export default function Home() {
  const initialMs = new Date(EVENT.startISO).getTime() - Date.now();
  const teaserPrices = EXPERIENCES.decorator.prices!;

  return (
    <>
      {/* HERO: a normal section that scrolls away like any other */}
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-denim" aria-labelledby="hero-title">
        <Image src={PHOTOS.hero.src} alt={PHOTOS.hero.alt} fill priority placeholder="blur" sizes="100vw" className="object-cover" style={{ objectPosition: PHOTOS.hero.pos }} />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[85%] bg-gradient-to-t from-denim via-denim/85 to-transparent" />

        <div className="container relative flex flex-1 flex-col justify-end pb-24 pt-32 md:pb-28">
          <Kicker tone="gold" className="mb-4 self-start [text-shadow:0_2px_14px_rgb(23_36_64/0.95)] sm:mb-6">Kezz the Chef presents…</Kicker>
          <h1 id="hero-title" className="display flex flex-wrap items-center gap-x-[0.2em] text-[clamp(3.5rem,14vw,11.5rem)]">
            Cake &amp; Sip
            <EditionBadge size="lg" className="-rotate-6">3.0</EditionBadge>
          </h1>
          <p className="script mt-2 text-[clamp(2rem,7vw,3.25rem)] text-blush">{EVENT.theme}</p>
          <p className="mt-2 text-base font-bold sm:text-lg">
            {EVENT.dateShort} · {EVENT.time} · {EVENT.venue}, Lagos
          </p>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <Countdown target={EVENT.startISO} initialMs={initialMs} />
            <div className="flex flex-wrap gap-3">
              <Link href="/tickets" className="btn btn-fill text-base">Get my ticket</Link>
              <Link href="/past-editions" className="btn btn-outline text-base">See past editions</Link>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-gold/50 pt-3 font-bold">
            <span className="script text-2xl text-cream">Decorate. Sip. Slay.</span>
            <a href="#community" className="inline-flex min-h-[44px] items-center gap-2 text-sm hover:text-blush">
              Discover <ArrowDown className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      <div>
        {/* THE ONE GRADIENT MOMENT, with frosting dripping over the hero */}
        <section id="community" className="wash relative isolate scroll-mt-16 overflow-hidden pb-36 pt-32 md:pb-48 md:pt-44">
          <Drip className="absolute inset-x-0 top-0" />
          <Sprinkles className="right-[4%] top-28 h-40 w-40 md:h-56 md:w-72" count={16} seed={3} />
          <div className="container relative">
            <Kicker tone="cream">welcome to the family</Kicker>
            <Words as="h2" text="Frosting, fits & full vibes." accentFrom={3} accentClass="text-blush" className="display mt-2 max-w-[13ch] text-[clamp(3rem,10vw,8.5rem)]" />
            <FadeUp delay={200}>
              <p className="mt-8 max-w-xl text-lg font-medium sm:text-xl">
                One afternoon a year, Lagos puts on its best denim, grabs a piping bag and parties over cake.
              </p>
              <Link href="/past-editions" className="btn mt-8 bg-cream text-ink hover:bg-white">
                Our story <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </FadeUp>
          </div>
        </section>

        {/* THE VIBE: blush frosting layer, centred */}
        <section id="vibe" className={frost("blush")}>
          <div className="container">
            <SectionHead kicker="the vibe, explained" title="A cake party with a dress code." accentFrom={4} align="center" sticker="no skills needed!" />
            <FadeUp>
              <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-dim">
                Cake &amp; Sip is part workshop, part day party. You decorate a cake from scratch (we gotchu), sip something
                sweet, dance, play games and leave with a cake and a full camera roll.
              </p>
            </FadeUp>
            <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {WHO.map(({ icon: Icon, title, text }, i) => (
                <li key={title}>
                  <FadeUp delay={i * 80} className="h-full">
                    <div className="h-full rounded-3xl bg-raise p-7 shadow-[0_14px_40px_-20px_rgb(23_36_64/0.45)] transition duration-300 hover:-translate-y-1">
                      <Icon className={`h-9 w-9 ${i % 2 ? "text-gold" : "text-magenta"}`} strokeWidth={1.75} aria-hidden />
                      <h3 className="serif-h mt-6 text-2xl">{title}</h3>
                      <p className="mt-2 text-dim">{text}</p>
                    </div>
                  </FadeUp>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* YOU HAD TO BE THERE: denim, left aligned, sticker overlapping the gallery */}
        <section id="there" className={denim}>
          <Drip className="absolute inset-x-0 top-0" />
          <div className="container">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <Kicker>you had to be there…</Kicker>
                <h2 className="display mt-1 flex flex-wrap items-center gap-x-4 text-[clamp(2.6rem,7.5vw,5.75rem)]">
                  Cake &amp; Sip <EditionBadge className="rotate-6">2.0</EditionBadge>
                </h2>
                <p className="mt-3 font-bold text-dim">April 2026 · Lagos</p>
              </div>
              <VideoButton />
            </div>
            <div className="relative mt-10">
              <Sticker className="absolute -left-2 -top-5 z-10 -rotate-6 md:-left-5">best. day. ever.</Sticker>
              <PhotoGrid photos={[PHOTOS.squad, PHOTOS.laughing, PHOTOS.piping, PHOTOS.trio, PHOTOS.peace, PHOTOS.proud, PHOTOS.hype, PHOTOS.showpiece]} />
            </div>
          </div>
        </section>

        {/* LINE-UP: cream frosting layer, centred with drip */}
        <section id="lineup" className={frost("cream")}>
          <div className="container">
            <SectionHead kicker="what's going down" title="Six reasons to clear your Saturday." accentFrom={3} align="center" drip />
            <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {LINEUP.map((f, i) => (
                <li key={f.title}>
                  <FadeUp delay={(i % 3) * 80} className="h-full">
                    <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-raise shadow-[0_14px_40px_-20px_rgb(23_36_64/0.45)] transition duration-300 hover:-translate-y-1">
                      {f.photo && (
                        <div className="frame frame-blush m-3 mb-0 rounded-2xl">
                          <InView className="photo-in relative aspect-[4/3] overflow-hidden rounded-xl">
                            <Image src={f.photo.src} alt={f.photo.alt} fill placeholder="blur" sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="object-cover" style={{ objectPosition: f.photo.pos }} />
                          </InView>
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-7">
                        {f.icon && <f.icon className={`mb-5 h-9 w-9 ${i % 2 ? "text-gold" : "text-magenta"}`} strokeWidth={1.75} aria-hidden />}
                        <h3 className="serif-h text-2xl">{f.title}</h3>
                        <p className="mt-2 text-dim">{f.text}</p>
                      </div>
                    </div>
                  </FadeUp>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* DRESS CODE: denim, left aligned, headline overlapping the frames on desktop */}
        <section id="dresscode" className={denim}>
          <Drip color="#fff6ee" className="absolute inset-x-0 top-0" />
          <div className="container grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="relative z-10 lg:-mr-24">
              <SectionHead kicker="the dress code" kickerTone="gold" title="All denim. No exceptions." accentFrom={2} />
              <FadeUp>
                <p className="mt-6 max-w-md text-lg text-dim">
                  Jeans, jackets, skirts, overalls, a denim bucket hat if you&apos;re brave. Double denim is encouraged.
                  Triple denim gets a shout-out from the MC. Anything else gets side-eye (lovingly).
                </p>
              </FadeUp>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="frame polaroid -rotate-2 rounded-md">
                <InView className="photo-in relative aspect-[3/4] overflow-hidden rounded-sm">
                  <Image src={PHOTOS.denimJacket.src} alt={PHOTOS.denimJacket.alt} fill placeholder="blur" sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" style={{ objectPosition: PHOTOS.denimJacket.pos }} />
                </InView>
                <span className="script absolute bottom-2 left-0 right-0 text-center text-xl text-ink">double denim, always</span>
              </div>
              <div className="frame frame-blush mt-14 rounded-b-3xl rounded-t-full">
                <InView className="photo-in relative aspect-[3/4] overflow-hidden rounded-b-[1.25rem] rounded-t-full">
                  <Image src={PHOTOS.denimHost.src} alt={PHOTOS.denimHost.alt} fill placeholder="blur" sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" style={{ objectPosition: PHOTOS.denimHost.pos }} />
                </InView>
              </div>
            </div>
          </div>
        </section>

        {/* TICKETS TEASER: blush frosting layer */}
        <section id="tickets" className={frost("blush")}>
          <div className="container">
            <SectionHead kicker="pick your slice" title="Bring the whole squad." accentFrom={3} align="center" sticker="save up to ₦14k" />
            <p className="mt-5 text-center text-dim">Cake Decorator tickets. Every ticket includes your own cake to decorate and take home.</p>
            <ul className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
              {(Object.keys(PACKAGES) as Package[]).map((p, i) => {
                const save = savingFor("decorator", p);
                return (
                  <li key={p}>
                    <FadeUp delay={i * 80} className="h-full">
                      <Link
                        href={`/tickets?package=${p}`}
                        className={`group flex h-full flex-col rounded-3xl bg-raise p-7 shadow-[0_14px_40px_-20px_rgb(23_36_64/0.45)] transition duration-300 hover:-translate-y-1 ${i === 1 ? "ring-2 ring-magenta md:-translate-y-3 md:hover:-translate-y-4" : ""}`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="serif-h text-3xl">{PACKAGES[p].label}</span>
                          {i === 1 && <span className="rounded-full bg-mint px-3 py-1 text-xs font-extrabold text-ink">Most popular</span>}
                        </div>
                        <span className="mt-1 text-dim">{PACKAGES[p].people} {PACKAGES[p].people === 1 ? "person" : "people"}</span>
                        <span className="leather mt-8 self-start rounded-2xl px-5 py-3">
                          <span className="block text-4xl font-extrabold tracking-tight">{naira(teaserPrices[p])}</span>
                          <span className="block text-sm font-bold text-blush">{save > 0 ? `Save ${naira(save)}` : "Per person"}</span>
                        </span>
                        <span className="mt-8 inline-flex items-center gap-2 font-extrabold">
                          Choose {PACKAGES[p].label} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
                        </span>
                      </Link>
                    </FadeUp>
                  </li>
                );
              })}
            </ul>
            {priceFor("guest", "single") !== null && <p className="mt-5 text-center text-dim">Not decorating? Vibes Only tickets are on the tickets page.</p>}
          </div>
        </section>

        {/* PARTNERS: denim, left aligned */}
        <section id="partners" className={denim}>
          <Drip className="absolute inset-x-0 top-0" />
          <div className="container">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHead kicker="the people who made it happen" kickerTone="gold" title="Our partners." accentFrom={1} />
              <Link href="/partner" className="btn btn-outline shrink-0 self-start md:self-auto">Partner with us</Link>
            </div>
            <div className="mt-12"><LogoWall /></div>
          </div>
        </section>
      </div>
    </>
  );
}
