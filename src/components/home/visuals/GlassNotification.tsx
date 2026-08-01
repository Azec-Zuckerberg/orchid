import Image from "next/image";

/**
 * Row 4 overlay — a single frosted-glass iOS notification card, centered in the
 * panel. Fully static; the hairline comes from the `gradient-border` utility in
 * `globals.css`.
 */
export function GlassNotification() {
  return (
    <div
      aria-hidden="true"
      className="absolute left-1/2 top-1/2 w-[calc(100%-32px)] max-w-[460px] -translate-x-1/2 -translate-y-1/2"
    >
      <div className="gradient-border relative flex items-center gap-[14.329px] rounded-[34.391px] bg-white/[0.07] px-[20.061px] py-[17.195px] shadow-[0_16.427px_82.133px_0_rgba(0,0,0,0.1)] backdrop-blur-[20px] [--gb-angle:to_bottom] [--gb-from:rgba(255,255,255,0.18)] [--gb-to:rgba(255,255,255,0)] [--gb-w:1px]">
        <div className="relative h-[44px] w-[44px] shrink-0">
          <div className="relative h-full w-full overflow-hidden rounded-[10px]">
            <Image
              fill
              sizes="44px"
              className="object-cover"
              src="/branded/app-icons/orchid-square.png"
              alt=""
            />
          </div>
          <div className="absolute -bottom-[3px] -right-[3px] h-[20px] w-[20px] overflow-hidden rounded-[5px] ring-[1.5px] ring-black/30">
            <Image
              fill
              sizes="20px"
              className="object-cover"
              src="/branded/app-icons/messages.png"
              alt=""
            />
          </div>
        </div>
        <div className="flex min-w-0 flex-1 items-start gap-2">
          <div className="flex min-w-0 flex-1 flex-col text-white">
            <span className="text-[17px] font-[590] leading-[1.15] tracking-[-0.015em]">
              Orchid
            </span>
            <span className="text-[14px] font-normal leading-[1.3] tracking-[-0.015em]">
              heads up, your flight check-in opens in an hour. want me to grab
              your usual aisle seat? ✈️
            </span>
          </div>
          <span className="shrink-0 text-[13px] leading-[1] text-[#797979]">
            now
          </span>
        </div>
      </div>
    </div>
  );
}
