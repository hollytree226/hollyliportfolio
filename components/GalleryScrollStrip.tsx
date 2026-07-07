"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import type { DetailBlock } from "@/data/types";

/**
 * Aspect of the item box. Rotated −90° → original height / width; flat
 * (no rotation) → original width / height.
 */
function itemAspect(block: DetailBlock, rotate: boolean): number {
  if (block.width && block.height) {
    return rotate ? block.height / block.width : block.width / block.height;
  }
  return rotate ? 1 : 1.7778;
}

/** Update an item's aspect from the true intrinsic media size. */
function applyItemAspect(
  el: HTMLElement | null,
  w: number,
  h: number,
  rotate: boolean,
) {
  if (el && w && h) {
    el.style.setProperty("--rot-ar", String(rotate ? h / w : w / h));
  }
}

/**
 * Pinned horizontal strip: a tall wrapper holds a sticky, gapless row of
 * media. Vertical scrolling through the wrapper drives the row leftward so
 * every item (001 → 011) passes through in sequence, smoothed with a rAF
 * lerp for an eased ("缓动") feel.
 */
export function GalleryScrollStrip({
  blocks,
  rotate = true,
}: {
  blocks: DetailBlock[];
  rotate?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    if (!wrap || !sticky || !track) return;

    let maxShift = 0;
    let currentX = 0;
    let targetX = 0;
    let raf = 0;
    let running = false;

    const measure = () => {
      maxShift = Math.max(track.scrollWidth - sticky.clientWidth, 0);
      // Reserve vertical scroll distance equal to the horizontal travel.
      wrap.style.height = `${sticky.clientHeight + maxShift}px`;
    };

    const computeTarget = () => {
      const scrolled = Math.min(
        Math.max(-wrap.getBoundingClientRect().top, 0),
        maxShift,
      );
      targetX = -scrolled;
    };

    const tick = () => {
      // Lower factor → the track trails the scroll and eases in with a small
      // delayed "暂缓" feel (cf. yunxiye.com/tnls).
      currentX += (targetX - currentX) * 0.075;
      if (Math.abs(targetX - currentX) < 0.4) currentX = targetX;
      track.style.transform = `translate3d(${currentX}px, 0, 0)`;
      if (currentX !== targetX) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const onScroll = () => {
      computeTarget();
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    computeTarget();
    currentX = targetX;
    track.style.transform = `translate3d(${currentX}px, 0, 0)`;

    // Track width grows as videos/images load their intrinsic size.
    const observer = new ResizeObserver(onResize);
    observer.observe(track);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, [blocks]);

  // Entrance: each item starts nudged 10px the reverse way + transparent, then
  // eases into place as it scrolls into view.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const items = Array.from(
      track.querySelectorAll<HTMLElement>(".woods-strip__item"),
    );
    if (typeof IntersectionObserver === "undefined") {
      items.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Toggle (don't unobserve) so the eased entrance replays every time
          // an item scrolls back into view, not just on the first pass.
          entry.target.classList.toggle("is-in", entry.isIntersecting);
        });
      },
      { threshold: 0.12 },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [blocks]);

  return (
    <div
      className={`woods-strip-wrap${rotate ? "" : " woods-strip--flat"}`}
      ref={wrapRef}
    >
      <div className="woods-strip-sticky" ref={stickyRef}>
        <div className="woods-strip__track" ref={trackRef}>
          {blocks.map((block, index) => (
            <div
              className="woods-strip__item"
              key={`${block.src}-${index}`}
              style={{ "--rot-ar": itemAspect(block, rotate) } as CSSProperties}
            >
              {block.type === "video" ? (
                <video
                  className="woods-strip__media"
                  src={block.src}
                  poster={block.poster}
                  muted
                  playsInline
                  autoPlay
                  loop
                  preload="auto"
                  onLoadedMetadata={(event) =>
                    applyItemAspect(
                      event.currentTarget.closest(".woods-strip__item"),
                      event.currentTarget.videoWidth,
                      event.currentTarget.videoHeight,
                      rotate,
                    )
                  }
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className="woods-strip__media"
                  src={block.src}
                  alt={block.alt}
                  decoding="async"
                  onLoad={(event) =>
                    applyItemAspect(
                      event.currentTarget.closest(".woods-strip__item"),
                      event.currentTarget.naturalWidth,
                      event.currentTarget.naturalHeight,
                      rotate,
                    )
                  }
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
