const Footer = () => {
  return (
    <footer className="bg-[#2a2420] text-white py-16 border-t border-[#4a4238]">
      <div className="container px-6 mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-4xl mb-3">
              Cake & Sip
              <span className="text-[#c8a882] ml-2">2.0</span>
            </h3>
            <p className="text-[#d4cbc0] mb-6">
              Learn. Decorate. Vibe. Eat.
            </p>
            <p className="text-[#8b7d72] text-sm leading-relaxed">
              An exclusive event by Kezz The Chef Confectionery.<br />
              Creating memorable experiences through the art of baking.
            </p>
          </div>

          {/* Quick Info */}
          <div className="md:text-right">
            <div className="space-y-2 text-[#d4cbc0] mb-6">
              <p>April 6, 2026</p>
              <p>2:00 PM Prompt</p>
              <p>Location Revealed Upon Purchase</p>
            </div>

            {/* Instagram Handles */}
            <div className="flex md:justify-end gap-6 text-sm tracking-wider">
              <a
                href="https://instagram.com/Kezz_thechef"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c8a882] hover:text-[#b89872] transition-colors"
              >
                @Kezz_thechef
              </a>

              <a
                href="https://www.instagram.com/ktccakeandsip"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c8a882] hover:text-[#b89872] transition-colors"
              >
                @ktccakeandsip
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#4a4238]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[#8b7d72] text-sm">
            <p>
              © {new Date().getFullYear()} Kezz The Chef Confectionery. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
