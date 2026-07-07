import type { Metadata } from "next";
import localFont from "next/font/local";

const myFont = localFont({
  src: "./fonts/le-murmure.ttf",
  weight: "400",
  display: "swap",
});
import "./globals.css";
import { HeroWorkCursor } from "@/components/HeroWorkCursor";
import { SiteHeader } from "@/components/SiteHeader";
import { montserrat } from "@/lib/fonts";
import { site } from "@/data/site";



export const metadata: Metadata = {
  title: `${site.name} — Portfolio`,
  description: site.hero.statement.slice(0, 160),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={myFont.className}>
        <HeroWorkCursor />
        <SiteHeader />
        {children}
        <footer className={`footer ${montserrat.className}`}>
          <p className="footer__line">{site.footer.line}</p>
        </footer>
      </body>
    </html>
  );
}
