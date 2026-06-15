"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "var(--charcoal)" }}
    >
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/hero/hero-bg.png"
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
      <div className="absolute inset-0 flex items-center justify-center -translate-y-50 pointer-events-none">
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
      <div className="relative z-20 min-h-screen flex items-center px-8 md:px-16 lg:px-24">
        <div className="max-w-xl -mt-40">
          <motion.p            
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
            }}
            className="uppercase tracking-[0.35em] text-xs mb-5"
            style={{ color: "#F5F0E8" }}
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
            className="w-10 h-px mt-4 mb-40"
            style={{
              backgroundColor: "#C7A06A",
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
                fontSize: "clamp(2rem,3vw,4rem)",
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
            className="mt-4 text-xl leading-relaxed max-w-md"
            style={{ color: "#E7E0D8" }}
          >
            Building web, mobile and full-stack products.
          </motion.p>

          <div className="flex gap-4 mt-10">
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
              className="group px-8 py-4 text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all duration-300"
              style={{
                background: "var(--cream)",
                color: "var(--charcoal)",
                textDecoration: "none",
              }}
            >
              View Work

              <span
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
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
              className="group px-8 py-4 text-xs uppercase tracking-[0.2em] border flex items-center gap-3 transition-all duration-300"
              style={{
                borderColor: "#C7A06A",
                color: "#F5F0E8",
                textDecoration: "none",
              }}
            >
              Get In Touch

              <span
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
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
                className="
                  absolute
                  right-[10%]
                  top-1/2
                  -translate-y-1/2
                  z-5
                  hidden
                  lg:block
                "
                style={{
                  width: "clamp(18rem, 35vw, 32rem)",
                  height: "clamp(18rem, 35vw, 32rem)",
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
          className="
            absolute
            bottom-0

            right-[8rem]
            sm:right-[10rem]
            md:right-[10rem]
            lg:right-[11rem]
            xl:right-[20%]

            z-10
            pointer-events-none
          "
        >
          <Image
            src="/hero/hero-cutout.png"
            alt="Busayo"
            width={650}
            height={650}
            priority
            className="
              h-auto

              w-[18rem]
              sm:w-[34rem]
              md:w-[34rem]
              lg:w-[34rem]
              xl:w-[40rem]

  

              select-none
            "
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
        className="
          absolute
          right-16
          top-[15%]
          z-20
          hidden
          xl:flex
          flex-col
          gap-10
        "
      >
        {[
          {
            title: "VISUAL STORYTELLING",
            text: "Bringing your ideas to life and capturing moments worth telling.",
          },
          {
            title: "CREATIVE DIRECTION",
            text: "Crafting compelling narratives and guiding the creative vision.",
          },
          {
            title: "SYSTEMS THINKING",
            text: "Designing user-centered solutions and experiences",
          },
        ].map((item) => (
          <div key={item.title} className="max-w-55">
            <p
              className="text-4xl mb-3"
              style={{
                color: "#C7A06A",
                fontFamily: "var(--font-playfair)",
              }}
            >
            </p>

            <h3
              className="text-sm tracking-[0.18em] mb-3"
              style={{
                color: "#F5F0E8",
              }}
            >
              {item.title}
            </h3>

            <p
              style={{
                color: "#D6CFC7",
                fontFamily: "var(--font-playfair)",
                fontStyle: "italic",
              }}
            >
              {item.text}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Scroll */}
      <div className="absolute bottom-10 left-12 z-30 flex flex-col gap-6">
        <div
          className="w-px h-32"
          style={{
            backgroundColor: "#6B5D4F",
            opacity: 0.7,
          }}
        />
        <p
          className="uppercase text-xs tracking-[0.35em]"
          style={{ color: "#6B5D4F" }}
        >
          Scroll To Explore
        </p>
      </div>

      {/* Cream fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[40vh] z-20 pointer-events-none"
        style={{
          background: "linear-gradient(to top, #E7DDD1 0%, rgba(231,221,209,.95) 18%, rgba(231,221,209,.60) 45%, rgba(231,221,209,.18) 72%, transparent 100%)",
        }}
      />
    </section>
  );
}