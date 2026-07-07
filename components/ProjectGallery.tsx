import type { CSSProperties } from "react";
import type { DetailBlock } from "@/data/types";
import { ProjectMedia } from "@/components/ProjectMedia";
import { GalleryScrollStrip } from "@/components/GalleryScrollStrip";
import { getBlockCaption } from "@/lib/gallery";

function blockDimensions(block: DetailBlock): { w: number; h: number } {
  return {
    w: block.width ?? 1600,
    h: block.height ?? 1000,
  };
}

function blockAspect(block: DetailBlock): number {
  const { w, h } = blockDimensions(block);
  return w / h;
}

function pairRatioSum(blocks: DetailBlock[]): number {
  return blocks.reduce((sum, block) => sum + blockAspect(block), 0);
}

export function ProjectGallery({
  rows,
  rowOverlap,
  rowZIndex,
  rowVariant,
  registerCell,
}: {
  rows: DetailBlock[][];
  rowOverlap?: number[];
  rowZIndex?: number[];
  rowVariant?: (string | undefined)[];
  registerCell?: (index: number, element: HTMLDivElement | null) => void;
}) {
  let flatIndex = 0;

  return (
    <div className="project__gallery">
      {rows.map((row, rowIndex) => {
        if (rowVariant?.[rowIndex]?.startsWith("scroll-strip")) {
          // Keep the flat caption index aligned with the blocks in this row.
          row.forEach(() => {
            flatIndex++;
          });
          const rotate = rowVariant[rowIndex] !== "scroll-strip-flat";
          return (
            <div
              key={`row-${rowIndex}`}
              className="project__gallery-row project__gallery-row--strip"
            >
              <GalleryScrollStrip blocks={row} rotate={rotate} />
            </div>
          );
        }

        if (rowVariant?.[rowIndex] === "hero-fill") {
          const block = row[0];
          const cellIndex = flatIndex++;
          return (
            <div
              key={`row-${rowIndex}`}
              className="project__gallery-row project__gallery-row--hero-fill"
            >
              <div
                ref={(element) => registerCell?.(cellIndex, element)}
                className="project__gallery-cell"
                data-gallery-cell
                data-caption={getBlockCaption(block)}
              >
                <ProjectMedia
                  block={block}
                  variant="gallery"
                  galleryRowType="single"
                  priority
                />
              </div>
            </div>
          );
        }

        if (rowVariant?.[rowIndex] === "mosaic-2up") {
          return (
            <div
              key={`row-${rowIndex}`}
              className="project__gallery-row project__gallery-mosaic"
            >
              {row.map((block, blockIndex) => {
                const cellIndex = flatIndex++;
                return (
                  <div
                    key={`${block.type}-${block.src}-${blockIndex}`}
                    ref={(element) => registerCell?.(cellIndex, element)}
                    className={`project__gallery-mosaic-cell project__gallery-mosaic-cell--${blockIndex + 1}`}
                    data-gallery-cell
                    data-caption={getBlockCaption(block)}
                  >
                    <ProjectMedia
                      block={block}
                      variant="gallery"
                      galleryRowType="single"
                    />
                  </div>
                );
              })}
            </div>
          );
        }

        const isPair = row.length > 1;
        const ratioSum = isPair ? pairRatioSum(row) : 0;
        const rowFit =
          isPair && row.some((block) => block.galleryFit === "contain")
            ? "contain"
            : "cover";

        const overlap = rowOverlap?.[rowIndex] ?? 0;
        const zIndex = rowZIndex?.[rowIndex];
        const needsStacking = overlap !== 0 || zIndex !== undefined;
        const rowStyle: CSSProperties = {
          ...(isPair
            ? {
                "--row-ratio-sum": String(ratioSum),
                "--row-gap-count": String(row.length - 1),
              }
            : {}),
          ...(overlap ? { marginTop: `-${overlap}px` } : {}),
          ...(needsStacking
            ? {
                position: "relative",
                zIndex: zIndex ?? rowIndex + 1,
              }
            : {}),
        } as CSSProperties;

        return (
          <div
            key={`row-${rowIndex}`}
            className={`project__gallery-row${
              isPair
                ? " project__gallery-row--pair"
                : " project__gallery-row--single"
            }`}
            data-gallery-fit={isPair ? rowFit : undefined}
            style={
              isPair || needsStacking ? rowStyle : undefined
            }
          >
            {row.map((block, blockIndex) => {
              const { w, h } = blockDimensions(block);
              const cellIndex = flatIndex++;

              return (
              <div
                key={`${block.type}-${block.src}-${blockIndex}`}
                ref={(element) => registerCell?.(cellIndex, element)}
                className="project__gallery-cell"
                data-gallery-cell
                data-caption={getBlockCaption(block)}
                style={
                  {
                    "--media-aspect": `${w} / ${h}`,
                    ...(isPair && rowFit === "cover"
                      ? {
                          "--aspect-share": String(
                            blockAspect(block) / ratioSum,
                          ),
                        }
                      : {}),
                  } as CSSProperties
                }
              >
                <ProjectMedia
                  block={block}
                  variant="gallery"
                  galleryRowType={isPair ? "pair" : "single"}
                  galleryFit={isPair ? rowFit : undefined}
                  priority={rowIndex === 0 && blockIndex === 0}
                />
              </div>
            );
            })}
          </div>
        );
      })}
    </div>
  );
}
