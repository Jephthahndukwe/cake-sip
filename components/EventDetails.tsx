import { Calendar, Clock, MapPin, Shirt } from "lucide-react";

const details = [
  { icon: Calendar, label: "When", value: "Saturday, April 3rd 2027" },
  { icon: Clock, label: "Time", value: "2PM — come early for pics" },
  { icon: MapPin, label: "Where", value: "Dini Connection Hall" },
  { icon: Shirt, label: "Dress code", value: "Denim's vibe, head to toe" },
];

const EventDetails = () => (
  <section className="denim py-24">
    <div className="container px-5">
      {/* Back-pocket card */}
      <div className="relative mx-auto max-w-4xl">
        <div
          className="relative bg-denim-700 stitch px-6 sm:px-12 pt-14 pb-20 sticker"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 78%, 50% 100%, 0 78%)" }}
        >
          <p className="font-[family-name:var(--font-marker)] text-gold text-2xl text-center">save the date, babe</p>
          <h2 className="text-center font-[family-name:var(--font-display)] uppercase text-5xl sm:text-7xl text-cream">The deets</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 pb-10">
            {details.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-4 rounded-2xl bg-denim-950/60 p-5 border-2 border-dashed border-denim-300/40">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold text-denim-950"><Icon className="h-6 w-6" /></span>
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.25em] text-denim-300">{label}</div>
                  <div className="text-lg font-bold text-cream">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-4 left-4 rivet" />
        <div className="absolute top-4 right-4 rivet" />
        <div className="absolute -right-2 -top-6 sm:-right-8 rotate-12 rounded-lg bg-hotpink px-4 py-2 font-[family-name:var(--font-marker)] text-white sticker">limited spots!</div>
      </div>
    </div>
  </section>
);

export default EventDetails;
