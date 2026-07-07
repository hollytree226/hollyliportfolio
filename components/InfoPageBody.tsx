import Image from "next/image";
import type { CSSProperties } from "react";
import { montserrat } from "@/lib/fonts";

export type InfoCvEntry = {
  dates: string;
  roleLines: readonly string[];
  lines?: readonly string[];
  company?: string;
  tag?: string;
  location?: string;
};

function InfoCvSection({
  title,
  entries,
  headingId,
  className,
}: {
  title: string;
  entries: readonly InfoCvEntry[];
  headingId: string;
  className?: string;
}) {
  return (
    <section
      className={`info-page__section${className ? ` ${className}` : ""}`}
      aria-labelledby={headingId}
    >
      <h2 id={headingId} className="info-page__section-title hero__statement-name">
        {title}
      </h2>
      <ul className={`info-page__entry-list ${montserrat.className}`}>
        {entries.map((entry) => (
          <li key={`${entry.dates}-${entry.roleLines[0]}`} className="info-page__entry">
            <p className="info-page__detail">{entry.dates}</p>
            <div className="info-page__entry-body">
              {entry.roleLines.map((line) => (
                <p key={line} className="info-page__detail info-page__detail--role">
                  {line}
                </p>
              ))}
              {entry.company ? (
                <p className="info-page__detail">{entry.company}</p>
              ) : null}
              {entry.lines?.map((line) => (
                <p key={line} className="info-page__detail">
                  {line}
                </p>
              ))}
              {entry.tag || entry.location ? (
                <p className="info-page__detail">
                  {entry.tag ? `${entry.tag} ` : ""}
                  {entry.location ?? ""}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function InfoPageBody({
  experienceTitle,
  experience,
  educationTitle,
  education,
  languageTitle,
  languages,
  hobbiesTitle,
  hobbies,
  locationLine,
  photo,
}: {
  experienceTitle: string;
  experience: readonly InfoCvEntry[];
  educationTitle: string;
  education: readonly InfoCvEntry[];
  languageTitle: string;
  languages: readonly string[];
  hobbiesTitle: string;
  hobbies: readonly string[];
  locationLine: string;
  photo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}) {
  const pixelW = Math.round(photo.width / 8);
  const pixelH = Math.round(photo.height / 8);

  return (
    <div className="info-page__body">
      <div className="info-page__column info-page__column--experience">
        <InfoCvSection
          title={experienceTitle}
          entries={experience}
          headingId="experience-heading"
        />
        <section className="info-page__section" aria-labelledby="hobbies-heading">
          <h2 id="hobbies-heading" className="info-page__section-title hero__statement-name">
            {hobbiesTitle}
          </h2>
          <ul className={`info-page__language-list ${montserrat.className}`}>
            {hobbies.map((hobby) => (
              <li key={hobby} className="info-page__detail">
                {hobby}
              </li>
            ))}
          </ul>
        </section>
      </div>
      <InfoCvSection
        title={educationTitle}
        entries={education}
        headingId="education-heading"
        className="info-page__section--education"
      />
      <section
        className="info-page__section info-page__section--language"
        aria-labelledby="language-heading"
      >
        <h2 id="language-heading" className="info-page__section-title hero__statement-name">
          {languageTitle}
        </h2>
        <ul className={`info-page__language-list ${montserrat.className}`}>
          {languages.map((language) => (
            <li key={language} className="info-page__detail">
              {language}
            </li>
          ))}
        </ul>
      </section>

      <div className="info-page__photo">
        <div
          className="info-page__photo-pixel"
          style={
            {
              "--photo-w": `${pixelW}px`,
              "--photo-h": `${pixelH}px`,
              "--photo-scale": 8,
            } as CSSProperties
          }
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            width={pixelW}
            height={pixelH}
            className="info-page__photo-img"
            sizes="(min-width: 900px) 460px, 70vw"
            unoptimized
            priority
          />
        </div>
      </div>

      <p className="info-page__location-line hero__statement-name">{locationLine}</p>
    </div>
  );
}
