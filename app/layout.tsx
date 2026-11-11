import type { Metadata, Viewport } from "next";
import { Caveat, Fraunces, Inter_Tight } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import MobileTicketBar from "@/components/MobileTicketBar";
import { EVENT, SITE_URL } from "@/lib/site";

const interTight = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin"], weight: ["400", "500", "700", "800"], display: "swap" });
// Soft bakery serif for headlines (variable font with SOFT + WONK axes)
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], axes: ["SOFT", "WONK", "opsz"], display: "swap" });
// Handwritten kickers
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"], weight: ["700"], display: "swap" });

const title = `${EVENT.name}: ${EVENT.theme}`;
const description = `Decorate your own cake, sip, dance and slay in all denim. ${EVENT.dateLong}, ${EVENT.time}, ${EVENT.venue}, Lagos.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s · ${EVENT.name}` },
  description,
  openGraph: { title, description, url: SITE_URL, siteName: "Kezz the Chef", type: "website", locale: "en_NG", images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: title }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og/home.jpg"] },
};

export const viewport: Viewport = { themeColor: "#172440" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${interTight.variable} ${fraunces.variable} ${caveat.variable}`}>
      <head>
        {/* TikTok Pixel */}
        <Script
          id="tiktok-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
                ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];
                ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}; 
                for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
                ttq.instance=function(t){for(
                  var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++
                )ttq.setAndDefer(e,ttq.methods[n]);return e};
                ttq.load=function(e,n){
                  var r="https://analytics.tiktok.com/i18n/pixel/events.js",
                  o=n&&n.partner;
                  ttq._i=ttq._i||{};
                  ttq._i[e]=[];
                  ttq._i[e]._u=r;
                  ttq._t=ttq._t||{};
                  ttq._t[e]=+new Date;
                  ttq._o=ttq._o||{};
                  ttq._o[e]=n||{};
                  n=d.createElement("script");
                  n.type="text/javascript";
                  n.async=!0;
                  n.src=r+"?sdkid="+e+"&lib="+t;
                  e=d.getElementsByTagName("script")[0];
                  e.parentNode.insertBefore(n,e)
                };

                ttq.load('D6HC2JRC77UCTB9KFPMG');
                ttq.page();
              }(window, document, 'ttq');
            `,
          }}
        />
      </head>

      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-magenta-fill focus:px-4 focus:py-2 focus:font-bold focus:text-white">
          Skip to content
        </a>
        <TopBar />
        <div id="main">{children}</div>
        <Footer />
        <MobileTicketBar />
        <Toaster />
      </body>
    </html>
  );
}