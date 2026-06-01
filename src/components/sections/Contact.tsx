"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const contacts = [
  {
    label: "Email",
    value: "hephzibah.sinaolulana@gmail.com",
    href: "mailto:hephzibah.sinaolulana@gmail.com",
    display: "hephzibah.sinaolulana@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/hephzibah-so",
    href: "https://linkedin.com/in/hephzibah-so",
    display: "linkedin.com/in/hephzibah-so",
  },
  {
    label: "GitHub",
    value: "github.com/Hephzibah-SO-Cu",
    href: "https://github.com/Hephzibah-SO-Cu",
    display: "github.com/Hephzibah-SO-Cu",
  },
  {
    label: "Telegram",
    value: "@snrmanOH",
    href: "https://t.me/snrmanOH",
    display: "@snrmanOH",
  },
  {
    label: "Phone",
    value: "+234 701 910 0106",
    href: "tel:+2347019100106",
    display: "+234 701 910 0106",
  },
  {
    label: "Résumé",
    value: "Download CV",
    href: "/cv.pdf",
    display: "Download PDF",
    download: true,
  },
];

export default function Contact() {
  const sectionRef = useScrollAnimation({ variant: "fadeUp" });
  const listRef = useScrollAnimation({
    variant: "stagger",
    staggerChildren: ".contact-item",
    delay: 0.15,
  });

  return (
    <section
      id="contact"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative px-6 md:px-16 lg:px-24 py-24 md:py-36 pb-32 md:pb-40"
      style={{ backgroundColor: "var(--charcoal)" }}
    >
      {/* Section label */}
      <div className="flex items-center gap-4 mb-16">
        <span
          className="text-xs tracking-[0.25em] uppercase"
          style={{ color: "var(--accent)", fontFamily: "var(--font-inter)" }}
        >
          Contact
        </span>
        <div className="h-px w-12" style={{ backgroundColor: "var(--accent)" }} />
        <span
          className="text-xs tracking-[0.25em] uppercase"
          style={{ color: "rgba(245, 240, 232, 0.3)", fontFamily: "var(--font-inter)" }}
        >
          05
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl">
        {/* Left — heading */}
        <div>
          <h2
            className="font-bold leading-tight mb-6"
            style={{
              fontFamily: "var(--font-playfair)",
              color: "var(--cream)",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
            }}
          >
            Let&apos;s build
            <br />
            <span style={{ color: "rgba(245, 240, 232, 0.4)" }}>
              something real.
            </span>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.95rem",
              color: "rgba(245, 240, 232, 0.55)",
              lineHeight: 1.8,
              maxWidth: "420px",
            }}
          >
            Open to frontend, full-stack, and product engineering roles — 
            remote or Lagos-based. If you&apos;re building something worth 
            using and need someone who cares about both the code and the craft, 
            reach out.
          </p>
        </div>

        {/* Right — contact list */}
        <div
          ref={listRef as React.RefObject<HTMLDivElement>}
          className="flex flex-col justify-center"
        >
          {contacts.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.download ? "_blank" : item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              download={item.download}
              className="contact-item flex items-center justify-between py-5 group"
              style={{
                borderBottom: "1px solid rgba(245, 240, 232, 0.08)",
                textDecoration: "none",
                transition: "padding-left 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.paddingLeft = "8px";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.paddingLeft = "0px";
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  width: "80px",
                  flexShrink: 0,
                }}
              >
                {item.label}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.875rem",
                  color: "rgba(245, 240, 232, 0.7)",
                  flex: 1,
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--cream)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(245, 240, 232, 0.7)";
                }}
              >
                {item.display}
              </span>
              <span
                style={{
                  color: "rgba(245, 240, 232, 0.25)",
                  fontSize: "1rem",
                  transition: "color 0.2s ease, transform 0.2s ease",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--accent)";
                  e.currentTarget.style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(245, 240, 232, 0.25)";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                →
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Background number */}
      <div
        className="absolute right-6 md:right-16 pointer-events-none select-none"
        style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "clamp(6rem, 18vw, 16rem)",
          fontWeight: 700,
          color: "var(--cream)",
          opacity: 0.02,
          lineHeight: 1,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        05
      </div>
    </section>
  );
}
