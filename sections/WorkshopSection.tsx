"use client";

import Image from "next/image";
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { othersMosaic } from "@/data/projects";
import { site } from "@/data/site";
import { montserrat } from "@/lib/fonts";
import { useSectionScrollGreen } from "@/lib/useSectionScrollGreen";

type TilePosition = { top: number; left: number };

function percentToPx(value: string, size: number) {
  return (parseFloat(value) / 100) * size;
}

function buildInitialPositions(stage: HTMLElement) {
  const { width, height } = stage.getBoundingClientRect();
  if (width === 0 || height === 0) return null;

  const next: Record<string, TilePosition> = {};
  othersMosaic.forEach((item) => {
    next[item.slug] = {
      left: percentToPx(item.left, width) + (item.offsetLeft ?? 0),
      top: percentToPx(item.top, height) + (item.offsetTop ?? 0),
    };
  });

  return next;
}

function tileCssPosition(
  item: (typeof othersMosaic)[number],
  position?: TilePosition,
): string {
  if (position) {
    return `${position.top}px`;
  }
  if (item.offsetTop) {
    return `calc(${item.top} + ${item.offsetTop}px)`;
  }
  return item.top;
}

function tileCssLeft(
  item: (typeof othersMosaic)[number],
  position?: TilePosition,
): string {
  if (position) {
    return `${position.left}px`;
  }
  if (item.offsetLeft) {
    return `calc(${item.left} + ${item.offsetLeft}px)`;
  }
  return item.left;
}

export function WorkshopSection() {
  const sectionRef = useSectionScrollGreen<HTMLElement>();
  const stageRef = useRef<HTMLDivElement>(null);
  const dragSurfaceRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<Record<string, TilePosition>>({});
  const [zOverrides, setZOverrides] = useState<Record<string, number>>({});
  const zCounterRef = useRef(10);
  const dragRef = useRef<{
    slug: string;
    pointerId: number;
    offsetX: number;
    offsetY: number;
    startX: number;
    startY: number;
    moved: boolean;
  } | null>(null);
  const initializedRef = useRef(false);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage || initializedRef.current) return;

    const applyPositions = () => {
      const next = buildInitialPositions(stage);
      if (!next) return false;
      setPositions(next);
      initializedRef.current = true;
      return true;
    };

    if (applyPositions()) return;

    const observer = new ResizeObserver(() => {
      if (!initializedRef.current && applyPositions()) {
        observer.disconnect();
      }
    });

    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  const onPointerDown = useCallback(
    (slug: string, event: React.PointerEvent<HTMLDivElement>) => {
      const dragSurface = dragSurfaceRef.current;
      if (!dragSurface) return;

      event.preventDefault();

      const surfaceRect = dragSurface.getBoundingClientRect();
      const tileRect = event.currentTarget.getBoundingClientRect();

      dragRef.current = {
        slug,
        pointerId: event.pointerId,
        offsetX: event.clientX - tileRect.left,
        offsetY: event.clientY - tileRect.top,
        startX: event.clientX,
        startY: event.clientY,
        moved: false,
      };

      zCounterRef.current += 1;
      setZOverrides((prev) => ({
        ...prev,
        [slug]: zCounterRef.current,
      }));

      event.currentTarget.setPointerCapture(event.pointerId);

      setPositions((prev) => ({
        ...prev,
        [slug]: {
          left: tileRect.left - surfaceRect.left,
          top: tileRect.top - surfaceRect.top,
        },
      }));
    },
    [],
  );

  const onPointerMove = useCallback(
    (slug: string, event: React.PointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      const dragSurface = dragSurfaceRef.current;
      if (!drag || drag.slug !== slug || !dragSurface) return;

      if (
        !drag.moved &&
        Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) > 4
      ) {
        drag.moved = true;
      }

      if (!drag.moved) return;

      const surfaceRect = dragSurface.getBoundingClientRect();

      setPositions((prev) => ({
        ...prev,
        [slug]: {
          left: event.clientX - surfaceRect.left - drag.offsetX,
          top: event.clientY - surfaceRect.top - drag.offsetY,
        },
      }));
    },
    [],
  );

  const onPointerUp = useCallback(
    (slug: string, event: React.PointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      if (!drag || drag.slug !== slug) return;
      dragRef.current = null;

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    },
    [],
  );

  return (
    <section
      ref={sectionRef}
      className="others-mosaic section-scroll-green"
      id="others"
      aria-labelledby="others-heading"
    >
      <div className="section-scroll-bg" aria-hidden />
      <header className="others-mosaic__head">
        {site.workshop.label ? (
          <p
            className={`selected-centered__title ${montserrat.className}`}
            style={{ marginTop: "-80px" }}
          >
            {site.workshop.label}
          </p>
        ) : null}
        <h2 id="others-heading" className="others-mosaic__title">
          {site.workshop.title}
        </h2>
        {site.workshop.subtitle ? (
          <p className="others-mosaic__subtitle">{site.workshop.subtitle}</p>
        ) : null}
      </header>

      <div className="others-mosaic__stage" ref={stageRef}>
        <div className="others-mosaic__drag-surface" ref={dragSurfaceRef} role="list">
          {othersMosaic.map((item) => {
            const position = positions[item.slug];
            const baseZ = item.zIndex ?? 2;

            return (
              <div
                key={item.slug}
                role="listitem"
                className="others-mosaic__tile"
                style={
                  {
                    top: tileCssPosition(item, position),
                    left: tileCssLeft(item, position),
                    width: item.width,
                    zIndex: zOverrides[item.slug] ?? baseZ,
                    transform: item.rotate ? `rotate(${item.rotate}deg)` : undefined,
                  } as CSSProperties
                }
                onPointerDown={(event) => onPointerDown(item.slug, event)}
                onPointerMove={(event) => onPointerMove(item.slug, event)}
                onPointerUp={(event) => onPointerUp(item.slug, event)}
                onPointerCancel={(event) => onPointerUp(item.slug, event)}
              >
                <div className="others-mosaic__tile-inner">
                  {/\.(webm|mp4)$/i.test(item.thumbnail) ? (
                    <video
                      src={item.thumbnail}
                      width={item.width}
                      height={Math.round(item.width * 1.28)}
                      className="img-rounded"
                      autoPlay
                      muted
                      loop
                      playsInline
                      draggable={false}
                      style={{ width: item.width, height: "auto" }}
                    />
                  ) : (
                    <Image
                      src={item.thumbnail}
                      alt={item.thumbnailAlt}
                      width={item.width}
                      height={Math.round(item.width * 1.28)}
                      sizes={`${item.width}px`}
                      className="img-rounded"
                      draggable={false}
                      style={{ width: item.width, height: "auto" }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
