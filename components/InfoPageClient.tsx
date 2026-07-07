"use client";

import { useRef } from "react";
import { AboutTypewriter } from "@/components/AboutTypewriter";
import { ABOUT_WORK_LABELS, HeroWorkBlocks } from "@/components/HeroWorkBlocks";
import { InfoPageBody } from "@/components/InfoPageBody";
import { site } from "@/data/site";

export function InfoPageClient() {
  const pageRef = useRef<HTMLElement | null>(null);

  return (
    <main className="info-page" ref={pageRef}>
      <HeroWorkBlocks containerRef={pageRef} labels={ABOUT_WORK_LABELS} />

      <div className="hero__intro hero__intro--fixed info-page__intro">
        <span className="hero__statement-name">{site.name}</span>
        <AboutTypewriter words={site.info.typewriterWords} />
      </div>

      <div className="info-page__content">
        <InfoPageBody
          experienceTitle={site.info.experienceTitle}
          experience={site.info.experience}
          educationTitle={site.info.educationTitle}
          education={site.info.education}
          languageTitle={site.info.languageTitle}
          languages={site.info.languages}
          hobbiesTitle={site.info.hobbiesTitle}
          hobbies={site.info.hobbies}
          locationLine={site.info.locationLine}
          photo={site.info.photo}
        />
      </div>
    </main>
  );
}
