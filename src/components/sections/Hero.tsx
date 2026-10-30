"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/*
  Every size here is a function of the viewport, anchored so that a 1440px
  screen renders exactly what it rendered before. Above 1440 the whole
  composition scales up together instead of stranding a 1440 layout in a
  wide window; below it, it scales down instead of stepping at breakpoints.

  The one thing that is NOT centred vertically is the content column. It
  used to be, with a -160px margin pulling it up, which made the eyebrow's
  distance from the fixed navbar a function of viewport HEIGHT: 97px of
  clearance at 1440x900, 37px at 1024x768, and -87px at 320x568, where
  "Lagos, Nigeria" was clipped off the top of the screen. It now starts at
  a measured offset that can never be smaller than the navbar's footprint.
*/
export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-svh overflow-hidden"
      style={{ backgroundColor: "var(--charcoal)" }}
    >
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/hero/hero-bg.webp"
          alt=""
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,.45) 100%)",
        }}
      />

      {/* BUSAYO watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ transform: "translateY(-12vh)" }}
      >
        <motion.h1
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="select-none"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(7rem,16vw,28rem)",
            opacity: 0.04,
            color: "#fff",
            letterSpacing: "-0.06em",
            lineHeight: 1,
          }}
        >
          BUSAYO
        </motion.h1>
      </div>

      {/* Main content */}
      <div
        className="relative z-20 min-h-svh flex items-start"
        style={{
          paddingInline: "var(--gutter)",
          /*
            Never less than the navbar's footprint, and 18vh on anything
            tall enough to afford it — which lands at 162px on 1440x900,
            where it sat before.
          */
          paddingTop: "max(calc(var(--nav-safe) + 1.5rem), 18vh)",
          paddingBottom: "clamp(7rem, 20vh, 14rem)",
        }}
      >
        <div style={{ width: "min(100%, max(26rem, 40vw))" }}>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
            }}
            className="uppercase tracking-[0.35em]"
            style={{
              color: "#F5F0E8",
              fontSize: "clamp(0.7rem, 0.84vw, 1rem)",
              marginBottom: "1.25rem",
            }}
          >
            Lagos, Nigeria
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 40 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
            }}
            className="h-px"
            style={{
              backgroundColor: "#C7A06A",
              marginTop: "1rem",
              /* was a flat 160px, which is a third of a phone screen */
              marginBottom: "clamp(2rem, 9vh, 9rem)",
            }}
          />

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.2,
            }}
            style={{
              fontFamily: "var(--font-playfair)",
              color: "#F5F0E8",
              fontSize: "clamp(1.75rem, 3vw, 5rem)",
              lineHeight: 0.95,
            }}
          >
            Software Engineer
            <span style={{ color: "var(--accent)" }}>.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
            }}
            className="leading-relaxed"
            style={{
              color: "#E7E0D8",
              marginTop: "1rem",
              fontSize: "clamp(0.95rem, 1.39vw, 1.75rem)",
              maxWidth: "clamp(16rem, 31vw, 38rem)",
            }}
          >
            Building web, mobile and full-stack products.
          </motion.p>

          <div
            className="flex flex-wrap"
            style={{
              gap: "clamp(0.75rem, 1.1vw, 1.5rem)",
              marginTop: "clamp(1.75rem, 2.8vw, 3.5rem)",
            }}
          >
            <motion.a
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.7,
              }}
              href="#projects"
              whileHover={{
                y: -2,
                boxShadow: "0 10px 25px rgba(0,0,0,.18)",
              }}
              whileTap={{ scale: 0.98 }}
              className="group uppercase tracking-[0.2em] flex items-center transition-all duration-300"
              style={{
                background: "var(--cream)",
                color: "var(--charcoal)",
                textDecoration: "none",
                fontSize: "clamp(0.7rem, 0.84vw, 1rem)",
                padding:
                  "clamp(0.85rem, 1.11vw, 1.35rem) clamp(1rem, 2.22vw, 2.75rem)",
                gap: "clamp(0.6rem, 0.83vw, 1rem)",
                whiteSpace: "nowrap",
              }}
            >
              View Work
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                ↗
              </span>
            </motion.a>

            <motion.a
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.7,
              }}
              href="#contact"
              whileHover={{
                y: -2,
                backgroundColor: "rgba(199,160,106,.08)",
              }}
              whileTap={{ scale: 0.98 }}
              className="group uppercase tracking-[0.2em] border flex items-center transition-all duration-300"
              style={{
                borderColor: "#C7A06A",
                color: "#F5F0E8",
                textDecoration: "none",
                fontSize: "clamp(0.7rem, 0.84vw, 1rem)",
                padding:
                  "clamp(0.85rem, 1.11vw, 1.35rem) clamp(1rem, 2.22vw, 2.75rem)",
                gap: "clamp(0.6rem, 0.83vw, 1rem)",
                whiteSpace: "nowrap",
              }}
            >
              Get In Touch
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </motion.a>
          </div>
        </div>
      </div>

      {/* Cream gradient circle */}
      <motion.div
        animate={{
          opacity: [0.7, 1, 0.7],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 -translate-y-1/2 z-5 hidden lg:block"
        style={{
          right: "10%",
          width: "clamp(18rem, 35vw, 44rem)",
          height: "clamp(18rem, 35vw, 44rem)",
          borderRadius: "9999px",
          background:
            "radial-gradient(circle, rgba(196,113,74,.18), transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Portrait */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.2,
          delay: 0.3,
        }}
        className="absolute bottom-0 z-10 pointer-events-none"
        style={{
          /*
            640px at 1440 as before, but as a share of the viewport, so it
            stops being 71% of a 768px tablet and stops stranding 864px of
            empty cream on a 2560px monitor.

            Three terms, because width alone is not enough:
              44.45vw  the 1440 proportion, which drives wide screens
              26vh     keeps him present on a tall narrow phone
              80vh cap stops him swallowing a wide SHORT screen — at
                       1920x892 the width rule alone made him 853px tall
                       in an 892px viewport, 96% of it

            The right offset is the line through (320, -16px) and
            (1440, 288px): at the small end the portrait tucks into the
            corner instead of sitting on the copy.
          */
          width: "clamp(12rem, min(max(44.45vw, 26vh), 80vh), 76rem)",
          right: "clamp(-1rem, calc(27.14vw - 6.44rem), 38rem)",
        }}
      >
        <Image
          src="/hero/hero-cutout.webp"
          alt="Busayo"
          width={650}
          height={650}
          priority
          className="h-auto w-full select-none"
        />
      </motion.div>

      {/* Editorial rail */}
      <motion.div
        initial={{
          opacity: 0,
          x: 50,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 1,
          delay: 0.8,
        }}
        className="hero-rail absolute z-20 flex-col"
        style={{
          right: "clamp(1.5rem, 4.45vw, 7rem)",
          top: "max(var(--nav-safe), 15%)",
          width: "clamp(11rem, 15.3vw, 20rem)",
          gap: "clamp(1.5rem, 2.8vw, 3.5rem)",
        }}
      >
        {[
          {
            title: "VISUAL STORYTELLING",
            text: "Photography, media and moments worth preserving.",
          },
          {
            title: "LIVE PRODUCTION",
            text: "Streaming, broadcasting and technical direction.",
          },
          {
            title: "SYSTEMS THINKING",
            text: "Designing solutions that create order from complexity.",
          },
        ].map((item) => (
          <div key={item.title}>
            <h3
              className="tracking-[0.18em]"
              style={{
                color: "#F5F0E8",
                fontSize: "clamp(0.75rem, 0.97vw, 1.15rem)",
                marginBottom: "0.75rem",
              }}
            >
              {item.title}
            </h3>

            <p
              style={{
                color: "#D6CFC7",
                fontFamily: "var(--font-playfair)",
                fontStyle: "italic",
                fontSize: "clamp(0.9rem, 1.11vw, 1.4rem)",
                lineHeight: 1.5,
              }}
            >
              {item.text}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Scroll */}
      <div
        className="absolute z-30 flex flex-col"
        style={{
          bottom: "clamp(1.5rem, 4vh, 3.5rem)",
          left: "clamp(1.5rem, 3.33vw, 5.5rem)",
          gap: "clamp(1rem, 1.67vw, 2rem)",
        }}
      >
        <div
          className="w-px"
          style={{
            height: "clamp(4rem, 14vh, 11rem)",
            backgroundColor: "#6B5D4F",
            opacity: 0.7,
          }}
        />
        <p
          className="uppercase tracking-[0.35em]"
          style={{
            color: "#6B5D4F",
            fontSize: "clamp(0.7rem, 0.84vw, 1rem)",
          }}
        >
          Scroll To Explore
        </p>
      </div>

      {/* Cream fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[40vh] z-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, #E7DDD1 0%, rgba(231,221,209,.95) 18%, rgba(231,221,209,.60) 45%, rgba(231,221,209,.18) 72%, transparent 100%)",
        }}
      />
    </section>
  );
}
