# Behaviors — orchid.ai

Every animation below was read out of the site's own shipped JavaScript
(`docs/research/orchid.ai/site-bundle.js` and sibling chunks), so the durations, easings,
stagger values and trigger points are exact rather than estimated.

## Libraries the site uses

| Library | Used for |
| --- | --- |
| `gsap` + `ScrollTrigger` + `@gsap/react` (`useGSAP`) | every scroll reveal, the hero reveal, the rotating headline, the feature-panel choreography |
| `gsap/SplitText` | word-splitting the dark feature-section heading (`types: "words"`) |
| `motion` (framer-motion) | header logo menu, mobile menu, animated count-up numbers (`useTransform`/`motion.span`) |

There is **no** smooth-scroll library (no Lenis, no Locomotive) — native scrolling.

The real site also plays UI sound effects (`sound.play("tap")` on link/button pointerdown).
**Out of scope for the clone** — deliberately not reproduced.

Every animation is guarded by `window.matchMedia("(prefers-reduced-motion: reduce)")`; when reduced
motion is on, elements are `gsap.set(...)` straight to their final state. Reproduce that guard.

---

## Global

### Header (`<header class="absolute top-0 inset-x-0 z-50 …">`)
- **Not sticky and does not change on scroll.** It is `absolute` at the top of the document and
  scrolls away. Do not build a scroll-shrinking navbar.
- Nav links: `transition-colors`, hover → `bg-ink/[0.05] text-ink`.
- Login pill: `transition-[opacity,scale] duration-150`, hover `bg-paper/80`, `active:scale-[0.96]`.
- Get Started pill: hover `opacity-90`, `active:scale-[0.96]`.

### Logo menu (right-click / context-menu on the wordmark)
- Trigger: `onContextMenu` on the logo link toggles the menu (also closes on `Escape`, outside
  `pointerdown`, and blur).
- Panel: `absolute left-0 top-full mt-3 w-[260px] rounded-2xl bg-paper p-1.5 ring-1 ring-inset ring-ink/[0.08]`
  with the logo-menu shadow, `transformOrigin: "top left"`.
- framer-motion: `initial {opacity:0, y:-6, scale:.97, filter:"blur(8px)"}` →
  `animate {opacity:1, y:0, scale:1, filter:"blur(0px)"}` →
  `exit {opacity:0, y:-4, scale:.98, filter:"blur(6px)"}`, `duration: .22`, `ease: [0.16,1,0.3,1]`.
- Items stagger by `delay`: `0, .03, .06, (divider), .09`, each
  `initial {opacity:0, y:-3, filter:"blur(4px)"} → {opacity:1, y:0, filter:"blur(0px)"}`, `duration .2`.
- Items: Copy Logo as SVG, Copy Wordmark as SVG, Brand Guidelines (`/brand`), divider, Login (`/login`).
  On copy, the icon swaps to a check and the label becomes "Copied to clipboard" for **1400 ms**.

### Mobile menu (`md:hidden`)
- Icon swaps menu ↔ x via `AnimatePresence mode="wait"`:
  `initial {opacity:0, rotate:-90, scale:.6}` → `animate {opacity:1, rotate:0, scale:1}` →
  `exit {opacity:0, rotate:90, scale:.6}`, `duration .15`, `ease [0.16,1,0.3,1]`.
- Panel is `fixed inset-x-6 z-50 rounded-3xl bg-paper p-3 ring-1 ring-inset ring-ink/[0.08]`,
  `top` set at open time to `button.getBoundingClientRect().bottom + 12`,
  `maxHeight: calc(100dvh - (top + 24)px)`, `overflow-y-auto overscroll-contain`.
- Panel motion: `{opacity:0, y:-8, filter:"blur(8px)"}` → `{opacity:1, y:0, filter:"blur(0px)"}` →
  exit `{opacity:0, y:-4, filter:"blur(6px)"}`, `duration .22`, `ease [0.16,1,0.3,1]`.
- Closes on: Escape, outside pointerdown, **and scrolling more than 64px from the open position**.
- Reduced motion → opacity-only variants.

---

## Home page

### 1. Hero reveal
```js
gsap.set(heroRevealEls, { willChange: "filter, transform, opacity" });
gsap.timeline({ defaults: { ease: "power3.out" },
                onComplete: () => gsap.set(heroRevealEls, { willChange: "auto" }) })
   .from(heroRevealEls, { opacity: 0, y: 16, filter: "blur(8px)", duration: 0.8, stagger: 0.1 });
```
`.hero-reveal` is on: the `<h1>`, the sub-paragraph, the CTA wrapper, and the phone-mockup wrapper — 4 elements, played on mount (not scroll-triggered).

### 2. Rotating headline role
The italic word in "Meet Orchid, your *personal assistant*." cycles through 10 roles.

Roles, in order:
`personal assistant, inbox manager, calendar coordinator, travel planner, research assistant, news curator, score tracker, nutrition coach, portfolio tracker, ghostwriter`

```js
// every 2.4s (gsap.delayedCall(2.4, next)) while the element is intersecting
gsap.timeline({ onComplete: scheduleNext })
  .to(wrapper, { autoAlpha: 0, yPercent: -55, filter: "blur(5px)", duration: 0.3,  ease: "power2.in" })
  .add(() => { textEl.textContent = roles[next]; gsap.set(wrapper, { yPercent: 60 }); })
  .to(wrapper, { autoAlpha: 1, yPercent: 0,   filter: "blur(0px)", duration: 0.55, ease: "power3.out" });
```
An `IntersectionObserver` (threshold 0) pauses the cycle when the headline scrolls out of view and
resumes it on re-entry. The `<span class="sr-only">` keeps the static accessible sentence.

### 3. Testimonials
- 7 items, cycling on a **7000 ms** timer, `aria-live="polite"` on the blockquote.
- Entrance (once, on `ScrollTrigger` `start: "top 80%"`, `toggleActions: "play none none reverse"`):
  `gsap.set([avatar, quote, cite], {opacity:0, y:18, filter:"blur(8px)"})` then
  `.to(..., {opacity:1, y:0, filter:"blur(0px)", duration:.8, stagger:.12, ease:"power3.out"})`.
- Swap between quotes: `.to(els, {opacity:0, y:-8, duration:.32, ease:"power2.in"})`, then state
  change, then `gsap.fromTo(els, {opacity:0, y:10}, {opacity:1, y:0, duration:.55, stagger:.08, ease:"power3.out"})`.

Content (quote / name / image):
1. Maha — `/testimonials/maha.png`
2. Emir — `/testimonials/emir.png`
3. Kosta — `/testimonials/kosta.png`
4. Shubham — `/testimonials/shubham.png`
5. Elsa — `/testimonials/elsa.png`
6. Emanuele — `/testimonials/emanuele.png`
7. Mo — `/testimonials/mo.png`

(Verbatim quotes are in `docs/research/components/testimonials.spec.md`.)

### 4. Feature rows section ("What Orchid handles for you")
Scrubbed scroll reveals, one ScrollTrigger per element:
```js
gsap.set(rows,     { opacity: 0, y: 24, filter: "blur(12px)" });
gsap.set(dividers, { opacity: 0, scaleX: 0.92, transformOrigin: "50% 50%" });

rows.forEach(row => gsap.to(row, {
  opacity: 1, y: 0, filter: "blur(0px)", ease: "power2.out",
  scrollTrigger: { trigger: row, start: "top 85%", end: "top 55%", scrub: 0.5 },
}));
dividers.forEach(d => gsap.to(d, {
  opacity: 1, scaleX: 1, ease: "power2.out",
  scrollTrigger: { trigger: d, start: "top 95%", end: "top 70%", scrub: 0.5 },
}));
```
Rows alternate `flex-row` / `flex-row-reverse` at `min-[1024px]` (`reverse: index % 2 === 1`), and a
petal divider sits between consecutive rows (variant `one` for odd index, `two` for even).

### 5. Provider-constellation panel (row 1 visual)
Chip layout + float table, verbatim from source:
```js
const CHIPS = [
  { leftPct: 19, topPct: 26, size: 56, fx:  9, fy: -11, dur: 4.2 }, // gmail.svg          30px
  { leftPct: 44, topPct: 14, size: 46, fx: -7, fy:   9, dur: 5.3 }, // google-calendar.png 25px
  { leftPct: 72, topPct: 22, size: 52, fx: 10, fy:   8, dur: 4.7 }, // slack.png           28px
  { leftPct: 86, topPct: 50, size: 44, fx: -9, fy:  -8, dur: 5.6 }, // notion.png          24px
  { leftPct: 66, topPct: 73, size: 54, fx:  8, fy: -10, dur: 4.0 }, // figma.svg           29px
  { leftPct: 37, topPct: 80, size: 48, fx:-10, fy:   8, dur: 5.9 }, // dropbox.png         26px
  { leftPct: 13, topPct: 58, size: 50, fx:  9, fy:  11, dur: 4.9 }, // hubspot.png         27px
];
```
- Entrance: `gsap.set([center, ...chips], {autoAlpha: 0, scale: .5})` then
  `gsap.to(..., {autoAlpha: 1, scale: 1, duration: .55, stagger: .07, ease: "back.out(1.6)"})`,
  started by a ScrollTrigger on the panel.
- Idle drift: per chip `gsap.to(floatWrapper, {x: fx, y: fy, duration: dur, repeat: -1, yoyo: true, ease: "sine.inOut"})`.
  (Verified live: ~±8–11px, full cycle ≈ 2 × dur.)
- Chip markup: `.cn-float` wrapper → `.cn-chip` tile (`rounded-[14px] bg-white`, provider shadow) → `<img>`.
  Centre tile is `.cn-center`, `size-[68px] rounded-[18px] bg-white` containing a `size-[50px] rounded-[13px]`
  `orchid-square.png`.

### 6. Habit-bubbles panel (row 2 visual)
Five iMessage-blue bubbles fade/scale in on a stagger. Each bubble carries inline
`transition: opacity 450ms ease, transform 450ms cubic-bezier(0.34, 1.56, 0.64, 1)` and starts at
`opacity: 0; transform: scale(0.82)`.

Positions and text, verbatim:
| # | left% | top% | text |
| --- | --- | --- | --- |
| 1 | 22 | 12 | send me a news digest every morning |
| 2 | 71 | 31 | track the weather, ping me if it'll rain 🌧️ |
| 3 | 35 | 48 | be my calorie tracker, i'll send you pics |
| 4 | 65 | 66 | check me in for my flights automatically ✈️ |
| 5 | 27 | 85 | remind me to take my meds at 9 |

### 7. Live counts
- Entrance: `gsap.set([.lc-heading, ...(.lc-item)], {opacity:0, y:18, filter:"blur(8px)"})`, then a
  paused timeline `.to(heading, {…, duration:.8})` and `.to(items, {…, duration:.6, stagger:.1}, "-=0.…")`,
  `defaults {ease:"power3.out"}`, released by a ScrollTrigger on the section.
- Numbers count up with framer-motion `useTransform` over a motion value, formatted with
  `new Intl.NumberFormat("en-US")`. Rendered `aria-hidden` with an `sr-only` final value beside it.
- Values are server-supplied stats (`workflowRunCount`, `auditLogCount`). Snapshot at capture time:
  **848,195** "Emails processed", **1,760,018** "Actions logged".
- The "Live" pill uses Tailwind's `animate-ping` on an inner dot (`ping 1s cubic-bezier(0,0,.2,1) infinite`).

### 8. Hero phone mockup
- Pure HTML/CSS — an iPhone 17 Pro PNG frame (`/illustrations/channels/iphone-17-pro-silver.png`)
  layered `z-10` over a live iMessage thread built from divs.
- The whole composition is driven by **container queries**: the outer wrapper sets
  `[container-type:inline-size]` and every size inside is expressed in `cqw`. Keep that — it is why
  the mockup scales cleanly.
- Message list (7 messages) is static in the served HTML; tails render at `opacity-0` except on the
  final message of each run (`tail: true`), fading via `transition-opacity duration-300 ease-out`.
- One message is a stack of three photos, rotated/offset by inline transform:
  `aruba.webp` (z3, 0cqw/0cqw, 0°), `aruba_party.webp` (z2, 8.5cqw/0.8cqw, 2°), `beach.jpeg` (z1, 17cqw/1.6cqw, 4°).
- A `🔥` tapback uses the `tapback-pop` keyframe (`0%: opacity 0 scale .2 → 72%: opacity 1 scale 1.12 → 100%: scale 1`).
- Four `petal.svg` decorations sit around the phone at fixed percentage offsets with rotations
  `30°, 66°, -30°+scaleX(-1), -66°+scaleX(-1)`.

### 9. CTA card
- `.cta-headline` and `.cta-ctas` reveal on scroll (same power3.out / blur-in family as the other
  sections). Background `store-at-dusk.jpeg` under `rgba(8,21,46,0.35)`.

---

## Blog / case-studies / post pages

- `.blog-header` / `.cs-header` / `.post-back` / `.post-header` / `.post-hero` / `.post-article`
  and `.blog-card` / `.cs-card` are ScrollTrigger reveal hooks following the same
  `opacity/y/blur → power3.out` pattern with a small stagger across cards.
- Cards: `group` hover → title `opacity-80` (`transition-opacity duration-200`);
  whole card `motion-safe:active:scale-[0.99]`; focus ring
  `focus-visible:ring-2 focus-visible:ring-ink/40 ring-offset-4 ring-offset-paper`.
- Blog index grid: `grid-cols-1 md:grid-cols-3`, `gap-x-8 gap-y-16`, `mt-20 md:mt-28`; card image `aspect-[4/5]`.
- Case-studies grid: `grid-cols-1 md:grid-cols-2`, card image `aspect-[16/9]`.
- Post hero image `aspect-[16/9] rounded-[36px]`; article column `max-w-[720px]`.

## Contact page

- Copy-email button: `navigator.clipboard.writeText`, icon swaps to a check briefly.
- The live site obfuscates the address with Cloudflare email protection
  (`/cdn-cgi/l/email-protection`, `<span class="__cf_email__">`). The clone uses a plain
  `mailto:` — see the contact spec.

## Responsive summary

| Section | Mobile (390) | Tablet (768) | Desktop (1440) |
| --- | --- | --- | --- |
| Header | logo + hamburger; nav & pills hidden | same until `md` | full nav + Login/Get Started |
| Hero | `pt-28`, phone at `w-[min(200%,800px)]` overflowing gutters | — | `pt-36`, phone centred at container width |
| Feature rows | stacked, `gap-10` | stacked | horizontal at `min-[1024px]`, `gap-[64px]`, alternating |
| Feature visual | `aspect-[540/400]` full width | — | fixed `540×440` |
| Live counts | 1 col, `gap-10` | 2 cols with divider at `sm` | 2 cols |
| Blog grid | 1 col | 3 cols at `md` | 3 cols |
| Case-studies grid | 1 col | 2 cols at `md` | 2 cols |
| Footer | stacked `gap-16` | columns wrap at `sm` | row at `lg`, `gap-24` |
