"use client";

import Link from "next/link";
import { useState } from "react";
import { Brand } from "@/components/brand";
import { navigation } from "@/lib/site";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className={`site-header ${menuOpen ? "menu-open" : ""}`}>
      <Brand />
      <nav aria-label="Main navigation" id="main-navigation">
        {navigation.map((item) => (
          <Link href={item.href} key={item.href} onClick={closeMenu}>
            {item.label}
          </Link>
        ))}
        <Link className="mobile-nav-cta" href="/enquire" onClick={closeMenu}>
          Start an enquiry
        </Link>
      </nav>
      <Link className="button button-compact header-cta" href="/enquire">
        Check your date
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
