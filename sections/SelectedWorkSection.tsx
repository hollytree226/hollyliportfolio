"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { selectedScatter, selectedWork } from "@/data/projects";
import { site } from "@/data/site";
import { montserrat } from "@/lib/fonts";
import { useSectionScrollGreen } from "@/lib/useSectionScrollGreen";

export function SelectedWorkSection() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const sectionRef = useSectionScrollGreen<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="selected-centered section-scroll-green"
      id="selected-work"
      aria-labelledby="selected-heading"
    >
      <div className="section-scroll-bg" aria-hidden />
      <h2
        id="selected-heading"
        className={`selected-centered__title ${montserrat.className}`}
      >
        {site.selected.title}
      </h2>

      <div className="selected-centered__field">
        <ul className="selected-centered__list">
          {selectedWork.map((item) => (
            <li key={item.slug} className="selected-centered__row">
              <Link
                href={`/projects/${item.slug}`}
                className="selected-centered__link"
                onMouseEnter={() => setActiveSlug(item.slug)}
                onMouseLeave={() => setActiveSlug(null)}
                onFocus={() => setActiveSlug(item.slug)}
                onBlur={() => setActiveSlug(null)}
              >
                {item.title
                  .split(/(\{[^}]*\})/)
                  .filter(Boolean)
                  .map((part, i) =>
                    /^\{[^}]*\}$/.test(part) ? (
                      <span key={i} className="selected-centered__tag">
                        {part}
                      </span>
                    ) : (
                      <span key={i}>{part}</span>
                    ),
                  )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="selected-centered__thumbs" aria-hidden={false}>
          {selectedScatter.map((thumb) => {
            const isRelated =
              activeSlug !== null && thumb.linkedSlug === activeSlug;
            const thumbHeight = thumb.height ?? Math.round(thumb.width / 2);
            const objectFit = thumb.fit ?? "cover";

            return (
              <motion.div
                key={thumb.id}
                className="selected-centered__thumb img-rounded"
                style={{
                  top: thumb.top,
                  left: thumb.left,
                  width: thumb.width,
                  height: thumbHeight,
                  zIndex: thumb.zIndex ?? 2,
                }}
                animate={{
                  scale: isRelated ? 1.06 : 1,
                  opacity: 1,
                }}
                transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
              >
                {/\.(webm|mp4)$/i.test(thumb.src) ? (
                  <video
                    src={thumb.src}
                    className="img-rounded"
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{ width: "100%", height: "100%", objectFit }}
                  />
                ) : (
                  <Image
                    src={thumb.src}
                    alt={thumb.alt}
                    width={thumb.width}
                    height={thumbHeight}
                    sizes={`${thumb.width}px`}
                    className="img-rounded"
                    style={{ width: "100%", height: "100%", objectFit }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
