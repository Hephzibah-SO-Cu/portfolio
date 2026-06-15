
export interface Project {
  id: string;
  title: string;

  exhibitLabel: string;
  exhibitSubtitle: string;

  tagline: string;
  description: string;
  story: string;

  role?: string;
  highlights?: string[];

  thumbnail: string;
  displayType: "browser" | "mobile";
  screenshots: string[];

  liveUrl?: string;
  githubUrl?: string;

  tags: string[];

  status: "live" | "case-study" | "in-progress";

  isTeamProject?: boolean;
  contributions?: string[];

  index: number;
}

export const projects: Project[] = [
  {
    id: "framez",

    title: "Framez",

    exhibitLabel: "Built in 72 Hours",

    exhibitSubtitle:
      "A mobile-first social platform",

    tagline:
      "A full-featured social media app concept built from scratch",

    description:
      "Framez is a mobile-first social platform where every post is a frame.",

    story:
      "Framez was built from idea to working product in just 72 hours. The challenge wasn't only shipping features quickly—it was creating a social experience with a distinct identity. Every content type carries its own visual language while remaining part of a cohesive ecosystem.",

    highlights: [
      "Authentication",
      "Profiles",
      "Media Uploads",
      "Realtime Activity Feed",
      "Search & Discovery",
    ],

    thumbnail: "/projects/framez.png",

    displayType: "mobile",

    screenshots: [
      "/projects/framez.png",
      "/projects/framez-home-2.png",
      "/projects/framez-home-3.png",
      "/projects/framez-explore.png",
      "/projects/framez-profile.png",
      "/projects/framez-activity.png",
    ],

    githubUrl:
      "https://github.com/Hephzibah-SO-Cu/HNG13/tree/main/Framez",

    tags: [
      "React Native",
      "Expo Router",
      "Supabase",
      "Zustand",
      "TypeScript",
      "Realtime",
    ],

    status: "in-progress",

    isTeamProject: false,

    index: 1,
  },
  {
    id: "chedcom",

    title: "CHEDCOM",

    exhibitLabel: "Ongoing Work",
    exhibitSubtitle: "NGO Web & Admin Platform",

    tagline:
      "Ongoing monorepo site work for an NGO.",

    description:
      "The official website and admin dashboard for CHEDCOM, a non-governmental organisation focused on community development, training, and social impact.",

    story:
      "CHEDCOM is a full-stack platform built to support the organisation's public presence and internal operations. The project combines a public-facing website with a role-based admin dashboard for managing content across projects, trainings, blog posts, galleries, and organisational information. The platform is being developed as a long-term production system with scalability, maintainability, and content management at its core.",

    highlights: [
      "Next.js App Router",
      "Role-Based Admin System",
      "Content Management",
      "MongoDB Integration",
      "NGO Digital Presence",
    ],

    thumbnail: "/projects/chedcom.png",

    displayType: "browser",

    screenshots: ["/projects/chedcom.png"],

    githubUrl:
      "https://github.com/Hephzibah-SO-Cu/CHEDCOM",

    tags: [
      "Next.js",
      "TypeScript",
      "MongoDB",
      "Tailwind",
      "NextAuth",
      "Full Stack",
    ],

    status: "in-progress",

    isTeamProject: false,
    index: 1,
  },
  {
    id: "hng-connect",

    title: "HNG Connect",

    exhibitLabel: "Team Collaboration",

    exhibitSubtitle:
      "Internship & Talent Platform",

    tagline:
      "A talent-to-company platform for the HNG internship ecosystem.",

    description:
      "A full-scale job discovery and internship management platform.",

    story:
      "Built as part of a cross-functional team during HNG13. My work focused on authentication flows, dashboard experiences, job discovery, application tracking, and resolving production issues across critical user journeys.",

    role: "Frontend Engineer",

    highlights: [
      "Authentication System",
      "Talent Dashboard",
      "Job Discovery",
      "Application Tracking",
      "Production Bug Fixes",
    ],

    thumbnail: "/projects/hng-connect.png",

    displayType: "browser",

    screenshots: ["/projects/hng-connect.png"],

    githubUrl:
      "https://github.com/emerjent/hngconnect-fe",

    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "shadcn/ui",
      "React Hook Form",
      "Zod",
    ],

    status: "case-study",

    isTeamProject: true,

    contributions: [
      "Built the complete authentication system for both Talent and Company account types",
      "Implemented the Talent Dashboard page with real user data",
      "Built the Explore Jobs page with filtering and pagination",
      "Created the My Applications page with API integration",
      "Built the Contact Us page",
      "Resolved authentication and dashboard bugs",
    ],

    index: 2,
  },

  {
    id: "audiophile",

    title: "Audiophile",

    exhibitLabel: "Premium Ecommerce",

    exhibitSubtitle:
      "Full-Stack Shopping Experience",

    tagline:
      "Pixel-perfect e-commerce with a real backend and transactional email.",

    description:
      "A production-ready ecommerce platform.",

    story:
      "A production-ready ecommerce platform built from a Figma design. Beyond pixel-perfect implementation, the project includes persistent carts, order processing, transactional emails, and a real backend.",

    highlights: [
      "Convex Backend",
      "Persistent Cart",
      "Checkout Flow",
      "Transactional Emails",
      "Responsive Design",
    ],

    thumbnail: "/projects/audiophile.png",

    displayType: "browser",

    screenshots: ["/projects/audiophile.png"],

    liveUrl:
      "https://hng-13-stage-3a-audiophile.vercel.app",

    githubUrl:
      "https://github.com/Hephzibah-SO-Cu/HNG13/tree/main/Stage3aAudio",

    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Convex",
      "Resend",
      "Zod",
    ],

    status: "live",

    isTeamProject: false,

    index: 3,
  },

  {
    id: "dlms-cu",

    title: "DLMS — CU",

    exhibitLabel: "Final Year Project",

    exhibitSubtitle:
      "Personalised Learning Platform",

    tagline:
      "A personalised learning management system. Final year project.",

    description:
      "A full LMS prototype built as a final year project.",

    story:
      "An LMS prototype built around personalised recommendations. Different user roles, content management workflows, and recommendation logic were combined into a single learning ecosystem.",

    highlights: [
      "Role-Based Access",
      "Course Management",
      "Recommendation Engine",
      "Firebase Backend",
      "Multi-Role Dashboards",
    ],

    thumbnail: "/projects/dlms.png",

    displayType: "browser",

    screenshots: ["/projects/dlms.png"],

    liveUrl:
      "https://dlms-cu.vercel.app",

    githubUrl:
      "https://github.com/Hephzibah-SO-Cu/DLMS-CU",

    tags: [
      "Nuxt.js",
      "Vue",
      "Firebase",
      "Firestore",
      "Firebase Auth",
      "TypeScript",
    ],

    status: "live",

    isTeamProject: false,

    index: 4,
  },
];
