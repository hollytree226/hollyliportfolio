"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ProjectGallery } from "@/components/ProjectGallery";
import { GalleryStickyOverlay } from "@/components/GalleryStickyOverlay";
import type { DetailBlock, ProjectDetail } from "@/data/types";
import { getBlockCaption } from "@/lib/gallery";
import { montserrat } from "@/lib/fonts";

type Props = {
  project: ProjectDetail;
  rows: DetailBlock[][];
};

export function IntroGalleryLayout({ project, rows }: Props) {
  const [activeCaption, setActiveCaption] = useState(() =>
    rows[0]?.[0] ? getBlockCaption(rows[0][0]) : "",
  );
  const [progress, setProgress] = useState(0);
  const galleryPaneRef = useRef<HTMLDivElement>(null);
  const columnRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const registerCell = useCallback(
    (index: number, element: HTMLDivElement | null) => {
      if (element) {
        cellRefs.current.set(index, element);
      } else {
        cellRefs.current.delete(index);
      }
    },
    [],
  );

  const getStopCell = useCallback(() => {
    const stopAt = project.galleryStickyOverlay?.stopAtIndex;
    if (stopAt === undefined) return null;
    return cellRefs.current.get(stopAt) ?? null;
  }, [project.galleryStickyOverlay?.stopAtIndex]);

  useEffect(() => {
    const meta = metaRef.current;
    const column = columnRef.current;
    if (!meta || !column) return;

    const syncMetaHeight = () => {
      column.style.setProperty("--sidebar-meta-h", `${meta.offsetHeight}px`);
    };

    syncMetaHeight();
    const observer = new ResizeObserver(syncMetaHeight);
    observer.observe(meta);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => {
      const pane = galleryPaneRef.current;
      if (!pane) return;

      const paneTop = pane.offsetTop;
      const paneHeight = pane.offsetHeight;
      const viewport = window.innerHeight;
      const scrollRange = Math.max(paneHeight - viewport, 1);
      const scrolled = window.scrollY - paneTop;
      const nextProgress = Math.min(
        100,
        Math.max(0, (scrolled / scrollRange) * 100),
      );
      setProgress(nextProgress);

      const center = viewport * 0.5;
      let bestDistance = Number.POSITIVE_INFINITY;
      let bestCaption = rows[0]?.[0] ? getBlockCaption(rows[0][0]) : "";

      cellRefs.current.forEach((cell) => {
        const rect = cell.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > viewport) return;

        const cellCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cellCenter - center);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestCaption = cell.dataset.caption ?? "";
        }
      });

      setActiveCaption(bestCaption);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [rows]);

  return (
    <div className="project__split">
      <div className="project__sidebar-column" ref={columnRef}>
        <h1 className="project__title project__sidebar-title">
          {project.title}
        </h1>

        <div className="project__sidebar-body" aria-label="Project information">
          <div
            className={`project__meta project__sidebar-meta ${montserrat.className}`}
            ref={metaRef}
          >
            <span>{project.category}</span>
            <span>{project.year}</span>
            <span>{project.role}</span>
            {project.client ? <span>{project.client}</span> : null}
            {project.location ? <span>{project.location}</span> : null}
          </div>
          <p className={`project__lede project__sidebar-lede ${montserrat.className}`}>
            {project.lede}
          </p>
        </div>

        <div className="project__sidebar-bottom">
          <p
            className={`project__sidebar-caption ${montserrat.className}`}
            aria-live="polite"
          >
            {activeCaption}
          </p>
          <div
            className="project__sidebar-progress"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Gallery scroll progress"
          >
            <div
              className="project__sidebar-progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="project__gallery-pane" ref={galleryPaneRef}>
        {project.galleryStickyOverlay ? (
          <GalleryStickyOverlay
            overlay={project.galleryStickyOverlay}
            paneRef={galleryPaneRef}
            sidebarRef={columnRef}
            getStopCell={getStopCell}
          />
        ) : null}
        <ProjectGallery
          rows={rows}
          rowOverlap={project.galleryRowOverlap}
          rowZIndex={project.galleryRowZIndex}
          rowVariant={project.galleryRowVariant}
          registerCell={registerCell}
        />
      </div>
    </div>
  );
}
