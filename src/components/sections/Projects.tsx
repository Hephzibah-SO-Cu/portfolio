"use client";

import { useEffect, useRef, useState } from "react";
import { projects, Project } from "@/lib/data/projects";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectModal from "@/components/ui/ProjectModal";

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const railRef = useRef<HTMLDivElement>(null);

  const orderedProjects = [
  projects.find((p) => p.id === "chedcom"),
  projects.find((p) => p.id === "hng-connect"),
  projects.find((p) => p.id === "framez"),
  projects.find((p) => p.id === "audiophile"),
  projects.find((p) => p.id === "dlms-cu"),
].filter(Boolean) as Project[];

  useEffect(() => {
    const rail = railRef.current;

    if (!rail) return;

    const framezIndex = orderedProjects.findIndex(
  (project) => project.id === "framez"
);

    if (framezIndex === -1) return;

    const cards = rail.children;

    const framezCard = cards[framezIndex] as HTMLElement;

    if (!framezCard) return;

    const centerPosition =
      framezCard.offsetLeft -
      rail.clientWidth / 2 +
      framezCard.clientWidth / 2;

    rail.scrollTo({
      left: centerPosition,
      behavior: "instant" as ScrollBehavior,
    });
  }, []);

  return (
    <>
      <section
        id="projects"
        style={{
          background: "#F1ECE4",
          padding: "8rem 0",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 24px",
            marginBottom: "48px",
          }}
        >
          <div
            style={{
              maxWidth: "640px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.75rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "16px",
              }}
            >
              Selected Work
            </p>

            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                lineHeight: 1,
                color: "var(--charcoal)",
                marginBottom: "18px",
              }}
            >
              Selected Work.
            </h2>

            <p
              style={{
                fontFamily: "var(--font-inter)",
                color: "var(--warm-grey)",
                lineHeight: 1.8,
                fontSize: "0.95rem",
              }}
            >
              Scroll horizontally to explore projects.
              Hover to preview.
              Click to learn more.
            </p>
          </div>
        </div>

        {/* Gallery Rail */}
        <div
          ref={railRef}
          style={{
            display: "flex",
            gap: "24px",
            overflowX: "auto",
            overflowY: "hidden",
            padding: "0 24px 24px",
            scrollSnapType: "x proximity",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {orderedProjects.map((project) => (
            <div
              key={project.id}
              style={{
                flex: "0 0 auto",
                 width:
                  project.displayType === "mobile"
                    ? "clamp(260px, 22vw, 320px)"
                    : "clamp(420px, 40vw, 560px)",
                scrollSnapAlign: "center",
              }}
            >
              <ProjectCard
                project={project}
                onDetails={setActiveProject}
              />
            </div>
          ))}
        </div>
      </section>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </>
  );
}