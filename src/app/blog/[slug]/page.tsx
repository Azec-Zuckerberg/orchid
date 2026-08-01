import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Fragment } from "react";

import { ArticleBody } from "@/components/blog/ArticleBody";
import { BlogCard } from "@/components/blog/BlogCard";
import { Reveal } from "@/components/blog/Reveal";
import { POSTS, getPost, getRelatedPosts } from "@/lib/content/posts";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) return {};

  const title = `${post.title} · Orchid`;
  const url = `https://orchid.ai/blog/${post.slug}`;

  return {
    title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description: post.excerpt,
      url,
      images: [post.image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  const related = getRelatedPosts(post.slug);
  // Posts whose article was not captured carry no category, date or reading
  // time; the row collapses instead of rendering empty separators.
  const meta = [post.category, post.date, post.readingTime].filter(Boolean);

  return (
    <Reveal lead=".post-back" stagger=".post-header, .post-hero, .post-article">
      <section
        aria-labelledby="post-title"
        className="relative bg-paper px-6 py-24 md:px-[120px] md:py-36"
      >
        <div className="post-back gsap-reveal">
          <Link
            className="relative inline-flex items-center gap-2 text-sm leading-none text-ink/70 transition-colors hover:text-ink before:absolute before:inset-x-[-6px] before:-inset-y-[13px] before:content-['']"
            href="/blog"
          >
            <ArrowLeft width={14} height={14} strokeWidth={1.5} aria-hidden />
            Back to writing
          </Link>
        </div>

        <header className="post-header gsap-reveal mt-16 flex max-w-[920px] flex-col gap-6 md:mt-20">
          {meta.length > 0 ? (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm leading-none text-ink/60">
              {meta.map((item, index) => (
                <Fragment key={item}>
                  {index > 0 ? (
                    <span
                      aria-hidden="true"
                      className="block size-1 rounded-full bg-ink/30"
                    />
                  ) : null}
                  <span>{item}</span>
                </Fragment>
              ))}
            </div>
          ) : null}
          <h1
            id="post-title"
            className="font-serif font-medium leading-[1.05] tracking-[-0.04em] text-ink text-[clamp(40px,6vw,72px)]"
          >
            {post.title}
          </h1>
          <p className="max-w-[640px] font-serif text-[clamp(20px,2.4vw,24px)] font-normal leading-[1.4] tracking-[-0.01em] text-ink/75 text-pretty">
            {post.lede}
          </p>
        </header>

        <div className="post-hero gsap-reveal mt-16 w-full md:mt-20">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[36px] bg-card ring-1 ring-inset ring-black/10 shadow-[0_1px_2px_rgba(8,21,46,0.04),0_6px_16px_rgba(8,21,46,0.06),0_24px_48px_rgba(8,21,46,0.08)]">
            <Image
              fill
              sizes="(max-width: 1440px) 100vw, 1200px"
              priority
              className="object-cover"
              src={post.image}
              alt=""
            />
          </div>
        </div>

        <ArticleBody
          blocks={post.body}
          className="post-article gsap-reveal mx-auto mt-20 max-w-[720px] md:mt-28"
        />

        <div className="mt-32 border-t border-ink/10 pt-20 md:mt-40 md:pt-24">
          <h2 className="font-serif font-medium leading-[1.3] tracking-[-0.02em] text-ink text-[clamp(28px,4vw,40px)]">
            More writing
          </h2>
          <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 md:mt-16 md:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <BlogCard post={item} compact />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Reveal>
  );
}
