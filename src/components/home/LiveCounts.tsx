"use client";

import { useRef } from "react";

import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { LIVE_STATS, statNumberFormat, type LiveStat } from "@/lib/content/stats";

export interface LiveCountsProps {
  /** Counter values to display. Defaults to the mirrored snapshot. */
  stats?: LiveStat[];
}

/**
 * "Orchid is working right now." — the live counter band on the home page.
 *
 * Two behaviours layer on top of the static markup:
 * 1. a staggered scroll reveal (heading, then each stat), and
 * 2. a count-up of the two big numbers from 0 to their final value.
 *
 * The markup renders the *final* numbers so the section is correct without JS
 * and under `prefers-reduced-motion: reduce`; the count-up rewinds them to 0
 * before paint only when it is actually going to run.
 */
export function LiveCounts({ stats = LIVE_STATS }: LiveCountsProps) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || prefersReducedMotion()) return;

      const heading = root.querySelector<HTMLElement>(".lc-heading");
      const items = gsap.utils.toArray<HTMLElement>(".lc-item", root);
      const all = [heading, ...items].filter(Boolean) as HTMLElement[];

      gsap.set(all, {
        opacity: 0,
        y: 18,
        filter: "blur(8px)",
        willChange: "filter, transform, opacity",
      });

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
        onComplete: () => gsap.set(all, { willChange: "auto" }),
      });

      tl.to(heading, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 });
      tl.to(
        items,
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, stagger: 0.1 },
        "-=0.4",
      );

      // Count-up: rewind each number to 0 now (pre-paint) and tween it back on
      // the same timeline so it runs in step with the reveal.
      const counters = gsap.utils.toArray<HTMLElement>("[data-count-to]", root);
      for (const el of counters) {
        const target = Number(el.dataset.countTo);
        if (!Number.isFinite(target)) continue;

        const proxy = { value: 0 };
        el.textContent = statNumberFormat.format(0);

        tl.to(
          proxy,
          {
            value: target,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = statNumberFormat.format(Math.round(proxy.value));
            },
          },
          0.2,
        );
      }

      ScrollTrigger.create({ trigger: root, start: "top 80%", animation: tl, once: true });
    },
    { scope: rootRef, dependencies: [stats] },
  );

  return (
    <section
      ref={rootRef}
      aria-labelledby="live-counts-title"
      className="relative overflow-hidden bg-paper px-6 py-20 md:px-12 md:py-28"
    >
      <div className="mx-auto w-full max-w-[1000px]">
        <div className="lc-heading flex flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-ink/[0.04] px-3 py-1.5 text-[12px] uppercase tracking-[0.14em] text-ink/55">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-ink/40" />
              <span className="relative inline-flex size-1.5 rounded-full bg-ink/70" />
            </span>
            Live
          </span>
          <h2
            id="live-counts-title"
            className="mx-auto max-w-[min(92vw,620px)] text-balance font-serif font-normal leading-[1.1] tracking-[-0.03em] text-ink text-[clamp(28px,4vw,44px)]"
          >
            Orchid is working right now.
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-0 sm:divide-x sm:divide-ink/10">
          {stats.map((stat) => {
            const formatted = statNumberFormat.format(stat.value);
            return (
              <div
                key={stat.label}
                className="lc-item flex flex-col items-center gap-3 px-4 text-center sm:px-10"
              >
                <span className="font-serif tabular-nums leading-none tracking-[-0.03em] text-ink text-[clamp(44px,7vw,84px)]">
                  <span aria-hidden="true" data-count-to={stat.value}>
                    {formatted}
                  </span>
                  <span className="sr-only">{formatted}</span>
                </span>
                <h3 className="font-serif text-[19px] leading-[1.1] tracking-[-0.01em] text-ink">
                  {stat.label}
                </h3>
                <p className="max-w-[280px] text-pretty text-[14px] leading-[1.5] text-ink/60">
                  {stat.caption}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
