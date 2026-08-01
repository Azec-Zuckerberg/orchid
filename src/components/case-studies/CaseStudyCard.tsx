import Image from "next/image";
import Link from "next/link";

import type { CaseStudy } from "@/lib/content/case-studies";

interface CaseStudyCardProps {
  study: CaseStudy;
}

/** Index tile: 16/9 cover, uppercase industry eyebrow, serif title, excerpt. */
export function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <Link
      className="group block rounded-[16px] transition-[opacity,scale] duration-150 motion-safe:active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
      href={`/case-studies/${study.slug}`}
    >
      <div className="relative aspect-[16/9] overflow-hidden rounded-[16px] bg-card ring-1 ring-inset ring-black/10 shadow-[0_1px_2px_rgba(8,21,46,0.04),0_6px_16px_rgba(8,21,46,0.06),0_24px_48px_rgba(8,21,46,0.08)]">
        <Image
          src={study.image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <span className="mt-5 block text-xs font-medium uppercase tracking-[0.12em] text-ink/50">
        {study.eyebrow}
      </span>
      <h2 className="mt-2 font-serif text-[24px] font-medium leading-[1.15] tracking-[-0.01em] text-ink transition-opacity duration-200 group-hover:opacity-80">
        {study.title}
      </h2>
      <p className="mt-3 text-base leading-[1.5] text-ink/70">{study.excerpt}</p>
    </Link>
  );
}
