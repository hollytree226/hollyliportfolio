"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import type { MosaicTile } from "@/data/types";

function OthersGalleryMedia({ item }: { item: MosaicTile }) {
  const height = Math.round(item.width * 1.28);

  if (/\.(webm|mp4)$/i.test(item.thumbnail)) {
    return (
      <video
        src={item.thumbnail}
        width={item.width}
        height={height}
        className="others-gallery__media img-rounded"
        autoPlay
        muted
        loop
        playsInline
      />
    );
  }

  return (
    <Image
      src={item.thumbnail}
      alt={item.thumbnailAlt}
      width={item.width}
      height={height}
      sizes="(min-width: 900px) 80vw, 92vw"
      className="others-gallery__media img-rounded"
      priority
    />
  );
}

export function OthersGalleryModal({
  items,
  index,
  onClose,
  onChangeIndex,
}: {
  items: MosaicTile[];
  index: number;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}) {
  const swipeStartX = useRef<number | null>(null);
  const last = items.length - 1;

  const goPrev = useCallback(() => {
    onChangeIndex(index === 0 ? last : index - 1);
  }, [index, last, onChangeIndex]);

  const goNext = useCallback(() => {
    onChangeIndex(index === last ? 0 : index + 1);
  }, [index, last, onChangeIndex]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [goNext, goPrev, onClose]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    swipeStartX.current = event.clientX;
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (swipeStartX.current === null) return;
    const delta = event.clientX - swipeStartX.current;
    swipeStartX.current = null;

    if (Math.abs(delta) < 40) return;
    if (delta > 0) goPrev();
    else goNext();
  };

  const item = items[index];
  if (!item) return null;

  return (
    <div
      className="others-gallery"
      role="dialog"
      aria-modal="true"
      aria-label="Others gallery"
      onClick={onClose}
    >
      <button
        type="button"
        className="others-gallery__close"
        onClick={onClose}
        aria-label="Close gallery"
      >
        ×
      </button>

      <button
        type="button"
        className="others-gallery__nav others-gallery__nav--prev"
        onClick={(event) => {
          event.stopPropagation();
          goPrev();
        }}
        aria-label="Previous image"
      >
        ←
      </button>

      <div
        className="others-gallery__stage"
        onClick={(event) => event.stopPropagation()}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          swipeStartX.current = null;
        }}
      >
        <OthersGalleryMedia key={item.slug} item={item} />
        <p className="others-gallery__caption">{item.thumbnailAlt}</p>
        <p className="others-gallery__count" aria-live="polite">
          {index + 1} / {items.length}
        </p>
      </div>

      <button
        type="button"
        className="others-gallery__nav others-gallery__nav--next"
        onClick={(event) => {
          event.stopPropagation();
          goNext();
        }}
        aria-label="Next image"
      >
        →
      </button>
    </div>
  );
}
