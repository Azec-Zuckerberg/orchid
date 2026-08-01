"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { TESTIMONIALS } from "@/lib/content/testimonials";
import { ScrollTrigger, gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

/** How long a testimonial holds before the next one swaps in. */
const ROTATE_DELAY_MS = 7000;

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const citeRef = useRef<HTMLElement>(null);

  const [index, setIndex] = useState(0);
  /** The entrance timeline has finished, so swaps are allowed to animate. */
  const enteredRef = useRef(false);
  /** A swap is mid-flight; further advances are ignored until it settles. */
  const swappingRef = useRef(false);

  /** The three animated nodes, in stagger order. */
  const collect = useCallback(
    () =>
      [avatarRef.current, quoteRef.current, citeRef.current].filter(
        (el): el is HTMLElement => el !== null,
      ),
    [],
  );

  // Entrance — plays once when the section scrolls into view.
  useGSAP(
    () => {
      const els = collect();
      if (els.length === 0) return;

      if (prefersReducedMotion()) {
        enteredRef.current = true;
        return;
      }

      gsap.set(els, {
        opacity: 0,
        y: 18,
        filter: "blur(8px)",
        willChange: "filter, transform, opacity",
      });

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
        onComplete: () => {
          enteredRef.current = true;
          gsap.set(els, { willChange: "auto" });
        },
      });

      tl.to(els, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.12,
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        animation: tl,
        toggleActions: "play none none reverse",
      });
    },
    { scope: sectionRef },
  );

  // Rotation — advance every 7s, restarted whenever the index changes.
  useEffect(() => {
    if (TESTIMONIALS.length < 2 || prefersReducedMotion()) return;

    const timer = window.setTimeout(() => {
      const next = (index + 1) % TESTIMONIALS.length;
      const els = collect();

      // Until the entrance has completed, swap the index with no tween.
      if (!enteredRef.current || els.length === 0) {
        setIndex(next);
        return;
      }
      if (swappingRef.current) return;
      swappingRef.current = true;

      gsap.killTweensOf(els);
      gsap.to(els, {
        opacity: 0,
        y: -8,
        duration: 0.32,
        ease: "power2.in",
        onComplete: () => {
          setIndex(next);
          requestAnimationFrame(() => {
            gsap.fromTo(
              els,
              { opacity: 0, y: 10 },
              {
                opacity: 1,
                y: 0,
                duration: 0.55,
                ease: "power3.out",
                stagger: 0.08,
                onComplete: () => {
                  swappingRef.current = false;
                },
              },
            );
          });
        },
      });
    }, ROTATE_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [collect, index]);

  // Swap tweens live outside the useGSAP context, so stop them on unmount.
  useEffect(() => {
    const els = collect();
    return () => {
      gsap.killTweensOf(els);
    };
  }, [collect]);

  const item = TESTIMONIALS[index];

  return (
    <section
      ref={sectionRef}
      aria-label="What people say about Orchid"
      className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-paper px-6 py-24"
    >
      <div className="relative z-10 flex flex-col items-center">
        <div
          ref={avatarRef}
          className="relative mb-9 size-[clamp(74px,8vw,96px)] overflow-hidden rounded-[22px] bg-white shadow-[0_20px_55px_-14px_rgba(8,21,46,0.4)]"
        >
          <Image
            fill
            sizes="96px"
            className="object-cover"
            src={item.image}
            alt={item.name}
          />
        </div>
        <div className="flex min-h-[280px] w-full max-w-[940px] items-center justify-center md:min-h-[200px]">
          <blockquote
            ref={quoteRef}
            aria-live="polite"
            className="text-balance text-center font-serif font-normal tracking-[-0.02em] text-ink text-[clamp(26px,3.8vw,44px)]"
          >
            {`“${item.quote}”`}
          </blockquote>
        </div>
        <cite
          ref={citeRef}
          className="mt-7 block text-center text-sm font-medium not-italic tracking-wide text-ink/55"
        >
          {`– ${item.name}`}
        </cite>
      </div>
    </section>
  );
}
