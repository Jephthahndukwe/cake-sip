import { Instagram, Phone, Mail } from "lucide-react";

const Contact = () => {
  return (
    <section className="py-24 bg-[#f5f1ed]">
      <div className="container px-6 mx-auto">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-[#c8a882] text-sm tracking-[0.2em] uppercase mb-4 block">
              Contact
            </span>
            <h2 className="font-serif text-5xl md:text-6xl text-[#2a2420] mb-6">
              Get In Touch
            </h2>
            <p className="text-[#6b5d52] text-lg max-w-2xl mx-auto">
              Have questions about the event? We're here to help.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <a
              href="https://wa.me/2348064358275"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-8 bg-white border border-[#e5ddd3] hover:border-[#c8a882] transition-all duration-300"
            >
              <Phone className="w-8 h-8 text-[#c8a882] mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xs tracking-[0.2em] uppercase text-[#8b7d72] mb-3">
                WhatsApp
              </h3>
              <p className="text-lg text-[#2a2420]">
                +234 806 435 8275
              </p>
            </a>

            <a
  href="https://www.instagram.com/ktccakeandsip"
  target="_blank"
  rel="noopener noreferrer"
  className="group p-8 bg-white border border-[#e5ddd3] hover:border-[#c8a882] transition-all duration-300"
>
  <Instagram className="w-8 h-8 text-[#c8a882] mb-6 group-hover:scale-110 transition-transform duration-300" />
  <h3 className="text-xs tracking-[0.2em] uppercase text-[#8b7d72] mb-3">
    Instagram
  </h3>
  <p className="text-lg text-[#2a2420]">
    @ktccakeandsip
  </p>
</a>

            <a
              href="https://instagram.com/Kezz_thechef"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-8 bg-white border border-[#e5ddd3] hover:border-[#c8a882] transition-all duration-300"
            >
              <Instagram className="w-8 h-8 text-[#c8a882] mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xs tracking-[0.2em] uppercase text-[#8b7d72] mb-3">
                Instagram
              </h3>
              <p className="text-lg text-[#2a2420]">
                @Kezz_thechef
              </p>
            </a>

            <a
              href="mailto:kezzthechef@gmail.com"
              className="group p-8 bg-white border border-[#e5ddd3] hover:border-[#c8a882] transition-all duration-300"
            >
              <Mail className="w-8 h-8 text-[#c8a882] mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xs tracking-[0.2em] uppercase text-[#8b7d72] mb-3">
                Email
              </h3>
              <p className="text-lg text-[#2a2420]">
                Send a message
              </p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
