import Link from "next/link";

import { LogoMenu } from "@/components/logo-menu";
import { MobileMenu } from "@/components/mobile-menu";
import { IMESSAGE_HREF, LOGIN_HREF, NAV_LINKS } from "@/lib/site";

/**
 * Top-level site chrome. The real orchid.ai header is `absolute`, not sticky —
 * it scrolls out of view and never changes state on scroll.
 */

const NAV_LINK_CLASS =
  "inline-flex items-center rounded-lg px-4 py-2 text-sm leading-none text-ink/80 transition-colors hover:bg-ink/[0.05] hover:text-ink";

const LOGIN_PILL_CLASS =
  "relative hidden md:inline-flex items-center justify-center rounded-full bg-paper/60 px-2.5 py-2 text-sm font-medium leading-none text-ink ring-1 ring-ink/10 backdrop-blur-md transition-[opacity,scale,background-color] duration-150 hover:bg-paper/80 motion-safe:active:scale-[0.96] before:absolute before:inset-x-0 before:-inset-y-[5px] before:content-['']";

const GET_STARTED_PILL_CLASS =
  "relative hidden md:inline-flex cursor-pointer items-center justify-center rounded-full bg-ink px-2.5 py-2 text-sm font-medium leading-none text-paper transition-[opacity,scale] duration-150 hover:opacity-90 motion-safe:active:scale-[0.96] before:absolute before:inset-x-0 before:-inset-y-[5px] before:content-['']";

export function SiteHeader() {
  return (
    <header className="absolute top-0 inset-x-0 z-50 flex items-center justify-between px-6 lg:px-[120px] py-5">
      <div className="flex items-center gap-9">
        <LogoMenu />
        <nav className="hidden md:flex items-center">
          {NAV_LINKS.map((link) =>
            link.external ? (
              <a
                key={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={NAV_LINK_CLASS}
                href={link.href}
              >
                {link.label}
              </a>
            ) : (
              <Link key={link.href} className={NAV_LINK_CLASS} href={link.href}>
                {link.label}
              </Link>
            ),
          )}
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <a className={LOGIN_PILL_CLASS} href={LOGIN_HREF}>
          Login
        </a>
        <a className={GET_STARTED_PILL_CLASS} href={IMESSAGE_HREF}>
          Get Started
        </a>
        <MobileMenu />
      </div>
    </header>
  );
}
