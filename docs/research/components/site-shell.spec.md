# SiteHeader / SiteFooter Specification

## Overview
- **Target files:** `src/components/site-header.tsx`, `src/components/site-footer.tsx`,
  `src/components/logo-menu.tsx`, `src/components/mobile-menu.tsx`
- **Verbatim markup:** `docs/research/orchid.ai/markup/home-01-header.txt`, `home-12-footer.txt`
- **Interaction model:** static layout + click/context-menu driven menus

## Header

```
<header class="absolute top-0 inset-x-0 z-50 flex items-center justify-between px-6 lg:px-[120px] py-5">
  <div class="flex items-center gap-9">
    <LogoMenu />                       <!-- relative inline-flex -->
    <nav class="hidden md:flex items-center"> … 4 links … </nav>
  </div>
  <div class="flex items-center gap-3">
    <Login pill /> <GetStarted pill /> <MobileMenu />
  </div>
</header>
```

**Absolute, not sticky.** It scrolls out of view; there is no scroll-triggered state change.

### Nav link
`inline-flex items-center rounded-lg px-4 py-2 text-sm leading-none text-ink/80 transition-colors hover:bg-ink/[0.05] hover:text-ink`

Links (from `@/lib/site` `NAV_LINKS`): Enterprise (external Typeform, `target="_blank" rel="noopener noreferrer"`), Blog, Case Studies, Contact Us.

### Login pill
`relative hidden md:inline-flex items-center justify-center rounded-full bg-paper/60 px-2.5 py-2 text-sm font-medium leading-none text-ink ring-1 ring-ink/10 backdrop-blur-md transition-[opacity,scale] duration-150 hover:bg-paper/80 motion-safe:active:scale-[0.96] before:absolute before:inset-x-0 before:-inset-y-[5px] before:content-['']`

### Get Started pill
`relative hidden md:inline-flex cursor-pointer items-center justify-center rounded-full bg-ink px-2.5 py-2 text-sm font-medium leading-none text-paper transition-[opacity,scale] duration-150 hover:opacity-90 motion-safe:active:scale-[0.96] before:absolute before:inset-x-0 before:-inset-y-[5px] before:content-['']`
→ `IMESSAGE_HREF`

### Logo link
`relative inline-flex items-center rounded-md outline-none transition-opacity duration-150 hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ink/30 before:absolute before:inset-x-[-6px] before:-inset-y-[6px] before:content-['']`
Wraps `<span class="inline-flex items-center text-ink" aria-label="Orchid">` → `<OrchidWordmark />`.
Attributes: `aria-label="Orchid home" aria-haspopup="menu" aria-expanded={open} aria-controls={id}`.

## LogoMenu (right-click on the logo)

- `onContextMenu` → `e.preventDefault()` and toggle open. Close on `Escape` (return focus to the
  logo), outside `pointerdown`, and blur leaving the container.
- Panel: `absolute left-0 top-full z-50 mt-3 w-[260px] rounded-2xl bg-paper p-1.5 ring-1 ring-inset ring-ink/[0.08] shadow-[0_12px_32px_-12px_rgba(8,21,46,0.16),0_2px_8px_-2px_rgba(8,21,46,0.06)]`,
  `style={{ transformOrigin: "top left" }}`, `role="menu" aria-label="Brand menu"`.
- framer-motion (`motion/react`) + `AnimatePresence`:
  `initial {opacity:0,y:-6,scale:.97,filter:"blur(8px)"}`, `animate {opacity:1,y:0,scale:1,filter:"blur(0px)"}`,
  `exit {opacity:0,y:-4,scale:.98,filter:"blur(6px)"}`, `transition {duration:.22, ease:[0.16,1,0.3,1]}`.
- Items (`role="menuitem"`), each wrapped in a `motion.div` with
  `initial {opacity:0,y:-3,filter:"blur(4px)"} → {opacity:1,y:0,filter:"blur(0px)"}`, `duration .2`,
  `delay` 0 / .03 / .06 / .09:
  1. Copy Logo as SVG 2. Copy Wordmark as SVG 3. Brand Guidelines → `/brand`
  — divider `my-1 mx-1 h-px bg-ink/[0.08]` — 4. Login → `/login`
- Item class: `group/item relative flex w-full cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm leading-none text-ink outline-none transition-[background-color,color] duration-150 hover:bg-ink/[0.04] focus-visible:bg-ink/[0.06] focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ink/15 active:bg-ink/[0.07]`
- Icon slot: `inline-flex size-5 items-center justify-center text-ink/60 transition-[color,transform] duration-150 group-hover/item:text-ink group-hover/item:scale-[1.06]`, lucide icons at `size={18}`.
- Copy actions write the SVG source to the clipboard; on success the icon becomes a lucide `Check`
  and the label becomes "Copied to clipboard" for **1400 ms**. Use the markup of `OrchidWordmark`
  serialised as a string constant — a simple inline SVG string is fine.

## MobileMenu (`md:hidden`)

- Trigger button: `relative inline-flex size-8 touch-manipulation items-center justify-center rounded-full bg-paper/60 text-ink outline-none ring-1 ring-ink/10 backdrop-blur-md transition-[background-color,scale] duration-150 hover:bg-paper/80 focus-visible:ring-2 focus-visible:ring-ink/30 motion-safe:active:scale-[0.96] before:absolute before:-inset-2 before:content-['']`
  with `aria-expanded`, `aria-controls`, `aria-label={open ? "Close menu" : "Open menu"}`.
- Icon swap via `AnimatePresence mode="wait" initial={false}`, keyed `open`/`close`, lucide `Menu`/`X`
  at `size={18} strokeWidth={1.75}`:
  `initial {opacity:0,rotate:-90,scale:.6} → animate {opacity:1,rotate:0,scale:1} → exit {opacity:0,rotate:90,scale:.6}`,
  `duration .15`, `ease [0.16,1,0.3,1]`. Reduced motion → opacity-only.
- On open, record `button.getBoundingClientRect().bottom + 12` into state and use it as the panel `top`.
- Panel: `motion.nav` `fixed inset-x-6 z-50 overflow-y-auto overscroll-contain rounded-3xl bg-paper p-3 ring-1 ring-inset ring-ink/[0.08]` with a
  `shadow-[0_24px_48px_-12px_rgba(8,21,46,0.18)]`, `style={{ top, maxHeight: 'calc(100dvh - ' + (top + 24) + 'px)' }}`,
  `aria-label="Mobile"`. Motion: `{opacity:0,y:-8,filter:"blur(8px)"} → {opacity:1,y:0,filter:"blur(0px)"}`,
  exit `{opacity:0,y:-4,filter:"blur(6px)"}`, `duration .22`, `ease [0.16,1,0.3,1]`.
- Items: `flex min-h-[44px] touch-manipulation items-center rounded-xl px-2.5 py-2.5 text-[15px] leading-none text-ink/80 outline-none transition-colors hover:bg-ink/[0.05] hover:text-ink focus-visible:bg-ink/[0.06] focus-visible:ring-2 focus-visible:ring-ink/30`.
  Render `NAV_LINKS`, then Login and Get Started.
- Closes on Escape (refocus trigger), outside pointerdown, and **scroll of more than 64px** from the
  scroll position at open time (`scroll` listener, `{ passive: true }`).

## Footer

```
<footer class="relative overflow-hidden bg-paper px-6 pt-20 pb-20 md:px-[120px] md:pt-[120px] md:pb-[120px]">
  <div class="relative z-10 flex w-full flex-col gap-16 lg:flex-row lg:items-start lg:justify-between">
    <div class="flex flex-col items-start gap-10">
      <a aria-label="Orchid home" class="inline-flex items-center" href="/">
        <span class="inline-flex items-center text-ink" aria-label="Orchid"><OrchidWordmark /></span>
      </a>
    </div>
    <div class="flex flex-col gap-12 sm:flex-row sm:flex-wrap sm:gap-16 lg:flex-nowrap lg:gap-24">
      … one column per FOOTER_COLUMNS entry …
    </div>
  </div>
</footer>
```
- Column: `flex flex-col gap-6`; heading `font-serif text-[18px] font-medium leading-none tracking-[-0.01em] text-ink`;
  link `text-sm leading-none text-ink/70 transition-colors hover:text-ink`.
- Columns/links come from `FOOTER_COLUMNS` in `@/lib/site`.

## Responsive
- **390:** logo + hamburger only; nav, Login and Get Started hidden (`hidden md:*`). Footer stacks, `gap-16`/`gap-12`.
- **768:** full nav appears at `md`; footer columns wrap in a row at `sm`.
- **1440:** header gutters step to `lg:px-[120px]`; footer becomes a `lg:flex-row` with `lg:gap-24`.
