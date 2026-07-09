import { useEffect, useRef } from "react";

const GREEN_OPACITY_VAR = "--section-green-opacity";

function sectionGreenOpacity(rect: DOMRect, viewportHeight: number) {
  const { top, bottom } = rect;
  const arrived = viewportHeight * 0.3;
  const approachStart = viewportHeight * 0.72;

  if (top > approachStart || top <= arrived) return 0;
  // Section end reached — fully transparent at the bottom of the section / page.
  if (bottom <= viewportHeight + 1) return 0;

  const t = (top - arrived) / (approachStart - arrived);
  return Math.pow(t, 0.75);
}

/** Scroll-driven green reveal: full green while approaching, transparent when arrived. */
export function useSectionScrollGreen<T extends HTMLElement>() {
  const sectionRef = useRef<T>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      section.style.setProperty(GREEN_OPACITY_VAR, "0");
      return;
    }

    const update = () => {
      const rect = section.getBoundingClientRect();
      const opacity = sectionGreenOpacity(rect, window.innerHeight);
      section.style.setProperty(GREEN_OPACITY_VAR, opacity.toFixed(3));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return sectionRef;
}
