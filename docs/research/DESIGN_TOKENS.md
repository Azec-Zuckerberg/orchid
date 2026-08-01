# Design Tokens — orchid.ai

Extracted from the site's compiled Tailwind v4 stylesheet (`/_next/static/chunks/1ovp-fnx6sbph.css`)
and font stylesheet (`/_next/static/chunks/0drc51ya4lzs-.css`). These are the **authoritative** values —
not measurements, but the literal custom-property definitions the site ships.

## Colors

### Core
| Token | Value | Usage |
| --- | --- | --- |
| `--paper` | `#fcfcfd` | Page background (`bg-paper`) |
| `--ink` | `#08152e` | Primary text / dark fills (`text-ink`, `bg-ink`) |
| `--card` | `#f5f6f8` | Card / secondary button surface (`bg-card`) |
| `--muted-foreground` | `#95a0aa` | Muted text |
| `--background` | `var(--paper)` | Alias |
| `--foreground` | `var(--ink)` | Alias |
| `--chip-bg` | `#ebeef2` | Chip backgrounds |
| `--surface-2` | `#f4f5f7` | Secondary surface |

Opacity variants are produced with Tailwind's `color-mix(in oklab, var(--ink) N%, transparent)`.
The site uses these ink alphas heavily: `/[0.03] /[0.04] /[0.05] /6 /[0.06] /8 /[0.08] /10 /12 /15 /30 /40 /45 /50 /55 /60 /65 /70 /75 /80`.

### iOS message-mockup palette
| Token | Value |
| --- | --- |
| `--ios-bg` | `#fff` |
| `--ios-bubble-received` | `#e9e9ea` |
| `--ios-text-primary` | `#000` |
| `--ios-text-secondary` | `#3c3c4399` |
| `--ios-glass` | `#f7f7f7f2` |
| `--ios-overlay` | `#0000000d` |
| `--ios-toolbar-icon` | `#404040` |
| `--ios-placeholder-text` | `#d9d9d9` |
| `--ios-time-text` | `#b9b9b9` |
| Sent bubble (hero) | `#0088ff` |
| Sent bubble (habits panel) | `#0a84ff` |

### Mail / calendar mockup palette
| Token | Value |
| --- | --- |
| `--mail-divider` | `#08152e1a` |
| `--mail-text` | `#08152e` |
| `--mail-text-muted` | `#08152e99` |
| `--cal-fullday-yellow-bg` | `#f8efda` |
| `--cal-fullday-yellow-text` | `#e7ba51` |
| `--cal-fullday-green-bg` | `#dbede4` |
| `--cal-fullday-green-text` | `#55b080` |

### Glass / content
| Token | Value |
| --- | --- |
| `--surface-glass` | `#ffffff40` |
| `--surface-glass-border` | `#08152e1a` |
| `--glass-tint` | `#ffffff8c` |
| `--content-text` | `#424242` |
| `--content-text-muted` | `#848484` |
| `--content-divider` | `#d5d5d5` |
| `--testimonial-active` | `#fff` |
| `--testimonial-idle` | `#fafafa` |
| `--placeholder-bg` | `#eee` |

### Misc
- `--color-amber-100: #fef3c6`, `--color-amber-300: #ffd236`
- Gradient-border helpers: `--gb-angle: to bottom`, `--gb-from: #ffffff2e`, `--gb-to: #fff0`, `--gb-w: 1px`
- Dark section background used by the alternate feature-rows variant: `#14161A`

## Typography

Three self-hosted families (all under `public/fonts/`):

| Family | CSS var | Weights / styles | Files |
| --- | --- | --- | --- |
| TWK Lausanne | `--font-lausanne` (default sans) | 400, 500 normal | `TWKLausanne_400.woff2`, `TWKLausanne_500.woff2` |
| Louize | `--font-louize` (serif — `font-serif`) | 400/500/700 × normal+italic | `Louize_{Regular,Italic,Medium,MediumItalic,Bold,BoldItalic}.otf` |
| JetBrains Mono | `--font-jetbrains-mono` (mono) | 400, 500 | Google font — use `next/font/google` |

- `--default-font-family: var(--font-lausanne)`
- `--default-mono-font-family: var(--font-jetbrains-mono), ui-monospace, monospace`
- Fallback metric overrides shipped by the site (worth replicating via `next/font` `adjustFontFallback`):
  - lausanne Fallback: `local(Arial)`, ascent 89.26%, descent 19.61%, line-gap 0%, size-adjust 102.08%
  - louize Fallback: `local(Arial)`, ascent 102.67%, descent 30.97%, line-gap 2.69%, size-adjust 89.12%

> **Licensing note:** the site ships *Louize Trial* (`LouizeTrial_*.otf`). It is a trial/demo cut of a
> commercial typeface. Files are downloaded for fidelity; swap in a licensed copy (or a serif
> substitute) before any public deployment.

### Type scale actually used
| Role | Classes / values |
| --- | --- |
| Hero h1 | `font-serif text-[clamp(40px,7vw,64px)] font-medium leading-[1.05] tracking-[-0.04em]` |
| Page h1 (blog/case-studies) | `font-serif text-[clamp(36px,7vw,64px)] font-medium leading-none tracking-[-0.04em]` |
| Post h1 / 404 h1 | `font-serif text-[clamp(40px,6vw,72px)] font-medium leading-[1.05] tracking-[-0.04em]` |
| CTA h2 | `font-serif text-[clamp(40px,6vw,80px)] font-medium leading-[1.05] tracking-[-0.04em]` |
| Testimonial quote | `font-serif text-[clamp(26px,3.8vw,44px)] font-normal tracking-[-0.02em]` |
| Live-counts h2 | `font-serif text-[clamp(28px,4vw,44px)] font-normal leading-[1.1] tracking-[-0.03em]` |
| Live-counts number | `font-serif tabular-nums text-[clamp(44px,7vw,84px)] leading-none tracking-[-0.03em]` |
| Feature-row h3 | `font-serif text-[28px] leading-[1.1] tracking-[-0.03em]` |
| Article h2 | `font-serif text-[clamp(24px,3vw,32px)] font-medium leading-[1.2] tracking-[-0.02em]` |
| Post lede | `font-serif text-[clamp(20px,2.4vw,24px)] leading-[1.4] tracking-[-0.01em] text-ink/75` |
| Card title | `font-serif text-[24px] font-medium leading-[1.15] tracking-[-0.01em]` |
| Footer col heading | `font-serif text-[18px] font-medium leading-none tracking-[-0.01em]` |
| Body | `text-base leading-[1.5] text-ink/65 …/70 …/75` |
| Article body | `text-base leading-[1.65] text-ink text-pretty` |
| Eyebrow | `text-xs font-medium uppercase tracking-[0.12em] text-ink/50` |
| "Live" pill | `text-[12px] uppercase tracking-[0.14em] text-ink/55` |
| Nav / small link | `text-sm leading-none text-ink/80` (nav), `text-sm leading-none text-ink/70` (footer) |

## Layout & spacing

- Page gutters: `px-6` mobile → `md:px-[120px]` desktop (feature section uses `md:px-12` then `min-[1280px]:px-[120px]`).
- Content max-widths: `1200px` (feature rows), `1440px` (CTA card), `1000px` (live counts), `920px` (post header), `720px` (article body), `640px` (contact).
- Section rhythm: `py-24 md:py-36` (blog/case-studies/post), `py-32 md:py-44 min-[1280px]:py-56` (features), `py-20 md:py-28` (live counts), `py-16 md:py-24` (CTA), footer `pt-20 pb-20 md:pt-[120px] md:pb-[120px]`.
- Tailwind base scale: `--spacing: .25rem`.

## Radii

`--radius-md .375rem`, `--radius-lg .5rem`, `--radius-xl .75rem`, `--radius-2xl 1rem`, `--radius-3xl 1.5rem`.
Literal values used in markup: `rounded-full` (all buttons), `rounded-[16px]` (cards), `rounded-[24px]` (feature visual panels), `rounded-[32px]` (CTA card), `rounded-[36px]` (post hero), `rounded-[22px]` (testimonial avatar), `rounded-2xl`/`rounded-3xl` (menus).

## Shadows

| Purpose | Value |
| --- | --- |
| Card (blog / case-study / post hero) | `0 1px 2px rgba(8,21,46,0.04), 0 6px 16px rgba(8,21,46,0.06), 0 24px 48px rgba(8,21,46,0.08)` |
| Hero CTA button | `0 2px 8px rgba(8,21,46,0.06)` → hover `0 4px 16px rgba(8,21,46,0.10)` |
| Testimonial avatar | `0 20px 55px -14px rgba(8,21,46,0.4)` |
| Logo menu | `0 12px 32px -12px rgba(8,21,46,0.16), 0 2px 8px -2px rgba(8,21,46,0.06)` |
| Mobile menu | `0 24px 48px -12px rgba(8,21,46,…)` |
| Provider chip | `0 10px 26px rgba(0,0,0,0.32)` |
| Provider centre tile | `0 16px 44px rgba(0,0,0,0.4)` |
| Chat photo stack | `0 0.5cqw 2cqw rgba(8,21,46,0.28)` |
| Habit bubble | `0 12px 30px rgba(10,132,255,0.4)` |

## Breakpoints

Tailwind defaults plus arbitrary queries the site leans on:
`md` (768px), `min-[1024px]` (feature row goes horizontal), `min-[1280px]` (feature section gutters/padding step up), `sm` (640px, live-counts grid), `lg` (1024px, footer row).

## Motion primitives

- `--ease-out: cubic-bezier(0,0,.2,1)`; `--default-transition-duration: .15s`; `--default-transition-timing-function: cubic-bezier(.4,0,.2,1)`
- Menu easing constant used by framer-motion: `[0.16, 1, 0.3, 1]`
- Keyframes shipped: `ping`, `tapback-pop`, `t-digit-pop-in`
- Digit-animation vars: `--digit-dur .5s`, `--digit-distance 8px`, `--digit-stagger 70ms`, `--digit-blur 2px`, `--digit-ease cubic-bezier(.34,1.45,.64,1)`

## Meta / theme

- `theme-color`: `#f5f3ec` (light), `#0c0c0c` (dark)
- Favicon `/favicon.ico`, icon + apple-touch-icon `/branded/orchid-icon-3d.png`
- OG/Twitter image: `/branded/cta-twilight.jpeg`, card `summary_large_image`
