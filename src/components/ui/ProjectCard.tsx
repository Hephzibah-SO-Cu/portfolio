"use client";

import { useState } from "react";
import Image from "next/image";
import { Project } from "@/lib/data/projects";

interface ProjectCardProps {
  project: Project;
  onDetails: (project: Project) => void;
  /** True while this card is the one nearest the middle of the rail. */
  isCentered?: boolean;
  /**
   * A click anywhere on the card. The rail decides what that means: bring
   * this card to the middle, or — if it is already there — open it.
   */
  onSelect?: () => void;
}

/*
  A card is an image and nothing else.

  The title and description used to sit under each card. That forced every
  card to reserve height for text it was not showing, left a band of dead
  space down the whole section, and — because Framez's card is the narrow
  one — pushed its caption off to one side trying to be wider than its
  own container. The caption now lives once, outside the rail, and simply
  changes as a different project reaches the middle. See Projects.tsx.

  What remains here:

  - The media container is the only element that moves. It is the card on
    the shelf, and it is what scales up when it reaches the middle and
    shrinks back behind when it does not. On a real shelf it would come
    forward on the z axis; we only have x and y, so it grows instead.

*/
export default function ProjectCard({
  project,
  onDetails,
  isCentered = false,
  onSelect,
}: ProjectCardProps) {
  const isMobile = project.displayType === "mobile";

  const [hovered, setHovered] = useState(false);

  const actionStyle = {
    padding: "10px 16px",
    fontSize: "var(--t-label)",
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    fontWeight: 600,
    fontFamily: "var(--font-inter)",
    textDecoration: "none",
  };

  return (
    <article
      style={{
        position: "relative",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onSelect}
    >
      {/* MEDIA — the only part that moves */}
      <div
        style={{
          position: "relative",
          width: "100%",
          /*
            One height for every card, phone or browser. The wider browser
            screenshots sit centred inside it with cream above and below —
            invisible, because that is the section's own colour — and the
            phone fills it. Without this the mobile card was half as tall
            again as its neighbours and the rail lurched as it scrolled.
          */
          height: "var(--card-h)",
          overflow: "hidden",
          background: "var(--cream)",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          transition:
            "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.45s ease, opacity 0.45s ease",

          transform: isCentered
            ? hovered
              ? "scale(1.04)"
              : "scale(1)"
            : "scale(0.86)",

          opacity: isCentered ? 1 : 0.72,

          boxShadow: isCentered
            ? "0 24px 60px rgba(0,0,0,0.20)"
            : "0 6px 18px rgba(0,0,0,0.07)",

          zIndex: isCentered ? 20 : 1,
        }}
      >
        {isMobile ? (
          <div
            style={{
              position: "relative",
              /* fills the shared box height; width follows the phone's ratio */
              height: "calc(var(--card-h) - 16px)",
              aspectRatio: "124 / 254",

              borderRadius: "20px",
              overflow: "hidden",

              background: "var(--cream)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.15)",
              border: "3px solid #E9F0EA",
            }}
          >
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              sizes="124px"
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="(max-width:768px) 76vw, 21vw"
            /* contain, so the whole page shows — navbar included */
            style={{ objectFit: "contain" }}
          />
        )}

        {/* HOVER OVERLAY — the centred card only, where hover exists */}
        <div
          className="project-overlay"
          style={{
            position: "absolute",
            inset: 0,

            background:
              "linear-gradient(to top, rgba(28,28,26,0.78), rgba(28,28,26,0.45))",

            opacity: hovered && isCentered ? 1 : 0,
            pointerEvents: hovered && isCentered ? "auto" : "none",
            transition: "opacity 0.3s ease",

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",

            textAlign: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  ...actionStyle,
                  background: "#FFFFFF",
                  color: "#1C1C1A",
                }}
              >
                Live Site
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  ...actionStyle,
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.35)",
                  color: "#FFFFFF",
                }}
              >
                GitHub
              </a>
            )}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDetails(project);
              }}
              style={{
                ...actionStyle,
                border: "1px solid rgba(255,255,255,0.35)",
                background: "transparent",
                color: "#FFFFFF",
                cursor: "pointer",
              }}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
