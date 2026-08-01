import type { Metadata } from "next";
import Image from "next/image";

import { CopyEmailButton } from "@/components/contact/CopyEmailButton";
import { CONTACT_EMAIL, IMESSAGE_HREF } from "@/lib/site";

const DESCRIPTION =
  "Get in touch with the Orchid team. Text us to get started, or email us and we'll get back to you.";

export const metadata: Metadata = {
  title: "Contact us · Orchid",
  description: DESCRIPTION,
  alternates: { canonical: "https://orchid.ai/contact" },
  openGraph: {
    type: "website",
    title: "Contact us",
    description: DESCRIPTION,
    url: "https://orchid.ai/contact",
  },
  twitter: {
    card: "summary",
    title: "Contact us",
    description: DESCRIPTION,
  },
};

export default function ContactPage() {
  return (
    <div className="bg-paper px-6 pt-32 pb-24 md:px-[120px] md:pt-40 md:pb-36">
      <div className="mx-auto flex max-w-[640px] flex-col items-center text-center">
        <h1 className="font-serif font-medium leading-[1.05] tracking-[-0.04em] text-ink text-[clamp(40px,6vw,64px)] text-balance">
          Get in touch
        </h1>
        <p className="mt-5 max-w-[46ch] text-[17px] leading-relaxed text-ink/60 text-pretty">
          Orchid lives in your messages. Text us to get started, or email the team and
          we&rsquo;ll get back to you.
        </p>
        <div className="mt-10 flex w-full max-w-[340px] flex-col items-stretch gap-4">
          <a
            className="relative inline-flex items-center justify-center gap-2.5 rounded-full bg-ink px-6 py-4 text-sm font-medium leading-none text-paper transition-[opacity,scale] duration-150 hover:opacity-90 motion-safe:active:scale-[0.96]"
            href={IMESSAGE_HREF}
          >
            <Image
              src="/branded/imessage-icon.png"
              alt=""
              aria-hidden="true"
              width={20}
              height={20}
              className="size-5 select-none"
            />
            Text Orchid
          </a>
          <div className="flex items-center gap-2 rounded-full bg-ink/[0.04] py-1.5 pr-1.5 pl-5 ring-1 ring-inset ring-ink/10">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="min-w-0 flex-1 truncate text-left text-sm leading-none text-ink/80 transition-colors hover:text-ink"
            >
              {CONTACT_EMAIL}
            </a>
            <CopyEmailButton email={CONTACT_EMAIL} />
          </div>
        </div>
      </div>
    </div>
  );
}
