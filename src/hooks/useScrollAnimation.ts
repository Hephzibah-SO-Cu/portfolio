"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type AnimationVariant = "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "stagger";

interface UseScrollAnimationOptions {
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  staggerChildren?: string; // CSS selector for stagger targets
  staggerAmount?: number;
  start?: string; // ScrollTrigger start e.g. "top 85%"
  once?: boolean;
}

/**
 * Attach to any section container via the returned ref.
 * Animates the container (or its children for stagger) when it enters the viewport.
 *
 * Usage:
 *   const ref = useScrollAnimation({ variant: "fadeUp" });
 *   <section ref={ref}>...</section>
 *
 * Stagger usage:
 *   const ref = useScrollAnimation({ variant: "stagger", staggerChildren: ".card" });
 *   <div ref={ref}><div className="card">...</div><div className="card">...</div></div>
 */
export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const {
    variant = "fadeUp",
    delay = 0,
    duration = 0.8,
    staggerChildren,
    staggerAmount = 0.12,
    start = "top 88%",
    once = true,
  } = options;

  const containerRef = useRef<HTMLElement | HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const el = containerRef.current;

      const baseScrollTrigger: ScrollTrigger.Vars = {
        trigger: el,
        start,
        once,
      };

      switch (variant) {
        case "fadeUp": {
          gsap.from(el, {
            opacity: 0,
            y: 48,
            duration,
            delay,
            ease: "power3.out",
            scrollTrigger: baseScrollTrigger,
          });
          break;
        }

        case "fadeIn": {
          gsap.from(el, {
            opacity: 0,
            duration,
            delay,
            ease: "power2.out",
            scrollTrigger: baseScrollTrigger,
          });
          break;
        }

        case "slideLeft": {
          gsap.from(el, {
            opacity: 0,
            x: -60,
            duration,
            delay,
            ease: "power3.out",
            scrollTrigger: baseScrollTrigger,
          });
          break;
        }

        case "slideRight": {
          gsap.from(el, {
            opacity: 0,
            x: 60,
            duration,
            delay,
            ease: "power3.out",
            scrollTrigger: baseScrollTrigger,
          });
          break;
        }

        case "stagger": {
          const targets = staggerChildren
            ? el.querySelectorAll(staggerChildren)
            : el.children;

          if (!targets || targets.length === 0) break;

          gsap.from(targets, {
            opacity: 0,
            y: 40,
            duration,
            delay,
            ease: "power3.out",
            stagger: staggerAmount,
            scrollTrigger: baseScrollTrigger,
          });
          break;
        }

        default:
          break;
      }
    },
    { scope: containerRef }
  );

  return containerRef;
}
