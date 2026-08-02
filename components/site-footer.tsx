import Link from "next/link";
import { Brand } from "@/components/brand";
import { CookieSettingsButton } from "@/components/consent-manager";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Brand />
          <p>
            TYBalls.ie is operated by DebsGuru Ltd. Enquiries are reviewed by
            the DebsGuru team before any date or venue is confirmed.
          </p>
        </div>
        <div className="footer-links">
          <div>
            <strong>Explore</strong>
            <Link href="/#experience">What can be included</Link>
            <Link href="/how-it-works">How it works</Link>
            <Link href="/for-committees">For committees</Link>
            <Link href="/parents-schools">For parents &amp; schools</Link>
            <Link href="/cost-guide">Cost guide</Link>
            <Link href="/enquire">Make an enquiry</Link>
          </div>
          <div>
            <strong>Follow DebsGuru</strong>
            <a href={site.instagram} rel="noreferrer" target="_blank">
              Instagram
            </a>
            <a href={site.facebook} rel="noreferrer" target="_blank">
              Facebook
            </a>
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
