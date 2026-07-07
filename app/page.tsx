import { HeroStatementScroll } from "@/components/HeroStatementScroll";
import { HeroSection } from "@/sections/HeroSection";
import { SelectedWorkSection } from "@/sections/SelectedWorkSection";
import { WorkshopSection } from "@/sections/WorkshopSection";
import { ContactSection } from "@/sections/ContactSection";
import { site } from "@/data/site";

export default function Home() {
  return (
    <main className="home">
      <div className="hero__intro hero__intro--fixed">
        <span className="hero__statement-name">{site.hero.statementName}</span>
        <div id="hero-statement-body" className="hero__statement-body">
          <span className="hero__statement-line hero__statement-line--lead">
            {site.hero.statementLines[0]}
          </span>
          {site.hero.statementLines.slice(1).map((line) => (
            <span key={line} className="hero__statement-line">
              {line}
            </span>
          ))}
        </div>
      </div>
      <HeroStatementScroll />
      <HeroSection />
      <SelectedWorkSection />
      <WorkshopSection />
      <ContactSection />
    </main>
  );
}
