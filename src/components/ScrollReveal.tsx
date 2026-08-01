"use client";

import { useRef, type ReactNode } from "react";

import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

interface ScrollRevealProps {
  /** Selector for the descendants that fade in, matched inside this wrapper. */
  selector: string;
  /** ScrollTrigger start position. */
  start?: string;
  /** Seconds between each element's entrance. */
  stagger?: number;
  children: ReactNode;
}

/**
 * Layout-neutral client wrapper that staggers its matching descendants in on
 * scroll, so the pages that use it can stay server components. Elements are
 * hidden up-front by the `.gsap-reveal` rule in `globals.css`, which only
 * applies when the visitor has not asked for reduced motion.
 */
export function ScrollReveal({
  selector,
  start = "top 85%",
  stagger = 0.1,
  children,
}: ScrollRevealProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const targets = Array.from(
        root.current?.querySelectorAll<HTMLElement>(selector) ?? [],
      );
      if (targets.length === 0) return;

      if (prefersReducedMotion()) {
        gsap.set(targets, { opacity: 1, y: 0, filter: "none" });
        return;
      }

      gsap.set(targets, { opacity: 0, y: 18, filter: "blur(8px)" });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.7,
        stagger,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start, once: true },
      });
    },
    { scope: root, dependencies: [selector, start, stagger] },
  );

  return <div ref={root}>{children}</div>;
}
