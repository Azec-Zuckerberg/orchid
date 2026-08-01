import { Fragment, type ReactNode } from "react";

import type { ArticleBlock } from "@/types/content";

/** A paragraph whose whole text is this renders the article's hairline rule. */
const RULE = "---";

/** Inline `[label](href)` links, the only inline markup the source articles use. */
const INLINE_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

const LINK_CLASS =
  "text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink";

function withInlineLinks(text: string): ReactNode {
  if (!text.includes("](")) return text;

  const nodes: ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(INLINE_LINK)) {
    const start = match.index ?? 0;
    if (start > cursor) nodes.push(text.slice(cursor, start));
    nodes.push(
      <a key={start} href={match[2]} className={LINK_CLASS}>
        {match[1]}
      </a>,
    );
    cursor = start + match[0].length;
  }

  if (cursor < text.length) nodes.push(text.slice(cursor));

  return nodes.map((node, index) => <Fragment key={index}>{node}</Fragment>);
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="mt-16 font-serif font-medium leading-[1.2] tracking-[-0.02em] text-[clamp(24px,3vw,32px)] text-ink text-balance">
          {block.text}
        </h2>
      );

    case "list":
      return (
        <ul className="mt-6 list-disc space-y-2 pl-5 text-base leading-[1.65] text-ink marker:text-ink/40">
          {block.items.map((item) => (
            <li key={item} className="text-pretty">
              {withInlineLinks(item)}
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <blockquote className="mt-10 border-l-2 border-ink/15 pl-6">
          <p className="font-serif text-[20px] leading-[1.5] tracking-[-0.01em] text-ink/80 text-pretty">
            {withInlineLinks(block.text)}
          </p>
          {block.attribution ? (
            <footer className="mt-3 text-sm leading-none text-ink/60">
              {block.attribution}
            </footer>
          ) : null}
        </blockquote>
      );

    default:
      return block.text === RULE ? (
        <hr className="my-12 border-t border-ink/10" />
      ) : (
        <p className="mt-6 text-base leading-[1.65] text-ink text-pretty [li_&]:mt-0">
          {withInlineLinks(block.text)}
        </p>
      );
  }
}

interface ArticleBodyProps {
  blocks: ArticleBlock[];
  className?: string;
}

export function ArticleBody({ blocks, className }: ArticleBodyProps) {
  return (
    <article className={className}>
      {blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </article>
  );
}
