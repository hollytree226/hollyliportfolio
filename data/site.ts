/** Global site copy & links — edit here, not in components. */

export type HeroArtConfig = {
  id: string;
  src: string;
  alt: string;
  type?: "image" | "video";
  top?: string;
  left?: string;
  width: number;
  rotate?: number;
  zIndex?: number;
  parallax?: number;
};

export type HeroNavLink = {
  label: string;
  href: string;
  external?: boolean;
};

export const site = {
  name: "Holly Li",
  hero: {
    statement:
      "Holly Li is a creative graphic designer, illustrator, and art director with experience crafting visual identities, branding, digital experiences, and marketing campaigns across a wide range of industries.",
    statementName: "Holly Li",
    statementLines: [
      "is a creative graphic designer, illustrator, and art director",
      "with experience crafting visual identities, branding,",
      "digital experiences, and marketing campaigns",
      "across a wide range of industries.",
    ],
    scrollLabel: "↓",
    scrollHref: "#selected-work",
    nav: [
      { label: "INDEX", href: "/#selected-work" },
      { label: "ABOUT", href: "/info" },
      { label: "CONTACT", href: "/#contact" },
    ] satisfies HeroNavLink[],
    art: [] satisfies HeroArtConfig[],
  },
  selected: {
    title: "Selected works",
  },
  workshop: {
    label: "You got time to kill",
    title: "Others",
    subtitle: "",
  },
  info: {
    title: "About",
    typewriterWords: ["has", "is", "was", "look like"],
    experienceTitle: "Experience",
    experience: [
      {
        dates: "Jul 2025--present",
        roleLines: ["Creative Director & Brand Founder"],
        company: "slayOzen",
      },
      {
        dates: "Dec 2023--Mar 2025",
        roleLines: ["Freelance Graphic", "Designer & Illustrator"],
        company: "Recording Arts of Canada",
        location: "Montreal, Canada",
      },
      {
        dates: "Jan 2024--Nov 2024",
        roleLines: ["Brand & Creative", "Designer"],
        company: "Anandi Hotel",
        location: "Shanghai, China",
      },
      {
        dates: "Jun 2023--Jan 2024",
        roleLines: ["In-House Graphic", "Designer"],
        company: "Hao Market",
        location: "Shanghai, China",
      },
    ],
    educationTitle: "Education",
    education: [
      {
        dates: "Sep 2013--Nov 2014",
        roleLines: ["MA Photography: the Image and", "Electronic Arts"],
        lines: [
          "Goldsmiths, University of London, UK",
          "Distinction Achieved",
        ],
      },
      {
        dates: "2010- 2013",
        roleLines: [
          "Bachelor of Arts in Communications in Creative Multimedia",
        ],
        lines: [
          "Dundalk Institute of Technology,  Ireland",
          "Grade1 Achieved",
        ],
      },
    ],
    languageTitle: "Language",
    languages: ["English", "Mandarin", "Un peu Francais"],
    hobbiesTitle: "Hobbies",
    hobbies: ["People Watching", "Photography"],
    locationLine: "Currently lives in Montreal, Canada",
    photo: {
      src: "/images/projects/about.JPG",
      alt: "Holly Li",
      width: 1376,
      height: 768,
    },
    image: {
      src: "https://picsum.photos/seed/info-portrait/900/1100",
      alt: "Studio portrait placeholder",
    },
  },
  contact: {
    headingPrefix: "Let's work, ",
    typewriterWords: ["together"],
    email: "lxr.ldcj@gmail.com",
    instagram: "https://www.instagram.com/sohardtofindacoolname/",
    callMessage: "better to email or DM ;P",
  },
  footer: {
    line: "© 2026 Holly Li's portfolio website. All rights reserved.",
  },
} as const;
