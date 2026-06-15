"use client";

import { useState } from "react";
import Image from "next/image";
import { Project } from "@/lib/data/projects";

interface ProjectCardProps {
  project: Project;
  onDetails: (project: Project) => void;
}

export default function ProjectCard({
  project,
  onDetails,
}: ProjectCardProps) {
  const isMobile = project.displayType === "mobile";

  const [hovered, setHovered] = useState(false);

  return (
    <article
      style={{
        position: "relative",
        cursor: "pointer",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: "20px",
        transition:
          "transform 0.35s ease, box-shadow 0.35s ease",

        transform:
          hovered
            ? project.id === "framez"
              ? "scale(1.07)"
              : "scale(1.03)"
            : project.id === "framez"
              ? "scale(1.05)"
              : "scale(1)",

        boxShadow:
          hovered
            ? "0 30px 80px rgba(0,0,0,0.22)"
            : project.id === "framez"
              ? "0 24px 60px rgba(0,0,0,0.15)"
              : "0 10px 30px rgba(0,0,0,0.08)",

        zIndex: hovered ? 20 : 1,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* IMAGE AREA */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: isMobile ? "4 / 5" : "4 / 3",
          overflow: "hidden",
          background: "var(--cream)",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          transition: "all 0.35s ease",
        }}
      >
        {isMobile ? (
          <div
            style={{
              position: "relative",
              width: "190px",
              height: "390px",

              borderRadius: "32px",
              overflow: "hidden",

              background: "var(--cream)",

              boxShadow: "0 24px 60px rgba(0,0,0,0.15)",

              border: "4px solid #E9F0EA",
            }}
          >
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              sizes="190px"
              style={{
                objectFit: "cover",
                transition: "transform 0.45s ease",
                transform: hovered ? "scale(1.08)" : "scale(1)",
              }}
            />
          </div>
        ) : (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="(max-width:768px) 100vw, 40vw"
            style={{
              objectFit: "cover",
              transition: "transform 0.45s ease",
              transform: hovered ? "scale(1.08)" : "scale(1)",
            }}
          />
        )}

        {/* HOVER OVERLAY */}
        <div
          style={{
            position: "absolute",
            inset: 0,

            background:
              "linear-gradient(to top, rgba(28,28,26,0.72), rgba(28,28,26,0.35))",

            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",

            textAlign: "center",

            padding: "32px",
          }}
          className="project-overlay"

        >

          <div
            style={{
              display: "flex",
              gap: "12px",
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
                  padding: "12px 18px",
                  background: "#FFFFFF",
                  color: "#1C1C1A",
                  textDecoration: "none",
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  fontFamily: "var(--font-inter)",
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
                  padding: "12px 18px",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.35)",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  fontFamily: "var(--font-inter)",
                }}
              >
                GitHub
              </a>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDetails(project);
              }}
              style={{
                padding: "12px 18px",
                border: "1px solid rgba(255,255,255,0.35)",
                background: "transparent",
                color: "#FFFFFF",
                fontSize: "0.75rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                fontWeight: 600,
                fontFamily: "var(--font-inter)",
              }}
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* TITLE BELOW IMAGE */}
      <div
        style={{
          textAlign: "center",
          marginTop: "24px",
        }}
      >
        <h3
          style={{
            margin: 0,
            marginBottom: "8px",

            fontFamily: "var(--font-inter)",
            fontSize: "0.8rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",

            color: "var(--charcoal)",
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            margin: 20,
            fontFamily: "var(--font-inter)",
            color: "var(--warm-grey)",
            fontSize: "0.9rem",
            lineHeight: 1.6,
          }}
        >
          {project.tagline}
        </p>
      </div>
    </article>
  );
}