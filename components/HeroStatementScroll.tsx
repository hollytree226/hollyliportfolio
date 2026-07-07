"use client";

import { useEffect } from "react";

const STATEMENT_BODY_ID = "hero-statement-body";

/**
 * Holly Li stays fixed; the rest of the intro fades out.
 */
export function HeroStatementScroll() {
  useEffect(() => {
    const statementBody = document.getElementById(STATEMENT_BODY_ID);
    const target = document.getElementById("selected-work");
    if (!statementBody || !target) return;

    const update = () => {
      const top = target.getBoundingClientRect().top;
      const hide = top <= window.innerHeight * 0.35;
      statementBody.classList.toggle("hero__statement-body--hidden", hide);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return null;
}
