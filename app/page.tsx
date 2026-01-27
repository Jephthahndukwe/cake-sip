import Hero from "@/components/Hero";
import About from "@/components/About";
import Highlights from "@/components/Highlights";
import Gallery from "@/components/Gallery";
import EventDetails from "@/components/EventDetails";
import TicketForm from "@/components/TicketForm";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Highlights />
      <Gallery />
      <EventDetails />
      <TicketForm />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
