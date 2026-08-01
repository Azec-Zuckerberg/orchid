"use client";

import Image from "next/image";
import { useRef } from "react";

import { ScrollTrigger, gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

type AppBadge = {
  src: string;
  alt: string;
  badge: string;
  rotate: number;
  leftPct: number;
  topPct: number;
};

const APPS: AppBadge[] = [
  {
    src: "/branded/app-icons/mail.png",
    alt: "Mail",
    badge: "88",
    rotate: -7.83,
    leftPct: 34.07888888888889,
    topPct: 43.902125,
  },
  {
    src: "/branded/app-icons/messages.png",
    alt: "Messages",
    badge: "120",
    rotate: 7.51,
    leftPct: 45.161574074074075,
    topPct: 68.857375,
  },
  {
    src: "/branded/app-icons/calendar.png",
    alt: "Calendar",
    badge: "16",
    rotate: -7.41,
    leftPct: 56.820092592592594,
    topPct: 31.344499999999996,
  },
  {
    src: "/branded/app-icons/phone.png",
    alt: "Phone",
    badge: "3",
    rotate: 11.15,
    leftPct: 73.05685185185186,
    topPct: 52.339,
  },
];

/**
 * Row 3 overlay — four iOS app icons whose unread badges count down to zero
 * once the panel scrolls into view. The server-rendered numbers are the
 * starting values, so the pre-hydration paint is already correct.
 */
export function AppBadges() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const badges = Array.from(
        root.querySelectorAll<HTMLElement>("[data-badge]"),
      );
      if (!badges.length) return;

      if (prefersReducedMotion()) {
        badges.forEach((el) => {
          el.textContent = "0";
        });
        return;
      }

      const tweens = badges.map((el) => {
        const state = { value: Number(el.dataset.badge ?? "0") };
        return gsap.to(state, {
          value: 0,
          duration: 4,
          ease: "power3.out",
          paused: true,
          onUpdate: () => {
            el.textContent = String(Math.round(state.value));
          },
        });
      });

      const st = ScrollTrigger.create({
        trigger: root,
        start: "top 60%",
        onEnter: () => tweens.forEach((t) => t.restart()),
        onLeaveBack: () => tweens.forEach((t) => t.pause(0)),
      });

      return () => st.kill();
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} aria-hidden="true" className="absolute inset-0">
      {APPS.map((app) => (
        <div
          key={app.alt}
          className="absolute"
          style={{
            left: `${app.leftPct}%`,
            top: `${app.topPct}%`,
            transform: `translate(-50%, -50%) rotate(${app.rotate}deg)`,
          }}
        >
          <div className="relative flex w-[72px] flex-col items-center">
            <div className="relative h-[64px] w-[64px]">
              <Image
                fill
                sizes="64px"
                className="object-cover"
                src={app.src}
                alt={app.alt}
              />
            </div>
            <span
              data-badge={app.badge}
              className="absolute -top-[12px] left-1/2 flex min-w-[24px] translate-x-[33px] items-center justify-center rounded-[100px] bg-[#ff383c] px-[7px] py-[2.5px] text-center text-[16px] leading-[19px] tabular-nums text-white"
            >
              {app.badge}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
