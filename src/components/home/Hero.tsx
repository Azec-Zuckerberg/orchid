"use client";

import Image from "next/image";
import { useRef } from "react";

import { PhoneMockup } from "@/components/home/PhoneMockup";
import { RotatingRole } from "@/components/home/RotatingRole";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { IMESSAGE_HREF } from "@/lib/site";

/**
 * Home-page hero: headline with the rotating role word, sub-copy, the Get
 * Started pill, and the iPhone mockup.
 *
 * Nothing here is scroll-driven — a single mount timeline blur-lifts every
 * `.hero-reveal` element into place, and `RotatingRole` runs its own timer.
 */
export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const els = gsap.utils.toArray<HTMLElement>(".hero-reveal", rootRef.current);
      if (els.length === 0) return;

      gsap.set(els, { willChange: "filter, transform, opacity" });
      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => gsap.set(els, { willChange: "auto" }),
        })
        .from(els, {
          opacity: 0,
          y: 16,
          filter: "blur(8px)",
          duration: 0.8,
          stagger: 0.1,
        });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="relative isolate overflow-hidden bg-paper">
      <div className="flex flex-col items-center gap-7 px-6 pt-28 text-center md:gap-8 md:px-[120px] md:pt-36">
        <h1 className="hero-reveal max-w-[min(92vw,738px)] text-balance font-serif text-[clamp(40px,7vw,64px)] font-medium leading-[1.05] tracking-[-0.04em] text-ink">
          {/* The visible copy mutates as the role cycles, so screen readers get
              a stable sentence instead. */}
          <span className="sr-only">Meet Orchid, your personal assistant.</span>
          <span aria-hidden="true" className="block">
            Meet Orchid, your
            <span className="flex justify-center">
              <RotatingRole />
            </span>
          </span>
        </h1>
        <p className="hero-reveal max-w-[min(92vw,520px)] text-balance text-base leading-[1.5] text-ink/75 text-pretty">
          Orchid is a personal assistant that helps you stay organized, find information, and
          get things done. All through messages.
        </p>
        <div className="hero-reveal">
          <a
            className="relative inline-flex cursor-pointer items-center gap-2 rounded-full bg-card px-4 py-2.5 text-sm font-medium leading-none text-ink ring-1 ring-ink/10 shadow-[0_2px_8px_rgba(8,21,46,0.06)] transition-[transform,box-shadow] duration-150 hover:shadow-[0_4px_16px_rgba(8,21,46,0.10)] motion-safe:active:scale-[0.97] before:absolute before:inset-x-0 before:-inset-y-[5px] before:content-['']"
            href={IMESSAGE_HREF}
          >
            <Image
              alt=""
              aria-hidden="true"
              src="/branded/imessage-icon.png"
              width={20}
              height={20}
              priority
              className="size-5 select-none"
            />
            Get Started
          </a>
        </div>
      </div>
      <div className="-mt-9 px-6 pb-12 md:mt-[calc(clamp(0px,(100vw_-_48rem)_*_0.08,3.5rem)_*_-1)] md:px-[120px] md:pb-16">
        {/* `[container-type:inline-size]` is what every `cqw` inside the mockup
            resolves against — the mockup has no breakpoints of its own. */}
        <div className="hero-reveal pointer-events-none relative mx-[calc((100%_-_min(200%,800px))_/_2)] aspect-[1200/1080] w-[min(200%,800px)] max-w-[1200px] [container-type:inline-size] md:mx-auto md:w-full">
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}
