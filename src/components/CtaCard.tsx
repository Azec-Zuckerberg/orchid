"use client";

import Image from "next/image";
import { useRef } from "react";

import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { IMESSAGE_HREF } from "@/lib/site";

export interface CtaCardProps {
  /**
   * Headline rendered inside the card. The case-study page passes its own
   * ("Less busywork. More of the work that matters.").
   */
  headline?: string;
}

/**
 * Full-bleed closing call-to-action card: dusk photo, navy scrim, serif
 * headline and the iMessage "Get Started" button. Shared by the home page and
 * the case-study page, hence its home outside `components/home/`.
 */
export function CtaCard({ headline = "Meet your new assistant." }: CtaCardProps) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || prefersReducedMotion()) return;

      const headlineEl = root.querySelector<HTMLElement>(".cta-headline");
      const ctas = root.querySelector<HTMLElement>(".cta-ctas");
      if (!headlineEl || !ctas) return;

      gsap.set([headlineEl, ctas], { opacity: 0, y: 18, filter: "blur(8px)" });

      const tl = gsap
        .timeline({ paused: true, defaults: { ease: "power3.out" } })
        .to(headlineEl, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 })
        .to(ctas, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6 }, "-=0.45");

      ScrollTrigger.create({ trigger: root, start: "top 80%", animation: tl, once: true });
    },
    { scope: rootRef, dependencies: [headline] },
  );

  return (
    <section
      ref={rootRef}
      aria-labelledby="cta-title"
      className="px-6 py-16 md:px-[120px] md:py-24"
    >
      <div className="relative mx-auto flex aspect-[16/9] w-full max-w-[1440px] items-center justify-center overflow-hidden rounded-[32px]">
        <Image
          src="/branded/store-at-dusk.jpeg"
          alt=""
          fill
          sizes="(min-width: 1440px) 1440px, 100vw"
          className="object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-[rgba(8,21,46,0.35)]" />
        <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center md:gap-10 md:px-12">
          <h2
            id="cta-title"
            className="cta-headline max-w-[720px] font-serif font-medium text-paper leading-[1.05] tracking-[-0.04em] text-[clamp(40px,6vw,80px)]"
          >
            {headline}
          </h2>
          <div className="cta-ctas flex items-center gap-3">
            <a
              href={IMESSAGE_HREF}
              className="relative inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-paper px-6 py-4 text-sm font-medium leading-none text-ink transition-[opacity,scale] duration-150 hover:opacity-90 motion-safe:active:scale-[0.96] before:absolute before:inset-x-0 before:-inset-y-[5px] before:content-['']"
            >
              <Image
                src="/branded/imessage-icon.png"
                alt=""
                aria-hidden="true"
                width={20}
                height={20}
                className="size-5 select-none"
              />
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
