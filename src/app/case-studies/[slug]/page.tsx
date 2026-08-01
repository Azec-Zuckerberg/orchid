import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { CtaCard } from "@/components/CtaCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  CASE_STUDIES,
  CASE_STUDY_CTA_HEADLINE,
  getCaseStudy,
} from "@/lib/content/case-studies";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  const title = `${study.title} · Orchid`;
  const url = `https://orchid.ai/case-studies/${study.slug}`;

  return {
    title,
    description: study.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description: study.excerpt,
      url,
      images: [study.image],
      publishedTime: study.publishedTime,
      authors: ["Orchid"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: study.excerpt,
      images: [study.image],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <>
      <ScrollReveal selector=".cs-reveal">
        <section
          aria-labelledby="case-study-title"
          className="relative bg-paper px-6 py-24 md:px-[120px] md:py-32"
        >
          <div className="cs-reveal gsap-reveal">
            <Link
              className="relative inline-flex items-center gap-2 text-sm leading-none text-ink/70 transition-colors hover:text-ink before:absolute before:inset-x-[-6px] before:-inset-y-[13px] before:content-['']"
              href="/case-studies"
            >
              <ArrowLeft width={14} height={14} strokeWidth={1.5} aria-hidden="true" />
              Back to case studies
            </Link>
          </div>
          <div className="mt-14 w-full md:mt-16">
            <header className="cs-reveal gsap-reveal flex max-w-[880px] flex-col gap-4">
              <span className="text-xs font-medium uppercase tracking-[0.12em] text-ink/50">
                {study.kicker}
              </span>
              <h1
                id="case-study-title"
                className="font-serif font-medium leading-[1.05] tracking-[-0.03em] text-ink text-[clamp(34px,4.6vw,56px)] text-balance"
              >
                {study.title}
              </h1>
              <p className="max-w-[600px] font-serif text-[clamp(18px,2vw,22px)] font-normal leading-[1.45] tracking-[-0.01em] text-ink/70 text-pretty">
                {study.excerpt}
              </p>
            </header>
            <div className="cs-reveal gsap-reveal mt-12 w-full">
              <div className="relative aspect-[16/9] overflow-hidden rounded-[32px] bg-card ring-1 ring-inset ring-black/10 shadow-[0_1px_2px_rgba(8,21,46,0.04),0_6px_16px_rgba(8,21,46,0.06),0_24px_48px_rgba(8,21,46,0.08)]">
                <Image
                  src={study.image}
                  alt=""
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <dl className="cs-reveal gsap-reveal mt-12 grid grid-cols-1 gap-x-8 gap-y-8 rounded-[28px] bg-ink/[0.03] p-8 sm:grid-cols-3 md:p-10">
              {study.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <dt className="font-serif text-[clamp(34px,5vw,48px)] font-medium leading-none tracking-[-0.02em] text-ink">
                    {stat.value}
                  </dt>
                  <dd className="text-sm leading-[1.4] text-ink/60 text-pretty">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="cs-reveal gsap-reveal mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_300px] lg:gap-16">
              <aside className="flex flex-col gap-10 lg:order-2 lg:sticky lg:top-24 lg:self-start">
                <div>
                  <div className="text-xs font-medium uppercase tracking-[0.12em] text-ink/50">
                    At a glance
                  </div>
                  <dl className="mt-5 flex flex-col gap-4 border-t border-ink/10 pt-5">
                    {study.glance.map((row) => (
                      <div key={row.label} className="flex flex-col gap-1">
                        <dt className="text-[13px] leading-none text-ink/50">
                          {row.label}
                        </dt>
                        <dd className="text-[15px] font-medium leading-[1.3] text-ink">
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <figure className="flex flex-col gap-4 border-l-2 border-ink/15 pl-5">
                  <blockquote className="font-serif text-[19px] leading-[1.45] tracking-[-0.01em] text-ink/85 text-pretty">
                    {study.quote.text}
                  </blockquote>
                  <Image
                    src={study.quote.image}
                    alt={study.quote.author}
                    width={44}
                    height={44}
                    className="size-11 rounded-xl object-cover"
                  />
                  <figcaption className="text-[13px] leading-[1.5] text-ink/60">
                    <span className="font-medium text-ink">{study.quote.author}</span>
                    {study.quote.attribution}
                  </figcaption>
                </figure>
              </aside>
              <div className="flex max-w-[760px] flex-col gap-14 lg:order-1">
                {study.sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="font-serif font-medium leading-[1.2] tracking-[-0.02em] text-[clamp(24px,3vw,32px)] text-ink text-balance">
                      {section.heading}
                    </h2>
                    <div className="mt-2">
                      {section.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="mt-6 text-base leading-[1.65] text-ink text-pretty [li_&]:mt-0"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
      <CtaCard headline={CASE_STUDY_CTA_HEADLINE} />
    </>
  );
}
