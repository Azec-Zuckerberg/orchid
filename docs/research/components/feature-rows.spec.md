# Feature Rows Specification (section scaffolding)

## Overview
- **Target files:** `src/components/home/FeaturesSection.tsx`, `src/components/home/FeatureRow.tsx`,
  `src/components/home/PetalDivider.tsx`, `src/lib/content/feature-rows.tsx`
- **Verbatim markup:** `docs/research/orchid.ai/markup/home-04-row1-connect-stack.txt` (a complete
  row), `home-05-divider.txt` (the divider), and `home-06…home-09` for the remaining four rows.
- **Interaction model:** scrubbed scroll reveal, one ScrollTrigger per row and per divider.

> The five illustrated panels (`Visual`) are built by other agents in
> `src/components/home/visuals/`. This spec owns everything *around* them.

## Section

```html
<section aria-label="What Orchid handles for you"
         class="bg-paper px-6 py-32 md:px-12 md:py-44 min-[1280px]:px-[120px] min-[1280px]:py-56">
  <div class="mx-auto flex max-w-[1200px] flex-col gap-16 md:gap-20 min-[1280px]:gap-[80px]">
    <!-- for each row i: if (i > 0) <PetalDivider variant={i % 2 === 1 ? "one" : "two"} /> -->
    <!-- then <FeatureRow {...row} reverse={i % 2 === 1} /> -->
  </div>
</section>
```

## FeatureRow

```html
<div data-anim="row"
     class="flex flex-col gap-10 min-[1024px]:items-center min-[1024px]:gap-[64px]
            min-[1024px]:flex-row  |  min-[1024px]:flex-row-reverse">
  <div class="flex flex-1 flex-col items-start gap-8 py-4 min-[1024px]:min-w-px">
    <div class="flex w-full flex-col items-start gap-[12px]">
      <h3 class="font-serif text-[28px] leading-[1.1] tracking-[-0.03em] text-ink">{title}</h3>
      <p class="text-[16px] leading-[1.5] text-ink/65" style="max-width:{descriptionWidth}px">{description}</p>
    </div>
    <div class="flex w-full flex-col items-start">
      <!-- one bullet per entry; every bullet except the last adds border-b-[0.5px] border-ink/10 -->
      <div class="flex w-full py-3 border-b-[0.5px] border-ink/10">
        <div class="flex items-center gap-[12px]">
          <Icon class="size-[18px] shrink-0 text-ink/70" strokeWidth={1.6} />
          <p class="max-w-[530px] text-[15px] leading-[1.5] text-ink/65 md:text-[16px]">{text}</p>
        </div>
      </div>
    </div>
    <a class="relative inline-flex cursor-pointer items-center justify-center rounded-full bg-ink px-4 py-2.5 text-sm font-medium leading-none text-paper transition-[opacity,scale] duration-150 hover:opacity-90 motion-safe:active:scale-[0.97] before:absolute before:inset-x-0 before:-inset-y-[5px] before:content-['']"
       href={IMESSAGE_HREF}>Get Started</a>
  </div>

  <div class="relative aspect-[540/400] w-full overflow-hidden rounded-[24px] bg-ink/[0.04]
              min-[1024px]:aspect-auto min-[1024px]:h-[440px] min-[1024px]:w-[540px] min-[1024px]:shrink-0">
    <div class="pointer-events-none absolute inset-0">
      <Image fill sizes="(min-width: 1024px) 540px, 100vw" class="object-cover" src={photoSrc} alt="" />
      <div class="absolute inset-0 bg-[rgba(8,21,46,0.4)]"></div>
    </div>
    <Visual />   <!-- the animated overlay, supplied per row -->
  </div>
</div>
```
Lucide icons render at `width=24 height=24` with `strokeWidth={1.6}` and are sized down by the
`size-[18px]` class — match that.

## PetalDivider

```html
<div data-anim="divider" aria-hidden="true" class="relative h-6 w-full overflow-hidden">
  <div class="absolute left-1/2 top-1/2 h-px w-full max-w-[1200px] -translate-x-1/2 -translate-y-1/2 bg-ink/10"></div>
  <div class="absolute left-1/2 top-1/2 h-[60px] w-[156px] -translate-x-1/2 -translate-y-1/2 bg-paper">
    <PetalDividerGlyph variant={variant} />
  </div>
</div>
```
`PetalDividerGlyph` and the `PetalDividerVariant` type already exist in `@/components/icons` and carry
both path sets and view boxes.

## Behavior

```js
const rows     = Array.from(root.querySelectorAll<HTMLElement>("[data-anim='row']"));
const dividers = Array.from(root.querySelectorAll<HTMLElement>("[data-anim='divider']"));

if (prefersReducedMotion()) {
  gsap.set([...rows, ...dividers], { opacity: 1, y: 0, filter: "blur(0px)", scaleX: 1 });
  return;
}

gsap.set(rows,     { opacity: 0, y: 24, filter: "blur(12px)" });
gsap.set(dividers, { opacity: 0, scaleX: 0.92, transformOrigin: "50% 50%" });

rows.forEach((el) => gsap.to(el, {
  opacity: 1, y: 0, filter: "blur(0px)", ease: "power2.out",
  scrollTrigger: { trigger: el, start: "top 85%", end: "top 55%", scrub: 0.5 },
}));
dividers.forEach((el) => gsap.to(el, {
  opacity: 1, scaleX: 1, ease: "power2.out",
  scrollTrigger: { trigger: el, start: "top 95%", end: "top 70%", scrub: 0.5 },
}));
```
Kill every created ScrollTrigger on cleanup.

## Row content (verbatim)

| # | title | description (`descriptionWidth`) | bullets (lucide icon → text) | photoSrc | Visual |
| --- | --- | --- | --- | --- | --- |
| 1 | Connect with your stack. | Orchid learns the way you work, with your tools. Not the other way around. (470) | `Link2` → Connect once, it just works · `Blocks` → Pulls from all your apps · `Workflow` → A hundred tools, one assistant | `/branded/coffee-and-phones.jpeg` | `ProviderConstellation` |
| 2 | Automate your life using habits. | Set up any habit just by asking. Anything from a daily news digest to a calorie tracker you text pictures of. (470) | `Repeat` → Set it once, it repeats · `Sparkles` → Your routines, on autopilot · `Moon` → Runs while you sleep | `/branded/desk-orchid-night.jpeg` | `HabitBubbles` |
| 3 | Stay on top of admin. | Bills, bookings, follow ups, forms. The boring stuff still gets done, you just stop being the one doing it. (460) | `Inbox` → Inbox triaged, replies drafted · `Calendar` → Your calendar, always in order · *(third bullet — read `home-07-row3-admin.txt`)* | `/branded/day-not-list-photo-01.png` | `AppBadges` |
| 4 | Never let anything slip through the cracks. | *(read `home-08-row4.txt`)* | *(read `home-08-row4.txt`; last one is → The thoughtful thing, on time)* | `/branded/day-not-list-photo-03.png` | `GlassNotification` |
| 5 | Your second brain. | *(read `home-09-row5.txt`)* | *(read `home-09-row5.txt`; first one is → Remembers what matters to you)* | `/branded/day-not-list-photo-02.png` | `SecondBrainChat` |

For rows 3–5, take the exact heading, description, `max-width` value, bullet icons and bullet copy
straight out of the corresponding markup file — every value is present there verbatim.

The `FeatureRow` type in `@/types/content` already models this (`title`, `description`,
`descriptionWidth`, `bullets`, `Visual`); add `photoSrc` to that interface.

## Responsive
- **390 / 768:** column stack, `gap-10`; panel is full width at `aspect-[540/400]`; section padding
  `px-6 py-32`, then `md:px-12 md:py-44`.
- **≥1024:** row becomes horizontal (`flex-row` / `flex-row-reverse` alternating), `gap-[64px]`,
  items centred; panel locks to `540×440` and stops shrinking.
- **≥1280:** section padding steps to `px-[120px] py-56` and the stack gap to `80px`.
