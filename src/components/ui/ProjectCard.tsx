"use client";

import Image from "next/image";
import { Project } from "@/lib/data/projects";

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

const statusConfig = {
  live: { label: "Live", color: "#3B6D11", bg: "#EAF3DE" },
  "case-study": { label: "Case Study", color: "#185FA5", bg: "#E6F1FB" },
  "in-progress": { label: "In Progress", color: "#8B5E3C", bg: "#F5EDE4" },
};

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const status = statusConfig[project.status];

  return (
    <article
      onClick={() => onClick(project)}
      style={{
        backgroundColor: "var(--white)",
        border: "1px solid rgba(107, 101, 96, 0.12)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 16px 40px rgba(28, 28, 26, 0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Thumbnail */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        {project.displayType === "browser" ? (
          <>
            {/* Browser chrome */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 14px",
                backgroundColor: "#F0EBE3",
                borderBottom: "1px solid rgba(107, 101, 96, 0.12)",
              }}
            >
              {["#E57373", "#FFB74D", "#81C784"].map((color, i) => (
                <div
                  key={i}
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: color,
                    opacity: 0.7,
                  }}
                />
              ))}
            </div>
            <div style={{ aspectRatio: "16/9", position: "relative" }}>
              <Image
                src={project.thumbnail}
                alt={`${project.title} preview`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
              />
            </div>
          </>
        ) : (
          // Mobile — dark background with centered portrait screenshot
          <div
            style={{
              backgroundColor: "#1C1C1A",
              aspectRatio: "16/9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "90px",
                borderRadius: "16px",
                border: "1.5px solid rgba(255,255,255,0.15)",
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
              }}
            >
              <div style={{ aspectRatio: "9/19.5", position: "relative" }}>
                <Image
                  src={project.thumbnail}
                  alt={`${project.title} preview`}
                  fill
                  sizes="90px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Hover overlay */}
        <div
          className="card-overlay"
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(28, 28, 26, 0)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(28, 28, 26, 0.35)";
            const label = e.currentTarget.querySelector(".overlay-label") as HTMLElement;
            if (label) label.style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(28, 28, 26, 0)";
            const label = e.currentTarget.querySelector(".overlay-label") as HTMLElement;
            if (label) label.style.opacity = "0";
          }}
        >
          <span
            className="overlay-label"
            style={{
              color: "var(--white)",
              fontFamily: "var(--font-inter)",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              opacity: 0,
              transition: "opacity 0.3s ease",
            }}
          >
            View Project →
          </span>
        </div>
      </div>

      {/* Card body */}
      <div
        style={{
          padding: "20px 24px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          flex: 1,
        }}
      >
        {/* Title + status */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.2rem",
              fontWeight: 700,
              color: "var(--charcoal)",
              lineHeight: 1.2,
            }}
          >
            {project.title}
          </h3>
          <span
            style={{
              flexShrink: 0,
              fontSize: "0.6rem",
              fontFamily: "var(--font-inter)",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "3px 8px",
              borderRadius: "4px",
              backgroundColor: status.bg,
              color: status.color,
            }}
          >
            {status.label}
          </span>
        </div>

        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.8rem",
            color: "var(--warm-grey)",
            lineHeight: 1.6,
          }}
        >
          {project.tagline}
        </p>

        {/* Top 4 tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "auto" }}>
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.6rem",
                letterSpacing: "0.08em",
                color: "var(--warm-grey)",
                border: "1px solid rgba(107, 101, 96, 0.2)",
                padding: "3px 8px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
