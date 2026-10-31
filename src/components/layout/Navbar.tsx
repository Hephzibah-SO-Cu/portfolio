"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Beyond Code", href: "#beyond-code" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Entrance: slide down from above
  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 0.9,
      delay: 0.7,
      ease: "power3.out",
    });
  });

  // Scroll detection — increase blur/opacity past 50px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /*
    WHICH SURFACE IS UNDER THE BAR.

    The pill was white translucency with a white rim and a white inset
    highlight — a glass built for a dark backdrop — carrying dark grey text
    built for a light one. It passed nowhere: measured against the real
    composited pixel it ran from 3.36:1 at best down to 1.42:1 over the
    hero, against the 4.5:1 that 12px text needs.

    So the bar now asks what it is sitting on. Each surface declares a
    data-tone; the bar takes the LAST one in document order whose box
    overlaps its own 52px band, because later in the document means painted
    on top — which is how the hero's cream fade overrides the hero.

    Reading geometry rather than keeping a list of section ids here means a
    section added later is not silently wrong.
  */
  const [tone, setTone] = useState<"light" | "dark">("dark");

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;

      const nav = navRef.current;

      if (!nav) return;

      const band = nav.getBoundingClientRect();

      let found: "light" | "dark" | null = null;

      document.querySelectorAll("[data-tone]").forEach((el) => {
        const r = el.getBoundingClientRect();

        if (r.bottom < band.top || r.top > band.bottom) return;

        found = el.getAttribute("data-tone") === "dark" ? "dark" : "light";
      });

      if (found) setTone(found);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /*
    The two treatments. The variants differ in ink and in which way the rim
    catches the light; the pill is opaque enough in both that the composite
    is decided by the bar and not by whatever happens to be scrolling under
    it — which is the only way a bar over arbitrary content can promise a
    contrast ratio at all.
  */
  const skin =
    tone === "dark"
      ? {
          background: `rgb(var(--charcoal-rgb) / ${scrolled ? 0.82 : 0.72})`,
          border: "1px solid rgb(var(--white-rgb) / 0.14)",
          shadow:
            "0 8px 32px rgb(var(--black-rgb) / 0.30), inset 0 1px rgb(var(--white-rgb) / 0.10)",
          ink: "rgb(var(--cream-rgb) / 0.78)",
          inkStrong: "var(--cream)",
        }
      : {
          /*
            Nearly opaque, because at 0.86 the pill composited to
            rgb(211,206,198) over the content scrolling beneath it rather
            than to cream, and --warm-grey on that is 3.67:1. A bar over
            arbitrary content can only promise a ratio if the bar, and not
            the content, decides the colour underneath the text.
          */
          background: `rgb(var(--cream-rgb) / ${scrolled ? 0.97 : 0.94})`,
          border: "1px solid rgb(var(--charcoal-rgb) / 0.10)",
          shadow: "0 8px 32px rgb(var(--black-rgb) / 0.10)",
          ink: "rgb(var(--charcoal-rgb) / 0.7)",
          inkStrong: "var(--charcoal)",
        };

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: "fixed",
          top: "16px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "calc(100% - 48px)",
          maxWidth: "950px",
          height: "52px",
          borderRadius: "9999px",
          background: skin.background,
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: skin.border,
          boxShadow: skin.shadow,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 22px",
          transition:
            "background 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease",
          overflow: "hidden",
        }}
      >
        {/* Logotype */}
        <a
          href="#home"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "var(--t-logo)",
            fontWeight: 700,
            color: skin.inkStrong,
            textDecoration: "none",
            letterSpacing: "var(--track-display)",
            flexShrink: 0,
          }}
        >
          HO.
        </a>

        {/* Center links — hidden on mobile */}
        <div
          style={{
            alignItems: "center",
            gap: "2.5rem",
          }}
          className="hidden md:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "var(--t-label)",
                fontWeight: 500,
                letterSpacing: "var(--track-label)",
                textTransform: "uppercase",
                color: skin.ink,
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = skin.inkStrong)
              }
              onMouseLeave={(e) => (e.currentTarget.style.color = skin.ink)}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right — social icons + mobile hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          {/* GitHub */}
          <a
            href="https://github.com/Hephzibah-SO-Cu"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            style={{
              color: skin.ink,
              transition: "color 0.2s ease",
              display: "flex",
              alignItems: "center",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = skin.inkStrong)}
            onMouseLeave={(e) => (e.currentTarget.style.color = skin.ink)}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/hephzibah-so"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            style={{
              color: skin.ink,
              transition: "color 0.2s ease",
              display: "flex",
              alignItems: "center",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = skin.inkStrong)}
            onMouseLeave={(e) => (e.currentTarget.style.color = skin.ink)}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="flex md:hidden"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              color: skin.inkStrong,
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <span
              style={{
                display: "block",
                width: "20px",
                height: "1.5px",
                backgroundColor: skin.inkStrong,
                transition: "transform 0.3s ease, opacity 0.3s ease",
                transform: menuOpen
                  ? "translateY(6.5px) rotate(45deg)"
                  : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: "20px",
                height: "1.5px",
                backgroundColor: skin.inkStrong,
                transition: "opacity 0.3s ease",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: "20px",
                height: "1.5px",
                backgroundColor: skin.inkStrong,
                transition: "transform 0.3s ease, opacity 0.3s ease",
                transform: menuOpen
                  ? "translateY(-6.5px) rotate(-45deg)"
                  : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      <div
        className="flex md:hidden flex-col"
        style={{
          position: "fixed",
          top: menuOpen ? "88px" : "72px",
          left: "24px",
          right: "24px",
          background: "rgb(var(--cream-rgb) / 0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgb(var(--white-rgb) / 0.45)",
          borderRadius: "24px",
          boxShadow: "0 8px 32px rgb(var(--black-rgb) / 0.10)",
          zIndex: 49,
          overflow: "hidden",
          maxHeight: menuOpen ? "200px" : "0px",
          opacity: menuOpen ? 1 : 0,
          transition: "max-height 0.4s ease, opacity 0.3s ease, top 0.3s ease",
          padding: menuOpen ? "12px 0" : "0",
        }}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "var(--t-label)",
              fontWeight: 500,
              letterSpacing: "var(--track-label)",
              textTransform: "uppercase",
              /*
                The panel is its own cream surface, not the pill, so it does
                not follow the bar's tone: on a dark section that would put
                cream text on a cream panel.
              */
              color: "var(--warm-grey)",
              textDecoration: "none",
              padding: "14px 28px",
              display: "block",
              transition: "color 0.2s ease, background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--charcoal)";
              e.currentTarget.style.background =
                "rgb(var(--charcoal-rgb) / 0.04)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--warm-grey)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
