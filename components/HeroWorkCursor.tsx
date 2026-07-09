"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { montserrat } from "@/lib/fonts";
import { useIsMobile } from "@/lib/useIsMobile";

const CURSOR_W = 50;
const CURSOR_H = 25;

export function HeroWorkCursor() {
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (reduceMotion || isMobile) return;

    const onMove = (event: MouseEvent) => {
      setPos({
        x: event.clientX - CURSOR_W / 2,
        y: event.clientY - CURSOR_H / 2,
      });
    };

    document.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
    };
  }, [reduceMotion, isMobile]);

  if (reduceMotion || isMobile || pos === null) return null;

  return (
    <div
      className="hero__work-cursor"
      style={{
        left: pos.x,
        top: pos.y,
        width: CURSOR_W,
        height: CURSOR_H,
      }}
      aria-hidden
    >
      <span className={`hero__work-cursor-label ${montserrat.className}`}>
        WORK
      </span>
    </div>
  );
}
