import type { Metadata } from "next";

import { BlogCard } from "@/components/blog/BlogCard";
import { Reveal } from "@/components/blog/Reveal";
import { POSTS } from "@/lib/content/posts";

const TITLE = "Blog · Orchid";
const DESCRIPTION =
  "Writing from the Orchid team. Product updates, deep dives, and notes on building intelligent software.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://orchid.ai/blog" },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: "https://orchid.ai/blog",
    images: ["/branded/typewriter-night.jpeg"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/branded/typewriter-night.jpeg"],
  },
};

export default function BlogIndexPage() {
  return (
    <Reveal lead=".blog-header" stagger=".blog-card">
      <section
        aria-labelledby="blog-title"
        className="relative bg-paper px-6 py-24 md:px-[120px] md:py-36"
      >
        <header className="blog-header gsap-reveal">
          <h1
            id="blog-title"
            className="font-serif font-medium leading-none tracking-[-0.04em] text-ink text-[clamp(36px,7vw,64px)]"
          >
            Notes from the team.
          </h1>
        </header>
        <ul className="mt-20 grid grid-cols-1 gap-x-8 gap-y-16 md:mt-28 md:grid-cols-3">
          {POSTS.map((post) => (
            <li key={post.slug} className="blog-card gsap-reveal">
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      </section>
    </Reveal>
  );
}
