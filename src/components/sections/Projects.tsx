"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { projects, Project } from "@/lib/data/projects";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectModal from "@/components/ui/ProjectModal";

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const railRef = useRef<HTMLDivElement>(null);

  const orderedProjects = useMemo(
    () =>
      [
        projects.find((p) => p.id === "chedcom"),
        projects.find((p) => p.id === "hng-connect"),
        projects.find((p) => p.id === "framez"),
        projects.find((p) => p.id === "audiophile"),
        projects.find((p) => p.id === "dlms-cu"),
      ].filter(Boolean) as Project[],
    [],
  );

  useEffect(() => {
    const rail = railRef.current;

    if (!rail) return;

    const framezIndex = orderedProjects.findIndex(
      (project) => project.id === "framez",
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
  }, [orderedProjects]);

  return (
    <>
      <section
        id="projects"
        className="relative py-24 md:py-24"
        style={{
          background: "var(--cream)",
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
    textAlign: "center",
  }}
>
  <div
    style={{
      maxWidth: "720px",
      margin: "0 auto",
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

    <p
      style={{
        fontFamily: "var(--font-inter)",
        color: "var(--warm-grey)",
        lineHeight: 1.8,
        fontSize: "0.95rem",
      }}
    >
      Selected projects across web, mobile, and full-stack development.
      <br />
      Scroll horizontally to explore projects. Hover to preview.
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
            padding: "40px 24px 40px",
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
