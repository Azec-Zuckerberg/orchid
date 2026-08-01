import type { Metadata } from "next";

import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CASE_STUDIES } from "@/lib/content/case-studies";

const TITLE = "Case studies · Orchid";
const DESCRIPTION =
  "How real people and teams put Orchid to work, industry by industry. The challenge, what changed, and the results.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://orchid.ai/case-studies" },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: "https://orchid.ai/case-studies",
    images: ["/branded/meeting-blur.jpeg"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/branded/meeting-blur.jpeg"],
  },
};

export default function CaseStudiesPage() {
  return (
    <ScrollReveal selector=".cs-header, .cs-card">
      <section
        aria-labelledby="case-studies-title"
        className="relative bg-paper px-6 py-24 md:px-[120px] md:py-36"
      >
        <header className="cs-header gsap-reveal">
          <h1
            id="case-studies-title"
            className="font-serif font-medium leading-none tracking-[-0.04em] text-ink text-[clamp(36px,7vw,64px)]"
          >
            Case studies.
          </h1>
        </header>
        <ul className="mt-20 grid grid-cols-1 gap-x-8 gap-y-16 md:mt-28 md:grid-cols-2">
          {CASE_STUDIES.map((study) => (
            <li key={study.slug} className="cs-card gsap-reveal">
              <CaseStudyCard study={study} />
            </li>
          ))}
        </ul>
      </section>
    </ScrollReveal>
  );
}
