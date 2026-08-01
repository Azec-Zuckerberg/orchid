import { PetalDividerGlyph, type PetalDividerVariant } from "@/components/icons";

export interface PetalDividerProps {
  variant: PetalDividerVariant;
}

/** Hairline rule interrupted by a five-petal orchid glyph, between feature rows. */
export function PetalDivider({ variant }: PetalDividerProps) {
  return (
    <div
      data-anim="divider"
      aria-hidden="true"
      className="relative h-6 w-full overflow-hidden"
    >
      <div className="absolute left-1/2 top-1/2 h-px w-full max-w-[1200px] -translate-x-1/2 -translate-y-1/2 bg-ink/10" />
      <div className="absolute left-1/2 top-1/2 h-[60px] w-[156px] -translate-x-1/2 -translate-y-1/2 bg-paper">
        <PetalDividerGlyph variant={variant} />
      </div>
    </div>
  );
}
