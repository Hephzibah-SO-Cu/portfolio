"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Project } from "@/lib/data/projects";
import Button from "@/components/ui/Button";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const statusConfig = {
  live: { label: "Live", color: "#3B6D11", bg: "#EAF3DE" },
  "case-study": { label: "Case Study", color: "#185FA5", bg: "#E6F1FB" },
  "in-progress": { label: "In Progress", color: "#8B5E3C", bg: "#F5EDE4" },
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [project?.id]);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && project)
        setActiveIndex((i) => (i + 1) % project.screenshots.length);
      if (e.key === "ArrowLeft" && project)
        setActiveIndex((i) => (i - 1 + project.screenshots.length) % project.screenshots.length);
    },
    [onClose, project]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const hasMultiple = project ? project.screenshots.length > 1 : false;

  return (
    <AnimatePresence>
      {project && (() => {
        const status = statusConfig[project.status];
        return (
          // Overlay is the flex container — it centers the panel
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(28, 28, 26, 0.75)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              zIndex: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
            }}
          >
            {/* Panel — no position/transform needed, flex parent centers it */}
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: "1000px",
                maxHeight: "85vh",
                backgroundColor: "var(--cream)",
                overflowY: "auto",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              {/* Left — Gallery */}
              <div
                style={{
                  backgroundColor: project.displayType === "mobile" ? "#1C1C1A" : "#F0EBE3",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: project.displayType === "mobile" ? "40px 24px" : "0",
                  position: "relative",
                  minHeight: "400px",
                }}
              >
                {project.displayType === "mobile" ? (
                  <div
                    style={{
                      width: "200px",
                      borderRadius: "36px",
                      border: "2px solid rgba(255,255,255,0.15)",
                      overflow: "hidden",
                      position: "relative",
                      boxShadow: "0 32px 64px rgba(0,0,0,0.5)",
                      backgroundColor: "#000",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "64px",
                        height: "16px",
                        backgroundColor: "#000",
                        borderRadius: "8px",
                        zIndex: 2,
                      }}
                    />
                    <div style={{ aspectRatio: "9/19.5", position: "relative" }}>
                      <Image
                        src={project.screenshots[activeIndex]}
                        alt={`${project.title} screenshot ${activeIndex + 1}`}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="200px"
                      />
                    </div>
                  </div>
                ) : (
                  <div style={{ width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "10px 14px",
                        backgroundColor: "#E8E3DC",
                      }}
                    >
                      {["#E57373", "#FFB74D", "#81C784"].map((c, i) => (
                        <div
                          key={i}
                          style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            backgroundColor: c,
                            opacity: 0.7,
                          }}
                        />
                      ))}
                    </div>
                    <div style={{ aspectRatio: "16/9", position: "relative" }}>
                      <Image
                        src={project.screenshots[activeIndex]}
                        alt={`${project.title} screenshot ${activeIndex + 1}`}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="500px"
                      />
                    </div>
                  </div>
                )}

                {/* Navigation arrows */}
                {hasMultiple && (
                  <>
                    <button
                      onClick={() =>
                        setActiveIndex((i) => (i - 1 + project.screenshots.length) % project.screenshots.length)
                      }
                      style={{
                        position: "absolute",
                        left: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "rgba(255,255,255,0.15)",
                        border: "1px solid rgba(255,255,255,0.25)",
                        borderRadius: "50%",
                        width: "36px",
                        height: "36px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        color: project.displayType === "mobile" ? "#fff" : "var(--charcoal)",
                        fontSize: "1.2rem",
                        lineHeight: 1,
                      }}
                      aria-label="Previous"
                    >
                      ‹
                    </button>
                    <button
                      onClick={() =>
                        setActiveIndex((i) => (i + 1) % project.screenshots.length)
                      }
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "rgba(255,255,255,0.15)",
                        border: "1px solid rgba(255,255,255,0.25)",
                        borderRadius: "50%",
                        width: "36px",
                        height: "36px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        color: project.displayType === "mobile" ? "#fff" : "var(--charcoal)",
                        fontSize: "1.2rem",
                        lineHeight: 1,
                      }}
                      aria-label="Next"
                    >
                      ›
                    </button>

                    {/* Dot indicators */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "16px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        display: "flex",
                        gap: "6px",
                      }}
                    >
                      {project.screenshots.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveIndex(i)}
                          style={{
                            width: i === activeIndex ? "20px" : "6px",
                            height: "6px",
                            borderRadius: "3px",
                            backgroundColor:
                              i === activeIndex ? "var(--accent)" : "rgba(255,255,255,0.4)",
                            border: "none",
                            cursor: "pointer",
                            padding: 0,
                            transition: "width 0.3s ease, background 0.3s ease",
                          }}
                          aria-label={`Screenshot ${i + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Right — Details */}
              <div
                style={{
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  overflowY: "auto",
                }}
              >
                {/* Close button */}
                <button
                  onClick={onClose}
                  style={{
                    alignSelf: "flex-end",
                    background: "none",
                    border: "1px solid rgba(107, 101, 96, 0.2)",
                    borderRadius: "50%",
                    width: "32px",
                    height: "32px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--warm-grey)",
                    fontSize: "0.9rem",
                    flexShrink: 0,
                  }}
                  aria-label="Close modal"
                >
                  ✕
                </button>

                {/* Status + title */}
                <div>
                  <span
                    style={{
                      fontSize: "0.65rem",
                      fontFamily: "var(--font-inter)",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "4px 10px",
                      borderRadius: "4px",
                      backgroundColor: status.bg,
                      color: status.color,
                      display: "inline-block",
                      marginBottom: "12px",
                    }}
                  >
                    {status.label}
                  </span>
                  <h2
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "1.75rem",
                      fontWeight: 700,
                      color: "var(--charcoal)",
                      lineHeight: 1.1,
                      marginBottom: "6px",
                    }}
                  >
                    {project.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.8rem",
                      color: "var(--warm-grey)",
                    }}
                  >
                    {project.tagline}
                  </p>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.85rem",
                    color: "var(--warm-grey)",
                    lineHeight: 1.8,
                  }}
                >
                  {project.description}
                </p>

                {/* Contributions */}
                {project.isTeamProject && project.contributions && (
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "var(--accent)",
                        marginBottom: "12px",
                      }}
                    >
                      My contributions
                    </p>
                    <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {project.contributions.map((item, i) => (
                        <li
                          key={i}
                          style={{
                            display: "flex",
                            gap: "10px",
                            fontFamily: "var(--font-inter)",
                            fontSize: "0.8rem",
                            color: "var(--warm-grey)",
                            lineHeight: 1.6,
                          }}
                        >
                          <span style={{ color: "var(--accent)", flexShrink: 0, marginTop: "2px" }}>—</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.08em",
                        color: "var(--warm-grey)",
                        border: "1px solid rgba(107, 101, 96, 0.25)",
                        padding: "4px 10px",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", paddingTop: "8px" }}>
                  {project.liveUrl && (
                    <Button
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="filled"
                      size="sm"
                      showArrow
                    >
                      Live Site
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                      size="sm"
                    >
                      {project.isTeamProject ? "View Repo" : "GitHub"}
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        );
      })()}
    </AnimatePresence>
  );
}
