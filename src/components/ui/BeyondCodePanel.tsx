"use client";

import Image from "next/image";
import { BeyondCodeItem } from "@/lib/data/beyondCode";

interface BeyondCodePanelProps {
  item: BeyondCodeItem;
  index: number;
  total: number;
}

export default function BeyondCodePanel({
  item,
  index,
  total,
}: BeyondCodePanelProps) {
  let clipPath = "polygon(18% 0%, 100% 0%, 82% 100%, 0% 100%)";

  if (index === 0) {
    clipPath = "polygon(0% 0%, 100% 0%, 82% 100%, 0% 100%)";
  }

  if (index === total - 1) {
    clipPath = "polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%)";
  }
  return (
    <div
      className="beyond-panel"
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "70vh",
        transition: "all 0.45s ease",
        cursor: "pointer",

        /*
            These were read off window.innerWidth during render. The server
            has no window, so it always rendered the angled shape; the
            client on a narrow screen rendered the square one — a hydration
            mismatch, and a React error on every single page load.

            They are now custom properties that CSS overrides at the
            breakpoint, so both renders agree and the panels also respond to
            a resize, which the JavaScript version never did.
          */
        ["--panel-clip" as string]: clipPath,
        ["--panel-overlap" as string]: index === 0 ? "0px" : "-40px",

        clipPath: "var(--panel-clip)",
        marginLeft: "var(--panel-overlap)",
      }}
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="100vw"
        className="beyond-image"
        style={{
          objectFit: "cover",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgb(var(--black-rgb) / 0.82), rgb(var(--black-rgb) / 0.2))",
        }}
      />

      <div
        className="beyond-content"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "var(--t-body)",
            letterSpacing: "var(--track-label)",
            fontWeight: 600,
            marginBottom: "20px",
          }}
        >
          {item.title}
        </h3>

        <div className="beyond-subtitle">
          {item.subtitle.map((line) => (
            <p
              key={line}
              style={{
                marginBottom: "8px",
                fontFamily: "var(--font-inter)",
                fontSize: "var(--t-small)",
              }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
