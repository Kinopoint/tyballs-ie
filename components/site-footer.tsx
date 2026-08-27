import Link from "next/link";
import { Brand } from "@/components/brand";
import { CookieSettingsButton } from "@/components/consent-manager";
import { TrackedWhatsAppLink } from "@/components/tracked-whatsapp-link";
import { site } from "@/lib/site";
import type { SiteSetting } from "@/payload-types";

export function SiteFooter({ settings }: { settings?: SiteSetting | null }) {
  const email = settings?.contactEmail ?? site.email;
  const social = settings?.socialLinks;
  const debsGuru = social?.debsGuru ?? site.debsGuru;
  const whatsappHref = settings?.whatsappNumber ? `https://wa.me/${settings.whatsappNumber.replace(/\D/g, "")}` : site.whatsappHref;

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Brand full />
          <p>
            {settings?.footerStatement ?? "TYBalls.ie is brought to you by the team behind DebsGuru.ie."} Every enquiry is reviewed before a date or venue is confirmed. <a href={debsGuru} rel="noreferrer" target="_blank">Visit DebsGuru.ie</a>.
          </p>
        </div>
        <div className="footer-links">
          <div>
            <strong>Explore</strong>
            <Link href="/#experience">What’s included</Link>
            <Link href="/what-is-a-ty-ball">What is a TY Ball?</Link>
            <Link href="/how-it-works">How it works</Link>
            <Link href="/for-committees">For committees</Link>
            <Link href="/parents-schools">Parents &amp; schools</Link>
            <Link href="/cost-guide">Cost guide</Link>
            <Link href="/venues">Venues</Link>
            <Link href="/events">Event stories</Link>
            <Link href="/enquire">Booking Enquiry Form</Link>
          </div>
          <div>
            <strong>Follow DebsGuru</strong>
            <a href={social?.instagram ?? site.instagram} rel="noreferrer" target="_blank">
              Instagram
            </a>
            <a href={social?.facebook ?? site.facebook} rel="noreferrer" target="_blank">
              Facebook
            </a>
            <a href={social?.tiktok ?? site.tiktok} rel="noreferrer" target="_blank">
              TikTok
            </a>
            <a href={`mailto:${email}`}>{email}</a>
            <TrackedWhatsAppLink href={whatsappHref} location="footer" rel="noreferrer" target="_blank">{settings?.whatsappLabel ?? "Message on WhatsApp"}</TrackedWhatsAppLink>
          </div>
          <div>
            <strong>Privacy &amp; website</strong>
            <Link href="/privacy">Privacy</Link>
            <Link href="/cookies">Cookies</Link>
            <Link href="/terms">Website terms</Link>
            <CookieSettingsButton />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} DebsGuru Ltd</span>
        <span>TYBalls.ie by the team behind DebsGuru.ie</span>
      </div>
    </footer>
  );
}
