import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { GalleryColorBlock } from "@/components/GalleryColorBlock";
import { HoverPauseVideo } from "@/components/HoverPauseVideo";
import type { DetailBlock, MediaLayout } from "@/data/types";

function layoutClass(
  layout: MediaLayout,
  variant: "default" | "intrinsic" | "gallery",
): string {
  if (variant === "gallery") return "media media--gallery";
  if (variant === "intrinsic") return "media media--intrinsic";
  return `media media--${layout}`;
}

function frameStyle(block: DetailBlock): CSSProperties | undefined {
  return block.frameBackground
    ? { background: block.frameBackground }
    : undefined;
}

function frameClass(
  variant: "default" | "intrinsic" | "gallery",
  galleryRowType?: "pair" | "single",
): string {
  if (variant === "gallery") {
    return `media__frame media__frame--gallery${
      galleryRowType === "pair" ? " media__frame--gallery-pair" : ""
    }`;
  }
  if (variant === "intrinsic") return "media__frame media__frame--intrinsic";
  return "media__frame";
}

export function ProjectMedia({
  block,
  priority,
  variant = "default",
  galleryRowType,
  galleryFit = "cover",
}: {
  block: DetailBlock;
  priority?: boolean;
  variant?: "default" | "intrinsic" | "gallery";
  galleryRowType?: "pair" | "single";
  galleryFit?: "cover" | "contain";
}) {
  const isGallery = variant === "gallery";
  const isGalleryPair = isGallery && galleryRowType === "pair";
  const pairContain = isGalleryPair && galleryFit === "contain";
  const intrinsic = variant === "intrinsic";
  const layout = block.layout ?? "full";
  const cls = layoutClass(layout, variant);
  const imgWidth = block.width ?? 1600;
  const imgHeight = block.height ?? 1000;
  const figureCls = `${cls}${pairContain ? " media--gallery-pair-intrinsic" : ""}`;
  const useColorBlock = isGallery && block.colorBlock !== false;

  const wrapGallery = (media: ReactNode) => (
    <GalleryColorBlock
      src={block.src}
      poster={block.type === "video" ? block.poster : undefined}
      background={block.frameBackground}
      className={frameClass(variant, galleryRowType)}
    >
      {media}
    </GalleryColorBlock>
  );

  const wrapFrame = (media: ReactNode) =>
    useColorBlock ? (
      wrapGallery(media)
    ) : (
      <div
        className={frameClass(variant, galleryRowType)}
        style={frameStyle(block)}
      >
        {media}
      </div>
    );

  if (block.type === "image") {
    const imageEl =
      isGallery || pairContain ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={block.src}
          alt={block.alt}
          className="media__img"
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
        />
      ) : isGalleryPair ? (
        <Image
          src={block.src}
          alt={block.alt}
          fill
          sizes="calc((75vw - 5rem) * 0.5)"
          className="media__img"
          priority={priority}
        />
      ) : (
        <Image
          src={block.src}
          alt={block.alt}
          width={imgWidth}
          height={imgHeight}
          sizes={
            isGallery
              ? "calc(75vw - 5rem)"
              : intrinsic
                ? "(min-width: 1100px) 45vw, 100vw"
                : "(min-width: 1100px) 90vw, 100vw"
          }
          className="media__img"
          priority={priority}
        />
      );

    return (
      <figure className={figureCls}>
        {isGallery ? wrapFrame(imageEl) : (
          <div
            className={frameClass(variant, galleryRowType)}
            style={frameStyle(block)}
          >
            {imageEl}
          </div>
        )}
        {!intrinsic && !isGallery && block.caption ? (
          <figcaption className="media__caption">{block.caption}</figcaption>
        ) : null}
      </figure>
    );
  }

  const videoEl = block.pauseOnHover ? (
    <HoverPauseVideo block={block} className="media__video" />
  ) : (
    <video
      className="media__video"
      src={block.src}
      poster={block.poster}
      muted
      playsInline
      autoPlay
      loop
      preload="auto"
    />
  );

  return (
    <figure
      className={`${figureCls}${block.pauseOnHover ? " media--hover-pause" : ""}`}
      style={
        intrinsic && block.width && block.height
          ? { aspectRatio: `${block.width} / ${block.height}` }
          : undefined
      }
    >
      {isGallery ? wrapFrame(videoEl) : (
        <div
          className={frameClass(variant, galleryRowType)}
          style={frameStyle(block)}
        >
          {videoEl}
        </div>
      )}
      {!intrinsic && !isGallery && block.caption ? (
        <figcaption className="media__caption">{block.caption}</figcaption>
      ) : null}
    </figure>
  );
}
