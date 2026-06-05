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

export default function ProjectModal({
  project,
  onClose,
}: ProjectModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const currentProjectId = project?.id;

  useEffect(() => {
  if (project) {
    setActiveIndex(0);
  }
}, [currentProjectId]);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!project) return;

      if (e.key === "Escape") {
        onClose();
      }

      if (
        e.key === "ArrowRight" &&
        project.screenshots.length > 1
      ) {
        setActiveIndex(
          (prev) =>
            (prev + 1) % project.screenshots.length
        );
      }

      if (
        e.key === "ArrowLeft" &&
        project.screenshots.length > 1
      ) {
        setActiveIndex(
          (prev) =>
            (prev - 1 + project.screenshots.length) %
            project.screenshots.length
        );
      }
    },
    [project, onClose]
  );

  useEffect(() => {
    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [handleKeyDown]);

  if (!project) return null;
  

  const isMobile =
    project.displayType === "mobile";

  const hasMultipleScreenshots =
    project.screenshots.length > 1;

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background:
            "rgba(28,28,26,0.78)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter:
            "blur(8px)",
          zIndex: 100,
          overflowY: "auto",
          padding: "32px 16px",
        }}
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.97,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0.97,
          }}
          transition={{
            duration: 0.25,
          }}
          onClick={(e) =>
            e.stopPropagation()
          }
          style={{
            width: "100%",
            maxWidth: "840px",
            margin: "0 auto",
            background:
              "var(--cream)",
            position: "relative",
          }}
        >
          {/* CLOSE BUTTON */}

          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              display: "flex",
              justifyContent: "flex-end",
              padding: "20px 20px 0",
              pointerEvents: "none",
            }}
          >
            <button
              onClick={onClose}
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "999px",
                border:
                  "1px solid rgba(107,101,96,0.15)",
                background:
                  "rgba(241,236,228,0.92)",
                backdropFilter:
                  "blur(10px)",
                cursor: "pointer",
                pointerEvents: "auto",
              }}
            >
              ✕
            </button>
          </div>

          <div
            style={{
              padding:
                "0 24px 48px",
            }}
          >
            {/* IMAGE */}

            <div
              style={{
                marginBottom: "24px",
              }}
            >
              {isMobile ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "center",
                  }}
                >
                  <div
                    style={{
                      width: "280px",
                      borderRadius:
                        "32px",
                      overflow:
                        "hidden",
                      background:
                        "#FFFFFF",
                      boxShadow:
                        "0 24px 60px rgba(0,0,0,0.15)",
                    }}
                  >
                    <div
                      style={{
                        aspectRatio:
                          "9 / 19.5",
                        position:
                          "relative",
                      }}
                    >
                      <Image
                        src={
                          project
                            .screenshots[
                            activeIndex
                          ]
                        }
                        alt={
                          project.title
                        }
                        fill
                        sizes="280px"
                        style={{
                          objectFit:
                            "cover",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    position:
                      "relative",
                    aspectRatio:
                      "16 / 9",
                    overflow:
                      "hidden",
                  }}
                >
                  <Image
                    src={
                      project
                        .screenshots[
                        activeIndex
                      ]
                    }
                    alt={
                      project.title
                    }
                    fill
                    sizes="840px"
                    style={{
                      objectFit:
                        "cover",
                    }}
                  />
                </div>
              )}
            </div>

            {/* SCREENSHOT DOTS */}

            {hasMultipleScreenshots && (
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "center",
                  gap: "10px",
                  marginBottom:
                    "40px",
                }}
              >
                {project.screenshots.map(
                  (_, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        setActiveIndex(
                          index
                        )
                      }
                      style={{
                        width:
                          index ===
                          activeIndex
                            ? "24px"
                            : "8px",
                        height: "8px",
                        borderRadius:
                          "999px",
                        border:
                          "none",
                        cursor:
                          "pointer",
                        transition:
                          "all 0.25s ease",
                        background:
                          index ===
                          activeIndex
                            ? "var(--charcoal)"
                            : "rgba(107,101,96,0.3)",
                      }}
                    />
                  )
                )}
              </div>
            )}

            {/* HEADER */}

            <div
              style={{
                marginBottom:
                  "40px",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  marginBottom:
                    "12px",

                  fontFamily:
                    "var(--font-inter)",

                  fontSize:
                    "0.9rem",

                  letterSpacing:
                    "0.22em",

                  textTransform:
                    "uppercase",

                  color:
                    "var(--charcoal)",
                }}
              >
                {project.title}
              </h2>

              <p
                style={{
                  margin: 0,
                  marginBottom:
                    "20px",

                  color:
                    "var(--warm-grey)",

                  fontSize:
                    "1rem",

                  lineHeight:
                    1.8,
                }}
              >
                {project.tagline}
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap:
                    "wrap",
                  gap: "8px",
                }}
              >
                {project.tags.map(
                  (tag) => (
                    <span
                      key={tag}
                      style={{
                        padding:
                          "6px 12px",
                        border:
                          "1px solid rgba(107,101,96,0.15)",
                        fontSize:
                          "0.75rem",
                        color:
                          "var(--warm-grey)",
                      }}
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* STORY */}

            <section
              style={{
                marginBottom:
                  "40px",
              }}
            >
              <h3
                style={{
                  fontSize:
                    "0.75rem",

                  letterSpacing:
                    "0.18em",

                  textTransform:
                    "uppercase",

                  color:
                    "var(--accent)",

                  marginBottom:
                    "16px",
                }}
              >
                Story
              </h3>

              <p
                style={{
                  color:
                    "var(--warm-grey)",
                  lineHeight:
                    1.9,
                }}
              >
                {project.story}
              </p>
            </section>

            {/* ROLE */}

            {project.role && (
              <section
                style={{
                  marginBottom:
                    "40px",
                }}
              >
                <h3
                  style={{
                    fontSize:
                      "0.75rem",
                    letterSpacing:
                      "0.18em",
                    textTransform:
                      "uppercase",
                    color:
                      "var(--accent)",
                    marginBottom:
                      "16px",
                  }}
                >
                  Role
                </h3>

                <p
                  style={{
                    color:
                      "var(--warm-grey)",
                    lineHeight:
                      1.9,
                  }}
                >
                  {project.role}
                </p>
              </section>
            )}

            {/* HIGHLIGHTS */}

            {project.highlights &&
              project.highlights
                .length > 0 && (
                <section
                  style={{
                    marginBottom:
                      "40px",
                  }}
                >
                  <h3
                    style={{
                      fontSize:
                        "0.75rem",
                      letterSpacing:
                        "0.18em",
                      textTransform:
                        "uppercase",
                      color:
                        "var(--accent)",
                      marginBottom:
                        "16px",
                    }}
                  >
                    Highlights
                  </h3>

                  <ul
                    style={{
                      display:
                        "flex",
                      flexDirection:
                        "column",
                      gap: "12px",
                    }}
                  >
                    {project.highlights.map(
                      (
                        item
                      ) => (
                        <li
                          key={
                            item
                          }
                          style={{
                            color:
                              "var(--warm-grey)",
                            lineHeight:
                              1.8,
                          }}
                        >
                          {item}
                        </li>
                      )
                    )}
                  </ul>
                </section>
              )}

            {/* CONTRIBUTIONS */}

            {project
              .contributions &&
              project.contributions
                .length > 0 && (
                <section
                  style={{
                    marginBottom:
                      "40px",
                  }}
                >
                  <h3
                    style={{
                      fontSize:
                        "0.75rem",
                      letterSpacing:
                        "0.18em",
                      textTransform:
                        "uppercase",
                      color:
                        "var(--accent)",
                      marginBottom:
                        "16px",
                    }}
                  >
                    Contributions
                  </h3>

                  <ul
                    style={{
                      display:
                        "flex",
                      flexDirection:
                        "column",
                      gap: "14px",
                    }}
                  >
                    {project.contributions.map(
                      (
                        item
                      ) => (
                        <li
                          key={
                            item
                          }
                          style={{
                            color:
                              "var(--warm-grey)",
                            lineHeight:
                              1.9,
                          }}
                        >
                          {item}
                        </li>
                      )
                    )}
                  </ul>
                </section>
              )}

            {/* ACTIONS */}

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                paddingTop:
                  "12px",
              }}
            >
              {project.liveUrl && (
                <Button
                  href={
                    project.liveUrl
                  }
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
                  href={
                    project.githubUrl
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="sm"
                >
                  GitHub
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}