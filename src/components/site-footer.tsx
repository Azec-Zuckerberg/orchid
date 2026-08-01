import Link from "next/link";

import { OrchidWordmark } from "@/components/icons";
import { FOOTER_COLUMNS } from "@/lib/site";

/** Site footer — wordmark on the left, link columns on the right. */

const FOOTER_LINK_CLASS =
  "text-sm leading-none text-ink/70 transition-colors hover:text-ink";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-paper px-6 pt-20 pb-20 md:px-[120px] md:pt-[120px] md:pb-[120px]">
      <div className="relative z-10 flex w-full flex-col gap-16 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col items-start gap-10">
          <Link aria-label="Orchid home" className="inline-flex items-center" href="/">
            <span className="inline-flex items-center text-ink" aria-label="Orchid">
              <OrchidWordmark />
            </span>
          </Link>
        </div>
        <div className="flex flex-col gap-12 sm:flex-row sm:flex-wrap sm:gap-16 lg:flex-nowrap lg:gap-24">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title} className="flex flex-col gap-6">
              <h3 className="font-serif text-[18px] font-medium leading-none tracking-[-0.01em] text-ink">
                {column.title}
              </h3>
              {column.links.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={FOOTER_LINK_CLASS}
                    href={link.href}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.href} className={FOOTER_LINK_CLASS} href={link.href}>
                    {link.label}
                  </Link>
                ),
              )}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
