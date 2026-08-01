# Feature Visuals A — ProviderConstellation & HabitBubbles

Both components render **only the animated overlay** that sits inside a feature row's `540×440`
panel. The panel wrapper, the background photo and the `rgba(8,21,46,0.4)` scrim are supplied by
`FeatureRow` — do not re-create them. Each component takes no props, needs `"use client"`, and its
root is `<div ref={…} aria-hidden="true" className="absolute inset-0">`.

---

# 1. ProviderConstellation (row 1 — "Connect with your stack.")

- **Target file:** `src/components/home/visuals/ProviderConstellation.tsx` (replace the stub; export `ProviderConstellation`)
- **Verbatim markup:** `docs/research/orchid.ai/markup/home-04-row1-connect-stack.txt` (from `<div aria-hidden="true" class="absolute inset-0">` onward)
- **Interaction model:** scroll-into-view entrance (IntersectionObserver, threshold 0.2) + perpetual
  idle drift + a randomised logo-swap loop

## Structure

Centre tile:
```html
<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
  <div class="cn-center grid size-[68px] place-items-center rounded-[18px] bg-white shadow-[0_16px_44px_rgba(0,0,0,0.4)]">
    <div class="relative size-[50px] overflow-hidden rounded-[13px]">
      <Image fill sizes="50px" class="object-cover" src="/branded/app-icons/orchid-square.png" alt="" />
    </div>
  </div>
</div>
```

One wrapper per chip, positioned by percentage:
```html
<div class="absolute" style="left:{leftPct}%; top:{topPct}%; transform:translate(-50%, -50%)">
  <div class="cn-float inline-flex">
    <div class="cn-chip grid place-items-center rounded-[14px] bg-white shadow-[0_10px_26px_rgba(0,0,0,0.32)]"
         style="width:{size}px; height:{size}px">
      <img ref={…} src={logo} alt="" class="object-contain" style="width:{iconSize}px; height:{iconSize}px" />
    </div>
  </div>
</div>
```
The chip `<img>` is a plain `<img>` (not `next/image`) because its `src` is swapped imperatively.
Keep a ref array so the swap loop can reach each one.

## Chip table (exact, from the site's source)

```ts
const CHIPS = [
  { leftPct: 19, topPct: 26, size: 56, iconSize: 30, fx:   9, fy: -11, dur: 4.2 },
  { leftPct: 44, topPct: 14, size: 46, iconSize: 25, fx:  -7, fy:   9, dur: 5.3 },
  { leftPct: 72, topPct: 22, size: 52, iconSize: 28, fx:  10, fy:   8, dur: 4.7 },
  { leftPct: 86, topPct: 50, size: 44, iconSize: 24, fx:  -9, fy:  -8, dur: 5.6 },
  { leftPct: 66, topPct: 73, size: 54, iconSize: 29, fx:   8, fy: -10, dur: 4.0 },
  { leftPct: 37, topPct: 80, size: 48, iconSize: 26, fx: -10, fy:   8, dur: 5.9 },
  { leftPct: 13, topPct: 58, size: 50, iconSize: 27, fx:   9, fy:  11, dur: 4.9 },
];
```
Initial logos are the first seven of `PROVIDERS` (index `i % PROVIDERS.length`).

## Provider pool (26 files, all present in `public/logos/providers/`)

```ts
const PROVIDERS = ["gmail.svg","google-calendar.png","slack.png","notion.png","figma.svg",
  "dropbox.png","hubspot.png","stripe.png","jira.svg","salesforce.png","intercom.png",
  "google-drive.svg","google-meet.png","asana.svg","x.png","cal-com.svg","docusign.png",
  "granola.png","perplexity.webp","reddit.png","resend.svg","sentry.webp","google-sheets.png",
  "attio.svg","cloudflare.png","vercel.svg"].map((f) => `/logos/providers/${f}`);
```

## Behaviors

```js
const floats = gsap.utils.toArray<HTMLElement>(".cn-float", root);
const chips  = gsap.utils.toArray<HTMLElement>(".cn-chip",  root);
const center = root.querySelector<HTMLElement>(".cn-center");
const imgs   = imgRefs.current.filter(Boolean);
const popTargets = [center, ...chips].filter(Boolean);

if (prefersReducedMotion()) {
  gsap.set([...popTargets, ...imgs], { autoAlpha: 1, scale: 1 });
  return;
}

gsap.set(popTargets, { autoAlpha: 0, scale: 0.5 });
gsap.set(imgs,       { autoAlpha: 1, scale: 1 });

// entrance
const pop = gsap.to(popTargets, { autoAlpha: 1, scale: 1, duration: 0.55,
                                  stagger: 0.07, ease: "back.out(1.6)", paused: true });

// idle drift, one tween per chip
const drifts = floats.map((el, i) => gsap.to(el, {
  x: CHIPS[i].fx, y: CHIPS[i].fy, duration: CHIPS[i].dur,
  repeat: -1, yoyo: true, ease: "sine.inOut", paused: true,
}));
```

**Logo-swap loop.** Track `assigned[chipIndex] = providerIndex` (initially `i % PROVIDERS.length`).
Every `1100 + Math.random() * 2000` ms:
- pick a random chip index; if it equals the previously picked one, use `(i + 1) % CHIPS.length`
- pick a random provider index, then walk forward (`(t + 1) % PROVIDERS.length`, at most
  `PROVIDERS.length` steps) until it is not already in `assigned` — so no two chips show the same logo
- record it, then animate that chip's `<img>`:
```js
gsap.timeline()
  .to(img, { autoAlpha: 0, scale: 0.6, duration: 0.35, ease: "power2.in" })
  .add(() => { img.src = PROVIDERS[t]; })
  .to(img, { autoAlpha: 1, scale: 1, duration: 0.45, ease: "back.out(1.5)" });
```
- then schedule the next tick

**Gating.** An `IntersectionObserver` with `{ threshold: 0.2 }` on the root:
- entering → `pop.play()`, every drift `.play()`, start the swap loop if not already running
- leaving → pause the drifts, stop the swap loop and clear its timeout

Cleanup: disconnect the observer, kill the drift tweens, clear the pending timeout.

Note the swap loop's `Math.random()` runs client-side after mount, so it cannot cause hydration
mismatch — but the initial logo assignment must be deterministic (`i % PROVIDERS.length`).

---

# 2. HabitBubbles (row 2 — "Automate your life using habits.")

- **Target file:** `src/components/home/visuals/HabitBubbles.tsx` (replace the stub; export `HabitBubbles`)
- **Verbatim markup:** `docs/research/orchid.ai/markup/home-06-row2-habits.txt`
- **Interaction model:** scroll-into-view staggered pop-in

## Structure

Root: `<div aria-hidden="true" class="absolute inset-0 [container-type:inline-size]">` — note the
container-query context; every size inside is in `cqw`.

Per bubble:
```html
<div class="absolute" style="left:{leftPct}%; top:{topPct}%; transform:translate(-50%, -50%)">
  <div class="relative origin-center rounded-[3.4cqw] bg-[#0a84ff] px-[2.6cqw] py-[1.5cqw] leading-[1.35] text-white shadow-[0_12px_30px_rgba(10,132,255,0.4)]"
       style="max-width:36cqw; font-size:2.7cqw;
              font-family:system-ui, -apple-system, 'SF Pro Text', 'Segoe UI', sans-serif;
              opacity:0; transform:scale(0.82);
              transition:opacity 450ms ease, transform 450ms cubic-bezier(0.34, 1.56, 0.64, 1)">
    {text}
    <span class="pointer-events-none absolute -bottom-[1.1cqw] right-[1.5cqw] h-[3.3cqw] w-[3.1cqw]">
      <BubbleTail class="text-[#0a84ff]" />
    </span>
  </div>
</div>
```

## Content (exact)

| # | leftPct | topPct | text |
| --- | --- | --- | --- |
| 1 | 22 | 12 | `send me a news digest every morning` |
| 2 | 71 | 31 | `track the weather, ping me if it'll rain 🌧️` |
| 3 | 35 | 48 | `be my calorie tracker, i'll send you pics` |
| 4 | 65 | 66 | `check me in for my flights automatically ✈️` |
| 5 | 27 | 85 | `remind me to take my meds at 9` |

## Behavior

The bubbles are driven by their **own CSS transition**, not by GSAP: they ship at
`opacity: 0; transform: scale(0.82)` and are flipped to `opacity: 1; transform: scale(1)` when the
panel scrolls into view, one after another.

Implement with an `IntersectionObserver` (`{ threshold: 0.2 }`) on the root that, on first entry,
stages each bubble with a delay of `index * 220ms` (a `setTimeout` per bubble, or by writing
`transitionDelay`). Keep the inline `transition` string exactly as above so the spring easing is
preserved. Clear any pending timers on cleanup.

Under `prefers-reduced-motion: reduce`, set all bubbles to their final state immediately and skip the
observer.

## Assets
`BubbleTail` from `@/components/icons`. No images.

## Responsive
Both panels inherit the row's sizing (`aspect-[540/400]` full width below 1024px, fixed `540×440`
above). Because all interior sizing is percentage- or `cqw`-based, no extra breakpoints are needed —
that is the point, so do not add any.
