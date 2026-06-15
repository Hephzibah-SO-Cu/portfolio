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
      className="px-6 md:px-16 lg:px-24 py-12 md:py-12"
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
          className="text-xs tracking-[0.25em] uppercase"
          style={{
            color: "var(--accent)",
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
              src="/about/busayo.jpg"
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
              fontSize: "clamp(1.5rem, 2.5vw, 3rem)",
              letterSpacing: "-0.04em",
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
              fontSize: "1rem",
              lineHeight: 1.75,
              maxWidth: "750px",
            }}
          >
            <p>
              We live in an age where AI can generate almost anything in
              seconds. Code, design, writing, music. But what it cannot give
              you is spontaneity, intuition and the ability to connect
              seemingly unrelated ideas into something meaningful. That kind of
              creativity is deeply human, and it is something I value and work
              towards every day.
            </p>

            <p>
              I focus primarily on frontend development because it allows me to
              bring ideas and solutions to life through functional, intuitive
              and beautiful interfaces. It sits at the intersection of logic
              and creativity, where imagination becomes something people can
              see, use and benefit from.
              <br />
              However, code is just one of the languages I speak.
            </p>

            <p>
              Outside software, I spend time working with photography, media
              production and live technical operations. Whether I am behind a
              camera, managing a stream or designing a user interface, I am
              usually trying to do the same thing: tell stories, solve problems
              and create experiences that connect with people.
            </p>

            <p>
              I work thoroughly and take attention to detail seriously. I enjoy
              working with people who know where they want to go, remain open
              to new ideas and are willing to think differently. People whose
              imagination can go far, but who also care about execution and
              doing things well.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}