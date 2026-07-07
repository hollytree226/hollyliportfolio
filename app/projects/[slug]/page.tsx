import { getAllProjectSlugs, getProjectBySlug } from "@/data/projects";
import { IntroGalleryLayout } from "@/components/IntroGalleryLayout";
import { ProjectMedia } from "@/components/ProjectMedia";
import { getGalleryRows } from "@/lib/gallery";
import { notFound } from "next/navigation";
import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const isIntroGallery = project.pageLayout === "intro-gallery";
  const galleryRows = isIntroGallery ? getGalleryRows(project) : [];

  return (
    <article
      className={`project page${isIntroGallery ? " project--intro-gallery" : ""}`}
    >
      {isIntroGallery ? (
        <IntroGalleryLayout project={project} rows={galleryRows} />
      ) : (
        <>
          <header className="project__hero">
            <Link href="/" className="project__back">
              ← Index
            </Link>
            <h1 className="project__title">{project.title}</h1>
            <p className="project__lede">{project.lede}</p>
            <div className="project__meta">
              <span>{project.category}</span>
              <span>{project.year}</span>
              <span>{project.role}</span>
              {project.client ? <span>{project.client}</span> : null}
              {project.location ? <span>{project.location}</span> : null}
            </div>
          </header>
          <div className="project__visual">
            <ProjectMedia block={project.hero} priority />
          </div>

          <div id="story" className="project__story" tabIndex={-1}>
            {project.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {project.blocks.map((block, index) => (
            <ProjectMedia key={`${block.type}-${index}`} block={block} />
          ))}
        </>
      )}
    </article>
  );
}
