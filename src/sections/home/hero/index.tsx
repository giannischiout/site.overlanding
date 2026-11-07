"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FilterPanel } from "@/components/booking-filters";
import { cn } from "@/lib/utils";
import { useFilterStore } from "@/store/use-filters-store";
import type { Home } from "@/types/content";

const DESKTOP_QUERY = "(min-width: 961px)";
const VIEWPORT_MARGIN = 16;

/**
 * How far the booking bar has to move so the bar and calendar sit centred in
 * the viewport. Measured from the slot, which never moves, so the result holds
 * at any scroll position and calendar height.
 */
function useLift(open: boolean) {
  const slotRef = useRef<HTMLDivElement>(null);
  const [lift, setLift] = useState(0);

  useEffect(() => {
    if (!open) {
      setLift(0);
      return undefined;
    }
    const measure = () => {
      const slot = slotRef.current;
      const popover = slot
        ?.querySelector("[data-date-popover]")
        ?.closest<HTMLElement>("[aria-hidden]");
      if (!slot || !popover || !window.matchMedia(DESKTOP_QUERY).matches) {
        setLift(0);
        return;
      }
      const slotBox = slot.getBoundingClientRect();
      // offsetTop is measured from the bar, so this is bar + gap + calendar
      const total = popover.offsetTop + popover.offsetHeight;
      const top = Math.max(
        VIEWPORT_MARGIN,
        (window.innerHeight - total) / 2,
      );
      setLift(slotBox.top - top);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [open]);

  return { slotRef, lift };
}

export function Hero({ data }: { data: Home["hero"] }) {
  const { backgroundImage } = data;
  const isDatePickerOpen = useFilterStore(
    (state) => state.openPopover === "dateRange",
  );
  const { slotRef, lift } = useLift(isDatePickerOpen);

  return (
    <section className="page-container flex flex-col pt-3 md:pt-4">

      {/* Backdrop for the date picker. Clicking it closes the calendar, which treats it as an outside click. */}
      <div
        aria-hidden
        className={cn(
          "fixed inset-0 z-[55] hidden bg-[var(--backdrop)] transition-opacity duration-300 ease-out min-[961px]:block",
          isDatePickerOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* The slot holds the bar's place in the page while the bar moves */}
      {/* The photo clips itself, not this wrapper, so the booking menus can open past its edges */}
      <div className="relative h-[clamp(480px,calc(100svh-var(--nav-height)-32px),780px)]">
        <div className="bg-sky absolute inset-0 overflow-hidden rounded-xl">
          <Image
            alt={backgroundImage.alt}
            fill
            priority
            sizes="(min-width: 1416px) 1320px, 100vw"
            src={backgroundImage.url}
            className="object-cover object-[60%_72%]"
          />
          {/* Deepens the sky behind the headline and fades out above the vehicle */}
          <div className="absolute inset-x-0 top-0 h-[60%] bg-gradient-to-b from-[rgb(14_42_71/0.55)] via-[rgb(14_42_71/0.5)] via-60% to-transparent" />
        </div>
        {/* Kept to the left, where the sky is darkest. A new hero photo needs open, darker sky here too. */}
        <div
          className={cn(
            "relative p-6 text-white transition-opacity duration-300 md:p-10 lg:p-12",
            isDatePickerOpen && "min-[961px]:opacity-0",
          )}
        >
          <h1 className="max-w-[18ch] text-[clamp(2.25rem,4.8vw,4.25rem)] leading-[1.05] font-black tracking-[-0.025em] text-balance">
            {data.title}
          </h1>
          <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-pretty md:mt-4 md:text-lg [@media(max-height:640px)]:hidden">
            {data.subtitle}
          </p>
        </div>
        <div
          ref={slotRef}
          className="absolute inset-x-3 bottom-3 md:inset-x-4 md:bottom-4"
        >
          <div
            style={{ transform: lift ? `translateY(${-lift}px)` : undefined }}
            className={cn(
              "relative rounded-xl bg-white p-2 shadow-[0_12px_32px_rgb(14_42_71/0.2)] transition-[transform,z-index] duration-300 ease-in-out",
              isDatePickerOpen ? "z-[60]" : "z-10",
            )}
          >
            <FilterPanel top="calc(100% + 8px)" />
          </div>
        </div>
      </div>
    </section>
  );
}
