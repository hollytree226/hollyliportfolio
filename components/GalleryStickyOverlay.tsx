"use client";

import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import type { ProjectDetail } from "@/data/types";

type OverlayConfig = NonNullable<ProjectDetail["galleryStickyOverlay"]>;

function offsetTopWithin(el: HTMLElement, ancestor: HTMLElement): number {
  return el.getBoundingClientRect().top - ancestor.getBoundingClientRect().top;
}

function computeMetrics(
  overlay: OverlayConfig,
  sidebar: HTMLElement | null,
  vw: number,
) {
  const reference = overlay.referenceViewport ?? 1920;
  const scale = vw / reference;
  const aspect = overlay.height / overlay.width;

  const stickerW = overlay.width * scale;
  const stickerH = stickerW * aspect;

  const offsetFromSidebar = (overlay.offsetFromSidebar ?? 350) * scale;
  const sidebarRight = sidebar?.getBoundingClientRect().right ?? 0;
  const left =
    sidebarRight > 0 ? sidebarRight + offsetFromSidebar : overlay.left * scale;

  return { left, stickerW, stickerH };
}

export function GalleryStickyOverlay({
  overlay,
  paneRef,
  sidebarRef,
  getStopCell,
}: {
  overlay: OverlayConfig;
  paneRef: RefObject<HTMLDivElement | null>;
  sidebarRef: RefObject<HTMLDivElement | null>;
  getStopCell: () => HTMLDivElement | null;
}) {
  const stickerRef = useRef<HTMLImageElement>(null);
  const [style, setStyle] = useState<CSSProperties>(() => ({
    position: "absolute",
    top: 0,
    left: overlay.left,
    zIndex: 50,
  }));

  useEffect(() => {
    const update = () => {
      const pane = paneRef.current;
      const stopCell = getStopCell();
      const sticker = stickerRef.current;
      const sidebar = sidebarRef.current;
      if (!pane || !stopCell || !sticker) return;

      const vw = window.innerWidth;
      const { left, stickerW, stickerH } = computeMetrics(overlay, sidebar, vw);

      sticker.style.width = `${stickerW}px`;
      sticker.style.height = `${stickerH}px`;

      const paneRect = pane.getBoundingClientRect();
      const stopRect = stopCell.getBoundingClientRect();
      const stickerHRendered = sticker.offsetHeight || stickerH;
      const leftInPane = left - paneRect.left;
      const releaseLead = overlay.releaseLeadPx ?? 50;

      if (paneRect.top > 0) {
        setStyle({
          position: "absolute",
          top: 0,
          left: leftInPane,
          zIndex: 50,
        });
      } else if (stopRect.top <= stickerHRendered + releaseLead) {
        const stopTop = offsetTopWithin(stopCell, pane);
        setStyle({
          position: "absolute",
          top: Math.max(0, stopTop - stickerHRendered),
          left: leftInPane,
          zIndex: 50,
        });
      } else {
        setStyle({
          position: "fixed",
          top: 0,
          left,
          zIndex: 50,
        });
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [overlay, paneRef, sidebarRef, getStopCell]);

  const initial = computeMetrics(overlay, null, 1920);

  return (
    <div className="gallery-sticky-overlay" style={style} aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={stickerRef}
        src={overlay.src}
        alt={overlay.alt}
        width={overlay.width}
        height={overlay.height}
        className="gallery-sticky-overlay__img"
        style={{ width: initial.stickerW, height: initial.stickerH }}
        decoding="async"
      />
    </div>
  );
}
