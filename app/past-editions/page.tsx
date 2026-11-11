import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Drip, Sprinkles } from "@/components/Frosting";
import { EditionBadge, Kicker, SectionHead, Sticker } from "@/components/Deco";
import { FadeUp, InView, Words } from "@/components/Reveal";
import { PhotoGrid } from "@/components/Lightbox";
import { EDITIONS } from "@/lib/content";
import { SOCIAL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Past editions",
  description: "Photos, highlights and reviews from previous Cake & Sip editions by Kezz the Chef.",
  openGraph: { images: [{ url: "/og/past-editions.jpg", width: 1200, height: 630 }] },
  twitter: { images: ["/og/past-editions.jpg"] },
};

const frost = (tone: "blush" | "cream") =>
  `tone-${tone} relative isolate z-10 -mt-12 rounded-t-[2.5rem] pb-28 pt-20 md:-mt-16 md:rounded-t-[4rem] md:pb-36 md:pt-28`;
const denim = "twill relative isolate pb-28 pt-36 md:pb-36 md:pt-44";

export default function PastEditionsPage() {
  return (
    <main>
      <section className="twill relative isolate pb-24 pt-32 md:pb-32 md:pt-44">
        <div className="container text-center">
          <Kicker>the throwback</Kicker>
          <Words as="h1" text="You had to be there." accentFrom={3} className="display mt-2 text-[clamp(3.25rem,11vw,9rem)]" />
        </div>
      </section>

      {/* The one gradient moment */}
      <section id="story" className="wash relative isolate overflow-hidden pb-36 pt-32 md:pb-44 md:pt-40">
        <Drip color="#f4c7c3" className="absolute inset-x-0 top-0" />
        <Sprinkles className="right-[5%] top-24 h-40 w-48 md:w-72" seed={7} />
        <div className="container relative">
          <Kicker tone="cream">the cake &amp; sip story</Kicker>
          <Words as="p" text="Cake parties, Lagos style. Round three is all denim." accentFrom={4} accentClass="text-blush" className="display mt-2 max-w-[15ch] text-[clamp(2.6rem,7.5vw,6.5rem)]" />
          <FadeUp delay={150}>
            <p className="mt-8 max-w-xl text-lg font-medium">Every edition is the same idea: real cake, real decorating, real party. Here&apos;s what went down last time.</p>
            <Link href="/tickets" className="btn mt-8 bg-cream text-ink hover:bg-white">Get a 3.0 ticket</Link>
          </FadeUp>
        </div>
      </section>

      {EDITIONS.map((e) => {
        const num = e.title.match(/\d\.\d$/)?.[0];
        const name = e.title.replace(/\s*\d\.\d$/, "");
        return (
          <article key={e.id} aria-labelledby={`title-${e.id}`}>
            {/* Story: blush frosting layer */}
            <section className={frost("blush")}>
              <div className="container grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:items-center">
                <div>
                  <Kicker>{e.date} · {e.venue}</Kicker>
                  <h2 id={`title-${e.id}`} className="display mt-1 flex flex-wrap items-center gap-x-4 text-[clamp(2.6rem,7.5vw,5.75rem)]">
                    {name} {num && <EditionBadge className="rotate-6">{num}</EditionBadge>}
                  </h2>
                  <FadeUp>
                    <p className="mt-6 max-w-md text-lg text-dim">{e.intro}</p>
                  </FadeUp>
                </div>
                <div className="relative">
                  <Sticker className="absolute -right-1 -top-4 z-10 rotate-6">the whole squad</Sticker>
                  <div className="frame rotate-1 rounded-[2rem]">
                    <InView className="photo-in relative aspect-[4/3] overflow-hidden rounded-[1.6rem]">
                      <Image src={e.lead.src} alt={e.lead.alt} fill placeholder="blur" sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" style={{ objectPosition: e.lead.pos }} />
                    </InView>
                  </div>
                </div>
              </div>
            </section>

            {/* Gallery + video: denim */}
            <section className={denim} aria-label={`${e.title} gallery`}>
              <Drip className="absolute inset-x-0 top-0" />
              <div className="container">
                <SectionHead kicker="every single moment" kickerTone="gold" title="The gallery." accentFrom={1} align="center" drip />
                <div className="mt-12"><PhotoGrid photos={e.photos} /></div>

                {e.video && (
                  <div className="mt-24">
                    <SectionHead kicker="press play" title="The highlights." accentFrom={1} />
                    <div className="frame frame-blush mt-8 rounded-[2rem]">
                      <video controls playsInline preload="metadata" poster={e.lead.src.src} className="aspect-video w-full rounded-[1.6rem] bg-black object-cover">
                        <source src={e.video} type="video/mp4" />
                        Your browser can&apos;t play this video.
                      </video>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Reviews: cream frosting layer */}
            {e.testimonials.length > 0 && (
              <section className={frost("cream")} aria-label={`${e.title} reviews`}>
                <div className="container">
                  <SectionHead kicker="don't take our word for it" title="The receipts." accentFrom={1} align="center" sticker="10/10" />
                  <ul className="mt-12 grid gap-5 md:grid-cols-3">
                    {e.testimonials.map((t, i) => (
                      <li key={t.name}>
                        <FadeUp delay={i * 80} className="h-full">
                          <figure className={`flex h-full flex-col rounded-3xl bg-raise p-7 shadow-[0_14px_40px_-20px_rgb(23_36_64/0.45)] ${i === 1 ? "md:translate-y-6" : ""}`}>
                            <span aria-hidden className="display text-7xl leading-none text-magenta">&ldquo;</span>
                            <blockquote className="mt-1 flex-1 text-lg">{t.quote}</blockquote>
                            <figcaption className="mt-6">
                              <span className="serif-h block text-xl">{t.name}</span>
                              {t.handle && <span className="block text-sm font-bold text-blush">{t.handle}</span>}
                            </figcaption>
                          </figure>
                        </FadeUp>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-14 text-center text-dim">
                    Were you there? Tag us on Instagram{" "}
                    <a href={SOCIAL.instagram.url} target="_blank" rel="noopener noreferrer" className="font-bold text-blush hover:underline">{SOCIAL.instagram.handle}</a>.
                  </p>
                </div>
              </section>
            )}
          </article>
        );
      })}
    </main>
  );
}
