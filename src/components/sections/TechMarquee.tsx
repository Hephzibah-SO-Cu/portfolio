"use client";

import Image from "next/image";

const row1 = [
  "nextjs",
  "reactjs",
  "typescript",
  "javascript",
  "tailwindcss",
  "redux",
  "zustand",
  "framermotion",
  "gsap",
  "reactnative",
  "expo",
];

const row2 = [
  "supabase",
  "firebase",
  "mongodb",
  "postgresql",
  "convex",
  "git",
  "github",
  "vercel",
  "figma",
  "vscode",
  "zod",
];

function MarqueeRow({
  items,
  direction,
}: {
  items: string[];
  direction: "left" | "right";
}) {
  const doubled = [...items, ...items];

  return (
    <div className="marquee-row">
      <div
        className={`marquee-track ${
          direction === "left"
            ? "marquee-left"
            : "marquee-right"
        }`}
      >
        {doubled.map((logo, index) => (
          <div
            key={`${logo}-${index}`}
            className="marquee-logo"
          >
            <Image
              src={`/marquee/${logo}.${
                logo === "javascript" ||
                logo === "supabase"
                  ? "jpg"
                  : "png"
              }`}
              alt={logo}
              width={120}
              height={60}
              style={{
                width: "auto",
                height: "90px",
                objectFit: "contain",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <section
      style={{
        backgroundColor: "var(--cream)",
        paddingBottom: "60px",
      }}
    >
      <style>{`
        .marquee-container:hover .marquee-track {
          animation-play-state: paused;
        }

        .marquee-row {
          overflow: hidden;
          width: 100%;
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
        }

        .marquee-track {
          display: flex;
          align-items: center;
          gap: 72px;
          width: max-content;
          padding: 12px 0;
        }

        .marquee-left {
          animation: marquee-left 45s linear infinite;
        }

        .marquee-right {
          animation: marquee-right 45s linear infinite;
        }

        .marquee-logo {
          opacity: .65;
          transition:
            opacity .25s ease,
            transform .25s ease;
          flex-shrink: 0;
        }

        .marquee-logo:hover {
          opacity: 1;
          transform: translateY(-2px);
        }

        @keyframes marquee-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-right {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>

      <div
        className="px-6 md:px-16 lg:px-24"
        style={{
          padding: "12px 0 32px",
        }}
      >
        <div className="px-6 md:px-16 lg:px-24 w-full flex items-center gap-4">
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            What I Build With
          </span>

          <div
            style={{
              flex: 1,
              height: "1px",
              backgroundColor:
                "rgba(107,101,96,.12)",
            }}
          />
        </div>
      </div>

      <div
        className="marquee-container"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <MarqueeRow
          items={row1}
          direction="left"
        />

        <MarqueeRow
          items={row2}
          direction="right"
        />
      </div>
    </section>
  );
}