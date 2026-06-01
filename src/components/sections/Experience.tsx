"use client";

import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const experiences = [
  {
    id: "cardinal-dev",
    title: "Junior Software Developer",
    type: "Internship",
    company: "Cardinal Educational Technology (American Open University)",
    location: "Ibadan, Nigeria",
    period: "Sep 2025 – May 2026",
    bullets: [
      "Built and deployed a university application portal using Microsoft Power Pages and Power Apps, enabling structured student onboarding workflows.",
      "Structured and managed course content on Canvas LMS to support digital academic delivery.",
      "Collaborated with cross-functional teams to deliver responsive, user-focused web solutions.",
      "Provided technical support for digital systems during institutional events and operations.",
    ],
  },
  {
    id: "cardinal-social",
    title: "Social Media Manager",
    type: "Internship",
    company: "Cardinal Educational Technology (American Open University)",
    location: "Ibadan, Nigeria",
    period: "Feb 2026 – May 2026",
    bullets: [
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
  const [expanded, setExpanded] = useState<string | null>("cardinal-dev");

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
      className="relative px-6 md:px-16 lg:px-24 py-24 md:py-36"
      style={{ backgroundColor: "var(--cream)" }}
    >
      {/* Section label */}
      <div className="flex items-center gap-4 mb-16">
        <span
          className="text-xs tracking-[0.25em] uppercase"
          style={{ color: "var(--accent)", fontFamily: "var(--font-inter)" }}
        >
          Experience
        </span>
        <div className="h-px w-12" style={{ backgroundColor: "var(--accent)" }} />
        <span
          className="text-xs tracking-[0.25em] uppercase"
          style={{ color: "var(--warm-grey)", fontFamily: "var(--font-inter)" }}
        >
          04
        </span>
      </div>

      {/* Heading */}
      <div className="max-w-2xl mb-16">
        <h2
          className="font-bold leading-tight"
          style={{
            fontFamily: "var(--font-playfair)",
            color: "var(--charcoal)",
            fontSize: "clamp(2rem, 4vw, 3.25rem)",
          }}
        >
          The journey
          <br />
          <span style={{ color: "var(--warm-grey)" }}>so far.</span>
        </h2>
      </div>

      {/* Experience list */}
      <div ref={listRef as React.RefObject<HTMLDivElement>} className="max-w-4xl">
        {experiences.map((exp, index) => {
          const isOpen = expanded === exp.id;
          const isCardinal = exp.id === "cardinal-dev" || exp.id === "cardinal-social";
          const showCardinalLabel = exp.id === "cardinal-dev";
          const prevIsCardinal =
            index > 0 &&
            (experiences[index - 1].id === "cardinal-dev" ||
              experiences[index - 1].id === "cardinal-social");

          return (
            <div key={exp.id} className="exp-entry">
              {/* Cardinal group label */}
              {showCardinalLabel && (
                <div className="flex items-center gap-3 mb-2 mt-2" style={{ opacity: 0.4 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--warm-grey)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Concurrent roles
                  </span>
                  <div className="flex-1 h-px" style={{ backgroundColor: "rgba(107, 101, 96, 0.15)" }} />
                </div>
              )}

              {/* Entry row */}
              <button
                onClick={() => setExpanded(isOpen ? null : exp.id)}
                className="w-full text-left"
                style={{
                  background: "none",
                  border: "none",
                  borderTop:
                    isCardinal && exp.id === "cardinal-social"
                      ? "1px solid rgba(107, 101, 96, 0.06)"
                      : "1px solid rgba(107, 101, 96, 0.12)",
                  cursor: "pointer",
                  padding: "24px 0",
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
                      fontFamily: "var(--font-playfair)",
                      fontSize: "1.15rem",
                      fontWeight: 700,
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
                  {isOpen ? "Less" : "More"}
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
                  maxHeight: isOpen ? "600px" : "0px",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <ul
                  style={{
                    paddingBottom: "24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {exp.bullets.map((bullet, i) => (
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
                      <span style={{ color: "var(--accent)", flexShrink: 0, marginTop: "3px" }}>—</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}

        {/* Bottom border */}
        <div style={{ borderTop: "1px solid rgba(107, 101, 96, 0.12)" }} />
      </div>

      {/* Background number */}
      <div
        className="absolute right-6 md:right-16 pointer-events-none select-none"
        style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "clamp(6rem, 18vw, 16rem)",
          fontWeight: 700,
          color: "var(--charcoal)",
          opacity: 0.03,
          lineHeight: 1,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        04
      </div>
    </section>
  );
}
