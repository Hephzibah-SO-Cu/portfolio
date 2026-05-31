"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

export default function Hero() {
  return (
    <section
  id="home"
  className="relative min-h-screen flex flex-col justify-center overflow-hidden pb-20"
  style={{ backgroundColor: "var(--cream)" }}
    >

      <div className="w-full px-6 md:px-16 lg:px-24">
        {/* Top label */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0.1}
        className="text-xs tracking-[0.25em] uppercase mb-8 md:mb-10"
        style={{ color: "var(--accent)", fontFamily: "var(--font-inter)" }}
      >
        Lagos, Nigeria — Available for work
      </motion.p>

      {/* Name block */}
      <div className="max-w-6xl">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.2}
          className="font-bold leading-[0.9] tracking-tight mb-6"
          style={{
            fontFamily: "var(--font-playfair)",
            color: "var(--charcoal)",
            fontSize: "clamp(3.5rem, 11vw, 9.5rem)",
          }}
        >
          Hephzibah
          <br />
          <span style={{ color: "var(--warm-grey)" }}>Oluwabusayo.</span>
        </motion.h1>

        {/* Divider + role */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.35}
          className="flex items-center gap-4 mb-8"
        >
          <div
            className="h-px w-12 shrink-0"
            style={{ backgroundColor: "var(--warm-grey)" }}
          />
          <p
            className="text-sm tracking-[0.15em] uppercase"
            style={{ color: "var(--warm-grey)", fontFamily: "var(--font-inter)" }}
          >
            Frontend &amp; Product Engineer
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.45}
          className="text-base md:text-lg leading-relaxed max-w-xl mb-12"
          style={{ color: "var(--warm-grey)", fontFamily: "var(--font-inter)" }}
        >
          I build fast, thoughtful digital products — social platforms,
          learning systems, and everything in between. I care about
          the detail and the outcome equally.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.55}
          className="flex flex-wrap gap-4"
        >
          <a
            href="#projects"
            className="px-8 py-4 text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:opacity-80"
            style={{
              backgroundColor: "var(--charcoal)",
              color: "var(--cream)",
              fontFamily: "var(--font-inter)",
            }}
          >
            View Work
          </a>
          <a
            href="#contact"
            className="px-8 py-4 text-xs tracking-[0.2em] uppercase border transition-all duration-300 hover:bg-(--charcoal) hover:text-(--cream)"
            style={{
              borderColor: "var(--charcoal)",
              color: "var(--charcoal)",
              fontFamily: "var(--font-inter)",
            }}
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-6 md:left-16 lg:left-24 flex items-center gap-3"
      >
        <motion.div
          animate={{ scaleX: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-10 h-px origin-left"
          style={{ backgroundColor: "var(--accent)" }}
        />
        <span
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{ color: "var(--warm-grey)", fontFamily: "var(--font-inter)" }}
        >
          Scroll
        </span>
      </motion.div>

      {/* Background number — editorial detail */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.04 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="absolute right-6 md:right-16 bottom-16 font-bold select-none pointer-events-none"
        style={{
          fontFamily: "var(--font-playfair)",
          color: "var(--charcoal)",
          fontSize: "clamp(8rem, 25vw, 22rem)",
          lineHeight: 1,
        }}
      >
        01
      </motion.span>
    </section>
  );
}
