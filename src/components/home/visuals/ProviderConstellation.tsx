"use client";

import Image from "next/image";
import { useRef } from "react";

import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

type Chip = {
  leftPct: number;
  topPct: number;
  size: number;
  iconSize: number;
  fx: number;
  fy: number;
  dur: number;
};

/** Chip placement + idle-drift table, transcribed from the live site. */
const CHIPS: readonly Chip[] = [
  { leftPct: 19, topPct: 26, size: 56, iconSize: 30, fx: 9, fy: -11, dur: 4.2 },
  { leftPct: 44, topPct: 14, size: 46, iconSize: 25, fx: -7, fy: 9, dur: 5.3 },
  { leftPct: 72, topPct: 22, size: 52, iconSize: 28, fx: 10, fy: 8, dur: 4.7 },
  { leftPct: 86, topPct: 50, size: 44, iconSize: 24, fx: -9, fy: -8, dur: 5.6 },
  { leftPct: 66, topPct: 73, size: 54, iconSize: 29, fx: 8, fy: -10, dur: 4.0 },
  { leftPct: 37, topPct: 80, size: 48, iconSize: 26, fx: -10, fy: 8, dur: 5.9 },
  { leftPct: 13, topPct: 58, size: 50, iconSize: 27, fx: 9, fy: 11, dur: 4.9 },
];

const PROVIDERS = [
  "gmail.svg",
  "google-calendar.png",
  "slack.png",
  "notion.png",
  "figma.svg",
  "dropbox.png",
  "hubspot.png",
  "stripe.png",
  "jira.svg",
  "salesforce.png",
  "intercom.png",
  "google-drive.svg",
  "google-meet.png",
  "asana.svg",
  "x.png",
  "cal-com.svg",
  "docusign.png",
  "granola.png",
  "perplexity.webp",
  "reddit.png",
  "resend.svg",
  "sentry.webp",
  "google-sheets.png",
  "attio.svg",
  "cloudflare.png",
  "vercel.svg",
].map((file) => `/logos/providers/${file}`);

/**
 * Row 1 ("Connect with your stack.") overlay: a centre app tile ringed by seven
 * provider chips that pop in on scroll, drift forever, and periodically swap logos.
 * Renders only the overlay — the panel, photo and scrim come from `FeatureRow`.
 */
export function ProviderConstellation() {
  const rootRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const floats = gsap.utils.toArray<HTMLElement>(".cn-float", root);
      const chips = gsap.utils.toArray<HTMLElement>(".cn-chip", root);
      const center = root.querySelector<HTMLElement>(".cn-center");
      const imgs = imgRefs.current.filter(
        (el): el is HTMLImageElement => el !== null,
      );
      const popTargets = [center, ...chips].filter(
        (el): el is HTMLElement => el !== null,
      );

      if (prefersReducedMotion()) {
        gsap.set([...popTargets, ...imgs], { autoAlpha: 1, scale: 1 });
        return;
      }

      gsap.set(popTargets, { autoAlpha: 0, scale: 0.5 });
      gsap.set(imgs, { autoAlpha: 1, scale: 1 });

      // Entrance — staggered spring pop, held until the panel is in view.
      const pop = gsap.to(popTargets, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.55,
        stagger: 0.07,
        ease: "back.out(1.6)",
        paused: true,
      });

      // Perpetual idle drift, one yoyo tween per chip.
      const drifts = floats.map((el, i) =>
        gsap.to(el, {
          x: CHIPS[i].fx,
          y: CHIPS[i].fy,
          duration: CHIPS[i].dur,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          paused: true,
        }),
      );

      // Logo-swap loop. `assigned[chip] = provider` keeps every chip unique.
      const assigned = CHIPS.map((_, i) => i % PROVIDERS.length);
      let timer: ReturnType<typeof setTimeout> | null = null;
      let running = false;
      let lastChip = -1;

      const schedule = () => {
        timer = setTimeout(tick, 1100 + Math.random() * 2000);
      };

      const tick = () => {
        let c = Math.floor(Math.random() * CHIPS.length);
        if (c === lastChip) c = (c + 1) % CHIPS.length;
        lastChip = c;

        let t = Math.floor(Math.random() * PROVIDERS.length);
        for (
          let step = 0;
          step < PROVIDERS.length && assigned.includes(t);
          step += 1
        ) {
          t = (t + 1) % PROVIDERS.length;
        }
        assigned[c] = t;

        const img = imgRefs.current[c];
        if (img) {
          gsap
            .timeline()
            .to(img, {
              autoAlpha: 0,
              scale: 0.6,
              duration: 0.35,
              ease: "power2.in",
            })
            .add(() => {
              img.src = PROVIDERS[t];
            })
            .to(img, {
              autoAlpha: 1,
              scale: 1,
              duration: 0.45,
              ease: "back.out(1.5)",
            });
        }

        schedule();
      };

      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              pop.play();
              drifts.forEach((drift) => drift.play());
              if (!running) {
                running = true;
                schedule();
              }
            } else {
              drifts.forEach((drift) => drift.pause());
              running = false;
              if (timer) {
                clearTimeout(timer);
                timer = null;
              }
            }
          }
        },
        { threshold: 0.2 },
      );
      io.observe(root);

      return () => {
        io.disconnect();
        drifts.forEach((drift) => drift.kill());
        if (timer) clearTimeout(timer);
      };
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} aria-hidden="true" className="absolute inset-0">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="cn-center grid size-[68px] place-items-center rounded-[18px] bg-white shadow-[0_16px_44px_rgba(0,0,0,0.4)]">
          <div className="relative size-[50px] overflow-hidden rounded-[13px]">
            <Image
              fill
              sizes="50px"
              className="object-cover"
              src="/branded/app-icons/orchid-square.png"
              alt=""
            />
          </div>
        </div>
      </div>

      {CHIPS.map((chip, i) => (
        <div
          key={`${chip.leftPct}-${chip.topPct}`}
          className="absolute"
          style={{
            left: `${chip.leftPct}%`,
            top: `${chip.topPct}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="cn-float inline-flex">
            <div
              className="cn-chip grid place-items-center rounded-[14px] bg-white shadow-[0_10px_26px_rgba(0,0,0,0.32)]"
              style={{ width: `${chip.size}px`, height: `${chip.size}px` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- src is swapped imperatively by the logo-shuffle loop */}
              <img
                ref={(el) => {
                  imgRefs.current[i] = el;
                }}
                src={PROVIDERS[i % PROVIDERS.length]}
                alt=""
                className="object-contain"
                style={{
                  width: `${chip.iconSize}px`,
                  height: `${chip.iconSize}px`,
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
