# Case Studies, Contact & 404 Specification

## Overview
- **Target files:**
  - `src/app/case-studies/page.tsx` — index
  - `src/app/case-studies/[slug]/page.tsx` — case-study template
  - `src/components/case-studies/CaseStudyCard.tsx`
  - `src/lib/content/case-studies.ts`
  - `src/app/contact/page.tsx`
  - `src/app/not-found.tsx`
- **Verbatim markup:** `docs/research/orchid.ai/markup/case-studies.txt`, `casestudy.txt`,
  `contact.txt`, `enterprise.txt` (which is the 404)
- **Interaction model:** scroll reveals, card hover, one clipboard button. Nothing scroll-driven
  beyond the reveals.

---

# 1. `/case-studies` index

```html
<section aria-labelledby="case-studies-title" class="relative bg-paper px-6 py-24 md:px-[120px] md:py-36">
  <header class="cs-header">
    <h1 id="case-studies-title" class="font-serif font-medium leading-none tracking-[-0.04em] text-ink text-[clamp(36px,7vw,64px)]">
      Case studies.
    </h1>
  </header>
  <ul class="mt-20 grid grid-cols-1 gap-x-8 gap-y-16 md:mt-28 md:grid-cols-2">
    <li class="cs-card"> <CaseStudyCard … /> </li>
  </ul>
</section>
```

### CaseStudyCard
Same anchor classes as the blog card, but the image is `aspect-[16/9]`, `sizes="(max-width: 768px) 100vw, 50vw"`,
and there is an eyebrow above the title:
```html
<span class="mt-5 block text-xs font-medium uppercase tracking-[0.12em] text-ink/50">{eyebrow}</span>
<h2 class="mt-2 font-serif text-[24px] font-medium leading-[1.15] tracking-[-0.01em] text-ink transition-opacity duration-200 group-hover:opacity-80">{title}</h2>
<p class="mt-3 text-base leading-[1.5] text-ink/70">{excerpt}</p>
```

### Content (the single real entry)
- slug `agency-owners`, eyebrow `Agencies`, image `/goosewin-media-logo.png`
- title: *How Goosewin Media Group stopped prepping for meetings*
- excerpt: *A solo fractional DevRel agency where Orchid runs the meeting prep, inbox, and Slack so Dan never walks into a client call cold.*

Model the data so adding a second entry is just another array item.

---

# 2. `/case-studies/[slug]`

Transcribe `docs/research/orchid.ai/markup/casestudy.txt` (411 lines) — it is the complete page.
Structure, top to bottom:

```html
<section aria-labelledby="case-study-title" class="relative bg-paper px-6 py-24 md:px-[120px] md:py-32">
  <div class="cs-reveal">  <!-- back link: "Back to case studies", lucide ArrowLeft 14px strokeWidth 1.5 -->
  <div class="mt-14 w-full md:mt-16">
    <header class="cs-reveal flex max-w-[880px] flex-col gap-4">
      <span class="text-xs font-medium uppercase tracking-[0.12em] text-ink/50">Agencies · Customer story</span>
      <h1 id="case-study-title" class="font-serif font-medium leading-[1.05] tracking-[-0.03em] text-ink text-[clamp(34px,4.6vw,56px)] text-balance">…</h1>
      <p class="max-w-[600px] font-serif text-[clamp(18px,2vw,22px)] font-normal leading-[1.45] tracking-[-0.01em] text-ink/70 text-pretty">…</p>
    </header>

    <div class="cs-reveal mt-12 w-full">
      <div class="relative aspect-[16/9] overflow-hidden rounded-[32px] bg-card ring-1 ring-inset ring-black/10 shadow-[0_1px_2px_rgba(8,21,46,0.04),0_6px_16px_rgba(8,21,46,0.06),0_24px_48px_rgba(8,21,46,0.08)]">
        <Image fill sizes="100vw" class="object-cover" src="/goosewin-media-logo.png" alt="" />
      </div>
    </div>

    <dl class="cs-reveal mt-12 grid grid-cols-1 gap-x-8 gap-y-8 rounded-[28px] bg-ink/[0.03] p-8 sm:grid-cols-3 md:p-10">
      <!-- 3 × { dt: font-serif text-[clamp(34px,5vw,48px)] font-medium leading-none tracking-[-0.02em] text-ink
                 dd: text-sm leading-[1.4] text-ink/60 text-pretty } in a
             flex flex-col items-center gap-2 text-center wrapper -->
    </dl>

    <div class="cs-reveal mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_300px] lg:gap-16">
      <aside class="flex flex-col gap-10 lg:order-2 lg:sticky lg:top-24 lg:self-start"> … </aside>
      <div> … body sections … </div>
    </div>
  </div>
</section>
<CtaCard />
```

### Stats (verbatim)
| value | label |
| --- | --- |
| `0` | time spent prepping for meetings |
| `Every call` | joined with full context, even from the field |
| `Slack + email` | caught across team and external channels |

### "At a glance" sidebar
Label `At a glance` (`text-xs font-medium uppercase tracking-[0.12em] text-ink/50`), then
`<dl class="mt-5 flex flex-col gap-4 border-t border-ink/10 pt-5">` with rows
`flex flex-col gap-1` / `dt: text-[13px] leading-none text-ink/50` / `dd: text-[15px] font-medium leading-[1.3] text-ink`:
Company **Goosewin Media Group**, Industry **Agencies**, Company size **Solo founder**,
Location **San Francisco, CA**, Founded **2025**. Read the markup for anything after line 212
(there is more sidebar content and a quote block — transcribe it all).

### Body sections
Three `<section>`s, each headed
`<h2 class="font-serif font-medium leading-[1.2] tracking-[-0.02em] text-[clamp(24px,3vw,32px)] text-ink text-balance">`.
Take the exact headings and paragraphs from the markup file.

### CTA
The bottom `aria-labelledby="cta-title"` section is **identical** to the home page CTA. Import the
shared `CtaCard` from `@/components/CtaCard` (built by another agent, already merged). If the
headline in `casestudy.txt` differs from "Meet your new assistant.", pass it as the `headline` prop.

### Routing
`generateStaticParams()` + `generateMetadata()` from the case-study array; `notFound()` for unknown slugs.

### Reveal
`.cs-reveal` blocks stagger in on scroll — same pattern as everywhere:
`gsap.set(els, {opacity:0, y:18, filter:"blur(8px)"})` → `to(..., {duration:.7, stagger:.1, ease:"power3.out"})`,
ScrollTrigger `start: "top 85%"`, `once: true`. Skip under reduced motion.

---

# 3. `/contact`

```html
<div class="bg-paper px-6 pt-32 pb-24 md:px-[120px] md:pt-40 md:pb-36">
  <div class="mx-auto flex max-w-[640px] flex-col items-center text-center">
    <h1 class="font-serif font-medium leading-[1.05] tracking-[-0.04em] text-ink text-[clamp(40px,6vw,64px)] text-balance">Get in touch</h1>
    <p class="mt-5 max-w-[46ch] text-[17px] leading-relaxed text-ink/60 text-pretty">
      Orchid lives in your messages. Text us to get started, or email the team and we’ll get back to you.
    </p>
    <div class="mt-10 flex w-full max-w-[340px] flex-col items-stretch gap-4">
      <a class="relative inline-flex items-center justify-center gap-2.5 rounded-full bg-ink px-6 py-4 text-sm font-medium leading-none text-paper transition-[opacity,scale] duration-150 hover:opacity-90 motion-safe:active:scale-[0.96]" href={IMESSAGE_HREF}>
        <Image src="/branded/imessage-icon.png" alt="" aria-hidden width={20} height={20} class="size-5 select-none" />
        Text Orchid
      </a>
      <div class="flex items-center gap-2 rounded-full bg-ink/[0.04] py-1.5 pr-1.5 pl-5 ring-1 ring-inset ring-ink/10">
        <a href={`mailto:${CONTACT_EMAIL}`} class="min-w-0 flex-1 truncate text-left text-sm leading-none text-ink/80 transition-colors hover:text-ink">{CONTACT_EMAIL}</a>
        <button type="button" aria-label="Copy email address"
                class="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-paper text-ink outline-none ring-1 ring-inset ring-ink/10 transition-colors hover:bg-ink/[0.03] focus-visible:ring-2 focus-visible:ring-ink/30">
          <Copy width={16} height={16} strokeWidth={1.75} />
        </button>
      </div>
    </div>
  </div>
</div>
```
- The live site hides its address behind Cloudflare email protection, so the real string is not in the
  HTML. Use `CONTACT_EMAIL` from `@/lib/site` (currently `hello@orchid.ai`) — flagged in the report as
  a substitution.
- Copy button: `navigator.clipboard.writeText(CONTACT_EMAIL)`, swap the icon to lucide `Check` for
  ~1400 ms, then back. Needs a small `"use client"` component.
- The live page nests `<main>` inside `<main>`; the root layout already provides `<main>`, so render a
  plain `<div>` here.
- `export const metadata` with title `Contact` (check `contact.txt`'s head block for the real title/description).

---

# 4. `not-found.tsx`

`https://orchid.ai/enterprise` returns this page — the site has no Enterprise route (the nav item
links out to a Typeform). Reproduce it as the app's 404.

```html
<section class="relative flex min-h-[70vh] flex-col items-center justify-center bg-paper px-6 py-24 text-center md:py-36">
  <p class="text-sm uppercase tracking-[0.18em] text-ink/50">404</p>
  <h1 class="mt-6 font-serif font-medium leading-[1.05] tracking-[-0.04em] text-ink text-[clamp(40px,6vw,72px)]">Page not found</h1>
  <p class="mt-6 max-w-[520px] font-serif text-[clamp(18px,2vw,22px)] leading-[1.4] text-ink/70 text-pretty">
    The page you were looking for moved, or it never existed. Try one of these instead.
  </p>
  <div class="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-ink/80">
    <!-- Home /, Pricing /pricing, Case studies /case-studies, Writing /blog -->
    <a class="underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink" href="/">Home</a>
  </div>
</section>
```
Keep all four links exactly as the original has them, including `/pricing` (which the real site also
404s on — faithful to the clone target).

---

## Responsive (all three pages)
- **390:** single column everywhere; case-study sidebar stacks above/below the body (`grid-cols-1`, `gap-12`); contact block `pt-32 pb-24`.
- **768:** case-studies index goes `md:grid-cols-2`; section padding steps to `md:px-[120px]`; stats `dl` becomes `sm:grid-cols-3` at 640.
- **1024:** case-study body becomes `lg:grid-cols-[1fr_300px]` with the sidebar moved to `lg:order-2` and made `lg:sticky lg:top-24`.
- **1440:** headings reach their clamp ceilings; content stays within its `max-w-*` caps.
