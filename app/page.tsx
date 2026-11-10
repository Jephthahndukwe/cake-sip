import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Highlights from "@/components/Highlights";
import Gallery from "@/components/Gallery";
import EventDetails from "@/components/EventDetails";
import TicketForm from "@/components/TicketForm";
import Testimonials from "@/components/Testimonials";
import Sponsors from "@/components/Sponsors";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Marquee />
      <About />
      <Highlights />
      <EventDetails />
      <Marquee tilt="rotate-2" pink />
      <TicketForm />
      <Gallery />
      <Testimonials />
      <Sponsors />
      <Contact />
      <Footer />
    </main>
  );
}
