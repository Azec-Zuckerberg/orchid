# TranscriptBubbles Specification (hero chat animation)

## Overview
- **Target files:** `src/components/home/TranscriptBubbles.tsx` (new), `src/components/home/PhoneMockup.tsx` (wire it in)
- **Interaction model:** time-driven, looping GSAP timeline, paused when off-screen
- **Why this exists:** the served HTML renders all seven messages stacked and clipped. On the live
  site the thread is animated: messages fade/lift in one at a time and the whole list translates
  upward so the newest message stays above the input bar. Without this the hero looks static and the
  last two messages sit hidden behind the toolbar.

Deminified verbatim from the site's own bundle (`TranscriptBubbles`, module 55823).

## Component contract

```tsx
interface TranscriptBubblesProps {
  active: boolean;
  loop?: boolean;
  messageGap?: number;   // seconds of dwell between messages
  bottomInset?: number;  // px; defaults to max(18, 0.26 * viewport.clientHeight)
  viewportRef?: React.RefObject<HTMLElement | null>;
  className?: string;
  children: React.ReactNode;
}
```
Renders `<div ref={listRef} className={cn("flex flex-col", className)}>{children}</div>`.

The hero uses: `active`, `loop`, `messageGap={1.6}`, **no** `bottomInset`, and
`className="gap-[1cqw] will-change-transform"`, with `viewportRef` pointing at the
`absolute inset-x-0 top-[19%] bottom-[8.58cqw] px-[3.98cqw]` wrapper.

## Exact logic

```js
const list = listRef.current;
const viewport = viewportRef?.current ?? list?.parentElement;
if (!list || !viewport) return;
const items = Array.from(list.children);
if (items.length === 0) return;

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const inset = bottomInset ?? Math.max(18, 0.26 * viewport.clientHeight);
const yFor = (el) => Math.min(0, viewport.clientHeight - (el.offsetTop + el.offsetHeight) - inset);

// Reduced motion: jump to the end state — list scrolled to the last message, all bubbles visible.
if (reduced) {
  gsap.set(list, { y: yFor(items[items.length - 1]) });
  gsap.set(items, { clearProps: "opacity,visibility,transform,filter", autoAlpha: 1 });
  return;
}

// Bubbles grow from the corner they're anchored to.
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
  let position;
  if (i === 0) {
    position = 0;
  } else if (y !== lastY) {
    // scroll the list up to keep the incoming message in view
    tl.to(list, { y, duration: 0.36, ease: "power2.out" },
          messageGap > 0 ? `>+=${messageGap}` : ">-=0.06");
    lastY = y;
    position = ">-=0.02";
  } else {
    position = messageGap > 0 ? `>+=${messageGap}` : ">-=0.1";
  }
  tl.to(el, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.5, ease: "power3.out" },
        position);

  const tb = el.querySelectorAll("[data-tapback]");
  if (tb.length) {
    tl.to(tb, { autoAlpha: 1, scale: 1, duration: 0.34, ease: "back.out(1.8)" }, ">+0.45");
  }
});

if (!loop) return () => tl.kill();

const io = new IntersectionObserver(
  (entries) => { (entries[0]?.isIntersecting ?? true) ? tl.play() : tl.pause(); },
  { threshold: 0 },
);
io.observe(viewport);
return () => { io.disconnect(); tl.kill(); };
```
Run inside `useGSAP(..., { dependencies: [active, viewportRef, messageGap, bottomInset, loop] })`.

## Wiring into PhoneMockup

The message-list wrapper stays exactly as it is:
```html
<div ref={viewportRef} class="absolute inset-x-0 top-[19%] bottom-[8.58cqw] px-[3.98cqw]" style={{ fontFamily: IOS_FONT, ... }}>
  <TranscriptBubbles active loop messageGap={1.6} viewportRef={viewportRef}
                     className="gap-[1cqw] will-change-transform">
    {HERO_MESSAGES.map((m, i) => <MessageRow key={i} {...m} />)}
  </TranscriptBubbles>
</div>
```
- The list element **is** the `TranscriptBubbles` inner div — so the existing
  `flex flex-col gap-[1cqw] will-change-transform` wrapper is replaced by it, not nested inside it.
  Its direct children must be the per-message row divs (the ones carrying `justify-end` /
  `justify-start`), because the timeline animates `list.children` and reads `justify-end` off them.
- The tapback element must carry a `data-tapback` attribute so the timeline can find it. It should no
  longer rely on the `animate-tapback-pop` CSS class — GSAP now owns that entrance. Remove the class
  from the tapback element (leave the keyframes in `globals.css`; they're harmless).
- `bottomInset` is **not** passed by the hero — leave it undefined so the default
  `max(18, 0.26 * viewport.clientHeight)` applies.

## Expected result
On load the thread is empty; messages appear one at a time roughly every 1.6s with a soft blur-lift,
the list slides up as it fills, the 🔥 tapback pops onto the "done ✅" bubble, then after a 3.5s hold
the whole sequence restarts. It pauses whenever the phone scrolls out of view.
