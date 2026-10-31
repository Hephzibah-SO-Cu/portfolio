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
    id: "zowasel",
    title: "Frontend Software Engineer",
    type: "Full-time",
    company: "Zowasel.com Limited",
    location: "Lagos, Nigeria",
    period: "Jul 2026 \u2013 Present",
    bullets: [
      "Sole frontend engineer on the company's B2B agricultural marketplace: redesigned it from a login-gated dashboard into a public storefront with a separate signed-in workspace, so buyers can browse before they register.",
      "Cut a 60-page executive blueprint into a buildable scope, recorded every decision and its reasoning in a dated log, and wrote 80 API specifications for the backend team to build against.",
      "Built a shared TypeScript core package \u2014 domain types, API client, mock data layer, translations \u2014 consumed by both the Next.js web app and a React Native app, so the business rules exist in one place.",
      "Shipped in 19 languages including right-to-left, on design tokens generated from a single TypeScript source, with a contrast checker that fails the build if any text/background pair drops below WCAG AA in either theme.",
      "Wrote and maintained 630+ Playwright end-to-end tests across desktop, Android and iPhone viewports, with axe-core accessibility checks on every run.",
      "Primary frontend author of the company website, zowasel.com, built from slide decks and management briefs with no designer on the team.",
      "Led the redesign of the multi-tenant super-admin after taking over a part-built frontend from a backend engineer: authentication, a Finance Hub with a requisitions pipeline and multi-bank aggregation, subscriptions, transactions and payment providers.",
      "Directed AI-assisted development with a verification discipline: reviewed every change, required a failing test for each fix, and enforced feature parity on every page ported from the legacy system.",
    ],
  },

  {
    id: "cardinal",

    title: "Dual Role • Software Development & Media Operations",

    type: "NYSC Internship",

    company: "Cardinal Educational Technology (American Open University)",

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
  const [expanded, setExpanded] = useState<string | null>("zowasel");

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
      className="relative"
      data-section=""
      data-gutter=""
      style={{ backgroundColor: "var(--cream)" }}
    >
      {/* Section label */}
      <div className="flex items-center gap-4 mb-10">
        <span
          className="text-xs tracking-[var(--track-label)] uppercase"
          style={{
            color: "var(--accent-ink)",
            fontFamily: "var(--font-inter)",
          }}
        >
          Where I&apos;ve Worked
        </span>
      </div>

      {/* Experience list */}
      <div
        ref={listRef as React.RefObject<HTMLDivElement>}
        className="max-w-5xl"
      >
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
                  borderTop: "1px solid rgb(var(--grey-rgb) / 0.12)",
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
                  <div
                    className="flex items-center gap-3 mb-2"
                    style={{ flexWrap: "wrap" }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "var(--t-label)",
                        letterSpacing: "var(--track-label)",
                        textTransform: "uppercase",
                        color: "var(--accent-ink)",
                      }}
                    >
                      {exp.period}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "var(--t-label)",
                        letterSpacing: "var(--track-label)",
                        textTransform: "uppercase",
                        /*
                          Was rgb(var(--grey-rgb) / 0.5), which blends to 2.05:1 on
                          cream — half what AA asks for at this size. The
                          solid warm grey is 5.05:1 and looks the same shape.
                        */
                        color: "var(--warm-grey)",
                        border: "1px solid rgb(var(--grey-rgb) / 0.35)",
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
                      letterSpacing: "var(--track-display)",
                      fontSize: "var(--t-body)",
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
                      fontSize: "var(--t-caption)",
                      color: "var(--warm-grey)",
                    }}
                  >
                    {exp.company} · {exp.location}
                  </p>
                </div>

                {/*
                  A disclosure, not a call to action: it opens this row in
                  place and the chevron says so. It read "View Details" —
                  the same words the project cards used for a control that
                  opens a full dialog, so one label meant two different
                  things depending which half of the page you were on.
                  This one is the one that changed, because the chevron
                  already tells you what it does.
                */}
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "var(--t-label)",
                    letterSpacing: "var(--track-label)",
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
                  {isOpen ? "Hide" : "Details"}
                  <span
                    style={{
                      display: "inline-block",
                      transition: "transform 0.3s ease",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      fontSize: "var(--t-label)",
                    }}
                  >
                    ↓
                  </span>
                </span>
              </button>

              {/* Expanded bullets */}
              <div
                style={{
                  maxHeight: isOpen ? "2600px" : "0px",
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
                          fontSize: "var(--t-label)",
                          fontWeight: 700,
                          letterSpacing: "var(--track-label)",
                          textTransform: "uppercase",
                          color: "var(--accent-ink)",
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
                              fontSize: "var(--t-caption)",
                              color: "var(--warm-grey)",
                              lineHeight: 1.75,
                            }}
                          >
                            <span
                              style={{
                                color: "var(--accent-ink)",
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
                          fontSize: "var(--t-label)",
                          fontWeight: 700,
                          letterSpacing: "var(--track-label)",
                          textTransform: "uppercase",
                          color: "var(--accent-ink)",
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
                              fontSize: "var(--t-caption)",
                              color: "var(--warm-grey)",
                              lineHeight: 1.75,
                            }}
                          >
                            <span
                              style={{
                                color: "var(--accent-ink)",
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
                          fontSize: "var(--t-caption)",
                          color: "var(--warm-grey)",
                          lineHeight: 1.75,
                        }}
                      >
                        <span
                          style={{
                            color: "var(--accent-ink)",
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
        <div style={{ borderTop: "1px solid rgb(var(--grey-rgb) / 0.12)" }} />
      </div>
    </section>
  );
}
