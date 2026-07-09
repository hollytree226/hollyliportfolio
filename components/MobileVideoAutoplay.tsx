"use client";

import { useEffect } from "react";
import { useIsMobile } from "@/lib/useIsMobile";

/** On mobile, ensure every video autoplays when it enters the viewport. */
export function MobileVideoAutoplay() {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) return;

    const playVisibleVideos = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const video = entry.target as HTMLVideoElement;
        video.muted = true;
        video.playsInline = true;
        void video.play().catch(() => {});
      });
    };

    const observer = new IntersectionObserver(playVisibleVideos, {
      threshold: 0.2,
    });

    const observeVideos = () => {
      document.querySelectorAll("video").forEach((video) => {
        video.muted = true;
        video.playsInline = true;
        observer.observe(video);
        if (video.autoplay) {
          void video.play().catch(() => {});
        }
      });
    };

    observeVideos();

    return () => {
      observer.disconnect();
    };
  }, [isMobile]);

  return null;
}
