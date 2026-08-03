import type { Metadata } from "next";
import Script from "next/script";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ConsentManager } from "@/components/consent-manager";
import { StructuredData } from "@/components/structured-data";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tyballs.ie"),
  title: {
    default: "TY Ball Organisers Ireland | TYBalls.ie by DebsGuru",
    template: "%s | TYBalls.ie",
  },
  description: site.description,
  openGraph: {
    title: "TY Ball Organisers Ireland | TYBalls.ie by DebsGuru",
    description: site.description,
    url: "https://tyballs.ie",
    siteName: site.domain,
    locale: "en_IE",
    type: "website",
    images: [{ url: "/images/event-hall.jpg", width: 1376, height: 768, alt: "Guests arriving for a TY Ball in Ireland" }],
  },
  twitter: { card: "summary_large_image", title: "TY Ball Organisers Ireland | TYBalls.ie by DebsGuru", description: site.description, images: ["/images/event-hall.jpg"] },
  alternates: { canonical: "/" },
};

const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://tyballs.ie/#organisation",
  name: "DebsGuru Ltd",
  alternateName: "TYBalls.ie",
  url: "https://tyballs.ie/",
  email: site.email,
  telephone: "+353873431732",
  address: {
    "@type": "PostalAddress",
    streetAddress: "St Brendans, East End",
    addressLocality: "Ballybunion",
    addressRegion: "Co Kerry",
    postalCode: "V31 CF61",
    addressCountry: "IE",
  },
  sameAs: [site.debsGuru, site.instagram, site.facebook],
  brand: { "@type": "Brand", name: "TYBalls.ie", url: "https://tyballs.ie/" },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://tyballs.ie/#website",
  name: "TYBalls.ie",
  url: "https://tyballs.ie/",
  publisher: { "@id": "https://tyballs.ie/#organisation" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <StructuredData data={[organisationSchema, websiteSchema]} />
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
