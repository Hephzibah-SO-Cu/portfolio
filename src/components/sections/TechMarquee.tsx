"use client";

const row1 = [
  { name: "Next.js", slug: "nextdotjs" },
  { name: "React", slug: "react" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "Supabase", slug: "supabase" },
  { name: "Firebase", slug: "firebase" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "Vercel", slug: "vercel" },
  { name: "Framer Motion", slug: "framer" },
  { name: "GSAP", slug: "greensock" },
];

const row2 = [
  { name: "Vue.js", slug: "vuedotjs" },
  { name: "Nuxt.js", slug: "nuxt" },
  { name: "Angular", slug: "angular" },
  { name: "Expo", slug: "expo" },
  { name: "Redux", slug: "redux" },
  { name: "Figma", slug: "figma" },
  { name: "Git", slug: "git" },
  { name: "Convex", slug: "convex" },
  { name: "VS Code", slug: "vscode" },
  { name: "Zod", slug: "zod" },
];

function LogoItem({ name, slug }: { name: string; slug: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        padding: "0 32px",
        flexShrink: 0,
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        const img = e.currentTarget.querySelector("img") as HTMLImageElement;
        const label = e.currentTarget.querySelector("span") as HTMLElement;
        if (img) { img.style.filter = "none"; img.style.opacity = "1"; }
        if (label) label.style.color = "var(--charcoal)";
      }}
      onMouseLeave={(e) => {
        const img = e.currentTarget.querySelector("img") as HTMLImageElement;
        const label = e.currentTarget.querySelector("span") as HTMLElement;
        if (img) { img.style.filter = "grayscale(100%)"; img.style.opacity = "0.45"; }
        if (label) label.style.color = "var(--warm-grey)";
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://cdn.simpleicons.org/${slug}`}
        alt={name}
        width={32}
        height={32}
        style={{
          width: "32px",
          height: "32px",
          objectFit: "contain",
          filter: "grayscale(100%)",
          opacity: 0.45,
          transition: "filter 0.3s ease, opacity 0.3s ease",
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.65rem",
          letterSpacing: "0.08em",
          color: "var(--warm-grey)",
          whiteSpace: "nowrap",
          transition: "color 0.3s ease",
        }}
      >
        {name}
      </span>
    </div>
  );
}

function MarqueeRow({
  items,
  direction = "left",
}: {
  items: typeof row1;
  direction?: "left" | "right";
}) {
  const doubled = [...items, ...items];
  return (
    <div
      style={{
        overflow: "hidden",
        width: "100%",
        maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "max-content",
          animation: `marquee-${direction} 30s linear infinite`,
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.animationPlayState = "running"; }}
      >
        {doubled.map((item, i) => (
          <LogoItem key={`${item.slug}-${i}`} name={item.name} slug={item.slug} />
        ))}
      </div>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <section
      style={{
        backgroundColor: "var(--cream)",
        paddingBottom: "80px",
        borderTop: "1px solid rgba(107, 101, 96, 0.08)",
      }}
    >
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>

      <div
        className="px-6 md:px-16 lg:px-24"
        style={{ padding: "48px 0 40px", display: "flex", alignItems: "center", gap: "16px" }}
      >
        <div className="px-6 md:px-16 lg:px-24 w-full flex items-center gap-4">
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            Tech Stack
          </span>
          <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(107, 101, 96, 0.12)" }} />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        <MarqueeRow items={row1} direction="left" />
        <MarqueeRow items={row2} direction="right" />
      </div>
    </section>
  );
}
