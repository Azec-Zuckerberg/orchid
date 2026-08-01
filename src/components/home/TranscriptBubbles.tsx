"use client";

import type { ReactNode, RefObject } from "react";
import { useRef } from "react";

import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Plays a chat transcript back one message at a time.
 *
 * The rendered element *is* the message list: its direct children are the
 * per-message rows, so it must not be wrapped in another flex column. Each row
 * blur-lifts into place, and once a message would fall below the viewport the
 * whole list is translated up so the newest one stays in view — the same
 * "scrolling thread" illusion the live site uses under the hero headline.
 *
 * `justify-end` on a row means it is outbound, which is also how the bubble's
 * `transformOrigin` is picked (grow from the corner it is anchored to).
 * Anything marked `[data-tapback]` is held back and popped in after its row.
 */
interface TranscriptBubblesProps {
  /** Play the timeline. When false the list is parked in its pre-roll state. */
  active: boolean;
  /** Loop forever with a hold between passes. */
  loop?: boolean;
  /** Seconds of dwell between messages. */
  messageGap?: number;
  /** Px of breathing room kept under the newest message (default: 26% of the viewport, min 18). */
  bottomInset?: number;
  /** The clipping element the list scrolls inside. Defaults to the list's parent. */
  viewportRef?: RefObject<HTMLElement | null>;
  className?: string;
  children: ReactNode;
}

export function TranscriptBubbles({
  active,
  loop = false,
  messageGap = 0,
  bottomInset,
  viewportRef,
  className,
  children,
}: TranscriptBubblesProps) {
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const list = listRef.current;
      const viewport = viewportRef?.current ?? list?.parentElement;
      if (!list || !viewport) return;

      const items = Array.from(list.children) as HTMLElement[];
      if (items.length === 0) return;

      const inset = bottomInset ?? Math.max(18, 0.26 * viewport.clientHeight);
      /** How far the list must sit for `el` to rest just above the input bar. */
      const yFor = (el: HTMLElement) =>
        Math.min(0, viewport.clientHeight - (el.offsetTop + el.offsetHeight) - inset);

      if (prefersReducedMotion()) {
        // Jump to the end state: scrolled to the last message, everything visible.
        gsap.set(list, { y: yFor(items[items.length - 1]) });
        gsap.set(items, { clearProps: "opacity,visibility,transform,filter", autoAlpha: 1 });
        return;
      }

      items.forEach((el) => {
        el.style.transformOrigin = el.classList.contains("justify-end") ? "100% 100%" : "0% 100%";
      });

      if (!active) {
        gsap.set(list, { y: 0 });
        gsap.set(items, { autoAlpha: 0, y: 20 });
        return;
      }

      gsap.set(list, { y: 0 });
      gsap.set(items, { autoAlpha: 0, y: 20, scale: 0.985, filter: "blur(4px)" });
      const tapbacks = list.querySelectorAll("[data-tapback]");
      gsap.set(tapbacks, { autoAlpha: 0, scale: 0.2, transformOrigin: "center center" });

      const tl = gsap.timeline({
        delay: 0.15,
        repeat: loop ? -1 : 0,
        repeatDelay: loop ? 3.5 : 0,
        onRepeat: loop
          ? () => {
              gsap.set(list, { y: 0 });
              gsap.set(items, { autoAlpha: 0, y: 20, scale: 0.985, filter: "blur(4px)" });
              gsap.set(tapbacks, { autoAlpha: 0, scale: 0.2 });
            }
          : undefined,
      });

      let lastY = 0;
      items.forEach((el, i) => {
        const y = yFor(el);
        let position: string | number;
        if (i === 0) {
          position = 0;
        } else if (y !== lastY) {
          // Scroll the list up so the incoming message lands in view.
          tl.to(
            list,
            { y, duration: 0.36, ease: "power2.out" },
            messageGap > 0 ? `>+=${messageGap}` : ">-=0.06",
          );
          lastY = y;
          position = ">-=0.02";
        } else {
          position = messageGap > 0 ? `>+=${messageGap}` : ">-=0.1";
        }
        tl.to(
          el,
          { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.5, ease: "power3.out" },
          position,
        );

        const tb = el.querySelectorAll("[data-tapback]");
        if (tb.length) {
          tl.to(tb, { autoAlpha: 1, scale: 1, duration: 0.34, ease: "back.out(1.8)" }, ">+0.45");
        }
      });

      if (!loop) return () => tl.kill();

      // A looping timeline off-screen is wasted work — gate it on visibility.
      const io = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting ?? true) {
            tl.play();
          } else {
            tl.pause();
          }
        },
        { threshold: 0 },
      );
      io.observe(viewport);

      return () => {
        io.disconnect();
        tl.kill();
      };
    },
    { dependencies: [active, viewportRef, messageGap, bottomInset, loop] },
  );

  return (
    <div ref={listRef} className={cn("flex flex-col", className)}>
      {children}
    </div>
  );
}
