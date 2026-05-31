"use client";

import { useState } from "react";
import { projects, Project } from "@/lib/data/projects";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectModal from "@/components/ui/ProjectModal";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const sectionRef = useScrollAnimation({ variant: "fadeUp" });
  const gridRef = useScrollAnimation({
    variant: "stagger",
    staggerChildren: ".project-card-wrapper",
    delay: 0.1,
  });

  return (
    <>
      <section
        id="projects"
        ref={sectionRef as React.RefObject<HTMLElement>}
        className="relative px-6 md:px-16 lg:px-24 py-24 md:py-36"
        style={{ backgroundColor: "var(--cream)" }}
      >
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span
            className="text-xs tracking-[0.25em] uppercase"
            style={{ color: "var(--accent)", fontFamily: "var(--font-inter)" }}
          >
            Work
          </span>
          <div className="h-px w-12" style={{ backgroundColor: "var(--accent)" }} />
          <span
            className="text-xs tracking-[0.25em] uppercase"
            style={{ color: "var(--warm-grey)", fontFamily: "var(--font-inter)" }}
          >
            03
          </span>
        </div>

        {/* Heading */}
        <div className="max-w-2xl mb-16">
          <h2
            className="font-bold leading-tight mb-4"
            style={{
              fontFamily: "var(--font-playfair)",
              color: "var(--charcoal)",
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
            }}
          >
            Selected work.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.95rem",
              color: "var(--warm-grey)",
              lineHeight: 1.75,
            }}
          >
            A mix of products I built solo, contributed to as part of a team, and
            shipped under real deadlines. Click any project to go deeper.
          </p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.map((project) => (
            <div key={project.id} className="project-card-wrapper">
              <ProjectCard project={project} onClick={setActiveProject} />
            </div>
          ))}
        </div>

        {/* Background number */}
        <div
          className="absolute right-6 md:right-16 pointer-events-none select-none"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(6rem, 18vw, 16rem)",
            fontWeight: 700,
            color: "var(--charcoal)",
            opacity: 0.03,
            lineHeight: 1,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          03
        </div>
      </section>

      {/* Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </>
  );
}
