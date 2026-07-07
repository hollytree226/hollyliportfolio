import type { DetailBlock, ProjectDetail } from "@/data/types";

export function getBlockCaption(block: DetailBlock): string {
  if (block.caption) return block.caption;
  return block.type === "image" ? block.alt : "";
}

export function getGalleryRows(project: ProjectDetail): DetailBlock[][] {
  const all = [project.hero, ...project.blocks];

  if (project.galleryRowIndices?.length) {
    return project.galleryRowIndices.map((indices) =>
      indices.map((index) => all[index]),
    );
  }

  return all.map((block) => [block]);
}
