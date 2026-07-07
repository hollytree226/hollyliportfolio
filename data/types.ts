/** Portfolio types — content lives in data/projects.ts & data/site.ts */

export type MediaLayout = "full" | "inset" | "stagger-left" | "stagger-right";

export type ProjectPageLayout = "default" | "intro-gallery";

export type DetailBlock =
  | {
      type: "image";
      src: string;
      alt: string;
      layout?: MediaLayout;
      caption?: string;
      /** Native pixel width — used by intro-gallery layout. */
      width?: number;
      /** Native pixel height — used by intro-gallery layout. */
      height?: number;
      /** Override frame background (e.g. "transparent" for alpha webp). */
      frameBackground?: string;
      /** intro-gallery pair row: contain = no crop, proportional height. */
      galleryFit?: "cover" | "contain";
      /** intro-gallery tinted background box (default true). */
      colorBlock?: boolean;
    }
  | {
      type: "video";
      src: string;
      poster?: string;
      layout?: MediaLayout;
      caption?: string;
      width?: number;
      height?: number;
      /** Override frame background (e.g. "transparent" for alpha webp). */
      frameBackground?: string;
      /** intro-gallery pair row: contain = no crop, proportional height. */
      galleryFit?: "cover" | "contain";
      /** intro-gallery tinted background box (default true). */
      colorBlock?: boolean;
      /** Autoplay; pause on hover and resume when pointer leaves. */
      pauseOnHover?: boolean;
    };

export type ProjectDetail = {
  slug: string;
  title: string;
  category: string;
  year: string;
  client?: string;
  location?: string;
  role: string;
  lede: string;
  story: string[];
  hero: DetailBlock;
  blocks: DetailBlock[];
  /** intro-gallery: intro header + row gallery; no story block. */
  pageLayout?: ProjectPageLayout;
  /** Indices into [hero, ...blocks] for each gallery row (max 2 per row). */
  galleryRowIndices?: number[][];
  /**
   * Per-row vertical overlap in px (negative margin-top), parallel to
   * galleryRowIndices. Pulls a row up to overlap the row above it.
   */
  galleryRowOverlap?: number[];
  /**
   * Per-row stacking order, parallel to galleryRowIndices. Higher = on top.
   * Use to keep an overlapping row above its neighbors.
   */
  galleryRowZIndex?: number[];
  /**
   * Per-row layout variant, parallel to galleryRowIndices.
   * "mosaic-2up": 4-item grid — [v1 top-left, v2 top-right, v3 below v1,
   * v4 right column full height]; bottom-right empty.
   */
  galleryRowVariant?: (string | undefined)[];
  /**
   * Sticky image overlay on the gallery pane — pins while scrolling until
   * `stopAtIndex` (index in [hero, ...blocks]) is reached.
   */
  galleryStickyOverlay?: {
    src: string;
    alt: string;
    /** Rendered width at `referenceViewport` (scales with browser). */
    width: number;
    /** Rendered height at `referenceViewport` (scales with browser). */
    height: number;
    /** Fallback viewport-left offset when sidebar cannot be measured. */
    left: number;
    /** Gap from sidebar right edge at `referenceViewport` (scales with browser). */
    offsetFromSidebar?: number;
    /** Viewport width treated as the design maximum for scaling. */
    referenceViewport?: number;
    /** Release this many px before `stopAtIndex` reaches the sticker bottom. */
    releaseLeadPx?: number;
    /** Index in [hero, ...blocks] where the overlay stops sticking. */
    stopAtIndex: number;
  };
};

export type SelectedWorkEntry = {
  slug: string;
  title: string;
};

export type ScatterThumb = {
  id: string;
  src: string;
  alt: string;
  top: string;
  left: string;
  width: number;
  /** Explicit height; defaults to width / 2. Set to match the image aspect to avoid cropping. */
  height?: number;
  /** object-fit for the thumb media. Defaults to "cover". Use "contain" to keep the full image. */
  fit?: "cover" | "contain";
  zIndex?: number;
  linkedSlug?: string;
};

export type MosaicTile = {
  slug: string;
  thumbnail: string;
  thumbnailAlt: string;
  top: string;
  left: string;
  width: number;
  zIndex?: number;
  /** Slight resting tilt in degrees for the "organized chaos" collage look. */
  rotate?: number;
  /** Navigate here on click instead of /projects/{slug}. */
  linkedSlug?: string;
  /** Pixel nudge after percentage placement. */
  offsetTop?: number;
  offsetLeft?: number;
};
