# Testimonials Specification

## Overview
- **Target files:** `src/components/home/Testimonials.tsx`, `src/lib/content/testimonials.ts`
- **Verbatim markup:** `docs/research/orchid.ai/markup/home-03-testimonials.txt`
- **Interaction model:** scroll-triggered entrance (once) **plus** a 7-second auto-rotate

## DOM structure

```html
<section aria-label="What people say about Orchid"
         class="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-paper px-6 py-24">
  <div class="relative z-10 flex flex-col items-center">
    <div class="relative mb-9 size-[clamp(74px,8vw,96px)] overflow-hidden rounded-[22px] bg-white shadow-[0_20px_55px_-14px_rgba(8,21,46,0.4)]">
      <Image fill sizes="96px" class="object-cover" src={item.image} alt={item.name} />
    </div>
    <div class="flex min-h-[280px] w-full max-w-[940px] items-center justify-center md:min-h-[200px]">
      <blockquote aria-live="polite"
                  class="text-balance text-center font-serif font-normal tracking-[-0.02em] text-ink text-[clamp(26px,3.8vw,44px)]">
        “{quote}”
      </blockquote>
    </div>
    <cite class="mt-7 block text-center text-sm font-medium not-italic tracking-wide text-ink/55">
      – {name}
    </cite>
  </div>
</section>
```

The curly quotes (`“` `”`) around the quote and the en dash + space (`– `) before the name are part of
the rendered output — keep them.

The three animated nodes are the avatar wrapper, the `<blockquote>` and the `<cite>`, in that order.

## Behaviors

### Entrance (plays once when the section scrolls in)
```js
gsap.set(els, { opacity: 0, y: 18, filter: "blur(8px)", willChange: "filter, transform, opacity" });
const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" },
                           onComplete: () => { entered = true; gsap.set(els, { willChange: "auto" }); } });
tl.to(els, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, stagger: 0.12 });
ScrollTrigger.create({ trigger: sectionEl, start: "top 80%", animation: tl,
                       toggleActions: "play none none reverse" });
```

### Rotation
A `setTimeout` of **7000 ms** advances to `(index + 1) % items.length`, reset whenever the index changes.

Swap animation (guarded so a swap already in flight is ignored):
```js
gsap.killTweensOf(els);
gsap.to(els, { opacity: 0, y: -8, duration: 0.32, ease: "power2.in", onComplete: () => {
  setIndex(next);
  requestAnimationFrame(() => {
    gsap.fromTo(els, { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.08,
        onComplete: () => { swapping = false; } });
  });
}});
```
Before the entrance timeline has completed, or under reduced motion, just set the index with no tween.

Under `prefers-reduced-motion: reduce`: no entrance tween (mark as already entered), and **no
auto-rotation at all** — the first testimonial stays.

## Content (verbatim)

```ts
export const TESTIMONIALS: Testimonial[] = [
  { quote: "Orchid checks in on me every morning and hypes me up before big days. Vitamins, workouts, my mom’s birthday. It never drops the ball, so I don’t either.",
    name: "Maha", image: "/testimonials/maha.png" },
  { quote: "Orchid runs my calendar end to end. Clients, team, dinners. I just show up where I need to be.",
    name: "Emir", image: "/testimonials/emir.png" },
  { quote: "Orchid makes follow ups easy, marks the important content and sends it to my iMessage, and I double it as a reminder app. It’s so intuitive to use.",
    name: "Kosta", image: "/testimonials/kosta.png" },
  { quote: "Orchid preps me before every investor call and keeps me current on every email thread. I walk in ready to do what I do best.",
    name: "Shubham", image: "/testimonials/shubham.png" },
  { quote: "I text Orchid a pic of my food and it tracks my calories and protein. No app, no logging. It even calls me out when I skip breakfast.",
    name: "Elsa", image: "/testimonials/elsa.png" },
  { quote: "Orchid surprised me from day one. At 2 a.m. it caught an important email I’d been waiting for before I even checked my inbox. That moment sold me.",
    name: "Emanuele", image: "/testimonials/emanuele.png" },
  { quote: "I run gas stations and Orchid tracks fuel prices around every one of them. It texts me when a competitor moves so I adjust the same day, not a week late.",
    name: "Mo", image: "/testimonials/mo.png" },
];
```
Note the typographic apostrophes (`’`) — copy them exactly.

## Assets
`/testimonials/{maha,emir,kosta,shubham,elsa,emanuele,mo}.png` — all present in `public/`.

## Responsive
- **390:** `px-6 py-24`, quote at the 26px clamp floor, quote box `min-h-[280px]`, avatar 74px.
- **768:** quote box drops to `md:min-h-[200px]`.
- **1440:** quote reaches the 44px ceiling, avatar 96px, `max-w-[940px]` governs the line length.
- Section is `min-h-[90vh]` at every width and vertically centres its content.
