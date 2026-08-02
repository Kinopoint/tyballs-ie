import Link from "next/link";
import { Brand } from "@/components/brand";
import { CookieSettingsButton } from "@/components/consent-manager";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-statement">
        <p>Your night.</p>
        <p><em>Properly planned.</em></p>
      </div>
      <div className="footer-top">
        <div>
          <Brand />
          <p>
            From the makers of DebsGuru.ie — Ireland&apos;s leading Debs &amp; TY
            Ball organisers.
          </p>
        </div>
        <div className="footer-links">
          <div>
            <strong>Explore</strong>
            <Link href="/#experience">The experience</Link>
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
        <span>Built for TY committees across Ireland</span>
        <span>Ballybunion, Co Kerry</span>
      </div>
    </footer>
  );
}
