// Cake & Sip 2.0 photos with crop focus points, so faces stay in frame and
// background clutter (AC units, fans) gets cropped out at any aspect ratio.
import type { StaticImageData } from "next/image";
import hero from "@/public/images/past-editions/2-0/hero.jpg";
import g01 from "@/public/images/past-editions/2-0/gallery-01-squad-with-cakes.jpg";
import g02 from "@/public/images/past-editions/2-0/gallery-02-peace-and-cake.jpg";
import g03 from "@/public/images/past-editions/2-0/gallery-03-laughing-decorator.jpg";
import g04 from "@/public/images/past-editions/2-0/gallery-04-piping-smile.jpg";
import g05 from "@/public/images/past-editions/2-0/gallery-05-proud-decorator.jpg";
import g06 from "@/public/images/past-editions/2-0/gallery-06-mc-laughs.jpg";
import g07 from "@/public/images/past-editions/2-0/gallery-07-hype-moment.jpg";
import g08 from "@/public/images/past-editions/2-0/gallery-08-balloon-game.jpg";
import g09 from "@/public/images/past-editions/2-0/gallery-09-decorating-table.jpg";
import g10 from "@/public/images/past-editions/2-0/gallery-10-hands-detail.jpg";
import g11 from "@/public/images/past-editions/2-0/gallery-11-showpiece-cake.jpg";
import g12 from "@/public/images/past-editions/2-0/gallery-12-trio-with-cakes.jpg";
import sip from "@/public/images/past-editions/2-0/sip-drinks.jpg";
import denimJacket from "@/public/images/past-editions/2-0/dresscode-denim-jacket.jpg";
import denimHost from "@/public/images/past-editions/2-0/dresscode-denim-host.jpg";

export type Photo = { src: StaticImageData; alt: string; pos: string };

const p = (src: StaticImageData, alt: string, pos: string): Photo => ({ src, alt, pos });

export const PHOTOS = {
  hero: p(hero, "The Cake & Sip host dancing with a big smile at Cake & Sip 2.0", "62% 28%"),
  squad: p(g01, "A squad of guests holding up their decorated cakes", "50% 32%"),
  peace: p(g02, "A guest throwing a peace sign next to the Cake & Sip 2.0 welcome board", "72% 30%"),
  laughing: p(g03, "A guest laughing while she ices her cake", "50% 22%"),
  piping: p(g04, "A guest smiling as he smooths icing on his cake", "50% 28%"),
  proud: p(g05, "A proud decorator showing off her finished cake", "56% 30%"),
  mc: p(g06, "Guests laughing at the MC's jokes", "45% 40%"),
  hype: p(g07, "The MC hyping up the crowd with a microphone", "50% 40%"),
  balloon: p(g08, "A guest playing the balloon game", "50% 30%"),
  table: p(g09, "A long table of guests decorating cakes together", "50% 72%"),
  hands: p(g10, "Close-up of gloved hands smoothing icing on a cake", "50% 62%"),
  showpiece: p(g11, "The host presenting the Cake & Sip 2.0 showpiece cake", "40% 55%"),
  trio: p(g12, "Three guests posing with their cakes", "50% 35%"),
  sip: p(sip, "Cups of fruity drinks lined up on a silver tray", "50% 50%"),
  denimJacket: p(denimJacket, "Two guests in denim posing at the photo wall", "50% 35%"),
  denimHost: p(denimHost, "The host in head-to-toe denim on the mic", "62% 30%"),
};

export const GALLERY_2_0: Photo[] = [
  PHOTOS.squad, PHOTOS.peace, PHOTOS.laughing, PHOTOS.piping, PHOTOS.proud, PHOTOS.mc,
  PHOTOS.hype, PHOTOS.balloon, PHOTOS.table, PHOTOS.hands, PHOTOS.showpiece, PHOTOS.trio,
];
