# LiveCounts & CtaCard Specification

## Overview
- **Target files:** `src/components/home/LiveCounts.tsx`, `src/components/CtaCard.tsx`
- **Verbatim markup:** `docs/research/orchid.ai/markup/home-10-live-counts.txt`, `home-11-cta.txt`
- **Interaction model:** both are scroll-triggered reveals; LiveCounts additionally counts its numbers up.

`CtaCard` lives outside `home/` because the case-study page reuses it verbatim
(`docs/research/orchid.ai/markup/casestudy.txt`, the `aria-labelledby="cta-title"` section).

---

# 1. LiveCounts

## Structure

```html
<section aria-labelledby="live-counts-title" class="relative overflow-hidden bg-paper px-6 py-20 md:px-12 md:py-28">
  <div class="mx-auto w-full max-w-[1000px]">
    <div class="lc-heading flex flex-col items-center gap-4 text-center">
      <span class="inline-flex items-center gap-2 rounded-full bg-ink/[0.04] px-3 py-1.5 text-[12px] uppercase tracking-[0.14em] text-ink/55">
        <span class="relative flex size-1.5">
          <span class="absolute inline-flex size-full animate-ping rounded-full bg-ink/40"></span>
          <span class="relative inline-flex size-1.5 rounded-full bg-ink/70"></span>
        </span>
        Live
      </span>
      <h2 id="live-counts-title" class="mx-auto max-w-[min(92vw,620px)] text-balance font-serif font-normal leading-[1.1] tracking-[-0.03em] text-ink text-[clamp(28px,4vw,44px)]">
        Orchid is working right now.
      </h2>
    </div>
    <div class="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-0 sm:divide-x sm:divide-ink/10">
      <!-- one .lc-item per stat -->
      <div class="lc-item flex flex-col items-center gap-3 px-4 text-center sm:px-10">
        <span class="font-serif tabular-nums leading-none tracking-[-0.03em] text-ink text-[clamp(44px,7vw,84px)]">
          <span aria-hidden="true">{animatedValue}</span>
          <span class="sr-only">{formattedValue}</span>
        </span>
        <h3 class="font-serif text-[19px] leading-[1.1] tracking-[-0.01em] text-ink">{label}</h3>
        <p class="max-w-[280px] text-pretty text-[14px] leading-[1.5] text-ink/60">{caption}</p>
      </div>
    </div>
  </div>
</section>
```

## Content (snapshot from the live site)

```ts
const STATS = [
  { value: 848195,  label: "Emails processed", caption: "Triaged, drafted, and handled end to end." },
  { value: 1760018, label: "Actions logged",   caption: "Every decision Orchid made, on the record." },
];
```
Put these in `src/lib/content/stats.ts` and accept them as a prop so they are trivially swappable —
the real site fetches them server-side.

Format with `new Intl.NumberFormat("en-US")` → `848,195` and `1,760,018`.

## Behaviors

### Section reveal
```js
const heading = root.querySelector<HTMLElement>(".lc-heading");
const items   = gsap.utils.toArray<HTMLElement>(".lc-item", root);
const all     = [heading, ...items].filter(Boolean);

gsap.set(all, { opacity: 0, y: 18, filter: "blur(8px)", willChange: "filter, transform, opacity" });
const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" },
                           onComplete: () => gsap.set(all, { willChange: "auto" }) });
tl.to(heading, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 });
tl.to(items,   { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, stagger: 0.1 }, "-=0.4");
ScrollTrigger.create({ trigger: root, start: "top 80%", animation: tl, once: true });
```
Skip entirely under reduced motion (leave everything visible).

### Count-up
The site animates a motion value from 0 to the target and renders
`Intl.NumberFormat("en-US").format(Math.round(v))`. Either `motion/react` (`useMotionValue` +
`animate` + `useTransform`) or a plain GSAP tween on a `{ value: 0 }` object writing into the span is
acceptable — the visible result is the same. Start it when the section reveal fires; ~2s with an
ease-out feel. Under reduced motion, render the final formatted value immediately.

The `sr-only` sibling always contains the final formatted number so assistive tech never reads a
ticking value.

### "Live" pill
Uses Tailwind's built-in `animate-ping` on the inner dot — no custom code needed.

## Responsive
- **390:** single column, `gap-10`, section `px-6 py-20`; number at the 44px clamp floor.
- **≥640 (`sm`):** two columns, `gap-0`, vertical `divide-x divide-ink/10` between them, `px-10` per item.
- **≥768:** section padding `md:px-12 md:py-28`; number grows toward the 84px ceiling.

---

# 2. CtaCard

## Structure

```html
<section aria-labelledby="cta-title" class="px-6 py-16 md:px-[120px] md:py-24">
  <div class="relative mx-auto flex aspect-[16/9] w-full max-w-[1440px] items-center justify-center overflow-hidden rounded-[32px]">
    <Image fill sizes="(min-width: 1440px) 1440px, 100vw" class="object-cover" src="/branded/store-at-dusk.jpeg" alt="" />
    <div aria-hidden="true" class="absolute inset-0 bg-[rgba(8,21,46,0.35)]"></div>
    <div class="relative z-10 flex flex-col items-center gap-8 px-6 text-center md:gap-10 md:px-12">
      <h2 id="cta-title" class="cta-headline max-w-[720px] font-serif font-medium text-paper leading-[1.05] tracking-[-0.04em] text-[clamp(40px,6vw,80px)]">
        Meet your new assistant.
      </h2>
      <div class="cta-ctas flex items-center gap-3">
        <a class="relative inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-paper px-6 py-4 text-sm font-medium leading-none text-ink transition-[opacity,scale] duration-150 hover:opacity-90 motion-safe:active:scale-[0.96] before:absolute before:inset-x-0 before:-inset-y-[5px] before:content-['']"
           href={IMESSAGE_HREF}>
          <Image src="/branded/imessage-icon.png" alt="" aria-hidden width={20} height={20} class="size-5 select-none" />
          Get Started
        </a>
      </div>
    </div>
  </div>
</section>
```

Accept an optional `headline` prop defaulting to `"Meet your new assistant."` so the case-study page
can reuse the component (check `markup/casestudy.txt` — if its headline differs, that page passes its own).

## Behavior

`.cta-headline` and `.cta-ctas` reveal on scroll, same family as everywhere else on the site:
```js
gsap.set([headline, ctas], { opacity: 0, y: 18, filter: "blur(8px)" });
const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } })
  .to(headline, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 })
  .to(ctas,     { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6 }, "-=0.45");
ScrollTrigger.create({ trigger: root, start: "top 80%", animation: tl, once: true });
```
Skip under reduced motion.

## Responsive
- **390:** `px-6 py-16`, headline at the 40px clamp floor, `gap-8`; the card stays `aspect-[16/9]`.
- **≥768:** `md:px-[120px] md:py-24`, `md:gap-10 md:px-12` inside.
- **≥1440:** card caps at `max-w-[1440px]`; headline reaches 80px.
