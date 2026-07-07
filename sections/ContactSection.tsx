"use client";

import Link from "next/link";
import { useState } from "react";
import { AboutTypewriter } from "@/components/AboutTypewriter";
import { montserrat } from "@/lib/fonts";
import { site } from "@/data/site";
import { useSectionScrollGreen } from "@/lib/useSectionScrollGreen";

type ContactChannel = "email" | "instagram" | "call";

const contactChannels: { id: ContactChannel; label: string }[] = [
  { id: "email", label: "Email Me" },
  { id: "instagram", label: "Instagram Me" },
  { id: "call", label: "Call Me" },
];

export function ContactSection() {
  const [activeChannel, setActiveChannel] = useState<ContactChannel | null>(null);
  const sectionRef = useSectionScrollGreen<HTMLElement>();

  const toggleChannel = (channel: ContactChannel) => {
    setActiveChannel((current) => (current === channel ? null : channel));
  };

  return (
    <section ref={sectionRef} className="contact section-scroll-green" id="contact">
      <div className="section-scroll-bg" aria-hidden />
      <h2 className="contact__heading">
        {site.contact.headingPrefix}
        <AboutTypewriter
          words={site.contact.typewriterWords}
          className="contact__typewriter"
        />
      </h2>

      <div className={`contact__panel ${montserrat.className}`}>
        <div className="contact__actions">
          {contactChannels.map((channel) => (
            <button
              key={channel.id}
              type="button"
              className="work-block--static contact__action"
              aria-expanded={activeChannel === channel.id}
              aria-controls="contact-reveal"
              onClick={() => toggleChannel(channel.id)}
            >
              {channel.label}
            </button>
          ))}
        </div>

        <div
          id="contact-reveal"
          className={`contact__reveal${activeChannel ? " contact__reveal--visible" : ""}`}
          aria-live="polite"
        >
          {activeChannel === "email" ? (
            <a className="contact__reveal-link" href={`mailto:${site.contact.email}`}>
              {site.contact.email}
            </a>
          ) : null}
          {activeChannel === "call" ? (
            <p className="contact__reveal-text">{site.contact.callMessage}</p>
          ) : null}
          {activeChannel === "instagram" ? (
            <Link
              className="contact__reveal-link"
              href={site.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              {site.contact.instagram}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
