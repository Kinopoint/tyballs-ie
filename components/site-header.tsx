import Link from "next/link";
import { Brand } from "@/components/brand";
import { navigation } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Brand />
      <nav aria-label="Main navigation">
        {navigation.map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <Link className="button button-compact" href="/enquire">
        Check your date
      </Link>
    </header>
  );
}
