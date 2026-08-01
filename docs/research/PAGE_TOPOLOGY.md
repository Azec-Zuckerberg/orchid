# Page Topology — orchid.ai

Source of truth: prettified server-rendered markup in `docs/research/orchid.ai/markup/`
(whole pages, plus the home page pre-split into per-section files).

## Global shell

`<body class="min-h-full flex flex-col font-sans">`
1. `<header class="absolute top-0 inset-x-0 z-50 …">` — overlays the first section, scrolls away (**not** sticky).
2. `<main class="flex-1">` — page content.
3. `<footer class="relative overflow-hidden bg-paper px-6 pt-20 pb-20 md:px-[120px] md:pt-[120px] md:pb-[120px]">`

Header and footer are identical on every page → shared `SiteHeader` / `SiteFooter` in the root layout.

### Header contents
- Left group (`gap-9`): logo wordmark SVG (117×28, `currentColor`, wrapped in the right-click brand menu) + `nav` (hidden below `md`): Enterprise (external Typeform, `target="_blank"`), Blog, Case Studies, Contact Us.
- Right group (`gap-3`): Login pill → `https://app.orchid.ai?source=site&utm_source=site&utm_campaign=login`; Get Started pill → `sms:+14152999916`; hamburger (`md:hidden`).

### Footer contents
- Logo wordmark, then three link columns (`Social`, `Company`, `Tools`).
- Social: X `https://x.com/orchid_hq`, LinkedIn `https://www.linkedin.com/company/mail0/`, Discord `https://discord.gg/orchid`.
- Company: Blog, Brand, FAQ, Contact Us, Terms of Service (`/legal/terms`), Privacy Policy (`/legal/privacy`).
- Tools: Gmail, Google Calendar, Google Drive, Granola, Sentry (all external).

---

## `/` — Home (`markup/home.txt`, 7668px tall at 1440×900)

| # | Section | Markup file | Interaction model |
| --- | --- | --- | --- |
| 1 | Hero — headline w/ rotating role, sub-copy, iMessage CTA, iPhone mockup, petals | `home-02-hero.txt` | mount animation + time-driven word cycle |
| 2 | Testimonials — avatar, serif quote, cite; `min-h-[90vh]` | `home-03-testimonials.txt` | scroll reveal + 7s auto-rotate |
| 3 | Feature rows ×5 with petal dividers between | `home-04…home-09` | scrubbed scroll reveal per row; each visual has its own entrance + idle motion |
| 4 | Live counts — "Live" pill, heading, 2 stats | `home-10-live-counts.txt` | scroll reveal + count-up |
| 5 | CTA card — `store-at-dusk.jpeg`, headline, Get Started | `home-11-cta.txt` | scroll reveal |

### The five feature rows
Wrapper: `<section aria-label="What Orchid handles for you" class="bg-paper px-6 py-32 md:px-12 md:py-44 min-[1280px]:px-[120px] min-[1280px]:py-56">`
→ `<div class="mx-auto flex max-w-[1200px] flex-col gap-16 md:gap-20 min-[1280px]:gap-[80px]">`

Each row: text column (h3 + p + 3 icon bullets + Get Started pill) and a `540×440` visual panel
(`aspect-[540/400]` full-width below `min-[1024px]`), `rounded-[24px] bg-ink/[0.04] overflow-hidden`.
Rows alternate `flex-row` / `flex-row-reverse`; an orchid-petal divider sits between consecutive rows
(two SVG path-set variants alternating).

| # | Heading | Bullets | Visual panel |
| --- | --- | --- | --- |
| 1 | Connect with your stack. | Connect once, it just works / Pulls from all your apps / A hundred tools, one assistant | `coffee-and-phones.jpeg` + `rgba(8,21,46,0.4)` scrim; centre Orchid tile + **7 floating provider chips** |
| 2 | Automate your life using habits. | Set it once, it repeats / Your routines, on autopilot / Runs while you sleep | `desk-orchid-night.jpeg` + scrim; **5 blue iMessage bubbles** popping in |
| 3 | Stay on top of admin. | Inbox triaged, replies drafted / Your calendar, always in order / … | `day-not-list-photo-01.png` + scrim; **4 app-icon badges with counts** — mail 88, messages 120, calendar 16, phone 3 |
| 4 | Never let anything slip through the cracks. | … / The thoughtful thing, on time | `day-not-list-photo-03.png` + scrim; **glass notification card** (`gradient-border`, `backdrop-blur-[20px]`) reading "heads up, your flight check-in opens in an hour…" |
| 5 | Your second brain. | Remembers what matters to you / … | `day-not-list-photo-02.png` + scrim; **two chat bubbles** ("what was that restaurant we loved for our anniversary?" → "Tartine, last march. you had the morning bun 🥐") with `tartine.jpeg` |

Divider markup (`home-05-divider.txt`): 1px `bg-ink/10` rule spanning `max-w-[1200px]`, with a
`60×156` `bg-paper` plate centred over it carrying a 5-petal SVG at `fill-opacity 0.5`.

---

## `/blog` — Blog index (`markup/blog.txt`)

`<section aria-labelledby="blog-title" class="relative bg-paper px-6 py-24 md:px-[120px] md:py-36">`
- `.blog-header` → h1 "Notes from the team."
- `<ul class="mt-20 grid grid-cols-1 gap-x-8 gap-y-16 md:mt-28 md:grid-cols-3">` — 14 `.blog-card` items.
- Card: `aspect-[4/5]` image (`rounded-[16px] bg-card ring-1 ring-inset ring-black/10` + card shadow), h2 title `mt-5`, excerpt `mt-3`.

All 14 posts (slug → image) are listed in `docs/research/components/blog-index.spec.md`.

## `/blog/[slug]` — Post (`markup/blogpost.txt`, sample: `the-next-app-is-no-app`)

- `.post-back` → "Back to writing" link with a lucide `arrow-left`.
- `.post-header` (`mt-16 max-w-[920px] gap-6 md:mt-20`) → meta row (`Essay · June 18, 2026 · 4 min read`, separated by `size-1 rounded-full bg-ink/30` dots), h1, serif lede.
- `.post-hero` (`mt-16 md:mt-20`) → `aspect-[16/9] rounded-[36px]` image.
- `.post-article` (`mx-auto mt-20 max-w-[720px] md:mt-28`) → `p.mt-6.text-base.leading-[1.65]` and `h2.mt-16`.
- "More from the team" — h2 + 3 related-post cards (`aspect-[4/5]`, h3 `text-[20px]`).

## `/case-studies` — Index (`markup/case-studies.txt`)

Same shell as the blog index; h1 "Case studies."; `md:grid-cols-2`; card image `aspect-[16/9]`
(`goosewin-media-logo.png`), eyebrow "Agencies", title, excerpt. One entry today.

## `/case-studies/[slug]` (`markup/casestudy.txt`, sample: `agency-owners`)

Header block with h1 `text-[clamp(34px,4.6vw,56px)]`, then a stat/quote body of three `<section>`s
each with a `text-[clamp(24px,3vw,32px)]` h2, then the shared **CTA card** section (identical markup
to the home CTA, `.cta-headline` / `.cta-ctas`).

## `/contact` (`markup/contact.txt`)

Single centred block, `max-w-[640px]`, `pt-32 pb-24 md:pt-40 md:pb-36`:
h1 "Get in touch", paragraph, then a `max-w-[340px]` column with a "Text Orchid" pill (`sms:`)
and an email row (`rounded-full bg-ink/[0.04] ring-1 ring-inset ring-ink/10`) with a copy button.

> Note: the live page nests `<main>` inside `<main>` (a bug in the original). The clone uses a single `<main>`.

## `/enterprise` — **does not exist**

`https://orchid.ai/enterprise` returns the site's 404 page ("404 / Page not found / The page you were
looking for moved, or it never existed."). The header's *Enterprise* item links out to
`https://form.typeform.com/to/KBRPorqf`. The clone reproduces the 404 as `app/not-found.tsx` and keeps
the Typeform link in the nav. See `docs/research/components/not-found.spec.md`.

## Also captured (not in the requested scope, available for later)

`markup/brand.txt` (brand asset page) and `markup/faq.txt`.

---

## Route plan for the clone

```
src/app/
  layout.tsx                    fonts, metadata, SiteHeader, SiteFooter
  page.tsx                      home — composes the 5 home sections
  not-found.tsx                 the 404 (what /enterprise renders)
  blog/page.tsx                 index, reads lib/content/posts
  blog/[slug]/page.tsx          post template + generateStaticParams
  case-studies/page.tsx         index
  case-studies/[slug]/page.tsx  case-study template
  contact/page.tsx
```
Content lives in typed data modules under `src/lib/content/` so the single captured post and case
study act as reusable templates — adding an entry to the array is all that is needed for a new one.
