"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAnimate } from "motion/react";
import { useEffect, useState } from "react";
import { Brand } from "@/components/brand";
import { navigation, site } from "@/lib/site";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const [headerScope, animate] = useAnimate();

  useEffect(() => {
    if (!pathname.endsWith("/cost-guide")) return;
    animate(headerScope.current, { opacity: [0, 1] }, { duration: 0.7, ease: [0.16, 1, 0.3, 1] });
    animate(".brand", { opacity: [0, 1], x: [-40, 0] }, { delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] });
    animate("nav", { opacity: [0, 1] }, { delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] });
    animate(".header-cta, .menu-toggle", { opacity: [0, 1], x: [40, 0] }, { delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] });
  }, [animate, headerScope, pathname]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className={`site-header ${menuOpen ? "menu-open" : ""}`} ref={headerScope}>
      <Brand />
      <nav aria-label="Main navigation" id="main-navigation">
        {navigation.map((item) => (
          <Link aria-current={!item.href.startsWith("/#") && pathname.endsWith(item.href) ? "page" : undefined} href={item.href} key={item.href} onClick={closeMenu}>
            {item.label}
          </Link>
        ))}
        <Link className="mobile-nav-cta" href="/enquire" onClick={closeMenu}>
          Booking Enquiry Form
        </Link>
        <div className="mobile-nav-contact">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={site.whatsappHref} rel="noreferrer" target="_blank">WhatsApp message {site.whatsappDisplay}</a>
        </div>
      </nav>
      <a className="header-phone" href={site.whatsappHref} rel="noreferrer" target="_blank">
        WhatsApp message {site.whatsappDisplay}
      </a>
      <Link className="button button-compact header-cta" href="/enquire">
        Booking Enquiry Form
      </Link>
      <button
        aria-controls="main-navigation"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        className="menu-toggle"
        onClick={() => setMenuOpen((open) => !open)}
        type="button"
      >
        <span />
        <span />
      </button>
    </header>
  );
}
