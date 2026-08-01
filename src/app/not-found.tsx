import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Orchid",
  description: "Orchid is a personal assistant that lives in your messages.",
};

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/blog", label: "Writing" },
];

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center bg-paper px-6 py-24 text-center md:py-36">
      <p className="text-sm uppercase tracking-[0.18em] text-ink/50">404</p>
      <h1 className="mt-6 font-serif font-medium leading-[1.05] tracking-[-0.04em] text-ink text-[clamp(40px,6vw,72px)]">
        Page not found
      </h1>
      <p className="mt-6 max-w-[520px] font-serif text-[clamp(18px,2vw,22px)] leading-[1.4] text-ink/70 text-pretty">
        The page you were looking for moved, or it never existed. Try one of these
        instead.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-ink/80">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            className="underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
