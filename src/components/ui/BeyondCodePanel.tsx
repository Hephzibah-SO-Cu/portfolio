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
  total
}: BeyondCodePanelProps) {
  let clipPath =
  "polygon(18% 0%, 100% 0%, 82% 100%, 0% 100%)";

if (index === 0) {
  clipPath =
    "polygon(0% 0%, 100% 0%, 82% 100%, 0% 100%)";
}

if (index === total - 1) {
  clipPath =
    "polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%)";
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

          clipPath:
            typeof window !== "undefined" && window.innerWidth <= 768
              ? "none"
              : clipPath,

          marginLeft:
              typeof window !== "undefined" && window.innerWidth <= 768
                ? "0"
                : index === 0
                  ? "0"
                  : "-40px",
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
            "linear-gradient(to top, rgba(0,0,0,0.82), rgba(0,0,0,0.2))",
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
            fontSize: "1rem",
            letterSpacing: "0.25em",
            fontWeight: 600,
            marginBottom: "20px",
          }}
        >
          {item.title}
        </h3>

        <div
          className="beyond-subtitle"
        >
          {item.subtitle.map((line) => (
            <p
              key={line}
              style={{
                marginBottom: "8px",
                fontFamily: "var(--font-inter)",
                fontSize: "0.95rem",
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