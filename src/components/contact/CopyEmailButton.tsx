"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

const RESET_DELAY_MS = 1400;

interface CopyEmailButtonProps {
  email: string;
}

/** Writes the address to the clipboard and flips to a check for a moment. */
export function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timeout.current), []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      return;
    }
    setCopied(true);
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setCopied(false), RESET_DELAY_MS);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Email address copied" : "Copy email address"}
      className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-paper text-ink outline-none ring-1 ring-inset ring-ink/10 transition-colors hover:bg-ink/[0.03] focus-visible:ring-2 focus-visible:ring-ink/30"
    >
      {copied ? (
        <Check width={16} height={16} strokeWidth={1.75} aria-hidden="true" />
      ) : (
        <Copy width={16} height={16} strokeWidth={1.75} aria-hidden="true" />
      )}
    </button>
  );
}
