"use client";

import { MotionConfig } from "framer-motion";

/**
 * The hero runs two Framer Motion loops that never end — the watermark
 * drifting on a 12s cycle and the glow pulsing on an 8s one — plus reveals
 * on every section. None of that is CSS, so the prefers-reduced-motion
 * block in globals.css cannot touch it.
 *
 * reducedMotion="user" makes Framer Motion read the same system setting and
 * drop transform and layout animations, keeping only opacity.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
