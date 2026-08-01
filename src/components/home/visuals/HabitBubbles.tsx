"use client";

import { useEffect, useRef } from "react";

import { BubbleTail } from "@/components/icons";
import { prefersReducedMotion } from "@/lib/gsap";

type Bubble = {
  leftPct: number;
  topPct: number;
  text: string;
};

/** Verbatim copy and placement from the live site. */
const BUBBLES: readonly Bubble[] = [
  { leftPct: 22, topPct: 12, text: "send me a news digest every morning" },
  { leftPct: 71, topPct: 31, text: "track the weather, ping me if it'll rain 🌧️" },
  { leftPct: 35, topPct: 48, text: "be my calorie tracker, i'll send you pics" },
  { leftPct: 65, topPct: 66, text: "check me in for my flights automatically ✈️" },
  { leftPct: 27, topPct: 85, text: "remind me to take my meds at 9" },
];

/** Stagger between consecutive bubble reveals, in milliseconds. */
const STAGGER_MS = 220;

/**
 * Row 2 ("Automate your life using habits.") overlay: five iMessage-style
 * bubbles that spring in one after another when the panel scrolls into view.
 * The reveal rides each bubble's own CSS transition — no GSAP involved.
 * Renders only the overlay — the panel, photo and scrim come from `FeatureRow`.
 */
export function HabitBubbles() {
  const rootRef = useRef<HTMLDivElement>(null);
  const bubbleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const bubbles = bubbleRefs.current.filter(
      (el): el is HTMLDivElement => el !== null,
    );

    const reveal = (el: HTMLDivElement) => {
      el.style.opacity = "1";
      el.style.transform = "scale(1)";
    };

    if (prefersReducedMotion()) {
      bubbles.forEach((el) => {
        el.style.transition = "none";
        reveal(el);
      });
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.disconnect();
          bubbles.forEach((el, i) => {
            timers.push(setTimeout(() => reveal(el), i * STAGGER_MS));
          });
        }
      },
      { threshold: 0.2 },
    );
    io.observe(root);

    return () => {
      io.disconnect();
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="absolute inset-0 [container-type:inline-size]"
    >
      {BUBBLES.map((bubble, i) => (
        <div
          key={bubble.text}
          className="absolute"
          style={{
            left: `${bubble.leftPct}%`,
            top: `${bubble.topPct}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            ref={(el) => {
              bubbleRefs.current[i] = el;
            }}
            className="relative origin-center rounded-[3.4cqw] bg-[#0a84ff] px-[2.6cqw] py-[1.5cqw] leading-[1.35] text-white shadow-[0_12px_30px_rgba(10,132,255,0.4)]"
            style={{
              maxWidth: "36cqw",
              fontSize: "2.7cqw",
              fontFamily:
                'system-ui, -apple-system, "SF Pro Text", "Segoe UI", sans-serif',
              opacity: 0,
              transform: "scale(0.82)",
              transition:
                "opacity 450ms ease, transform 450ms cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            {bubble.text}
            <span className="pointer-events-none absolute -bottom-[1.1cqw] right-[1.5cqw] h-[3.3cqw] w-[3.1cqw]">
              <BubbleTail className="text-[#0a84ff]" />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
