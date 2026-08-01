"use client";

/* eslint-disable @next/next/no-img-element -- the phone frame, petals, avatar
   and photo stack are raw <img> on the original site; next/image would inject
   its own sizing wrapper and break the container-query (`cqw`) layout. */

import type { CSSProperties, ReactNode } from "react";
import { useRef } from "react";

import { BubbleTail, IosBatteryIcon, IosVideoIcon, IosWifiIcon } from "@/components/icons";
import { TranscriptBubbles } from "@/components/home/TranscriptBubbles";
import type { ChatMessage } from "@/types/content";
import { cn } from "@/lib/utils";

/**
 * The iPhone/iMessage mockup under the hero headline.
 *
 * Everything inside is sized in **container query units** (`cqw`) against the
 * two wrappers that declare `[container-type:inline-size]` — the outer hero
 * frame and the phone screen. That is the whole scaling mechanism: there are no
 * breakpoints in here. Do not convert `cqw` values to rem/px.
 *
 * The silver frame is a PNG layered at `z-10` *over* an HTML-built screen.
 */

/** iOS renders in SF; approximate it with the platform UI stack. */
const IOS_FONT: CSSProperties = {
  fontFamily:
    'system-ui, -apple-system, "SF Pro Text", "SF Pro Display", "Segoe UI", sans-serif',
  fontVariationSettings: "'wdth' 100",
};

/** Fades the top of the thread out as it slides under the nav toolbar. */
const THREAD_MASK: CSSProperties = {
  WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 25%, black 100%)",
  maskImage: "linear-gradient(to bottom, transparent 0%, black 25%, black 100%)",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
};

const GLASS_CHIP =
  "relative inline-flex items-center justify-center rounded-full bg-[var(--ios-glass)] backdrop-blur-[5cqw] shadow-[0_0_0_0.12cqw_rgba(0,0,0,0.04),0_0.5cqw_1.5cqw_-0.25cqw_rgba(0,0,0,0.05)]";

const MESSAGES: ChatMessage[] = [
  { from: "user", text: "ok i need aruba. like soon 🏝️" },
  {
    from: "orchid",
    text: "say less. found a villa in palm beach. private pool, 3 min from the sand.",
  },
  {
    from: "orchid",
    text: "",
    images: ["/branded/aruba.webp", "/branded/aruba_party.webp", "/branded/beach.jpeg"],
  },
  {
    from: "orchid",
    text: "$240/night, free cancellation. flights are $380 round trip, thursday to tuesday.",
  },
  {
    from: "orchid",
    text: "tap here to pay and you're locked in\n\n💵 expedia.com/pay/5723190d",
  },
  { from: "user", text: "done ✅", tail: true, reaction: "🔥" },
  {
    from: "orchid",
    text: "🙌 it's on your calendar. made you an itinerary too. sunset catamaran thursday + that ceviche spot you saved 🌅",
    tail: true,
  },
];

/** The photo stack fans out to the right, so each layer sits lower and rotated. */
const PHOTO_TRANSFORMS = [
  "translate(0cqw, 0cqw) rotate(0deg)",
  "translate(8.5cqw, 0.8cqw) rotate(2deg)",
  "translate(17cqw, 1.6cqw) rotate(4deg)",
];

const LINK_PATTERN = /([a-z0-9-]+(?:\.[a-z0-9-]+)+\/\S+)/gi;

/** Renders bare URLs inside message copy as iOS's blue underlined data detector. */
function renderMessageText(text: string): ReactNode[] {
  return text.split(LINK_PATTERN).map((chunk, index) =>
    index % 2 === 1 ? (
      <span key={index} className="underline underline-offset-2 text-[#0a84ff]">
        {chunk}
      </span>
    ) : (
      chunk
    ),
  );
}

function StatusBar() {
  return (
    <div
      className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-[12cqw] pt-[6.2cqw] pb-[4.7cqw] text-[var(--ios-text-primary)]"
      style={IOS_FONT}
    >
      <span className="font-[590] text-[4.23cqw] leading-none">9:41</span>
      <div className="flex items-center gap-[1.74cqw] text-[var(--ios-text-primary)]">
        <IosWifiIcon className="h-[3.07cqw] w-auto" />
        <IosBatteryIcon className="h-[3.23cqw] w-auto" />
      </div>
    </div>
  );
}

function NavToolbar() {
  return (
    <div
      className="absolute inset-x-0 top-[9%] z-10 h-[9.95%] px-[3.98cqw]"
      style={IOS_FONT}
    >
      <div className="relative flex h-full items-start justify-between">
        <div className={cn(GLASS_CHIP, "h-[10.95cqw] gap-[1cqw] px-[2cqw] text-[var(--ios-toolbar-icon)]")}>
          <svg
            width="4.23cqw"
            height="4.23cqw"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="text-[var(--ios-toolbar-icon)]"
          >
            <path d="M15 6l-6 6 6 6" />
          </svg>
          <span className="grid size-[5.22cqw] place-items-center rounded-full bg-[var(--ios-text-primary)] text-[2.99cqw] font-[590] text-[var(--ios-bg)]">
            2
          </span>
        </div>

        <div className="absolute left-1/2 top-0 size-[14.93cqw] -translate-x-1/2">
          <span className="absolute inset-0 overflow-hidden rounded-full shadow-[0_0.6cqw_0.5cqw_rgba(0,0,0,0.1)]">
            <img
              alt=""
              aria-hidden="true"
              src="/illustrations/channels/orchid-icon.png"
              className="h-full w-full object-cover select-none"
            />
          </span>
          <div className="absolute left-1/2 top-[91.67%] flex h-[7.96cqw] -translate-x-1/2 items-center gap-[1cqw] rounded-full bg-[var(--ios-glass)] pl-[3.48cqw] pr-[1.74cqw] backdrop-blur-[5cqw] shadow-[0_0_0_0.12cqw_rgba(0,0,0,0.04),0_0.5cqw_1.5cqw_-0.25cqw_rgba(0,0,0,0.05)]">
            <span
              className="font-bold leading-none text-[4.23cqw] text-[var(--ios-text-primary)] whitespace-nowrap"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Orchid
            </span>
            <span className="text-[4.23cqw] leading-none text-[var(--ios-text-secondary)]">›</span>
          </div>
        </div>

        <div className={cn(GLASS_CHIP, "size-[10.95cqw] text-[var(--ios-toolbar-icon)]")}>
          <IosVideoIcon width="4.98cqw" height="4.98cqw" />
        </div>
      </div>
    </div>
  );
}

function PhotoStack({ images }: { images: string[] }) {
  return (
    <div className="relative aspect-[4/5] w-[54cqw]">
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="absolute inset-0 h-full w-full select-none rounded-[4.98cqw] object-cover shadow-[0_0.5cqw_2cqw_rgba(8,21,46,0.28)]"
          style={{
            zIndex: images.length - index,
            transformOrigin: "center center",
            transform: PHOTO_TRANSFORMS[index],
          }}
        />
      ))}
    </div>
  );
}

function Tapback({ emoji }: { emoji: string }) {
  return (
    <>
      <span
        aria-hidden="true"
        data-tapback="true"
        className="pointer-events-none absolute z-10 grid size-[8.96cqw] place-items-center rounded-full bg-[#08f] shadow-[0_0.5cqw_1.5cqw_-0.25cqw_rgba(0,0,0,0.22)] -top-[6.97cqw] -left-[3.74cqw]"
      >
        <span className="text-[4.23cqw] leading-none">{emoji}</span>
      </span>
      <span
        aria-hidden="true"
        data-tapback="true"
        className="pointer-events-none absolute z-10 size-[2.99cqw] rounded-full bg-[#08f] shadow-[0_0.25cqw_0.6cqw_rgba(0,0,0,0.18)] -top-[0.25cqw] -left-[3.74cqw]"
      />
      <span
        aria-hidden="true"
        data-tapback="true"
        className="pointer-events-none absolute z-10 size-[1.49cqw] rounded-full bg-[#08f] shadow-[0_0.18cqw_0.45cqw_rgba(0,0,0,0.15)] top-[2.74cqw] -left-[4.48cqw]"
      />
    </>
  );
}

function MessageRow({ message }: { message: ChatMessage }) {
  const isUser = message.from === "user";

  return (
    <div
      className={cn(
        "flex w-full transition-[margin,padding] duration-300 ease-out",
        message.images && "mb-[3cqw]",
        isUser ? "justify-end" : "justify-start",
        message.tail ? "pb-[1.49cqw]" : "pb-0",
        message.reaction && "mt-[7.5cqw]",
      )}
    >
      {message.images ? (
        <PhotoStack images={message.images} />
      ) : (
        <div
          className={cn(
            "relative max-w-[69.65cqw] rounded-[4.98cqw] px-[2.99cqw] py-[2.24cqw]",
            isUser
              ? "bg-[#0088ff] text-white"
              : "bg-[var(--ios-bubble-received)] text-[var(--ios-text-primary)]",
          )}
          style={IOS_FONT}
        >
          <p className="whitespace-pre-wrap leading-[1.295] tracking-[-0.005em] text-[4.23cqw]">
            {renderMessageText(message.text)}
          </p>
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute -bottom-[1.73cqw] h-[4.46cqw] w-[4.23cqw] transition-opacity duration-300 ease-out",
              message.tail ? "opacity-100" : "opacity-0",
              isUser
                ? "right-[1.75cqw] origin-bottom-right"
                : "left-[1.75cqw] origin-bottom-left",
            )}
          >
            <BubbleTail
              className={
                isUser ? "text-[#0088ff]" : "-scale-x-100 text-[var(--ios-bubble-received)]"
              }
            />
          </span>
          {message.reaction ? <Tapback emoji={message.reaction} /> : null}
        </div>
      )}
    </div>
  );
}

function MessageList() {
  // The clipping box the transcript scrolls inside — the animation measures its
  // height to work out how far to translate the list.
  const viewportRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="absolute inset-x-0 top-[7%] bottom-[0.92%] z-0 overflow-hidden"
      style={THREAD_MASK}
    >
      <div
        className="absolute inset-x-0 flex items-center justify-center gap-[1cqw] py-[1cqw] text-[2.74cqw] leading-none text-[var(--ios-text-secondary)]"
        style={{ top: "16%", ...IOS_FONT }}
      >
        <span className="font-[510]">Today</span>
        <span>8:05 AM</span>
      </div>
      <div
        ref={viewportRef}
        className="absolute inset-x-0 top-[19%] bottom-[8.58cqw] px-[3.98cqw]"
        style={IOS_FONT}
      >
        <TranscriptBubbles
          active
          loop
          messageGap={1.6}
          viewportRef={viewportRef}
          className="gap-[1cqw] will-change-transform"
        >
          {MESSAGES.map((message, index) => (
            <MessageRow key={index} message={message} />
          ))}
        </TranscriptBubbles>
      </div>
    </div>
  );
}

function InputToolbar() {
  return (
    <div
      className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-[2.99cqw] px-[6.97cqw] pt-[1cqw] pb-[6.97cqw]"
      style={IOS_FONT}
    >
      <div className={cn(GLASS_CHIP, "size-[9.95cqw] text-[var(--ios-toolbar-icon)]")}>
        <svg
          width="4.98cqw"
          height="4.98cqw"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </div>
      <div
        className={cn(
          GLASS_CHIP,
          "h-[9.95cqw] flex-1 justify-between gap-[1.99cqw] pl-[4.48cqw] pr-[2.49cqw]",
        )}
      >
        <span className="text-[4.23cqw] font-[510] leading-none text-[var(--ios-placeholder-text)]">
          iMessage
        </span>
        <span className="grid size-[5.47cqw] place-items-center rounded-full bg-[var(--ios-overlay)] text-[var(--ios-toolbar-icon)]">
          <svg
            width="3cqw"
            height="3cqw"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M12 19V5M6 11l6-6 6 6" />
          </svg>
        </span>
      </div>
    </div>
  );
}

/** Four orchid petals drifting out from behind the phone's shoulders. */
const PETALS: CSSProperties[] = [
  { left: "68.225%", top: "9.125cqw", transform: "translate(-50%, -50%) rotate(30deg)" },
  { left: "70.35%", top: "11.25cqw", transform: "translate(-50%, -50%) rotate(66deg)" },
  {
    left: "31.775%",
    top: "9.125cqw",
    transform: "translate(-50%, -50%) rotate(-30deg) scaleX(-1)",
  },
  {
    left: "29.65%",
    top: "11.25cqw",
    transform: "translate(-50%, -50%) rotate(-66deg) scaleX(-1)",
  },
];

function Petals() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {PETALS.map((style, index) => (
        <img
          key={index}
          alt=""
          src="/illustrations/channels/petal.svg"
          className="absolute h-[2.667cqw] w-[1.867cqw] select-none"
          style={style}
        />
      ))}
    </div>
  );
}

export function PhoneMockup() {
  return (
    <div className="absolute inset-0">
      <div className="absolute left-1/2 top-[10.75cqw] w-[37.5%] -translate-x-1/2">
        <div className="relative aspect-[450/920] w-full will-change-transform">
          {/* The screen: its own container so the UI scales with the phone. */}
          <div className="absolute inset-x-[5.33%] inset-y-[2.5%] [container-type:inline-size]">
            <div className="absolute inset-0 overflow-hidden rounded-[16cqw]">
              <div data-glass-content="true" className="absolute inset-0">
                <StatusBar />
                <NavToolbar />
                <MessageList />
                <InputToolbar />
              </div>
            </div>
          </div>
          {/* The silver frame sits on top of the HTML screen. */}
          <img
            aria-hidden="true"
            alt=""
            src="/illustrations/channels/iphone-17-pro-silver.png"
            className="pointer-events-none absolute inset-0 z-10 h-full w-full select-none"
          />
        </div>
      </div>
      <Petals />
    </div>
  );
}
