# Feature Visuals B — AppBadges, GlassNotification, SecondBrainChat

All three render **only the animated overlay** inside a feature row's `540×440` panel. The panel
wrapper, background photo and `rgba(8,21,46,0.4)` scrim come from `FeatureRow` — do not re-create
them. Each takes no props and needs `"use client"` (except `GlassNotification`, which is static and
may stay a server component).

---

# 1. AppBadges (row 3 — "Stay on top of admin.")

- **Target file:** `src/components/home/visuals/AppBadges.tsx` (replace the stub; export `AppBadges`)
- **Verbatim markup:** `docs/research/orchid.ai/markup/home-07-row3-admin.txt`, lines 64–105
- **Interaction model:** scroll-triggered count-**down** on the badges

## Structure

Root: `<div ref={…} aria-hidden="true" class="absolute inset-0">`, then one entry per app:
```html
<div class="absolute" style="left:{leftPct}%; top:{topPct}%; transform:translate(-50%, -50%) rotate({rotate}deg)">
  <div class="relative flex w-[72px] flex-col items-center">
    <div class="relative h-[64px] w-[64px]">
      <Image fill sizes="64px" class="object-cover" src={src} alt={alt} />
    </div>
    <span data-badge={badge}
          class="absolute -top-[12px] left-1/2 flex min-w-[24px] items-center justify-center tabular-nums rounded-[100px] bg-[#ff383c] px-[7px] py-[2.5px] text-center text-[16px] leading-[19px] text-white translate-x-[33px]">
      {badge}
    </span>
  </div>
</div>
```

## Data (exact)

```ts
const APPS = [
  { src: "/branded/app-icons/mail.png",     alt: "Mail",     badge: "88",  rotate: -7.83, leftPct: 34.07888888888889,  topPct: 43.902125 },
  { src: "/branded/app-icons/messages.png", alt: "Messages", badge: "120", rotate:  7.51, leftPct: 45.161574074074075, topPct: 68.857375 },
  { src: "/branded/app-icons/calendar.png", alt: "Calendar", badge: "16",  rotate: -7.41, leftPct: 56.820092592592594, topPct: 31.344499999999996 },
  { src: "/branded/app-icons/phone.png",    alt: "Phone",    badge: "3",   rotate: 11.15, leftPct: 73.05685185185186,  topPct: 52.339 },
];
```

## Behavior — the badges count DOWN to zero

That is the point of the section: Orchid clears the backlog.

```js
const badges = Array.from(root.querySelectorAll<HTMLElement>("[data-badge]"));
if (!badges.length) return;

if (prefersReducedMotion()) { badges.forEach((el) => { el.textContent = "0"; }); return; }

const tweens = badges.map((el) => {
  const state = { value: Number(el.dataset.badge ?? "0") };
  return gsap.to(state, {
    value: 0, duration: 4, ease: "power3.out", paused: true,
    onUpdate: () => { el.textContent = String(Math.round(state.value)); },
  });
});

const st = ScrollTrigger.create({
  trigger: root,
  start: "top 60%",
  onEnter:      () => tweens.forEach((t) => t.restart()),
  onLeaveBack:  () => tweens.forEach((t) => t.pause(0)),
});
return () => st.kill();
```
The server-rendered text is the starting number (88 / 120 / 16 / 3), so it is correct before hydration.

---

# 2. GlassNotification (row 4 — "Never let anything slip through the cracks.")

- **Target file:** `src/components/home/visuals/GlassNotification.tsx` (replace the stub; export `GlassNotification`)
- **Verbatim markup:** `docs/research/orchid.ai/markup/home-08-row4.txt`, lines 72–96
- **Interaction model:** static — no animation

## Structure (copy exactly)

```html
<div aria-hidden="true" class="absolute left-1/2 top-1/2 w-[calc(100%-32px)] max-w-[460px] -translate-x-1/2 -translate-y-1/2">
  <div class="gradient-border relative flex items-center gap-[14.329px] rounded-[34.391px] px-[20.061px] py-[17.195px] bg-white/[0.07] shadow-[0_16.427px_82.133px_0_rgba(0,0,0,0.1)] backdrop-blur-[20px] [--gb-w:1px] [--gb-angle:to_bottom] [--gb-from:rgba(255,255,255,0.18)] [--gb-to:rgba(255,255,255,0)]">
    <div class="relative h-[44px] w-[44px] shrink-0">
      <div class="relative h-full w-full overflow-hidden rounded-[10px]">
        <Image fill sizes="44px" class="object-cover" src="/branded/app-icons/orchid-square.png" alt="" />
      </div>
      <div class="absolute -right-[3px] -bottom-[3px] h-[20px] w-[20px] overflow-hidden rounded-[5px] ring-[1.5px] ring-black/30">
        <Image fill sizes="20px" class="object-cover" src="/branded/app-icons/messages.png" alt="" />
      </div>
    </div>
    <div class="flex min-w-0 flex-1 items-start gap-2">
      <div class="flex min-w-0 flex-1 flex-col text-white">
        <span class="text-[17px] font-[590] leading-[1.15] tracking-[-0.015em]">Orchid</span>
        <span class="text-[14px] font-normal leading-[1.3] tracking-[-0.015em]">heads up, your flight check-in opens in an hour. want me to grab your usual aisle seat? ✈️</span>
      </div>
      <span class="shrink-0 text-[13px] leading-[1] text-[#797979]">now</span>
    </div>
  </div>
</div>
```
The `gradient-border` utility (a 1px masked gradient hairline reading `--gb-*`) is already defined in
`src/app/globals.css` — just use the class.

---

# 3. SecondBrainChat (row 5 — "Your second brain.")

- **Target file:** `src/components/home/visuals/SecondBrainChat.tsx` (replace the stub; export `SecondBrainChat`)
- **Verbatim markup:** `docs/research/orchid.ai/markup/home-09-row5.txt`, lines 76–113
- **Interaction model:** static — no animation

## Structure (copy exactly)

Root: `<div aria-hidden="true" class="absolute inset-0 flex items-center justify-center p-6">`
→ `<div class="flex w-[340px] max-w-[calc(100%-40px)] flex-col [container-type:inline-size]">`

Inside, in order:

1. **Sent bubble** — wrapper `flex w-full transition-[margin,padding] duration-300 ease-out justify-end pb-[1.49cqw]`;
   bubble `relative max-w-[69.65cqw] rounded-[4.98cqw] px-[2.99cqw] py-[2.24cqw] bg-[#0088ff] text-white`;
   text `<p class="whitespace-pre-wrap leading-[1.295] tracking-[-0.005em] text-[4.23cqw]">what was that restaurant we loved for our anniversary?</p>`;
   tail `pointer-events-none absolute -bottom-[1.73cqw] h-[4.46cqw] w-[4.23cqw] transition-opacity duration-300 ease-out opacity-100 right-[1.75cqw] origin-bottom-right` containing `<BubbleTail class="text-[#0088ff]" />`.

2. **Photo** — `<div class="flex justify-start mt-[3.5cqw]">` →
   `<span class="block w-[42cqw] overflow-hidden rounded-[4.98cqw] shadow-[0_6px_20px_rgba(0,0,0,0.28)]">` →
   `<img src="/branded/tartine.jpeg" alt="" class="block h-auto w-full" />`

3. **Received bubble** — `<div class="mt-[1cqw]">` → wrapper `flex w-full transition-[margin,padding] duration-300 ease-out justify-start pb-[1.49cqw]`;
   bubble `relative max-w-[69.65cqw] rounded-[4.98cqw] px-[2.99cqw] py-[2.24cqw] bg-[var(--ios-bubble-received)] text-[var(--ios-text-primary)]`;
   text `Tartine, last march. you had the morning bun 🥐`;
   tail same classes but `left-[1.75cqw] origin-bottom-left` with `<BubbleTail class="-scale-x-100 text-[var(--ios-bubble-received)]" />`.

Every bubble carries the inline style
`font-family: system-ui, -apple-system, "SF Pro Text", "SF Pro Display", "Segoe UI", sans-serif; font-variation-settings: 'wdth' 100`.

## Assets
`/branded/app-icons/{mail,messages,calendar,phone,orchid-square}.png`, `/branded/tartine.jpeg` —
all already in `public/`. `BubbleTail` from `@/components/icons`.

## Responsive
All interior sizing is percentage- or `cqw`-based against the panel, so these scale automatically
between the mobile `aspect-[540/400]` panel and the fixed desktop `540×440`. Do not add breakpoints.
