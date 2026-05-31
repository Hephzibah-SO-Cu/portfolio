export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
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
    tagline: "A full-featured social media app built in 72 hours.",
    description:
      "Framez is a mobile-first social platform where every post is a 'frame' — a jewel-toned, glassmorphic container that adapts its identity based on content type. Photos, videos, audio, and text each carry their own visual signature. Built end-to-end in 72 hours: multi-type media posting, a complete social graph with real-time follower counts, likes, comments, bookmarks, an activity feed powered by a UNION ALL RPC function, and a search and explore tab. The Noir Glass UI — floating blurred pills, jewel-toned tints — was built entirely from scratch.",
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
    githubUrl: "https://github.com/Hephzibah-SO-Cu/HNG13/tree/main/Framez",
    tags: ["React Native", "Expo Router", "Supabase", "Zustand", "TypeScript", "Realtime"],
    status: "in-progress",
    isTeamProject: false,
    index: 1,
  },
  {
    id: "hng-connect",
    title: "HNG Connect",
    tagline: "A talent-to-company platform for the HNG internship ecosystem.",
    description:
      "HNG Connect is a full-scale job discovery and internship management platform built by a cross-functional team during the HNG13 internship. The platform connects verified talent with companies through profile-building, job discovery, application tracking, and company dashboards. Built with Next.js, Tailwind, and shadcn/ui with a strict pre-commit pipeline enforcing code quality across the team.",
    thumbnail: "/projects/hng-connect.png",
    displayType: "browser",
    screenshots: ["/projects/hng-connect.png"],
    githubUrl: "https://github.com/emerjent/hngconnect-fe",
    tags: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui", "React Hook Form", "Zod"],
    status: "case-study",
    isTeamProject: true,
    contributions: [
      "Built the complete authentication system for both Talent and Company account types — sign up, sign in, forgot password, reset password, OTP verification, and role-based middleware routing",
      "Implemented the Talent Dashboard page with real user data, empty states, and API consumption",
      "Built the Explore Jobs page with multi-filter support (job level, employment type, work mode, location, track), API-driven pagination, and job bookmarking",
      "Created the My Applications page — lists every job a talent has applied to with full API integration",
      "Built the Contact Us page and linked it across the site",
      "Resolved site-wide bugs: OTP type mismatch, auth redirect logic, dashboard sidebar errors, and TypeScript alignment with backend response shapes",
    ],
    index: 2,
  },
  {
    id: "audiophile",
    title: "Audiophile",
    tagline: "Pixel-perfect e-commerce with a real backend and transactional email.",
    description:
      "A full-stack e-commerce site for a premium audio brand — built pixel-perfect from a Figma design across all breakpoints. The shopping experience is complete: dynamic product and category pages, a persistent global cart, a multi-step checkout with Zod validation, real-time order persistence to Convex, and automated order confirmation emails via Resend. Not a UI exercise — a working store with a real data layer.",
    thumbnail: "/projects/audiophile.png",
    displayType: "browser",
    screenshots: ["/projects/audiophile.png"],
    liveUrl: "https://hng-13-stage-3a-audiophile.vercel.app",
    githubUrl: "https://github.com/Hephzibah-SO-Cu/HNG13/tree/main/Stage3aAudio",
    tags: ["Next.js", "TypeScript", "Tailwind", "Convex", "Resend", "Zod"],
    status: "live",
    isTeamProject: false,
    index: 3,
  },
  {
    id: "dlms-cu",
    title: "DLMS — CU",
    tagline: "A personalised learning management system. Final year project.",
    description:
      "A full LMS prototype built as a final year project at Covenant University. Three distinct user roles — administrator, instructor, and student — each with their own dashboard and permission scope. Instructors create and manage courses with keyword tagging; the recommendation engine surfaces relevant courses to learners based on those keywords. Built with Nuxt.js and Firebase (Auth, Firestore, Storage, Functions), deployed on Vercel.",
    thumbnail: "/projects/dlms.png",
    displayType: "browser",
    screenshots: ["/projects/dlms.png"],
    liveUrl: "https://dlms-cu.vercel.app",
    githubUrl: "https://github.com/Hephzibah-SO-Cu/DLMS-CU",
    tags: ["Nuxt.js", "Vue", "Firebase", "Firestore", "Firebase Auth", "TypeScript"],
    status: "live",
    isTeamProject: false,
    index: 4,
  },
];
