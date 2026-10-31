"use client";

import BeyondCodePanel from "@/components/ui/BeyondCodePanel";
import { beyondCodeItems } from "@/lib/data/beyondCode";

export default function BeyondCode() {
  return (
    <section
      id="beyond-code"
      data-section=""
      style={{
        background: "var(--charcoal-deep)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "min(100%, max(87.5rem, 97vw))",
          margin: "0 auto",
          paddingInline: "var(--gutter)",
          marginBottom: "48px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "var(--t-label)",
            letterSpacing: "var(--track-label)",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "16px",
          }}
        >
          Beyond Code
        </p>

        {/*
          The headline used to read "The things I do when I'm not building
          software", which is a caption for the section rather than an
          argument for it — and the eyebrow directly above already says as
          much. What earns these panels a place on an engineer's portfolio
          is that they are the same work in different tools, so that is what
          the headline says now, with the setup below it.
        */}
        <h2
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "var(--t-h2)",
            color: "var(--cream)",
            marginBottom: "18px",
            maxWidth: "30ch",
          }}
        >
          Tell stories, solve problems, create experiences that connect with
          people.
        </h2>

        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "var(--t-small)",
            lineHeight: 1.8,
            color: "rgb(var(--cream-rgb) / 0.62)",
            maxWidth: "58ch",
          }}
        >
          Outside software, I spend time working with photography, media
          production and live technical operations. Whether I&apos;m behind a
          camera, managing a stream or designing a user interface, I&apos;m
          usually trying to do the same thing.
        </p>
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
