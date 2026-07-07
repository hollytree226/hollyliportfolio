"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { montserrat } from "@/lib/fonts";

const DEFAULT_WORK_LABELS = [
  { text: "工作", script: "cjk" as const },
  { text: "仕事", script: "cjk" as const },
  { text: "travail", script: "latin" as const },
  { text: "work", script: "latin" as const },
];

export const ABOUT_WORK_LABELS = [
  { text: "Bonne", script: "latin" as const },
  { text: "好", script: "cjk" as const },
  { text: "すごい", script: "cjk" as const },
];

export type WorkBlockLabel = {
  text: string;
  script: "cjk" | "latin";
};

const BLOCK_W = 100;
const BLOCK_H = 50;
const BLOCK_LIFETIME_MS = 2000;
const SPAWN_INTERVAL_MS = 90;
const SPAWN_DISTANCE_PX = 28;

type WorkBlock = {
  id: number;
  x: number;
  y: number;
  text: string;
  script: "cjk" | "latin";
};

function pickLabel(labels: readonly WorkBlockLabel[]) {
  return labels[Math.floor(Math.random() * labels.length)]!;
}

type Props = {
  containerRef: React.RefObject<HTMLElement | null>;
  labels?: readonly WorkBlockLabel[];
};

export function HeroWorkBlocks({
  containerRef,
  labels = DEFAULT_WORK_LABELS,
}: Props) {
  const reduceMotion = useReducedMotion();
  const [blocks, setBlocks] = useState<WorkBlock[]>([]);
  const idRef = useRef(0);
  const lastSpawnRef = useRef({ x: 0, y: 0, t: 0 });
  const timersRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  const removeBlock = useCallback((id: number) => {
    setBlocks((prev) => prev.filter((block) => block.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const scheduleRemoval = useCallback(
    (id: number) => {
      const timer = setTimeout(() => {
        removeBlock(id);
      }, BLOCK_LIFETIME_MS + 350);

      timersRef.current.set(id, timer);
    },
    [removeBlock],
  );

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current.clear();
    };
  }, []);

  const spawnAt = useCallback(
    (clientX: number, clientY: number) => {
      if (reduceMotion) return;

      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const now = performance.now();
      const localX = clientX - rect.left;
      const localY = clientY - rect.top;

      if (
        now - lastSpawnRef.current.t < SPAWN_INTERVAL_MS &&
        Math.hypot(
          localX - lastSpawnRef.current.x,
          localY - lastSpawnRef.current.y,
        ) < SPAWN_DISTANCE_PX
      ) {
        return;
      }

      lastSpawnRef.current = { x: localX, y: localY, t: now };

      const label = pickLabel(labels);
      const id = ++idRef.current;

      setBlocks((prev) => [
        ...prev,
        {
          id,
          x: localX - BLOCK_W / 2,
          y: localY - BLOCK_H / 2,
          text: label.text,
          script: label.script,
        },
      ]);

      scheduleRemoval(id);
    },
    [containerRef, labels, reduceMotion, scheduleRemoval],
  );

  useEffect(() => {
    if (reduceMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const onMove = (event: MouseEvent) => spawnAt(event.clientX, event.clientY);
    const onTouch = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      spawnAt(touch.clientX, touch.clientY);
    };

    container.addEventListener("mousemove", onMove);
    container.addEventListener("touchmove", onTouch, { passive: true });

    return () => {
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("touchmove", onTouch);
    };
  }, [containerRef, reduceMotion, spawnAt]);

  if (reduceMotion) return null;

  return (
    <div className="hero__work-blocks" aria-hidden>
      {blocks.map((block) => (
        <div
          key={block.id}
          className="hero__work-block"
          style={{
            left: block.x,
            top: block.y,
            width: BLOCK_W,
            height: BLOCK_H,
          }}
        >
          <span
            className={`hero__work-block-label${
              block.script === "cjk"
                ? " hero__work-block-label--cjk"
                : ` hero__work-block-label--latin ${montserrat.className}`
            }`}
          >
            {block.text}
          </span>
        </div>
      ))}
    </div>
  );
}
