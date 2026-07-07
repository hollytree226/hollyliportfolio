"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { sampleColorFromCanvas } from "@/lib/dominant-color";

const FALLBACK = "#f2f2f2";

export function GalleryColorBlock({
  src,
  poster,
  className = "",
  style,
  background,
  children,
}: {
  src: string;
  poster?: string;
  className?: string;
  style?: CSSProperties;
  /** When set, use this fixed background and skip dominant-color sampling. */
  background?: string;
  children: ReactNode;
}) {
  const [sampled, setSampled] = useState(FALLBACK);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (background) return;
    let cancelled = false;

    const apply = (color: string | null) => {
      if (!cancelled && color) setSampled(color);
    };

    const sampleFromImage = (img: HTMLImageElement) => {
      apply(
        sampleColorFromCanvas(img, img.naturalWidth, img.naturalHeight),
      );
    };

    const sampleFromVideo = (video: HTMLVideoElement) => {
      if (video.videoWidth && video.videoHeight) {
        apply(
          sampleColorFromCanvas(video, video.videoWidth, video.videoHeight),
        );
      }
    };

    const probeSrc = poster ?? src;
    const probe = new Image();
    probe.crossOrigin = "anonymous";
    probe.decoding = "async";
    probe.onload = () => sampleFromImage(probe);
    probe.onerror = () => {};
    probe.src = probeSrc;

    const root = contentRef.current;
    const media = root?.querySelector("img, video");
    if (media instanceof HTMLImageElement) {
      if (media.complete) sampleFromImage(media);
      else
        media.addEventListener("load", () => sampleFromImage(media), {
          once: true,
        });
    } else if (media instanceof HTMLVideoElement) {
      if (media.readyState >= 2) sampleFromVideo(media);
      else
        media.addEventListener("loadeddata", () => sampleFromVideo(media), {
          once: true,
        });
    }

    return () => {
      cancelled = true;
    };
  }, [src, poster, background]);

  return (
    <div
      className={`media__color-block ${className}`.trim()}
      style={{ ...style, backgroundColor: background ?? sampled }}
    >
      <div ref={contentRef} className="media__content">
        {children}
      </div>
    </div>
  );
}
