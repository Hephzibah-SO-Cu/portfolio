"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={{
        position: "fixed",
        bottom: "16px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "calc(100% - 48px)",
        maxWidth: "1200px",
        height: "52px",
        borderRadius: "9999px",
        background: scrolled
          ? "rgba(245, 240, 232, 0.82)"
          : "rgba(245, 240, 232, 0.60)",
        backdropFilter: scrolled ? "blur(20px)" : "blur(12px)",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.45)",
        boxShadow: scrolled
          ? "0 -4px 24px rgba(0, 0, 0, 0.08)"
          : "0 -2px 16px rgba(0, 0, 0, 0.05)",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        transition:
          "background 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      {/* Copyright */}
      <span
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.65rem",
          letterSpacing: "0.1em",
          color: "var(--warm-grey)",
        }}
      >
        © {new Date().getFullYear()} HO.
      </span>

      {/* Logotype */}
      <span
        style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "1rem",
          fontWeight: 700,
          color: "var(--charcoal)",
          letterSpacing: "-0.02em",
        }}
      >
        HO.
      </span>

      {/* Back to top */}
      <button
        onClick={scrollToTop}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--font-inter)",
          fontSize: "0.65rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--warm-grey)",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: 0,
          transition: "color 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "var(--charcoal)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "var(--warm-grey)";
        }}
        aria-label="Back to top"
      >
        <span>Top</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 10V2M6 2L2 6M6 2L10 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </footer>
  );
}
