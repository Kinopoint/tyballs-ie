import type { Metadata } from "next";
import Script from "next/script";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ConsentManager } from "@/components/consent-manager";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tyballs.ie"),
  title: {
    default: "TY Balls Ireland | Event Planning by DebsGuru",
    template: "%s | TYBalls.ie",
  },
  description: site.description,
  openGraph: {
    title: "TY Balls Ireland | Event Planning by DebsGuru",
    description: site.description,
    url: "https://tyballs.ie",
    siteName: site.domain,
    locale: "en_IE",
    type: "website",
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Script id="consent-default" strategy="beforeInteractive">
          {`window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments);};window.gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});`}
        </Script>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <ConsentManager />
      </body>
    </html>
  );
}
