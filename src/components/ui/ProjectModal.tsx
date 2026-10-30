"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Project } from "@/lib/data/projects";
import Button from "@/components/ui/Button";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const LABEL: React.CSSProperties = {
  margin: "0 0 14px",
  fontFamily: "var(--font-inter)",
  fontSize: "0.7rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "var(--accent-ink)",
};

const BODY: React.CSSProperties = {
  margin: 0,
  color: "var(--warm-grey)",
  fontSize: "0.95rem",
  lineHeight: 1.85,
  maxWidth: "66ch",
};

const SECTION: React.CSSProperties = {
  paddingBlock: "28px",
  borderTop: "1px solid rgba(107,101,96,0.14)",
};

/*
  A reading pane, not a long scroll.

  The old modal was one 840px column: a small screenshot at the top, then
  every section of prose stacked below it, so on a wide screen two thirds
  of the window was empty while the picture stayed postage-stamp sized and
  the text ran past it. Scrolling down also lost the screenshot entirely,
  which is the one thing a reader wants beside the words.

  From 1024px up it is two panes — the media stays put on the left while
  the writing scrolls on the right. Below that it stacks, media first.

  It is also an actual dialog now: labelled, modal to assistive tech,
  focus moved in on open, Tab trapped inside it, and focus returned to
  whatever opened it on close.
*/
export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const currentProjectId = project?.id;

  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  /*
    Opening a different project has to put the carousel back to its first
    screenshot. Doing that in an effect means an extra render pass with the
    old index still on screen; React's documented way to react to a changed
    prop is to adjust the state during render instead.
  */
  const [renderedProjectId, setRenderedProjectId] = useState(currentProjectId);

  if (currentProjectId !== renderedProjectId) {
    setRenderedProjectId(currentProjectId);
    setActiveIndex(0);
  }

  const shotCount = project?.screenshots.length ?? 0;

  const step = useCallback(
    (delta: number) => {
      if (!shotCount) return;
      setActiveIndex((i) => (i + delta + shotCount) % shotCount);
    },
    [shotCount],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!project) return;

      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);

      /*
        Without this, Tab walks straight out of the dialog and into the page
        behind it, which is still there and still scrollable.
      */
      if (event.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );

        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    },
    [project, onClose, step],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Lock the page behind, move focus in, and give it back on the way out.
  useEffect(() => {
    if (!project) return;

    openerRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      openerRef.current?.focus?.();
    };
  }, [project]);

  if (!project) return null;

  const isMobile = project.displayType === "mobile";
  const hasMultipleScreenshots = shotCount > 1;
  const titleId = `project-${project.id}-title`;

  const arrow = (direction: "prev" | "next") => (
    <button
      type="button"
      onClick={() => step(direction === "next" ? 1 : -1)}
      aria-label={
        direction === "next" ? "Next screenshot" : "Previous screenshot"
      }
      style={{
        width: "44px",
        height: "44px",
        borderRadius: "999px",
        border: "1px solid rgba(107,101,96,0.2)",
        background: "rgba(245,240,232,0.92)",
        backdropFilter: "blur(8px)",
        color: "var(--charcoal)",
        fontSize: "1rem",
        lineHeight: 1,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {direction === "next" ? "›" : "‹"}
    </button>
  );

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(28,28,26,0.8)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(12px, 3vh, 40px) clamp(12px, 3vw, 40px)",
        }}
      >
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          initial={{ opacity: 0, scale: 0.98, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 8 }}
          transition={{ duration: 0.22 }}
          onClick={(e) => e.stopPropagation()}
          className="project-dialog"
          style={{
            width: "min(1180px, 100%)",
            maxHeight: "min(880px, 94vh)",
            background: "var(--cream)",
            position: "relative",
            overflow: "hidden",
            outline: "none",
            boxShadow: "0 40px 120px rgba(0,0,0,0.45)",
          }}
        >
          <button
            onClick={onClose}
            aria-label="Close project details"
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              zIndex: 20,
              width: "44px",
              height: "44px",
              borderRadius: "999px",
              border: "1px solid rgba(107,101,96,0.18)",
              background: "rgba(245,240,232,0.94)",
              backdropFilter: "blur(10px)",
              color: "var(--charcoal)",
              fontSize: "0.95rem",
              cursor: "pointer",
            }}
          >
            ✕
          </button>

          <div className="project-dialog-grid">
            {/* MEDIA — stays put while the writing scrolls */}
            <div className="project-dialog-media">
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  flex: "1 1 auto",
                  minHeight: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(28,28,26,0.05)",
                }}
              >
                {isMobile ? (
                  <div
                    style={{
                      height: "min(100%, 460px)",
                      aspectRatio: "9 / 19.5",
                      borderRadius: "26px",
                      overflow: "hidden",
                      background: "#FFFFFF",
                      boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
                      position: "relative",
                      margin: "20px",
                    }}
                  >
                    <Image
                      src={project.screenshots[activeIndex]}
                      alt={`${project.title} screenshot ${activeIndex + 1} of ${shotCount}`}
                      fill
                      sizes="240px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ) : (
                  <Image
                    src={project.screenshots[activeIndex]}
                    alt={`${project.title} screenshot ${activeIndex + 1} of ${shotCount}`}
                    fill
                    sizes="(max-width: 1023px) 94vw, 56vw"
                    style={{ objectFit: "contain" }}
                  />
                )}

                {hasMultipleScreenshots && (
                  <>
                    <div
                      style={{
                        position: "absolute",
                        left: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    >
                      {arrow("prev")}
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    >
                      {arrow("next")}
                    </div>
                  </>
                )}
              </div>

              {hasMultipleScreenshots && (
                <div
                  style={{
                    flex: "0 0 auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "2px",
                    padding: "10px 12px",
                  }}
                >
                  {project.screenshots.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Show screenshot ${index + 1} of ${shotCount}`}
                      aria-current={index === activeIndex}
                      style={{
                        /*
                          The dot is 8px, but WCAG 2.5.8 asks for a 24px
                          target, so the button is 24px of transparent hit
                          area with the dot drawn inside it.
                        */
                        width: "24px",
                        height: "24px",
                        padding: 0,
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          width: index === activeIndex ? "22px" : "8px",
                          height: "8px",
                          borderRadius: "999px",
                          transition: "all 0.25s ease",
                          background:
                            index === activeIndex
                              ? "var(--charcoal)"
                              : "rgba(107,101,96,0.4)",
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* WRITING — the pane that scrolls */}
            <div className="project-dialog-copy">
              <p
                style={{
                  ...LABEL,
                  marginBottom: "10px",
                  color: "var(--warm-grey)",
                }}
              >
                {project.exhibitLabel ?? "Project"}
                {project.exhibitSubtitle ? ` — ${project.exhibitSubtitle}` : ""}
              </p>

              <h2
                id={titleId}
                style={{
                  margin: "0 0 12px",
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(1.6rem, 2.4vw, 2.5rem)",
                  lineHeight: 1.1,
                  color: "var(--charcoal)",
                }}
              >
                {project.title}
              </h2>

              <p
                style={{
                  ...BODY,
                  fontSize: "1rem",
                  color: "var(--charcoal)",
                  marginBottom: "18px",
                }}
              >
                {project.tagline}
              </p>

              <div
                style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}
                aria-label="Technologies"
              >
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "5px 10px",
                      border: "1px solid rgba(107,101,96,0.2)",
                      fontSize: "0.7rem",
                      letterSpacing: "0.04em",
                      color: "var(--warm-grey)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <section style={SECTION}>
                <h3 style={LABEL}>Story</h3>
                <p style={{ ...BODY, whiteSpace: "pre-line" }}>
                  {project.story}
                </p>
              </section>

              {project.role && (
                <section style={SECTION}>
                  <h3 style={LABEL}>Role</h3>
                  <p style={BODY}>{project.role}</p>
                </section>
              )}

              {project.highlights && project.highlights.length > 0 && (
                <section style={SECTION}>
                  <h3 style={LABEL}>Highlights</h3>
                  <ul
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      margin: 0,
                      paddingLeft: "20px",
                      listStyle: "disc",
                    }}
                    className="dialog-list"
                  >
                    {project.highlights.map((item) => (
                      <li key={item} style={BODY}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {project.contributions && project.contributions.length > 0 && (
                <section style={SECTION}>
                  <h3 style={LABEL}>Contributions</h3>
                  <ul
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      margin: 0,
                      paddingLeft: "20px",
                      listStyle: "disc",
                    }}
                    className="dialog-list"
                  >
                    {project.contributions.map((item) => (
                      <li key={item} style={BODY}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {project.caseStudy?.map((block) => (
                <section key={block.heading} style={SECTION}>
                  <h3 style={LABEL}>{block.heading}</h3>
                  <p style={{ ...BODY, whiteSpace: "pre-line" }}>
                    {block.body}
                  </p>
                </section>
              ))}

              {project.phoneScreenshots &&
                project.phoneScreenshots.length > 0 && (
                  <section style={SECTION}>
                    <h3 style={LABEL}>On a phone</h3>
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}
                    >
                      {project.phoneScreenshots.map((shot, i) => (
                        <div
                          key={shot}
                          style={{
                            width: "118px",
                            borderRadius: "16px",
                            overflow: "hidden",
                            background: "#FFFFFF",
                            boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                          }}
                        >
                          <div
                            style={{
                              position: "relative",
                              aspectRatio: "9 / 19.5",
                            }}
                          >
                            <Image
                              src={shot}
                              alt={`${project.title} on a phone, ${i + 1} of ${project.phoneScreenshots!.length}`}
                              fill
                              sizes="118px"
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

              {(project.liveUrl || project.githubUrl) && (
                <div
                  style={{
                    ...SECTION,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "12px",
                    paddingBottom: "4px",
                  }}
                >
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
                      GitHub
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
