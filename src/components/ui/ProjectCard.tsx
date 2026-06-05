"use client";

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

  return (
    <article
      style={{
        position: "relative",
        cursor: "pointer",
        transition: "transform 0.35s ease",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          project.id === "framez"
            ? "translateY(24px)"
            : "translateY(0)";
      }}
    >
      {/* IMAGE AREA */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: isMobile ? "4 / 5" : "4 / 3",
          overflow: "hidden",
          background: "#F1ECE4",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          transform:
            project.id === "framez"
              ? "translateY(-24px)"
              : "translateY(0)",

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

              background: "#FFFFFF",

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
            }}
          />
        )}

        {/* HOVER OVERLAY */}
        <div
          style={{
            position: "absolute",
            inset: 0,

            background:
              "linear-gradient(to top, rgba(28,28,26,0.92), rgba(28,28,26,0.45))",

            opacity: 0,
            transition: "opacity 0.3s ease",

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",

            textAlign: "center",

            padding: "32px",
          }}
          className="project-overlay"
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "0";
          }}
        >
          <p
            style={{
              color: "#FFFFFF",
              fontSize: "1rem",
              lineHeight: 1.8,
              marginBottom: "24px",
              fontFamily: "var(--font-inter)",
              maxWidth: "85%",
            }}
          >
            {project.tagline}
          </p>

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
            margin: 0,
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