"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
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
          maxWidth: "1200px",
          height: "60px",
          borderRadius: "9999px",
          background: scrolled
            ? "rgba(245, 240, 232, 0.82)"
            : "rgba(245, 240, 232, 0.60)",
          backdropFilter: scrolled ? "blur(20px)" : "blur(12px)",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.45)",
          boxShadow: scrolled
            ? "0 8px 32px rgba(0, 0, 0, 0.10)"
            : "0 4px 20px rgba(0, 0, 0, 0.06)",
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 28px",
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
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "var(--charcoal)",
            textDecoration: "none",
            letterSpacing: "-0.02em",
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
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--warm-grey)",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--charcoal)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--warm-grey)")
              }
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
              color: "var(--warm-grey)",
              transition: "color 0.2s ease",
              display: "flex",
              alignItems: "center",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--charcoal)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--warm-grey)")
            }
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
              color: "var(--warm-grey)",
              transition: "color 0.2s ease",
              display: "flex",
              alignItems: "center",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--charcoal)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--warm-grey)")
            }
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
              color: "var(--charcoal)",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <span
              style={{
                display: "block",
                width: "20px",
                height: "1.5px",
                backgroundColor: "var(--charcoal)",
                transition: "transform 0.3s ease, opacity 0.3s ease",
                transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: "20px",
                height: "1.5px",
                backgroundColor: "var(--charcoal)",
                transition: "opacity 0.3s ease",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: "20px",
                height: "1.5px",
                backgroundColor: "var(--charcoal)",
                transition: "transform 0.3s ease, opacity 0.3s ease",
                transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
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
          background: "rgba(245, 240, 232, 0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.45)",
          borderRadius: "24px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.10)",
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
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--warm-grey)",
              textDecoration: "none",
              padding: "14px 28px",
              display: "block",
              transition: "color 0.2s ease, background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--charcoal)";
              e.currentTarget.style.background = "rgba(28, 28, 26, 0.04)";
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
