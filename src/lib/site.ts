/** Shared links and constants used across the site shell. */

export const IMESSAGE_HREF = "sms:+14152999916";
export const LOGIN_HREF =
  "https://app.orchid.ai?source=site&utm_source=site&utm_campaign=login";
export const ENTERPRISE_HREF = "https://form.typeform.com/to/KBRPorqf?t";
export const CONTACT_EMAIL = "hello@orchid.ai";

export interface NavLink {
  href: string;
  label: string;
  external?: boolean;
}

export const NAV_LINKS: NavLink[] = [
  { href: ENTERPRISE_HREF, label: "Enterprise", external: true },
  { href: "/blog", label: "Blog" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/contact", label: "Contact Us" },
];

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Social",
    links: [
      { href: "https://x.com/orchid_hq", label: "X (formerly Twitter)", external: true },
      {
        href: "https://www.linkedin.com/company/mail0/",
        label: "LinkedIn",
        external: true,
      },
      { href: "https://discord.gg/orchid", label: "Discord", external: true },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/brand", label: "Brand" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact Us" },
      { href: "/legal/terms", label: "Terms of Service" },
      { href: "/legal/privacy", label: "Privacy Policy" },
    ],
  },
  {
    title: "Tools",
    links: [
      { href: "https://mail.google.com", label: "Gmail", external: true },
      { href: "https://calendar.google.com", label: "Google Calendar", external: true },
      { href: "https://drive.google.com", label: "Google Drive", external: true },
      { href: "https://granola.ai", label: "Granola", external: true },
      { href: "https://sentry.io", label: "Sentry", external: true },
    ],
  },
];
