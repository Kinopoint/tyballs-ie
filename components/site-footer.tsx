import Link from "next/link";
import { Brand } from "@/components/brand";
import { CookieSettingsButton } from "@/components/consent-manager";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Brand full />
          <p>
            TYBalls.ie is brought to you by the team behind <a href={site.debsGuru} rel="noreferrer" target="_blank">DebsGuru.ie</a>.
            Every enquiry is reviewed before a date or venue is confirmed.
          </p>
        </div>
        <div className="footer-links">
          <div>
            <strong>Explore</strong>
            <Link href="/#experience">What’s included</Link>
            <Link href="/how-it-works">How it works</Link>
            <Link href="/for-committees">For committees</Link>
            <Link href="/parents-schools">Parents &amp; schools</Link>
            <Link href="/cost-guide">Cost guide</Link>
            <Link href="/enquire">Booking Enquiry Form</Link>
          </div>
          <div>
            <strong>Follow DebsGuru</strong>
            <a href={site.instagram} rel="noreferrer" target="_blank">
              Instagram
            </a>
            <a href={site.facebook} rel="noreferrer" target="_blank">
              Facebook
            </a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={`tel:${site.whatsappHref.replace("https://wa.me/", "+")}`}>{site.whatsappDisplay}</a>
          </div>
          <div>
            <strong>Legal</strong>
            <Link href="/privacy">Privacy</Link>
            <Link href="/cookies">Cookies</Link>
            <Link href="/terms">Website terms</Link>
            <CookieSettingsButton />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} DebsGuru Ltd</span>
        <span>St Brendans, East End, Ballybunion, Co Kerry</span>
      </div>
    </footer>
  );
}
