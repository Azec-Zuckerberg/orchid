import type { CSSProperties } from "react";

import { BubbleTail } from "@/components/icons";

/**
 * Row 5 overlay — a three-beat iMessage thread (question, photo, answer).
 * Fully static. The column establishes an inline-size container query, so every
 * interior measurement stays in `cqw` and scales with the panel.
 */
const bubbleFont: CSSProperties = {
  fontFamily:
    'system-ui, -apple-system, "SF Pro Text", "SF Pro Display", "Segoe UI", sans-serif',
  fontVariationSettings: "'wdth' 100",
};

export function SecondBrainChat() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center p-6"
    >
      <div className="flex w-[340px] max-w-[calc(100%-40px)] flex-col [container-type:inline-size]">
        <div className="">
          <div className="flex w-full justify-end pb-[1.49cqw] transition-[margin,padding] duration-300 ease-out">
            <div
              className="relative max-w-[69.65cqw] rounded-[4.98cqw] bg-[#0088ff] px-[2.99cqw] py-[2.24cqw] text-white"
              style={bubbleFont}
            >
              <p className="whitespace-pre-wrap text-[4.23cqw] leading-[1.295] tracking-[-0.005em]">
                what was that restaurant we loved for our anniversary?
              </p>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-[1.73cqw] right-[1.75cqw] h-[4.46cqw] w-[4.23cqw] origin-bottom-right opacity-100 transition-opacity duration-300 ease-out"
              >
                <BubbleTail className="text-[#0088ff]" />
              </span>
            </div>
          </div>
        </div>
        <div className="mt-[3.5cqw] flex justify-start">
          <span className="block w-[42cqw] overflow-hidden rounded-[4.98cqw] shadow-[0_6px_20px_rgba(0,0,0,0.28)]">
            {/* eslint-disable-next-line @next/next/no-img-element -- verbatim from the target markup; intrinsic-ratio img inside a cqw-sized box */}
            <img
              src="/branded/tartine.jpeg"
              alt=""
              className="block h-auto w-full"
            />
          </span>
        </div>
        <div className="mt-[1cqw]">
          <div className="flex w-full justify-start pb-[1.49cqw] transition-[margin,padding] duration-300 ease-out">
            <div
              className="relative max-w-[69.65cqw] rounded-[4.98cqw] bg-[var(--ios-bubble-received)] px-[2.99cqw] py-[2.24cqw] text-[var(--ios-text-primary)]"
              style={bubbleFont}
            >
              <p className="whitespace-pre-wrap text-[4.23cqw] leading-[1.295] tracking-[-0.005em]">
                Tartine, last march. you had the morning bun 🥐
              </p>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-[1.73cqw] left-[1.75cqw] h-[4.46cqw] w-[4.23cqw] origin-bottom-left opacity-100 transition-opacity duration-300 ease-out"
              >
                <BubbleTail className="-scale-x-100 text-[var(--ios-bubble-received)]" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
