/**
 * Case-study content. Everything the index card and the `[slug]` template need
 * lives here, so publishing another story is one more entry in `CASE_STUDIES`.
 */

export interface CaseStudyStat {
  /** Large serif figure, e.g. "0" or "Every call". */
  value: string;
  label: string;
}

export interface CaseStudyGlanceRow {
  label: string;
  value: string;
}

export interface CaseStudyQuote {
  text: string;
  /** Avatar shown under the quote. */
  image: string;
  author: string;
  /** Everything after the author's name in the caption, leading comma included. */
  attribution: string;
}

export interface CaseStudySection {
  heading: string;
  paragraphs: string[];
}

export interface CaseStudy {
  slug: string;
  /** Uppercase label above the card title. */
  eyebrow: string;
  /** Uppercase label above the article headline. */
  kicker: string;
  title: string;
  /** Doubles as the card excerpt, the hero lede and the meta description. */
  excerpt: string;
  image: string;
  /** ISO date used for `article:published_time`. */
  publishedTime: string;
  stats: CaseStudyStat[];
  glance: CaseStudyGlanceRow[];
  quote: CaseStudyQuote;
  sections: CaseStudySection[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "agency-owners",
    eyebrow: "Agencies",
    kicker: "Agencies · Customer story",
    title: "How Goosewin Media Group stopped prepping for meetings",
    excerpt:
      "A solo fractional DevRel agency where Orchid runs the meeting prep, inbox, and Slack so Dan never walks into a client call cold.",
    image: "/goosewin-media-logo.png",
    publishedTime: "2026-06-24",
    stats: [
      { value: "0", label: "time spent prepping for meetings" },
      { value: "Every call", label: "joined with full context, even from the field" },
      { value: "Slack + email", label: "caught across team and external channels" },
    ],
    glance: [
      { label: "Company", value: "Goosewin Media Group" },
      { label: "Industry", value: "Agencies" },
      { label: "Company size", value: "Solo founder" },
      { label: "Location", value: "San Francisco, CA" },
      { label: "Founded", value: "2025" },
      { label: "Uses", value: "Meeting prep, Granola, Slack, Inbox" },
    ],
    quote: {
      text: "Orchid is a lifesaver. I don't need to prep for meetings any more - Orchid handles it all for me!",
      image: "/goosewin-pfp.png",
      author: "Dan Goosewin",
      attribution: ", Founder, CEO, Goosewin Media Group",
    },
    sections: [
      {
        heading: "The challenge",
        paragraphs: [
          "Goosewin Media Group is a solo fractional developer relations and marketing agency. Dan runs the whole thing himself, which means back-to-back calls across a rotating set of clients, often joined from the field rather than a desk. Every client has its own history, its own open threads, and its own context to keep straight.",
          "Before Orchid, getting ready for any one of those calls meant rebuilding that context by hand. Dan would dig back through old call notes, scroll his email, and scan Slack to remember where things stood, every time, for every meeting. None of it was hard on its own, but it was relentless, and it always landed in the minutes before he needed to be present and sharp.",
          "The same tax showed up around standups. Staying on top of DMs and the inbox meant another pass through the same tools before the day had even started. Across a full slate of clients, that constant context-switching was a steady drain on time and attention that never really let up.",
        ],
      },
      {
        heading: "The solution",
        paragraphs: [
          "Orchid took meeting prep out of the workflow entirely. Ahead of each call it texts Dan everything he needs to know and auto-generates a brief, so he never walks in cold. Because it arrives as a text, it reaches him wherever he is, which matters when he is joining a call from the field instead of his desk.",
          "The briefs do not start from scratch. The Granola integration pulls notes from previous calls straight into each one, so the full history of the relationship is already there. The manual dig through old notes that used to eat the time before a meeting is simply gone.",
          "Orchid also watches the channels Dan cannot keep refreshing on his own. The Slack integration scans his team and external channels and flags anything he missed or has not replied to. A typical morning ask looks like \"review my DMs from the last day and my email before standup,\" and he is caught up in a single message, without thinking about it.",
        ],
      },
      {
        heading: "The results",
        paragraphs: [
          "Meeting prep is now completely automated. Dan never walks into a client call without context, even when he is joining from the field instead of his desk, because the work of getting ready happens before he has to think about it.",
          "The threads that used to slip past him now get caught. Slack messages and emails across both his team and external channels surface in time, so nothing quietly falls off the radar in the gaps between calls.",
          "What is left is the work that actually needs Dan. The prep, the follow-ups, and the context tracking that used to fill every spare minute run in the background now, and he gets to spend his attention on the clients instead of on keeping up with them.",
        ],
      },
    ],
  },
];

/** The shared CTA headline every case study closes with. */
export const CASE_STUDY_CTA_HEADLINE = "Less busywork. More of the work that matters.";

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug);
}
