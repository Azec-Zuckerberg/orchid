import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types/content";

interface BlogCardProps {
  post: BlogPost;
  /**
   * Compact variant used by the "More writing" grid under an article:
   * the title drops to 20px and renders as an `h3` so it sits below the
   * section heading in the document outline.
   */
  compact?: boolean;
}

export function BlogCard({ post, compact = false }: BlogCardProps) {
  const Title = compact ? "h3" : "h2";

  return (
    <Link
      className="group block rounded-[16px] transition-[opacity,scale] duration-150 motion-safe:active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
      href={`/blog/${post.slug}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[16px] bg-card ring-1 ring-inset ring-black/10 shadow-[0_1px_2px_rgba(8,21,46,0.04),0_6px_16px_rgba(8,21,46,0.06),0_24px_48px_rgba(8,21,46,0.08)]">
        <Image
          fill
          sizes={
            compact
              ? "(max-width: 768px) 100vw, 33vw"
              : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          }
          className="object-cover"
          src={post.image}
          alt=""
        />
      </div>
      <Title
        className={cn(
          "mt-5 font-serif font-medium leading-[1.15] tracking-[-0.01em] text-ink transition-opacity duration-200 group-hover:opacity-80",
          compact ? "text-[20px]" : "text-[24px]",
        )}
      >
        {post.title}
      </Title>
      <p className="mt-3 text-base leading-[1.5] text-ink/70">{post.excerpt}</p>
    </Link>
  );
}
