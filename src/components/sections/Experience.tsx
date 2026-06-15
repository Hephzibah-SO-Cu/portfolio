"use client";

import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type Experience =
  | {
      id: "cardinal";
      title: string;
      type: string;
      company: string;
      location: string;
      period: string;
      softwareBullets: string[];
      mediaBullets: string[];
    }
  | {
      id: string;
      title: string;
      type: string;
      company: string;
      location: string;
      period: string;
      bullets: string[];
    };

const experiences = [
  {
    id: "cardinal",

    title:
      "Dual Role • Software Development & Media Operations",

    type: "NYSC Internship",

    company:
      "Cardinal Educational Technology (American Open University)",

    location: "Ibadan, Nigeria",

    period: "Sep 2025 – May 2026",

    softwareBullets: [
      "Built and deployed a university application portal using Microsoft Power Pages and Power Apps, enabling structured student onboarding workflows.",
      "Structured and managed course content on Canvas LMS to support digital academic delivery.",
      "Collaborated with cross-functional teams to deliver responsive, user-focused web solutions.",
      "Provided technical support for digital systems during institutional events and operations.",
    ],

    mediaBullets: [
      "Managed and grew social media platforms through digital engagement strategy across multiple channels.",
      "Designed and produced digital assets and campaign materials for marketing and outreach.",
      "Managed and directed technical setup for media production, studio operations, and live streaming workflows — overseeing production and post-production.",
      "Utilized Brevo to design and manage email campaigns for stakeholder communication.",
      "Coordinated live sessions and online events, handling technical execution and audience engagement.",
    ],
  },

  {
    id: "hng",
    title: "Frontend Developer",
    type: "Internship",
    company: "HNG Tech",
    location: "Remote",
    period: "Oct 2025 – Dec 2025",
    bullets: [
      "Progressed through all stages of the HNG i13 Frontend track, completing individual and team-based projects under strict deadlines and code-quality standards.",
      "Built and deployed web and mobile applications using Next.js, React Native, TypeScript, and Tailwind CSS.",
      "Implemented authentication, protected routes, form validation, and state management across multiple projects.",
      "Integrated APIs — Supabase, Convex, PostgreSQL, Resend — to power dynamic interfaces.",
      "Collaborated on HNG Connect and PathPanda, contributing auth pages, dashboards, documentation, and reusable UI components.",
      "Worked with professional Git workflows, pull requests, and code reviews throughout the cohort.",
    ],
  },

  {
    id: "edurex",
    title: "Frontend Engineer",
    type: "Internship",
    company: "Edurex Academy",
    location: "Ibadan, Nigeria",
    period: "Jun 2025 – Sep 2025",
    bullets: [
      "Automated lead capture workflows using Google Forms, Sheets, and QR systems.",
      "Supported media production and internal digital operations.",
      "Assisted in outreach activities and company research.",
    ],
  },

  {
    id: "cloudware-siwes",
    title: "Junior Frontend Developer",
    type: "SIWES Internship",
    company: "Cloudware Limited",
    location: "Abuja, Nigeria",
    period: "Apr 2022 – Sep 2022",
    bullets: [
      "Built a functional Angular 13 admin dashboard for internal use, applying self-taught principles and on-the-job learning.",
      "Integrated the PayArena API with guidance from senior developers to implement user authentication and login verification.",
      "Refined UI/UX through supervisor feedback, enhancing usability and navigation.",
    ],
  },

  {
    id: "cloudware-trainee",
    title: "Web Development Trainee",
    type: "Internship",
    company: "Cloudware Limited",
    location: "Abuja, Nigeria",
    period: "Sep 2021 – Oct 2021",
    bullets: [
      "Built a single-page responsive website using HTML, CSS, JavaScript, Bootstrap, and jQuery.",
      "Developed a sample web application using the C# MVC framework in Visual Studio.",
    ],
  },
];

export default function Experience() {
  const [expanded, setExpanded] = useState<string | null>("cardinal");

  const sectionRef = useScrollAnimation({ variant: "fadeUp" });
  const listRef = useScrollAnimation({
    variant: "stagger",
    staggerChildren: ".exp-entry",
    delay: 0.1,
  });

  return (
    <section
      id="experience"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative px-6 md:px-16 lg:px-24 py-16 md:py-20"
      style={{ backgroundColor: "var(--cream)" }}
    >
      {/* Section label */}
      <div className="flex items-center gap-4 mb-10">
        <span
          className="text-xs tracking-[0.25em] uppercase"
          style={{ color: "var(--accent)", fontFamily: "var(--font-inter)" }}
        >
          Where I&apos;ve Worked
        </span>
      </div>

      {/* Experience list */}
      <div ref={listRef as React.RefObject<HTMLDivElement>} className="max-w-5xl">
        {experiences.map((exp) => {
          const isOpen = expanded === exp.id;

          return (
            <div key={exp.id} className="exp-entry">

              {/* Entry row */}
              <button
                onClick={() => setExpanded(isOpen ? null : exp.id)}
                className="w-full text-left"
                style={{
                  background: "none",
                  border: "none",
                  borderTop:"1px solid rgba(107, 101, 96, 0.12)",
                  cursor: "pointer",
                  padding: "18px 0",
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  alignItems: "start",
                  gap: "16px",
                }}
              >
                <div>
                  {/* Period + type badge */}
                  <div className="flex items-center gap-3 mb-2" style={{ flexWrap: "wrap" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "var(--accent)",
                      }}
                    >
                      {exp.period}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "rgba(107, 101, 96, 0.5)",
                        border: "1px solid rgba(107, 101, 96, 0.2)",
                        padding: "2px 8px",
                        borderRadius: "2px",
                      }}
                    >
                      {exp.type}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      fontSize: "1.05rem",
                      color: "var(--charcoal)",
                      lineHeight: 1.3,
                      marginBottom: "4px",
                    }}
                  >
                    {exp.title}
                  </h3>

                  {/* Company + location */}
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.8rem",
                      color: "var(--warm-grey)",
                    }}
                  >
                    {exp.company} · {exp.location}
                  </p>
                </div>

                {/* Expand toggle */}
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--warm-grey)",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    flexShrink: 0,
                    marginTop: "4px",
                    transition: "color 0.2s ease",
                  }}
                >
                  {isOpen ? "Hide Details" : "View Details"}
                  <span
                    style={{
                      display: "inline-block",
                      transition: "transform 0.3s ease",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      fontSize: "0.7rem",
                    }}
                  >
                    ↓
                  </span>
                </span>
              </button>

              {/* Expanded bullets */}
              <div
  style={{
    maxHeight: isOpen ? "1400px" : "0px",
    overflow: "hidden",
    transition: "max-height 0.4s ease",
  }}
>
  {exp.id === "cardinal" ? (
    <div
      style={{
        paddingBottom: "18px",
      }}
    >
      <div style={{ marginBottom: "24px" }}>
        <h4
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "12px",
          }}
        >
          Software Development
        </h4>

        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {exp.softwareBullets?.map((bullet, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                gap: "12px",
                fontFamily: "var(--font-inter)",
                fontSize: "0.85rem",
                color: "var(--warm-grey)",
                lineHeight: 1.75,
              }}
            >
              <span
                style={{
                  color: "var(--accent)",
                  flexShrink: 0,
                  marginTop: "3px",
                }}
              >
                —
              </span>

              {bullet}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "12px",
          }}
        >
          Media & Communications
        </h4>

        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {exp.mediaBullets?.map((bullet, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                gap: "12px",
                fontFamily: "var(--font-inter)",
                fontSize: "0.85rem",
                color: "var(--warm-grey)",
                lineHeight: 1.75,
              }}
            >
              <span
                style={{
                  color: "var(--accent)",
                  flexShrink: 0,
                  marginTop: "3px",
                }}
              >
                —
              </span>

              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <ul
      style={{
        paddingBottom: "18px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {exp.bullets?.map((bullet, i) => (
        <li
          key={i}
          style={{
            display: "flex",
            gap: "12px",
            fontFamily: "var(--font-inter)",
            fontSize: "0.85rem",
            color: "var(--warm-grey)",
            lineHeight: 1.75,
          }}
        >
          <span
            style={{
              color: "var(--accent)",
              flexShrink: 0,
              marginTop: "3px",
            }}
          >
            —
          </span>

          {bullet}
        </li>
      ))}
    </ul>
  )}
</div>
            </div>
          );
        })}

        {/* Bottom border */}
        <div style={{ borderTop: "1px solid rgba(107, 101, 96, 0.12)" }} />
      </div>
    </section>
  );
}
