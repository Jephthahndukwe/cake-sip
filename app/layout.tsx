import type { Metadata } from "next";
import { Anton, Permanent_Marker, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const anton = Anton({ variable: "--font-anton", weight: "400", subsets: ["latin"] });
const marker = Permanent_Marker({ variable: "--font-pmarker", weight: "400", subsets: ["latin"] });
const grotesk = Space_Grotesk({ variable: "--font-grotesk", weight: ["400", "500", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cake & Sip 3.0 — Denim's Drip",
  description:
    "Kezz The Chef presents Cake & Sip 3.0: Denim's Drip. Decorate your own cake, sip & chill, music, games, giveaways. Saturday, April 3rd 2027, 2PM, Dini Connection Hall.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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

      <body
        className={`${anton.variable} ${marker.variable} ${grotesk.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}