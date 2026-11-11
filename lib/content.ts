// Editable content for the past editions page.
import { GALLERY_2_0, PHOTOS, type Photo } from "./photos";

export type Testimonial = { name: string; handle?: string; quote: string };

export type Edition = {
  id: string;
  title: string;
  /** e.g. "April 2026" */
  date: string;
  venue: string;
  lead: Photo;
  intro: string;
  photos: Photo[];
  video?: string;
  testimonials: Testimonial[];
};

// TODO(owner): confirm the 2.0 date and venue.
export const EDITIONS: Edition[] = [
  {
    id: "2-0",
    title: "Cake & Sip 2.0",
    date: "April 2026",
    venue: "Lagos",
    lead: PHOTOS.squad,
    intro:
      "Round two went pink. A room full of first-time decorators, an MC who would not let anyone sit still, and a table that stretched forever with cakes going home in every hand.",
    photos: GALLERY_2_0,
    video: "/video/cakeandsip.mp4",
    testimonials: [
      { name: "Charity C.", quote: "10/10 minus nothing, from the hall decorations to the music and the funny MC. My favourite part was icing my own cake. First time in my life!" },
      { name: "Ibrahim I.", quote: "The cake decorating section was fun and inspiring. I left with new ideas I'm excited to try. Can't wait for the next one." },
      { name: "Joel J.", quote: "Fun, vibrant and welcoming. I was proud of my cake even if it wasn't 100% 😂 Major snack highlight: the crunchy chin-chin!" },
    ],
  },
  // Add Cake & Sip 1.0 here with the same shape once photos are ready:
  // { id: "1-0", title: "Cake & Sip 1.0", date: "...", venue: "...", lead: ..., intro: "...", photos: [...], testimonials: [] },
];
