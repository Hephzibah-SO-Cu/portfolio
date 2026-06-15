"use client";

import BeyondCodePanel from "@/components/ui/BeyondCodePanel";
import { beyondCodeItems } from "@/lib/data/beyondCode";

export default function BeyondCode() {
  return (
    <section
      id="beyond-code"
      style={{
        background: "#141414",
        padding: "5rem 0",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 24px",
          marginBottom: "48px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.75rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#B88A6A",
            marginBottom: "16px",
          }}
        >
          Beyond Code
        </p>

        <h2
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
            color: "#F5F1EB",
            marginBottom: "18px",
          }}
        >
          The things I do when I&apos;m not building software.
        </h2>
      </div>

      <div
        className="beyond-rail"
        style={{
          display: "flex",
          height: "70vh",

          paddingLeft: "0",
          overflow: "hidden",
        }}
      >
        {beyondCodeItems.map((item, index) => (
          <BeyondCodePanel
            key={item.title}
            item={item}
            index={index}
            total={beyondCodeItems.length}
          />
        ))}
      </div>

    </section>
  );
}