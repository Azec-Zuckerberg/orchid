import type { ComponentType } from "react";

/** A rendered block inside a long-form article. */
export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; attribution?: string };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** Serif lede shown under the title on the post page. */
  lede: string;
  image: string;
  category: string;
  /** Human-readable date, e.g. "June 18, 2026". */
  date: string;
  readingTime: string;
  body: ArticleBlock[];
}

export interface CaseStudyStat {
  value: string;
  label: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  excerpt: string;
  eyebrow: string;
  image: string;
  company: string;
  logo?: string;
  avatar?: string;
  person?: string;
  role?: string;
  stats: CaseStudyStat[];
  body: ArticleBlock[];
}

export interface Testimonial {
  quote: string;
  name: string;
  image: string;
}

/** One bullet in a home-page feature row. */
export interface FeatureBullet {
  Icon: ComponentType<{ className?: string; size?: number; strokeWidth?: number }>;
  text: string;
}

export interface FeatureRow {
  title: string;
  description: string;
  /** Inline max-width applied to the description, in px. */
  descriptionWidth: number;
  bullets: FeatureBullet[];
  /** The illustrated panel rendered opposite the copy. */
  Visual: ComponentType;
}

/** A single message in an iMessage mockup thread. */
export interface ChatMessage {
  from: "user" | "orchid";
  text: string;
  images?: string[];
  tail?: boolean;
  reaction?: string;
}
