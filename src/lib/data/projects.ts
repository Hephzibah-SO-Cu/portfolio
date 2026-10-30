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

  /** Portrait screenshots, rendered in phone frames below the carousel. */
  phoneScreenshots?: string[];

  /** Long-form sections, rendered after Story. Used by case studies. */
  caseStudy?: { heading: string; body: string }[];

  index: number;
}

export const projects: Project[] = [
  {
    id: "zowasel-marketplace",

    title: "Zowasel Marketplace",

    exhibitLabel: "Current Work",
    exhibitSubtitle: "B2B Agricultural Marketplace",

    tagline:
      "A B2B agricultural marketplace, rebuilt so buyers can look before they sign up.",

    description:
      "The redesign of a commodities marketplace from a login-gated dashboard into a public storefront with a separate signed-in workspace.",

    story:
      "The marketplace was a bought admin template sitting behind a login. You could not see a single listing without an account \u2014 on a platform whose entire job is putting buyers in front of crops. I rebuilt it as a public storefront, with the signed-in workspace kept separate behind it.\n\nThe visual language had to come from somewhere. There was no designer and no Figma file, so I took it from the company website \u2014 which I had built myself a month earlier. Reading my own work closely enough to copy it meant reading it critically, and it did not hold up: 719 hardcoded colour values, body text at 10\u201312px on mobile, white text on orange, no visible focus styles. The marketplace got the same brand with none of those faults.",

    role: "Sole frontend engineer. Research, scope, architecture, UI, tests and documentation.",

    highlights: [
      "Public storefront with a separate signed-in workspace",
      "19 languages, including right-to-left",
      "Design tokens generated from one TypeScript source",
      "Light and dark themes, both contrast-checked in CI",
      "630+ Playwright tests on desktop, Android and iPhone",
      "Shared core package feeding a Next.js app and a React Native app",
    ],

    caseStudy: [
      {
        heading: "A storefront, not a dashboard",
        body: "Guest browsing did not exist and the backend had no endpoint for it. I built it anyway against a mock layer, and wrote the API specification the backend would need. The rule I held to: a guest meets a login prompt only when they act \u2014 making an offer, saving a listing \u2014 never just for looking. That rule later caught a real bug. A token refresh ran every nine minutes for every visitor, and a guest has no refresh cookie, so the failure handler bounced people reading a deliberately public page to the login about nine minutes after they arrived, having done nothing.",
      },
      {
        heading: "Tokens generated, not written",
        body: "Every colour, type step and spacing value comes from one TypeScript file and is generated into CSS. A contrast checker runs over the output and fails the build if any text-on-background pair drops below WCAG AA in either theme. Because every component is built against tokens rather than raw colours, dark mode cost almost nothing \u2014 it is the same components reading different values. The 719 colours in the website are what this is a reaction to.",
      },
      {
        heading: "One core, two apps",
        body: "Domain types, the API client, the mock data layer and all translations live in a shared package that is Expo-safe, so the Next.js web app and the React Native app consume the same rules instead of two drifting copies. Contract tests check the shapes, and a parity test fails if any of the 19 locales is missing a key another one has.",
      },
      {
        heading: "What I said no to",
        body: "The executive blueprint described five marketplace modes. I scoped two, deferred three \u2014 the private procurement room, recurring contracts and spot offers \u2014 and wrote down why, so the decision could be argued with rather than rediscovered. The same went for the trade-finance journey: I built the entry point where a buyer or seller can see a real available limit, and left the multi-screen request flow behind it until the endpoints existed. Building a convincing shell over an API that cannot answer is the expensive kind of fast.",
      },
      {
        heading: "How it was tested",
        body: "630+ end-to-end tests across desktop, Android and iPhone, with axe-core accessibility checks on every run, plus a geometry smoke test at the six widths our actual users bring \u2014 including the shipped defaults of the 14in and 16in MacBook Pro rather than round numbers. That spec earned its place on the first run: between 1024 and 1043px the header grid could not shrink below its own contents and the whole page overflowed sideways. 1024 is iPad landscape, and nothing committed had ever been run there.",
      },
      {
        heading: "What I would do differently",
        body: "I let automated checks tell me the layout was fine for a week before I opened a screenshot and saw a cramped navbar with 23px tap targets \u2014 under the WCAG minimum, and obvious to anyone looking. Overflow assertions pass happily on a page that is ugly. I now render and look at anything I claim is finished, and the breakpoint spec exists because of it.",
      },
    ],

    thumbnail: "/projects/zowasel/mk-storefront.webp",

    displayType: "browser",

    screenshots: [
      "/projects/zowasel/mk-storefront.webp",
      "/projects/zowasel/mk-browse.webp",
      "/projects/zowasel/mk-category.webp",
      "/projects/zowasel/mk-workspace.webp",
      "/projects/zowasel/mk-inbox.webp",
      "/projects/zowasel/mk-prices.webp",
      "/projects/zowasel/mk-shipments.webp",
      "/projects/zowasel/mk-sell.webp",
      "/projects/zowasel/mk-storefront-dark.webp",
      "/projects/zowasel/mk-workspace-dark.webp",
    ],

    phoneScreenshots: [
      "/projects/zowasel/mk-phone-storefront.webp",
      "/projects/zowasel/mk-phone-workspace.webp",
      "/projects/zowasel/mk-phone-inbox.webp",
    ],

    tags: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind v4",
      "React Native",
      "Playwright",
      "axe-core",
      "i18n / RTL",
    ],

    status: "case-study",

    isTeamProject: false,

    index: 1,
  },

  {
    id: "zowasel-website",

    title: "Zowasel.com",

    exhibitLabel: "Shipped",
    exhibitSubtitle: "Company Website",

    tagline:
      "The company's public site, built from slide decks with no designer on the team.",

    description:
      "The public website for an agribusiness trade and finance platform, including the Africa Trade Gateway partnership pages.",

    story:
      "Zowasel needed a public site and had slide decks, management briefs and a list of benchmark sites to work from \u2014 no designs. I built it: the trade pathways, the Africa Trade Gateway partner pages, the alternative credit scoring explainer, the impact figures and the marketplace preview.\n\nIt is also the work I have been hardest on. A month after it shipped I had to carry its design language into the marketplace, which meant auditing it, and I found 719 hardcoded colour values, 10\u201312px body text on mobile and missing focus styles. Naming those is only possible because I wrote them. The token system in the marketplace is the direct answer.",

    role: "Primary frontend author \u2014 49 of 82 commits and roughly 91% of inserted lines. The CTO owned the forms and PHP backend.",

    highlights: [
      "Built from slide decks and briefs, with no Figma file",
      "Trade pathways, ATG partner pages, credit scoring, impact",
      "Responsive production pages",
      "Audited afterwards, and the findings became the marketplace design system",
    ],

    thumbnail: "/projects/zowasel/web-atg.webp",

    displayType: "browser",

    screenshots: [
      "/projects/zowasel/web-atg.webp",
      "/projects/zowasel/web-home.webp",
      "/projects/zowasel/web-marketplace.webp",
      "/projects/zowasel/web-finance.webp",
      "/projects/zowasel/web-impact.webp",
    ],

    phoneScreenshots: ["/projects/zowasel/web-phone-home.webp"],

    liveUrl: "https://zowasel.com",

    tags: ["Next.js", "TypeScript", "Tailwind", "Responsive", "Marketing Site"],

    status: "live",

    isTeamProject: true,

    index: 2,
  },

  {
    id: "framez",

    title: "Framez",

    exhibitLabel: "Built in 72 Hours",

    exhibitSubtitle: "A mobile-first social platform",

    tagline: "A full-featured social media app concept built from scratch",

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

    thumbnail: "/projects/framez.webp",

    displayType: "mobile",

    screenshots: [
      "/projects/framez.webp",
      "/projects/framez-home-2.webp",
      "/projects/framez-home-3.webp",
      "/projects/framez-explore.webp",
      "/projects/framez-profile.webp",
      "/projects/framez-activity.webp",
    ],

    githubUrl: "https://github.com/Hephzibah-SO-Cu/HNG13/tree/main/Framez",

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

    tagline: "Ongoing monorepo site work for an NGO.",

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

    thumbnail: "/projects/chedcom.webp",

    displayType: "browser",

    screenshots: ["/projects/chedcom.webp"],

    githubUrl: "https://github.com/Hephzibah-SO-Cu/CHEDCOM",

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

    exhibitSubtitle: "Internship & Talent Platform",

    tagline: "A talent-to-company platform for the HNG internship ecosystem.",

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

    thumbnail: "/projects/hng-connect.webp",

    displayType: "browser",

    screenshots: ["/projects/hng-connect.webp"],

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

    exhibitSubtitle: "Full-Stack Shopping Experience",

    tagline:
      "Pixel-perfect e-commerce with a real backend and transactional email.",

    description: "A production-ready ecommerce platform.",

    story:
      "A production-ready ecommerce platform built from a Figma design. Beyond pixel-perfect implementation, the project includes persistent carts, order processing, transactional emails, and a real backend.",

    highlights: [
      "Convex Backend",
      "Persistent Cart",
      "Checkout Flow",
      "Transactional Emails",
      "Responsive Design",
    ],

    thumbnail: "/projects/audiophile.webp",

    displayType: "browser",

    screenshots: ["/projects/audiophile.webp"],

    liveUrl: "https://hng-13-stage-3a-audiophile.vercel.app",

    githubUrl:
      "https://github.com/Hephzibah-SO-Cu/HNG13/tree/main/Stage3aAudio",

    tags: ["Next.js", "TypeScript", "Tailwind", "Convex", "Resend", "Zod"],

    status: "live",

    isTeamProject: false,

    index: 3,
  },

  {
    id: "dlms-cu",

    title: "DLMS — CU",

    exhibitLabel: "Final Year Project",

    exhibitSubtitle: "Personalised Learning Platform",

    tagline: "A personalised learning management system. Final year project.",

    description: "A full LMS prototype built as a final year project.",

    story:
      "An LMS prototype built around personalised recommendations. Different user roles, content management workflows, and recommendation logic were combined into a single learning ecosystem.",

    highlights: [
      "Role-Based Access",
      "Course Management",
      "Recommendation Engine",
      "Firebase Backend",
      "Multi-Role Dashboards",
    ],

    thumbnail: "/projects/dlms.webp",

    displayType: "browser",

    screenshots: ["/projects/dlms.webp"],

    liveUrl: "https://dlms-cu.vercel.app",

    githubUrl: "https://github.com/Hephzibah-SO-Cu/DLMS-CU",

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
