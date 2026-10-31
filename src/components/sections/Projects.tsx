"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { projects, Project } from "@/lib/data/projects";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectModal from "@/components/ui/ProjectModal";

/* The one arrow mark the rail uses, mirrored rather than drawn twice. */
function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{
        transform: direction === "left" ? "rotate(180deg)" : undefined,
      }}
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const railRef = useRef<HTMLDivElement>(null);
  const [centeredIndex, setCenteredIndex] = useState(3);

  const orderedProjects = useMemo(
    () =>
      [
        /*
          Framez sits dead centre of seven, with three either side. It is the
          only mobile app here, so it is the only card with different
          proportions — it earns the middle on shape, and the rail's centre
          card is the one that scales up. Strongest work nearest the middle.
        */
        projects.find((p) => p.id === "chedcom"),
        projects.find((p) => p.id === "zowasel-website"),
        projects.find((p) => p.id === "zowasel-marketplace"),
        projects.find((p) => p.id === "framez"),
        projects.find((p) => p.id === "hng-connect"),
        projects.find((p) => p.id === "audiophile"),
        projects.find((p) => p.id === "dlms-cu"),
      ].filter(Boolean) as Project[],
    [],
  );

  const centreOfRail = orderedProjects.findIndex((p) => p.id === "framez");

  const centred = orderedProjects[centeredIndex];

  /*
    Which card is nearest the middle of the rail. This is the whole
    mechanic: on a real shelf the card you are looking at would come
    forward on the z axis, and we only have x and y, so it scales up
    instead and everything else shrinks back behind it.

    Prominence therefore follows POSITION, not the pointer — which is why
    it behaves identically on a phone, where there is no hover at all.
  */
  const measure = useCallback(() => {
    const rail = railRef.current;

    if (!rail) return;

    const railCentre = rail.scrollLeft + rail.clientWidth / 2;

    let nearest = 0;
    let shortest = Infinity;

    Array.from(rail.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const cardCentre = el.offsetLeft + el.offsetWidth / 2;
      const distance = Math.abs(cardCentre - railCentre);

      if (distance < shortest) {
        shortest = distance;
        nearest = i;
      }
    });

    setCenteredIndex(nearest);
  }, []);

  /*
    Where the rail is HEADING, as opposed to where it currently is.

    centeredIndex follows the scroll POSITION, and the scroll is smooth, so
    it does not change until the movement has finished. Two quick taps of
    Next therefore both read the same index and both ask for the same card,
    and the second tap does nothing at all.

    Stepping goes through here instead. It is state rather than a ref, and
    it is set with a functional updater, so a second tap composes onto the
    first one's result even inside the same React batch — which is exactly
    the case a ref could not fix and the compiler would not allow anyway.
  */
  const [target, setTarget] = useState<number | null>(null);

  /*
    The rail has arrived, so there is no longer a destination. Adjusted
    during render rather than in an effect, which is the pattern React asks
    for and which ESLint enforces here.
  */
  if (target !== null && target === centeredIndex) setTarget(null);

  const scrollToIndex = useCallback((index: number) => {
    const rail = railRef.current;

    if (!rail) return;

    const clamped = Math.max(0, Math.min(index, rail.children.length - 1));
    const card = rail.children[clamped] as HTMLElement | undefined;

    if (!card) return;

    rail.scrollTo({
      left: card.offsetLeft - rail.clientWidth / 2 + card.offsetWidth / 2,
      behavior: "smooth",
    });
  }, []);

  const step = useCallback(
    (delta: number) => {
      setTarget((pending) => (pending ?? centeredIndex) + delta);
    },
    [centeredIndex],
  );

  useEffect(() => {
    if (target !== null) scrollToIndex(target);
  }, [target, scrollToIndex]);

  // Open with Framez centred, then let scrolling take over.
  useEffect(() => {
    const rail = railRef.current;

    if (!rail || centreOfRail === -1) return;

    const centre = () => {
      const card = rail.children[centreOfRail] as HTMLElement | undefined;

      if (!card) return;

      rail.scrollLeft =
        card.offsetLeft - rail.clientWidth / 2 + card.offsetWidth / 2;

      measure();
    };

    /*
      Done once on mount this lands on the wrong card: the images have not
      loaded, so the cards report stale widths, and scroll-snap then pulls
      the rail back to the first card. Centre after a frame, and again when
      the images that set those widths have actually arrived.
    */
    const frame = requestAnimationFrame(() => requestAnimationFrame(centre));

    const images = Array.from(rail.querySelectorAll("img"));
    const pending = images.filter((img) => !img.complete);

    let outstanding = pending.length;

    const onLoad = () => {
      outstanding -= 1;
      if (outstanding <= 0) centre();
    };

    pending.forEach((img) => {
      img.addEventListener("load", onLoad, { once: true });
      img.addEventListener("error", onLoad, { once: true });
    });

    return () => {
      cancelAnimationFrame(frame);
      pending.forEach((img) => {
        img.removeEventListener("load", onLoad);
        img.removeEventListener("error", onLoad);
      });
    };
  }, [centreOfRail, measure]);

  useEffect(() => {
    const rail = railRef.current;

    if (!rail) return;

    // rAF-throttled: scroll fires far more often than we need to re-measure.
    let frame = 0;

    const onScroll = () => {
      if (frame) return;

      frame = requestAnimationFrame(() => {
        frame = 0;
        measure();
      });
    };

    const release = () => {
      setTarget(null);
    };

    rail.addEventListener("scroll", onScroll, { passive: true });
    rail.addEventListener("wheel", release, { passive: true });
    rail.addEventListener("pointerdown", release, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      rail.removeEventListener("scroll", onScroll);
      rail.removeEventListener("wheel", release);
      rail.removeEventListener("pointerdown", release);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  /*
    Arrow keys while the pointer is simply OVER the rail, not only while it
    has focus. A reader with a mouse has no reason to have clicked the rail
    first, and the keys are the fastest way through seven projects.

    Guarded so it never steals a key from a form field or from the open
    case-study dialog, which has arrows of its own.
  */
  const hoveringRef = useRef(false);

  const enter = useCallback(() => {
    hoveringRef.current = true;
  }, []);

  const leave = useCallback(() => {
    hoveringRef.current = false;
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!hoveringRef.current || activeProject) return;
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;

      const tag = (document.activeElement?.tagName ?? "").toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return;

      event.preventDefault();
      step(event.key === "ArrowRight" ? 1 : -1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeProject, step]);

  return (
    <>
      <section
        id="projects"
        className="relative"
        data-section=""
        style={{
          background: "var(--cream)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            maxWidth: "min(100%, max(87.5rem, 97vw))",
            margin: "0 auto",
            paddingInline: "var(--gutter)",
            marginBottom: "24px",
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
                fontSize: "var(--t-label)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--accent-ink)",
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
                fontSize: "var(--t-small)",
              }}
            >
              Selected projects across web, mobile, and full-stack development.
              <br />
              Scroll sideways — whichever project reaches the middle comes
              forward.
            </p>
          </div>
        </div>

        {/* Gallery Rail */}
        {/*
          Three ways through the rail, because a swipe only exists on two of
          the three devices this is read on:

          - the buttons, which are the only affordance an external mouse
            can see at all — its wheel scrolls the page straight past the
            work, and hijacking the wheel would fight the reader on the way
            down;
          - a click on any card that is not already in the middle, which
            brings it there instead of opening it;
          - the arrow keys, whenever the pointer is over the rail or the
            rail has focus.

          The rail also takes focus itself: once the cards became images
          with no links inside them, there was nothing in the scroll region
          to focus, so a keyboard user could not move it at all.
        */}
        <div className="rail-shell" onMouseEnter={enter} onMouseLeave={leave}>
          <button
            type="button"
            className="rail-arrow"
            data-dir="prev"
            aria-label="Previous project"
            disabled={centeredIndex === 0}
            onClick={() => step(-1)}
          >
            <Chevron direction="left" />
          </button>

          <button
            type="button"
            className="rail-arrow"
            data-dir="next"
            aria-label="Next project"
            disabled={centeredIndex === orderedProjects.length - 1}
            onClick={() => step(1)}
          >
            <Chevron direction="right" />
          </button>

          <div
            ref={railRef}
            data-rail=""
            role="region"
            aria-label="Selected work, use the left and right arrow keys"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key !== "ArrowRight" && event.key !== "ArrowLeft")
                return;

              event.preventDefault();
              scrollToIndex(
                centeredIndex + (event.key === "ArrowRight" ? 1 : -1),
              );
            }}
            style={{
              display: "flex",
              gap: "var(--card-gap)",
              overflowX: "auto",
              overflowY: "hidden",
              /*
              The side padding is what lets the FIRST and LAST cards reach
              the middle of the rail. Without it they can never be centred,
              so they could never come forward. It is half the widest a card
              gets, and has to move whenever the card width does.
            */
              paddingBlock: "20px",
              paddingInline:
                "max(var(--gutter), calc(50% - var(--card-w) / 2))",
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {orderedProjects.map((project, i) => (
              <div
                key={project.id}
                style={{
                  flex: "0 0 auto",
                  width:
                    project.displayType === "mobile"
                      ? "min(34vw, var(--card-w-mobile))"
                      : "min(76vw, var(--card-w))",
                  scrollSnapAlign: "center",
                }}
              >
                <ProjectCard
                  project={project}
                  onDetails={setActiveProject}
                  isCentered={i === centeredIndex}
                  onSelect={() =>
                    i === centeredIndex
                      ? setActiveProject(project)
                      : scrollToIndex(i)
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/*
          One caption for the whole rail, spanning the page, that simply
          changes as a different project reaches the middle.

          It used to live inside each card. That made every card reserve
          height for text it was not showing — a band of dead space down
          the section — and Framez's caption, trying to be wider than its
          own narrow card, drifted off centre.

          aria-live so the change is announced; a fixed min-height so the
          page does not jump between a one-line and a two-line description.
        */}
        <div className="rail-caption" aria-live="polite" data-rail-caption="">
          <h3>{centred?.title}</h3>
          <p>{centred?.tagline}</p>

          {centred && (
            <div className="card-touch-actions">
              {centred.liveUrl && (
                <a
                  href={centred.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Site
                </a>
              )}

              {centred.githubUrl && (
                <a
                  href={centred.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              )}

              <button type="button" onClick={() => setActiveProject(centred)}>
                View Details
              </button>
            </div>
          )}
        </div>
      </section>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </>
  );
}
