"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

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
      data-tone="dark"
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
            "radial-gradient(circle at center, transparent 40%, rgb(var(--black-rgb) / 0.45) 100%)",
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
            fontSize: "var(--t-display)",
            opacity: 0.04,
            color: "var(--white)",
            letterSpacing: "var(--track-display)",
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
            className="uppercase tracking-[var(--track-label)]"
            style={{
              color: "var(--cream)",
              fontSize: "var(--t-label)",
              fontWeight: "var(--weight-label)",
              marginBottom: "1.25rem",
            }}
          >
            {/*
              The name, before anything else on the page.

              It was nowhere legible on the first screen: the only place it
              appeared was the BUSAYO watermark, which renders at 203px and
              opacity 0.04, and the browser tab. Someone landing here cold
              could read "Software Engineer" and still not know whose
              portfolio they were on.
            */}
            Oluwabusayo Sina-Olulana{" "}
            <span
              style={{ color: "rgb(var(--cream-rgb) / 0.55)" }}
              /* non-breaking, so the middot cannot be left stranded at the
                 end of a line when this wraps on a phone */
            >
              ·&nbsp;Lagos, Nigeria
            </span>
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
              /*
                --accent, not the #C7A06A gold that used to be here, in all
                three places it appeared: this rule, the GET IN TOUCH border
                and that button's hover fill. None of the three is text, so
                the bar is 3:1 and --accent clears it at 5.10 on near-black.

                The gold could never have been the site's accent: it scores
                2.14:1 on cream, under even the non-text bar, so it was only
                ever usable on the hero and nowhere else. --accent already
                works on both surfaces and already has a cream-safe sibling
                in --accent-ink. Two colours were doing one job — the full
                stop after "Engineer" was terracotta while the button border
                200px away was gold.
              */
              backgroundColor: "var(--accent)",
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
              color: "var(--cream)",
              fontSize: "var(--t-hero)",
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
              color: "rgb(var(--cream-rgb) / 0.94)",
              marginTop: "1rem",
              fontSize: "var(--t-lead)",
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
            {/*
              Both of these were hand-rolled, which is how they came to wear
              two different arrow glyphs — View Work an ↗, which conventionally
              means the link leaves the site, and Get In Touch a →. Neither
              leaves the site. The glyph now lives inside Button, so it cannot
              be chosen per call site again, and tone="dark" is what the
              component was missing that sent them off on their own.
            */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                href="#projects"
                variant="filled"
                tone="dark"
                size="hero"
                showArrow
              >
                View Work
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                href="#contact"
                variant="outline"
                tone="dark"
                size="hero"
                showArrow
              >
                Get In Touch
              </Button>
            </motion.div>
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
            "radial-gradient(circle, rgb(var(--accent-rgb) / 0.18), transparent 70%)",
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
              className="tracking-[var(--track-label)]"
              style={{
                color: "var(--cream)",
                fontSize: "var(--t-label)",
                fontWeight: "var(--weight-label)",
                marginBottom: "0.75rem",
              }}
            >
              {item.title}
            </h3>

            <p
              style={{
                color: "rgb(var(--cream-rgb) / 0.86)",
                fontFamily: "var(--font-playfair)",
                fontStyle: "italic",
                fontSize: "var(--t-small)",
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
            backgroundColor: "var(--warm-grey)",
            opacity: 0.7,
          }}
        />
        {/*
          No label. This read "Scroll To Explore", which is an instruction
          where a cue will do — and the hero already cues it twice over, by
          fading to the cream of the section beneath and by leaving this
          rule pointing down into it. The words were telling a reader
          something the page was already showing them.
        */}
      </div>

      {/*
        The fade out of the hero, and it has to land on exactly the colour of
        the section below it. It used to end on #E7DDD1 while About began on
        var(--cream) — a 23-point step in a single row of pixels, measured at the
        page edge, which read as a seam rather than a fade. It now ends on
        --cream itself, so there is nothing to line up by hand again if the
        cream ever changes.
      */}
      <div
        /*
          The hero is dark at the top and cream at the bottom, so one tone
          cannot describe it. This fade declares its own, and because the
          navbar takes the LAST declared tone its band overlaps, scrolling
          through the hero hands over to light exactly where the cream does.
        */
        data-tone="light"
        className="absolute bottom-0 left-0 right-0 h-[40vh] z-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, var(--cream) 0%, rgb(var(--cream-rgb) / 0.95) 18%, rgb(var(--cream-rgb) / 0.60) 45%, rgb(var(--cream-rgb) / 0.18) 72%, transparent 100%)",
        }}
      />
    </section>
  );
}
