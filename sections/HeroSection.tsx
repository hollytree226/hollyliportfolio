"use client";

import { useRef } from "react";
import { HeroWorkBlocks } from "@/components/HeroWorkBlocks";

export function HeroSection() {
  const ref = useRef<HTMLElement | null>(null);

  return (
    <section
      className="hero hero--tanner"
      ref={ref}
      id="top"
      aria-label="Introduction"
    >
      <HeroWorkBlocks containerRef={ref} />
    </section>
  );
}
