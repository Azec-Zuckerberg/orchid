"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { IMESSAGE_HREF, LOGIN_HREF, NAV_LINKS } from "@/lib/site";

/**
 * Hamburger trigger + drop-down panel shown below `md`. The panel is `fixed`
 * and positioned from the trigger's measured bottom edge, so it stays put even
 * though the header itself is absolutely positioned.
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Gap between the trigger's bottom edge and the top of the panel. */
const PANEL_OFFSET = 12;
/** Breathing room kept below the panel when clamping its height. */
const PANEL_BOTTOM_GUTTER = 24;
/** Scroll distance from the open position that dismisses the panel. */
const SCROLL_DISMISS_PX = 64;

const TRIGGER_CLASS =
  "relative inline-flex size-8 touch-manipulation items-center justify-center rounded-full bg-paper/60 text-ink outline-none ring-1 ring-ink/10 backdrop-blur-md transition-[background-color,scale] duration-150 hover:bg-paper/80 focus-visible:ring-2 focus-visible:ring-ink/30 motion-safe:active:scale-[0.96] before:absolute before:-inset-2 before:content-['']";

const PANEL_CLASS =
  "fixed inset-x-6 z-50 overflow-y-auto overscroll-contain rounded-3xl bg-paper p-3 ring-1 ring-inset ring-ink/[0.08] shadow-[0_24px_48px_-12px_rgba(8,21,46,0.18)]";

const ITEM_CLASS =
  "flex min-h-[44px] touch-manipulation items-center rounded-xl px-2.5 py-2.5 text-[15px] leading-none text-ink/80 outline-none transition-colors hover:bg-ink/[0.05] hover:text-ink focus-visible:bg-ink/[0.06] focus-visible:ring-2 focus-visible:ring-ink/30";

export function MobileMenu() {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [top, setTop] = useState(0);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const reduceMotion = useReducedMotion();

  const close = useCallback(() => setOpen(false), []);

  const toggle = useCallback(() => {
    setOpen((value) => {
      if (value) return false;
      const rect = triggerRef.current?.getBoundingClientRect();
      if (rect) setTop(rect.bottom + PANEL_OFFSET);
      return true;
    });
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (containerRef.current?.contains(target)) return;
      if (document.getElementById(panelId)?.contains(target)) return;
      setOpen(false);
    };

    const openedAt = window.scrollY;
    const handleScroll = () => {
      if (Math.abs(window.scrollY - openedAt) > SCROLL_DISMISS_PX) setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [open, panelId]);

  const iconVariants = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0, rotate: -90, scale: 0.6 },
        animate: { opacity: 1, rotate: 0, scale: 1 },
        exit: { opacity: 0, rotate: 90, scale: 0.6 },
      };

  const panelVariants = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0, y: -8, filter: "blur(8px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        exit: { opacity: 0, y: -4, filter: "blur(6px)" },
      };

  return (
    <div ref={containerRef} className="relative inline-flex md:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        className={TRIGGER_CLASS}
        onClick={toggle}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "open"}
            className="inline-flex"
            initial={iconVariants.initial}
            animate={iconVariants.animate}
            exit={iconVariants.exit}
            transition={{ duration: 0.15, ease: EASE }}
          >
            {open ? <X size={18} strokeWidth={1.75} /> : <Menu size={18} strokeWidth={1.75} />}
          </motion.span>
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id={panelId}
            aria-label="Mobile"
            className={PANEL_CLASS}
            style={{ top, maxHeight: `calc(100dvh - ${top + PANEL_BOTTOM_GUTTER}px)` }}
            initial={panelVariants.initial}
            animate={panelVariants.animate}
            exit={panelVariants.exit}
            transition={{ duration: 0.22, ease: EASE }}
          >
            {NAV_LINKS.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={ITEM_CLASS}
                  href={link.href}
                  onClick={close}
                >
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} className={ITEM_CLASS} href={link.href} onClick={close}>
                  {link.label}
                </Link>
              ),
            )}
            <a className={ITEM_CLASS} href={LOGIN_HREF} onClick={close}>
              Login
            </a>
            <a className={ITEM_CLASS} href={IMESSAGE_HREF} onClick={close}>
              Get Started
            </a>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
