# Blog Index & Post Template Specification

## Overview
- **Target files:**
  - `src/app/blog/page.tsx` — index
  - `src/app/blog/[slug]/page.tsx` — post template
  - `src/components/blog/BlogCard.tsx`
  - `src/components/blog/ArticleBody.tsx`
  - `src/lib/content/posts.ts` — the typed post data
- **Verbatim markup:** `docs/research/orchid.ai/markup/blog.txt` (index, 14 cards) and
  `docs/research/orchid.ai/markup/blogpost.txt` (a complete post)
- **Interaction model:** scroll reveals + card hover states. No tabs, no carousels.

## Index page

```html
<section aria-labelledby="blog-title" class="relative bg-paper px-6 py-24 md:px-[120px] md:py-36">
  <header class="blog-header">
    <h1 id="blog-title" class="font-serif font-medium leading-none tracking-[-0.04em] text-ink text-[clamp(36px,7vw,64px)]">
      Notes from the team.
    </h1>
  </header>
  <ul class="mt-20 grid grid-cols-1 gap-x-8 gap-y-16 md:mt-28 md:grid-cols-3">
    <li class="blog-card"> <BlogCard … /> </li>
  </ul>
</section>
```

### BlogCard

```html
<a class="group block rounded-[16px] transition-[opacity,scale] duration-150 motion-safe:active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
   href={`/blog/${slug}`}>
  <div class="relative aspect-[4/5] overflow-hidden rounded-[16px] bg-card ring-1 ring-inset ring-black/10 shadow-[0_1px_2px_rgba(8,21,46,0.04),0_6px_16px_rgba(8,21,46,0.06),0_24px_48px_rgba(8,21,46,0.08)]">
    <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" class="object-cover" src={image} alt="" />
  </div>
  <h2 class="mt-5 font-serif text-[24px] font-medium leading-[1.15] tracking-[-0.01em] text-ink transition-opacity duration-200 group-hover:opacity-80">{title}</h2>
  <p class="mt-3 text-base leading-[1.5] text-ink/70">{excerpt}</p>
</a>
```
On the post page's "More from the team" grid the same card is used with `h3` and `text-[20px]`
instead of `h2`/`text-[24px]` — take a `titleAs`/`compact` prop rather than duplicating the component.

## Post page

```html
<section aria-labelledby="post-title" class="relative bg-paper px-6 py-24 md:px-[120px] md:py-36">
  <div class="post-back">
    <a class="relative inline-flex items-center gap-2 text-sm leading-none text-ink/70 transition-colors hover:text-ink before:absolute before:inset-x-[-6px] before:-inset-y-[13px] before:content-['']" href="/blog">
      <ArrowLeft width={14} height={14} strokeWidth={1.5} /> Back to writing
    </a>
  </div>

  <header class="post-header mt-16 flex max-w-[920px] flex-col gap-6 md:mt-20">
    <div class="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm leading-none text-ink/60">
      <span>{category}</span>
      <span aria-hidden="true" class="block size-1 rounded-full bg-ink/30"></span>
      <span>{date}</span>
      <span aria-hidden="true" class="block size-1 rounded-full bg-ink/30"></span>
      <span>{readingTime}</span>
    </div>
    <h1 id="post-title" class="font-serif font-medium leading-[1.05] tracking-[-0.04em] text-ink text-[clamp(40px,6vw,72px)]">{title}</h1>
    <p class="max-w-[640px] font-serif text-[clamp(20px,2.4vw,24px)] font-normal leading-[1.4] tracking-[-0.01em] text-ink/75 text-pretty">{lede}</p>
  </header>

  <div class="post-hero mt-16 w-full md:mt-20">
    <div class="relative aspect-[16/9] overflow-hidden rounded-[36px] bg-card ring-1 ring-inset ring-black/10 shadow-[0_1px_2px_rgba(8,21,46,0.04),0_6px_16px_rgba(8,21,46,0.06),0_24px_48px_rgba(8,21,46,0.08)]">
      <Image fill sizes="(max-width: 1440px) 100vw, 1200px" priority class="object-cover" src={image} alt="" />
    </div>
  </div>

  <article class="post-article mx-auto mt-20 max-w-[720px] md:mt-28">
    <!-- blocks -->
  </article>
</section>
```

### ArticleBody block classes
- paragraph → `<p class="mt-6 text-base leading-[1.65] text-ink text-pretty [li_&]:mt-0">`
- heading → `<h2 class="mt-16 font-serif font-medium leading-[1.2] tracking-[-0.02em] text-[clamp(24px,3vw,32px)] text-ink text-balance">`
- list / quote → follow whatever `blogpost.txt` shows if present; otherwise keep the same rhythm
  (`mt-6`, `leading-[1.65]`).

The `ArticleBlock` union already exists in `@/types/content`.

### "More from the team"
Below the article: an `h2` `font-serif font-medium leading-[1.3] tracking-[-0.02em] text-ink text-[clamp(28px,4vw,40px)]`,
then a 3-up grid of related posts (the compact card variant). Pick the next three posts after the
current one, wrapping around.

### Routing
`generateStaticParams()` from the posts array, and `generateMetadata()` producing per-post title,
description (the excerpt) and `openGraph.images: [post.image]`. Return `notFound()` for unknown slugs.

## Content

`docs/research/orchid.ai/markup/blog.txt` contains **all 14 cards verbatim** — slug (in the `href`),
image (in the `srcSet`, e.g. `%2Fbranded%2Frunning.jpg` → `/branded/running.jpg`), title and excerpt.
Transcribe all 14 into `POSTS`.

Only one post's body was captured: **`the-next-app-is-no-app`**, complete in
`docs/research/orchid.ai/markup/blogpost.txt` (category `Essay`, date `June 18, 2026`,
`4 min read`, hero `/branded/next-app.jpeg`). Transcribe its lede and full body verbatim.

For the other 13 posts, give each a `body` built from its own excerpt plus a short, clearly-generic
placeholder note — the user asked for **one real post that acts as a reusable template**, so the data
shape must be identical for every entry and adding a real body later must mean nothing more than
filling in the `body` array. Keep every post's title, excerpt, image and slug real.

All post images are already in `public/branded/`.

## Behaviors

Scroll reveals, matching the rest of the site:
```js
// index
gsap.set([header, ...cards], { opacity: 0, y: 18, filter: "blur(8px)" });
gsap.timeline({ defaults: { ease: "power3.out" },
                scrollTrigger: { trigger: root, start: "top 85%", once: true } })
  .to(header, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 })
  .to(cards,  { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, stagger: 0.08 }, "-=0.45");

// post: .post-back, .post-header, .post-hero, .post-article in the same pattern
```
Skip under `prefers-reduced-motion: reduce`. Put the GSAP in a small `"use client"` wrapper so the
pages themselves can stay server components.

Card hover: title → `opacity-80` over 200ms; card → `motion-safe:active:scale-[0.99]`.

## Responsive
- **390:** 1 column, `px-6 py-24`, `mt-20`, h1 at the 36px floor; article column is full width inside `px-6`.
- **768:** grid becomes `md:grid-cols-3`, section padding `md:px-[120px] md:py-36`, `md:mt-28`.
- **1440:** h1 reaches 64px (72px on the post), article stays capped at `max-w-[720px]`, post header at `max-w-[920px]`.
