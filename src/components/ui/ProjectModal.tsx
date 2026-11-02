"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Project } from "@/lib/data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const LABEL: React.CSSProperties = {
  margin: "0 0 14px",
  fontFamily: "var(--font-inter)",
  fontSize: "var(--t-label)",
  fontWeight: "var(--weight-label)",
  letterSpacing: "var(--track-label)",
  textTransform: "uppercase",
  color: "var(--accent-ink)",
};

const SECTION: React.CSSProperties = {
  marginTop: "26px",
  paddingTop: "22px",
  borderTop: "1px solid rgb(var(--grey-rgb) / 0.18)",
};

const BODY: React.CSSProperties = {
  margin: 0,
  color: "var(--warm-grey)",
  fontSize: "var(--t-small)",
  lineHeight: 1.85,
  maxWidth: "66ch",
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
        /*
          44px so it clears the WCAG 2.5.8 target minimum with room.
        */
        width: "44px",
        height: "44px",
        borderRadius: "999px",
        border: "1px solid rgb(var(--grey-rgb) / 0.2)",
        background: "rgb(var(--cream-rgb) / 0.92)",
        backdropFilter: "blur(8px)",
        color: "var(--charcoal)",
        fontSize: "var(--t-body)",
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
          background: "rgb(var(--charcoal-rgb) / 0.8)",
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
            /*
              A flex column, so the grid below gets a DEFINITE height to be
              bounded by. With only max-height here, the grid's own
              `height: 100%` stayed indefinite, its row resolved to
              max-content, and the bottom of every case study was clipped
              away unreachably. The close button is absolutely positioned,
              so the grid is the only child this has to size.
            */
            display: "flex",
            flexDirection: "column",
            outline: "none",
            boxShadow: "0 40px 120px rgb(var(--black-rgb) / 0.45)",
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
              border: "1px solid rgb(var(--grey-rgb) / 0.18)",
              background: "rgb(var(--cream-rgb) / 0.94)",
              backdropFilter: "blur(10px)",
              color: "var(--charcoal)",
              fontSize: "var(--t-small)",
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
                  /*
                    The dialog's own cream, not a grey tint.

                    Every browser screenshot here is landscape and this pane
                    is nearly square, so a wide shot letterboxes top and
                    bottom and the phone shot letterboxes left and right. On
                    a tinted pane that reads as two grey bands; on the same
                    colour as the dialog it reads as a mount, and the image
                    simply sits on the page. It is the trick the rail cards
                    already use.
                  */
                  background: "var(--cream)",
                  padding: "clamp(16px, 2vw, 32px)",
                }}
              >
                {isMobile ? (
                  <div
                    style={{
                      height: "min(100%, 460px)",
                      aspectRatio: "9 / 19.5",
                      borderRadius: "26px",
                      overflow: "hidden",
                      background: "var(--white)",
                      boxShadow: "0 24px 60px rgb(var(--black-rgb) / 0.18)",
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

                {hasMultipleScreenshots && <></>}
              </div>

              {/*
                The screenshot controls, below the picture rather than on it.

                They used to float over the image, and these are screenshots
                of websites — the Zowasel storefront has a carousel of its
                own, so the dialog's left arrow landed 15px from the
                storefront's left arrow and the two were indistinguishable.
                A control that sits inside the thing it is pointing at will
                be read as part of it.
              */}
              {hasMultipleScreenshots && (
                <div
                  style={{
                    flex: "0 0 auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    padding: "6px 12px 14px",
                  }}
                >
                  {arrow("prev")}

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
                              : "rgb(var(--grey-rgb) / 0.4)",
                        }}
                      />
                    </button>
                  ))}

                  {arrow("next")}
                </div>
              )}
            </div>

            {/* WRITING — the pane that scrolls */}
            {/*
              Focusable, because it is now a scrollable region: before the
              grid was bounded nothing in this dialog scrolled at all, so
              there was nothing for a keyboard user to miss. There is now,
              and a pane you can only read with a mouse is a pane some
              readers do not have.
            */}
            <div className="project-dialog-copy">
              <div className="dialog-head">
                {/*
                  No eyebrow. It read "CURRENT WORK — B2B AGRICULTURAL
                  MARKETPLACE": the exhibit label repeated from the rail,
                  the subtitle repeating what the description underneath
                  says in plainer words, in uppercase above the title. It
                  was the first thing a reader met and it told them nothing
                  the next two lines did not.
                */}
                <h2
                  id={titleId}
                  style={{
                    margin: "0 0 6px",
                    /*
                      The same setting as a job title in Where I've Worked:
                      Inter, bold, body size, a title's leading.

                      It was the display serif at --t-h2 — 33px of Didone
                      over a panel of 13.6px prose, which read as a magazine
                      cover stapled to a document. A case study is something
                      you read, and the heading it most resembles on this
                      site is a job title, not a masthead.
                    */
                    fontFamily: "var(--font-inter)",
                    fontSize: "var(--t-h2)",
                    fontWeight: "var(--weight-strong)",
                    lineHeight: 1.15,
                    letterSpacing: "var(--track-display)",
                    color: "var(--charcoal)",
                  }}
                >
                  {project.title}
                </h2>

                <p
                  style={{
                    ...BODY,
                    /*
                      Three steps, not two. The title, this, and the stack
                      were 16 / 13.6 / 13.6 — the description and the stack
                      set identically, so the panel had a title and then one
                      undifferentiated block. It is --t-h2 / --t-body /
                      --t-label now, and each step is visible.
                    */
                    fontSize: "var(--t-body)",
                    lineHeight: 1.55,
                    color: "var(--warm-grey)",
                    marginBottom: "16px",
                  }}
                >
                  {project.tagline}
                </p>

                {/*
                The stack, as a line rather than as chips.

                Nine bordered boxes above a panel of prose was the loudest
                thing in the dialog, and the loudest thing in it should not
                be a list of libraries. Same information, set like the rest
                of the writing — the tools are context for the case study,
                not its headline.
              */}
                <p
                  style={{
                    ...BODY,
                    /*
                      Caption size, not label size. The three steps are
                      --t-h2 / --t-body / --t-caption; putting this at
                      --t-label would have made it the only thing on the
                      site at label size and NOT medium weight, which is the
                      one rule the type test enforces — and it was right to,
                      because something set at label size reads as a label.
                    */
                    lineHeight: 1.7,
                    marginTop: "10px",
                    /*
                      Full --warm-grey, not a faded one. At 0.8 over cream
                      this composited to roughly 3.3:1, under the 4.5:1 that
                      12px text needs, and axe caught it on the next run.
                      The line is quiet because it is small, which is the
                      right way to make a line quiet.
                    */
                    color: "var(--warm-grey)",
                  }}
                  aria-label="Built with"
                >
                  {project.tags.join("  ·  ")}
                </p>
              </div>

              {/*
                The scrollable one is this, not the pane around it, so this
                is the one that has to be reachable from a keyboard. That is
                the third time on this site that a region started scrolling
                and lost the focusable contents that used to make it
                reachable — the rail when its cards became images, this pane
                when the dialog first learned to scroll, and now here, with
                the links moved out to the cards and the headings no longer
                buttons. Worth saying out loud: a scroll container that
                holds only prose is never keyboard-reachable by accident.
              */}
              <div
                className="dialog-body"
                tabIndex={0}
                role="region"
                aria-label="Case study details"
              >
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
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "14px",
                        }}
                      >
                        {project.phoneScreenshots.map((shot, i) => (
                          <div
                            key={shot}
                            style={{
                              width: "118px",
                              borderRadius: "16px",
                              overflow: "hidden",
                              background: "var(--white)",
                              boxShadow:
                                "0 12px 30px rgb(var(--black-rgb) / 0.12)",
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
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
