"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Phase = "typing" | "pausing" | "deleting";

export function AboutTypewriter({
  words,
  className = "info-page__typewriter hero__statement-name",
  cursorClassName = "info-page__cursor",
}: {
  words: readonly string[];
  className?: string;
  cursorClassName?: string;
}) {
  const reduceMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");

  useEffect(() => {
    if (reduceMotion || words.length === 0) return;

    const word = words[wordIndex];
    const delay = phase === "pausing" ? 1400 : phase === "deleting" ? 45 : 85;

    const id = window.setTimeout(() => {
      if (phase === "typing") {
        if (text.length < word.length) {
          setText(word.slice(0, text.length + 1));
        } else {
          setPhase("pausing");
        }
      } else if (phase === "pausing") {
        setPhase("deleting");
      } else if (text.length > 0) {
        setText(text.slice(0, -1));
      } else {
        const next = (wordIndex + 1) % words.length;
        setWordIndex(next);
        setPhase("typing");
      }
    }, delay);

    return () => window.clearTimeout(id);
  }, [phase, text, wordIndex, words, reduceMotion]);

  useEffect(() => {
    if (!reduceMotion) return;
    setText(words[wordIndex] ?? "");
  }, [reduceMotion, wordIndex, words]);

  return (
    <span className={className} aria-live="polite">
      {text}
      {!reduceMotion ? (
        <span className={cursorClassName} aria-hidden>
          |
        </span>
      ) : null}
    </span>
  );
}
