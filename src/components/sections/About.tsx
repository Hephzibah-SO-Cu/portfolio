"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function About() {
  const sectionRef = useScrollAnimation({ variant: "fadeUp" });

  return (
    <section
      id="about"
      ref={sectionRef as React.RefObject<HTMLElement>}
      data-tone="light"
      data-section=""
      data-gutter=""
      style={{ backgroundColor: "var(--cream)" }}
    >
      {/* Section Label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-16"
      >
        <span
          className="text-xs tracking-[var(--track-label)] uppercase"
          style={{
            color: "var(--accent-ink)",
            fontFamily: "var(--font-inter)",
          }}
        >
          About
        </span>

        <div
          className="h-px w-12"
          style={{
            backgroundColor: "var(--accent)",
          }}
        />
      </motion.div>

      <div className="grid lg:grid-cols-[0.6fr_1.4fr] gap-12 lg:gap-16 items-start">
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="order-1"
        >
          <div className="lg:sticky lg:top-32 max-w-sm mx-auto">
            <Image
              src="/about/busayo.webp"
              alt="Busayo"
              width={900}
              height={1200}
              className="
                w-full
                h-auto
                object-cover
                rounded-sm
                transition-transform
                duration-700
                hover:scale-[1.02]
              "
            />
          </div>
        </motion.div>

        {/* Content */}
        <div className="order-2">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-bold leading-[1.02] mb-8"
            style={{
              fontFamily: "var(--font-inter)",
              color: "var(--charcoal)",
              fontSize: "var(--t-h2)",
              letterSpacing: "var(--track-display)",
            }}
          >
            Creative by instinct.
            <br />
            <span
              style={{
                color: "var(--warm-grey)",
              }}
            >
              Technical by choice.
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
            }}
            className="space-y-8"
            style={{
              color: "var(--warm-grey)",
              fontFamily: "var(--font-inter)",
              fontSize: "var(--t-body)",
              lineHeight: 1.75,
              maxWidth: "750px",
            }}
          >
            <p>
              We live in an age where AI can generate almost anything in
              seconds. Code, design, writing, music. But what it cannot give you
              is spontaneity, intuition and the ability to connect seemingly
              unrelated ideas into something meaningful. That kind of creativity
              is deeply human, and it is something I value and work towards
              every day.
            </p>

            <p>
              I focus primarily on frontend development because it allows me to
              bring ideas and solutions to life through functional, intuitive
              and beautiful interfaces. It sits at the intersection of logic and
              creativity, where imagination becomes something people can see,
              use and benefit from.
            </p>

            {/*
              The section's last line, and deliberately a line rather than a
              paragraph: it is a question the page answers later. Beyond Code
              is the other language. Darker and larger than the body around
              it so it reads as a close and not as a stray sentence.
            */}
            <p
              style={{
                color: "var(--charcoal)",
                fontSize: "var(--t-lead)",
                lineHeight: 1.6,
              }}
            >
              But code is just one of the languages I speak.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
