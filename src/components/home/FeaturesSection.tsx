"use client";

import { Fragment, useRef } from "react";

import { FeatureRow } from "@/components/home/FeatureRow";
import { PetalDivider } from "@/components/home/PetalDivider";
import { FEATURE_ROWS } from "@/lib/content/feature-rows";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

/** "What Orchid handles for you" — five alternating feature rows with petal dividers. */
export function FeaturesSection() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const rows = Array.from(
        root.querySelectorAll<HTMLElement>("[data-anim='row']"),
      );
      const dividers = Array.from(
        root.querySelectorAll<HTMLElement>("[data-anim='divider']"),
      );

      if (prefersReducedMotion()) {
        gsap.set([...rows, ...dividers], {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scaleX: 1,
        });
        return;
      }

      gsap.set(rows, { opacity: 0, y: 24, filter: "blur(12px)" });
      gsap.set(dividers, {
        opacity: 0,
        scaleX: 0.92,
        transformOrigin: "50% 50%",
      });

      const tweens = [
        ...rows.map((el) =>
          gsap.to(el, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 55%",
              scrub: 0.5,
            },
          }),
        ),
        ...dividers.map((el) =>
          gsap.to(el, {
            opacity: 1,
            scaleX: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 95%",
              end: "top 70%",
              scrub: 0.5,
            },
          }),
        ),
      ];

      return () => {
        tweens.forEach((tween) => tween.scrollTrigger?.kill());
      };
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      aria-label="What Orchid handles for you"
      className="bg-paper px-6 py-32 md:px-12 md:py-44 min-[1280px]:px-[120px] min-[1280px]:py-56"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-16 md:gap-20 min-[1280px]:gap-[80px]">
        {FEATURE_ROWS.map((row, index) => (
          <Fragment key={row.title}>
            {index > 0 ? (
              <PetalDivider variant={index % 2 === 1 ? "one" : "two"} />
            ) : null}
            <FeatureRow {...row} reverse={index % 2 === 1} />
          </Fragment>
        ))}
      </div>
    </section>
  );
}
