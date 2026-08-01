# Hero Specification

## Overview
- **Target files:** `src/components/home/Hero.tsx`, `src/components/home/RotatingRole.tsx`,
  `src/components/home/PhoneMockup.tsx`
- **Verbatim markup:** `docs/research/orchid.ai/markup/home-02-hero.txt` (239 lines — the ground truth)
- **Interaction model:** mount animation (GSAP timeline) + time-driven word cycle. Nothing here is
  scroll-driven.

## Structure

```
<section class="relative isolate overflow-hidden bg-paper">
  <div class="flex flex-col items-center gap-7 px-6 pt-28 text-center md:gap-8 md:px-[120px] md:pt-36">
    <h1  class="hero-reveal …">                     <!-- headline w/ rotating role -->
    <p   class="hero-reveal …">                     <!-- sub-copy -->
    <div class="hero-reveal"> <SmsLink …> </div>    <!-- Get Started pill -->
  </div>
  <div class="-mt-9 px-6 pb-12 md:mt-[calc(clamp(0px,(100vw_-_48rem)_*_0.08,3.5rem)_*_-1)] md:px-[120px] md:pb-16">
    <div class="hero-reveal pointer-events-none relative mx-[calc((100%_-_min(200%,800px))_/_2)] aspect-[1200/1080] w-[min(200%,800px)] max-w-[1200px] [container-type:inline-size] md:mx-auto md:w-full">
      … phone + petals …
    </div>
  </div>
</section>
```

### Headline
`hero-reveal max-w-[min(92vw,738px)] text-balance font-serif text-[clamp(40px,7vw,64px)] font-medium leading-[1.05] tracking-[-0.04em] text-ink`

Contents:
```html
<span class="sr-only">Meet Orchid, your personal assistant.</span>
<span aria-hidden="true" class="block">
  Meet Orchid, your
  <span class="flex justify-center"><RotatingRole /></span>
</span>
```

### Sub-copy
`hero-reveal max-w-[min(92vw,520px)] text-balance text-base leading-[1.5] text-ink/75 text-pretty`
> Orchid is a personal assistant that helps you stay organized, find information, and get things done. All through messages.

### CTA pill (href = `IMESSAGE_HREF`)
`relative inline-flex cursor-pointer items-center gap-2 rounded-full bg-card px-4 py-2.5 text-sm font-medium leading-none text-ink ring-1 ring-ink/10 shadow-[0_2px_8px_rgba(8,21,46,0.06)] transition-[transform,box-shadow] duration-150 hover:shadow-[0_4px_16px_rgba(8,21,46,0.10)] motion-safe:active:scale-[0.97] before:absolute before:inset-x-0 before:-inset-y-[5px] before:content-['']`
Contains `next/image` `/branded/imessage-icon.png` 20×20 `priority` `className="size-5 select-none"`, then the text `Get Started`.

## Behaviors

### Mount reveal
```js
const els = gsap.utils.toArray<HTMLElement>(".hero-reveal", scopeEl);
gsap.set(els, { willChange: "filter, transform, opacity" });
gsap.timeline({ defaults: { ease: "power3.out" },
                onComplete: () => gsap.set(els, { willChange: "auto" }) })
    .from(els, { opacity: 0, y: 16, filter: "blur(8px)", duration: 0.8, stagger: 0.1 });
```
Skip entirely when `prefers-reduced-motion: reduce`.

### RotatingRole
```js
const ROLES = ["personal assistant", "inbox manager", "calendar coordinator", "travel planner",
  "research assistant", "news curator", "score tracker", "nutrition coach", "portfolio tracker",
  "ghostwriter"];
```
Markup: `<span ref={wrap} class="inline-flex items-baseline whitespace-nowrap will-change-[transform,opacity,filter]"><span ref={text} class="italic">{ROLES[0]}</span><span aria-hidden="true">.</span></span>`

```js
gsap.timeline({ onComplete: scheduleNext })
  .to(wrap, { autoAlpha: 0, yPercent: -55, filter: "blur(5px)", duration: 0.3,  ease: "power2.in" })
  .add(() => { text.textContent = ROLES[next]; gsap.set(wrap, { yPercent: 60 }); })
  .to(wrap, { autoAlpha: 1, yPercent: 0,     filter: "blur(0px)", duration: 0.55, ease: "power3.out" });
// scheduleNext = gsap.delayedCall(2.4, run)
```
An `IntersectionObserver` (threshold 0) on the wrapper pauses the cycle when off-screen and resumes
on re-entry. Kill the delayedCall and disconnect the observer on cleanup. Mutating `textContent`
directly (rather than React state) is intentional — it keeps GSAP in control of the DOM node.

## PhoneMockup

Everything is sized in **container query units** (`cqw`) against the wrapper that sets
`[container-type:inline-size]`. Preserve this — it is why the mockup scales.

Layers, outermost first:
1. `absolute inset-0` → `absolute left-1/2 top-[10.75cqw] w-[37.5%] -translate-x-1/2`
2. `relative aspect-[450/920] w-full will-change-transform`
3. Screen inset: `absolute inset-x-[5.33%] inset-y-[2.5%] [container-type:inline-size]`
   → `absolute inset-0 overflow-hidden rounded-[16cqw]`
4. Inside the screen, in order: status bar, nav toolbar, scrolling message list, input toolbar.
5. **On top**, `z-10`: `<img src="/illustrations/channels/iphone-17-pro-silver.png" class="pointer-events-none absolute inset-0 z-10 h-full w-full select-none">` — the phone frame is a PNG over the HTML screen.
6. Sibling `absolute inset-0` layer with four `/illustrations/channels/petal.svg` images.

Every text node inside the screen uses the inline font stack
`system-ui, -apple-system, "SF Pro Text", "SF Pro Display", "Segoe UI", sans-serif` with
`font-variation-settings: 'wdth' 100`.

### Status bar
`absolute inset-x-0 top-0 z-10 flex items-center justify-between px-[12cqw] pt-[6.2cqw] pb-[4.7cqw] text-[var(--ios-text-primary)]`
- `9:41` — `font-[590] text-[4.23cqw] leading-none`
- right group `flex items-center gap-[1.74cqw]` → `<IosWifiIcon class="h-[3.07cqw] w-auto">`, `<IosBatteryIcon class="h-[3.23cqw] w-auto">`

### Nav toolbar
`absolute inset-x-0 top-[9%] z-10 h-[9.95%] px-[3.98cqw]` → `relative flex h-full items-start justify-between`
- Back chip: `relative inline-flex items-center justify-center rounded-full bg-[var(--ios-glass)] backdrop-blur-[5cqw] shadow-[0_0_0_0.12cqw_rgba(0,0,0,0.04),0_0.5cqw_1.5cqw_-0.25cqw_rgba(0,0,0,0.05)] h-[10.95cqw] gap-[1cqw] px-[2cqw] text-[var(--ios-toolbar-icon)]` — chevron-left path `M15 6l-6 6 6 6` at `4.23cqw`, stroke-width 2.4; badge `grid size-[5.22cqw] place-items-center rounded-full bg-[var(--ios-text-primary)] text-[2.99cqw] font-[590] text-[var(--ios-bg)]` containing `2`.
- Avatar: `absolute left-1/2 top-0 size-[14.93cqw] -translate-x-1/2`; inner `absolute inset-0 overflow-hidden rounded-full shadow-[0_0.6cqw_0.5cqw_rgba(0,0,0,0.1)]` with `/illustrations/channels/orchid-icon.png`; name chip `absolute left-1/2 top-[91.67%] flex h-[7.96cqw] -translate-x-1/2 items-center gap-[1cqw] rounded-full bg-[var(--ios-glass)] pl-[3.48cqw] pr-[1.74cqw] backdrop-blur-[5cqw]` + same shadow, containing bold `Orchid` at `4.23cqw` and a `›` in `--ios-text-secondary`.
- FaceTime chip: `size-[10.95cqw]` glass circle with `<IosVideoIcon>` at `4.98cqw`.

### Message list
`absolute inset-x-0 top-[7%] bottom-[0.92%] z-0 overflow-hidden` with inline
`mask-image: linear-gradient(to bottom, transparent 0%, black 25%, black 100%)` (plus the
`-webkit-` variant, `mask-repeat: no-repeat`, `mask-size: 100% 100%`).
- Date row: `absolute inset-x-0 flex items-center justify-center gap-[1cqw] py-[1cqw] text-[2.74cqw] leading-none text-[var(--ios-text-secondary)]`, `style="top:16%"` — `<span class="font-[510]">Today</span><span>8:05 AM</span>`.
- Thread: `absolute inset-x-0 top-[19%] bottom-[8.58cqw] px-[3.98cqw]` → `flex flex-col gap-[1cqw] will-change-transform`.
- Row: `flex w-full transition-[margin,padding] duration-300 ease-out` + `justify-end`/`justify-start` + `pb-0`.
- Bubble: `relative max-w-[69.65cqw] rounded-[4.98cqw] px-[2.99cqw] py-[2.24cqw]` +
  sent `bg-[#0088ff] text-white` / received `bg-[var(--ios-bubble-received)] text-[var(--ios-text-primary)]`.
  Text: `<p class="whitespace-pre-wrap leading-[1.295] tracking-[-0.005em] text-[4.23cqw]">`.
- Tail: `pointer-events-none absolute -bottom-[1.73cqw] h-[4.46cqw] w-[4.23cqw] transition-opacity duration-300 ease-out` + `opacity-0`/`opacity-100` + `right-[1.75cqw] origin-bottom-right` (sent) or `left-[1.75cqw] origin-bottom-left` (received). Use `<BubbleTail>` from `@/components/icons`; received tails add `-scale-x-100` and `text-[var(--ios-bubble-received)]`, sent tails `text-[#0088ff]`.

**Messages (verbatim, in order).** `tail: true` renders the tail at `opacity-100`; all others `opacity-0`:
1. user — `ok i need aruba. like soon 🏝️`
2. orchid — `say less. found a villa in palm beach. private pool, 3 min from the sand.`
3. orchid — images `["/branded/aruba.webp", "/branded/aruba_party.webp", "/branded/beach.jpeg"]`, empty text
4. orchid — `$240/night, free cancellation. flights are $380 round trip, thursday to tuesday.`
5. orchid — `tap here to pay and you're locked in\n\n💵 expedia.com/pay/5723190d`
6. user — `done ✅`, `tail: true`, `reaction: "🔥"`
7. orchid — `🙌 it's on your calendar. made you an itinerary too. sunset catamaran thursday + that ceviche spot you saved 🌅`, `tail: true`

**Image message** (row wrapper gets an extra `mb-[3cqw]`):
`<div class="relative aspect-[4/5] w-[54cqw]">` with three stacked `<img>`, each
`absolute inset-0 h-full w-full select-none rounded-[4.98cqw] object-cover shadow-[0_0.5cqw_2cqw_rgba(8,21,46,0.28)]`
and inline `transform-origin: center center`:
| image | z-index | transform |
| --- | --- | --- |
| `aruba.webp` | 3 | `translate(0cqw, 0cqw) rotate(0deg)` |
| `aruba_party.webp` | 2 | `translate(8.5cqw, 0.8cqw) rotate(2deg)` |
| `beach.jpeg` | 1 | `translate(17cqw, 1.6cqw) rotate(4deg)` |

**Reaction (tapback)** on message 6: a small circular bubble pinned to the bubble's top-left,
animated with the `animate-tapback-pop` class already defined in `globals.css`.

### Input toolbar
`absolute inset-x-0 bottom-0 z-10 flex items-center gap-[2.99cqw] px-[6.97cqw] pt-[1cqw] pb-[6.97cqw]`
- Plus circle: glass `size-[9.95cqw]`, path `M12 5v14M5 12h14`, stroke-width 2.2, `4.98cqw`.
- Field: `relative inline-flex items-center rounded-full bg-[var(--ios-glass)] backdrop-blur-[5cqw]` + glass shadow + `h-[9.95cqw] flex-1 justify-between gap-[1.99cqw] pl-[4.48cqw] pr-[2.49cqw]`, containing `<span class="text-[4.23cqw] font-[510] leading-none text-[var(--ios-placeholder-text)]">iMessage</span>` and a `grid size-[5.47cqw] place-items-center rounded-full bg-[var(--ios-overlay)] text-[var(--ios-toolbar-icon)]` with an up-arrow (`M12 19V5M6 11l6-6 6 6`, stroke-width 2.4, `3cqw`).

### Petals
`<div aria-hidden="true" class="pointer-events-none absolute inset-0">` with four
`<img src="/illustrations/channels/petal.svg" class="absolute h-[2.667cqw] w-[1.867cqw] select-none">`:
| left | top | transform |
| --- | --- | --- |
| 68.225% | 9.125cqw | `translate(-50%, -50%) rotate(30deg)` |
| 70.35% | 11.25cqw | `translate(-50%, -50%) rotate(66deg)` |
| 31.775% | 9.125cqw | `translate(-50%, -50%) rotate(-30deg) scaleX(-1)` |
| 29.65% | 11.25cqw | `translate(-50%, -50%) rotate(-66deg) scaleX(-1)` |

## Responsive
- **390 / 768:** wrapper `-mt-9 pb-12`, phone wrapper `w-[min(200%,800px)]` with the negative
  `mx-[calc(...)]` so it intentionally bleeds past the gutters; headline at the `clamp` floor (40px).
- **1440:** `md:` rules take over — `pt-36`, `md:mx-auto md:w-full`, the negative-margin `calc` pulls
  the mockup up under the copy; headline reaches the 64px clamp ceiling.
