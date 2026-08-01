import Image from "next/image";

import { IMESSAGE_HREF } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { FeatureRow as FeatureRowContent } from "@/types/content";

export interface FeatureRowProps extends FeatureRowContent {
  /** Flips the copy and the panel at ≥1024px. */
  reverse?: boolean;
}

/** One copy-plus-illustrated-panel row of the home page feature section. */
export function FeatureRow({
  title,
  description,
  descriptionWidth,
  bullets,
  photoSrc,
  Visual,
  reverse = false,
}: FeatureRowProps) {
  return (
    <div
      data-anim="row"
      className={cn(
        "flex flex-col gap-10 min-[1024px]:items-center min-[1024px]:gap-[64px]",
        reverse ? "min-[1024px]:flex-row-reverse" : "min-[1024px]:flex-row",
      )}
    >
      <div className="flex flex-1 flex-col items-start gap-8 py-4 min-[1024px]:min-w-px">
        <div className="flex w-full flex-col items-start gap-[12px]">
          <h3 className="font-serif text-[28px] leading-[1.1] tracking-[-0.03em] text-ink">
            {title}
          </h3>
          <p
            className="text-[16px] leading-[1.5] text-ink/65"
            style={{ maxWidth: `${descriptionWidth}px` }}
          >
            {description}
          </p>
        </div>
        <div className="flex w-full flex-col items-start">
          {bullets.map(({ Icon, text }, index) => (
            <div
              key={text}
              className={cn(
                "flex w-full py-3",
                index < bullets.length - 1 && "border-b-[0.5px] border-ink/10",
              )}
            >
              <div className="flex items-center gap-[12px]">
                <Icon
                  className="size-[18px] shrink-0 text-ink/70"
                  strokeWidth={1.6}
                />
                <p className="max-w-[530px] text-[15px] leading-[1.5] text-ink/65 md:text-[16px]">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
        <a
          className="relative inline-flex cursor-pointer items-center justify-center rounded-full bg-ink px-4 py-2.5 text-sm font-medium leading-none text-paper transition-[opacity,scale] duration-150 hover:opacity-90 motion-safe:active:scale-[0.97] before:absolute before:inset-x-0 before:-inset-y-[5px] before:content-['']"
          href={IMESSAGE_HREF}
        >
          Get Started
        </a>
      </div>

      <div className="relative aspect-[540/400] w-full overflow-hidden rounded-[24px] bg-ink/[0.04] min-[1024px]:aspect-auto min-[1024px]:h-[440px] min-[1024px]:w-[540px] min-[1024px]:shrink-0">
        <div className="pointer-events-none absolute inset-0">
          <Image
            fill
            sizes="(min-width: 1024px) 540px, 100vw"
            className="object-cover"
            src={photoSrc}
            alt=""
          />
          <div className="absolute inset-0 bg-[rgba(8,21,46,0.4)]" />
        </div>
        <Visual />
      </div>
    </div>
  );
}
