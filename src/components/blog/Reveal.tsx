"use client";

import { useRef, type ReactNode } from "react";

import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

interface RevealProps {
  /** Selector for the element that leads the timeline (the page header). */
  lead: string;
  /** Selector for the elements that follow it, staggered. */
  stagger: string;
  children: ReactNode;
}

/**
 * Scroll-triggered entrance used by the blog index and post pages, so both can
 * stay server components. Targets carry `gsap-reveal` in their class list to
 * avoid a flash of un-animated content before hydration; that class is inert
 * under `prefers-reduced-motion: reduce`, where the timeline is skipped.
 */
export function Reveal({ lead, stagger, children }: RevealProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Scoped explicitly: gsap.utils.selector queries inside `root` only.
      const q = gsap.utils.selector(root);
      const leadEls = q(lead);
      const staggerEls = q(stagger);
      if (leadEls.length === 0 && staggerEls.length === 0) return;

      gsap.set([...leadEls, ...staggerEls], {
        opacity: 0,
        y: 18,
        filter: "blur(8px)",
      });

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
      });

      if (leadEls.length > 0) {
        timeline.to(leadEls, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
        });
      }

      if (staggerEls.length > 0) {
        timeline.to(
          staggerEls,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.6,
            stagger: 0.08,
          },
          leadEls.length > 0 ? "-=0.45" : 0,
        );
      }
    },
    { scope: root, dependencies: [lead, stagger] },
  );

  return <div ref={root}>{children}</div>;
}
