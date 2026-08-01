"use client";

import { useRef } from "react";

import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

/**
 * The italic word that swaps under the hero headline. The cycle is driven by a
 * GSAP `delayedCall` rather than React state so the timeline stays in sole
 * control of the DOM node it is animating.
 */
const ROLES = [
  "personal assistant",
  "inbox manager",
  "calendar coordinator",
  "travel planner",
  "research assistant",
  "news curator",
  "score tracker",
  "nutrition coach",
  "portfolio tracker",
  "ghostwriter",
] as const;

const CYCLE_DELAY = 2.4;

export function RotatingRole() {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const wrap = wrapRef.current;
      const text = textRef.current;
      if (!wrap || !text) return;

      let index = 0;
      let scheduled: gsap.core.Tween | null = null;
      let active: gsap.core.Timeline | null = null;

      const scheduleNext = () => {
        scheduled = gsap.delayedCall(CYCLE_DELAY, run);
      };

      const run = () => {
        const next = (index + 1) % ROLES.length;
        active = gsap
          .timeline({ onComplete: scheduleNext })
          .to(wrap, {
            autoAlpha: 0,
            yPercent: -55,
            filter: "blur(5px)",
            duration: 0.3,
            ease: "power2.in",
          })
          .add(() => {
            text.textContent = ROLES[next];
            index = next;
            gsap.set(wrap, { yPercent: 60 });
          })
          .to(wrap, {
            autoAlpha: 1,
            yPercent: 0,
            filter: "blur(0px)",
            duration: 0.55,
            ease: "power3.out",
          });
      };

      scheduleNext();

      // Stop burning frames while the headline is scrolled out of view.
      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries[0]?.isIntersecting ?? true;
          if (visible) scheduled?.play();
          else scheduled?.pause();
        },
        { threshold: 0 },
      );
      observer.observe(wrap);

      return () => {
        observer.disconnect();
        scheduled?.kill();
        active?.kill();
      };
    },
    { scope: wrapRef },
  );

  return (
    <span
      ref={wrapRef}
      className="inline-flex items-baseline whitespace-nowrap will-change-[transform,opacity,filter]"
    >
      <span ref={textRef} className="italic">
        {ROLES[0]}
      </span>
      <span aria-hidden="true">.</span>
    </span>
  );
}
