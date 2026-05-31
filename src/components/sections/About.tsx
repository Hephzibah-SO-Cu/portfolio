"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const skills = [
  {
    category: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion"],
  },
  {
    category: "Backend & Data",
    items: ["Supabase", "Convex", "Firebase", "PostgreSQL"],
  },
  {
    category: "Mobile",
    items: ["React Native", "Expo Router"],
  },
  {
    category: "State & Forms",
    items: ["Zustand", "Redux", "React Hook Form", "Zod"],
  },
  {
    category: "Also familiar",
    items: ["Vue", "Nuxt.js", "Angular", "WebSockets"],
  },
  {
    category: "Tools",
    items: ["Git", "Vercel", "Figma", "VS Code"],
  },
];

export default function About() {
  const sectionRef = useScrollAnimation({ variant: "fadeUp" });
  const skillsRef = useScrollAnimation({
    variant: "stagger",
    staggerChildren: ".skill-row",
    delay: 0.2,
  });

  return (
    <section
      id="about"
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
          About
        </span>
        <div className="h-px w-12" style={{ backgroundColor: "var(--accent)" }} />
        <span
          className="text-xs tracking-[0.25em] uppercase"
          style={{ color: "var(--warm-grey)", fontFamily: "var(--font-inter)" }}
        >
          02
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 max-w-6xl">
        {/* Left — copy */}
        <div>
          <h2
            className="font-bold leading-tight mb-8"
            style={{
              fontFamily: "var(--font-playfair)",
              color: "var(--charcoal)",
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
            }}
          >
            Creative by instinct.
            <br />
            <span style={{ color: "var(--warm-grey)" }}>Technical by choice.</span>
          </h2>

          <div
            className="space-y-5 text-base leading-relaxed"
            style={{ color: "var(--warm-grey)", fontFamily: "var(--font-inter)" }}
          >
            <p>
              AI can write logic in seconds. What it can&apos;t do — not without
              being handed the context first — is pull a reference from a Noir film,
              a Lagos street, and a brutalist poster and turn that collision into an
              interface that feels alive. That translation is the part I care about.
              That&apos;s the part I want to own.
            </p>
            <p>
              I chose frontend because backend felt like a box. Frontend is a canvas.
              You ship something and a real person opens it, sees it, feels something.
              That feedback loop is what keeps me in it.
            </p>
            <p>
              Before the code there was media — shooting services on a camcorder,
              mixing live camera feeds, directing videos, writing scripts,
              managing social channels. I still do it. Both worlds are just different
              ways of telling stories. Code happens to be one of my languages.
            </p>
            <p>
              I work thoroughly. I take attention to detail seriously, I think ahead,
              and I do my best work with people who are sharp and don&apos;t take
              themselves too seriously. If we can catch a vibe while shipping good
              work? Even better.
            </p>
          </div>
        </div>

        {/* Right — skills */}
        <div
          ref={skillsRef as React.RefObject<HTMLDivElement>}
          className="flex flex-col justify-center"
        >
          {skills.map((group) => (
            <div
              key={group.category}
              className="skill-row py-5"
              style={{ borderBottom: "1px solid rgba(107, 101, 96, 0.12)" }}
            >
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  marginBottom: "10px",
                }}
              >
                {group.category}
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {group.items.map((item) => (
                  <span
                    key={item}
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.8rem",
                      color: "var(--charcoal)",
                      border: "1px solid rgba(107, 101, 96, 0.18)",
                      padding: "4px 12px",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
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
        02
      </div>
    </section>
  );
}
