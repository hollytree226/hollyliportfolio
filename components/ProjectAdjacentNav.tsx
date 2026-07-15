import Link from "next/link";
import type { ProjectDetail } from "@/data/types";

export function ProjectAdjacentNav({
  prev,
  next,
}: {
  prev: ProjectDetail | null;
  next: ProjectDetail | null;
}) {
  if (!prev && !next) return null;

  return (
    <nav className="project-adj" aria-label="Adjacent projects">
      {prev ? (
        <Link
          href={`/projects/${prev.slug}`}
          className="project-adj__link project-adj__link--prev"
          aria-label={`Previous project: ${prev.title}`}
        >
          ←
        </Link>
      ) : (
        <span className="project-adj__spacer" aria-hidden />
      )}
      {next ? (
        <Link
          href={`/projects/${next.slug}`}
          className="project-adj__link project-adj__link--next"
          aria-label={`Next project: ${next.title}`}
        >
          →
        </Link>
      ) : (
        <span className="project-adj__spacer" aria-hidden />
      )}
    </nav>
  );
}
