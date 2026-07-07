import Link from "next/link";
import { site } from "@/data/site";

export function SiteHeader() {
  return (
    <header className="site-header" aria-label="Site">
      <div className="site-header__inner">
        <nav className="site-header__nav" aria-label="Primary">
          {site.hero.nav.map((item) => (
            <Link key={item.label} href={item.href} className="site-header__link">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
