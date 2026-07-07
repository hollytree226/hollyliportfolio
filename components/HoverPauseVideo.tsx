"use client";

import { useRef } from "react";
import type { DetailBlock } from "@/data/types";

type VideoBlock = Extract<DetailBlock, { type: "video" }>;

export function HoverPauseVideo({
  block,
  className,
}: {
  block: VideoBlock;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  const play = () => {
    const video = ref.current;
    if (!video) return;
    void video.play().catch(() => {});
  };

  const pause = () => {
    ref.current?.pause();
  };

  return (
    <video
      ref={ref}
      className={className}
      src={block.src}
      poster={block.poster}
      width={block.width}
      height={block.height}
      muted
      playsInline
      autoPlay
      loop
      preload="auto"
      onMouseEnter={pause}
      onMouseLeave={play}
    />
  );
}
