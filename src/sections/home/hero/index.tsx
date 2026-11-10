"use client";
import { useEffect, useRef, useState } from "react";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { BOOKING_DESKTOP_QUERY } from "@/lib/breakpoints";
import { cn } from "@/lib/utils";
import { useFilterStore } from "@/store/use-filters-store";
import type { Home } from "@/types/content";
import { AuroraToggle } from "@/sections/home/hero/aurora-toggle";
import { BookingSlot } from "@/sections/home/hero/booking-slot";
import { HeroBackdrop } from "@/sections/home/hero/hero-backdrop";
import { SeasonBadge } from "@/sections/home/hero/season-badge";
import { SeasonChip } from "@/sections/home/hero/season-chip";
import { useHeroSeason } from "@/sections/home/hero/use-hero-season";

export function Hero({ data }: { data: Home["hero"] }) {
  const isDatePickerOpen = useFilterStore(
    (state) => state.openPopover === "dateRange",
  );
  // The page holds still under the open calendar (desktop; mobile uses a full-screen sheet)
  useScrollLock(isDatePickerOpen, { query: BOOKING_DESKTOP_QUERY });
  const { season, tripStart, seasonDate, badgeDate, tripInSeason } =
    useHeroSeason();
  const isWinter = season === "winter";

  // Northern lights only make sense on the winter backdrop
  const [auroraWanted, setAuroraWanted] = useState(false);
  const auroraOn = auroraWanted && isWinter;
  const toggleAurora = () => setAuroraWanted((on) => !on);

  // Keep the video playing only while it's visible
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (auroraOn) void video.play();
    else video.pause();
  }, [auroraOn]);

  return (
    // Wider than the page container and shorter than the screen, so the next section peeks in
    <section className="wide-container pt-3">
      {/* Backdrop for the date picker. Clicking it closes the calendar, which treats it as an outside click. */}
      <div
        aria-hidden
        className={cn(
          "fixed inset-0 z-[55] hidden bg-[var(--backdrop)] backdrop-blur-[3px] transition-[opacity,backdrop-filter] duration-500 ease-[var(--ease-out-expo)] min-[961px]:block",
          isDatePickerOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0 backdrop-blur-none",
        )}
      />

      <div className="bg-basalt rounded-panel relative flex min-h-[clamp(600px,84svh,900px)] flex-col items-center text-white">
        <HeroBackdrop
          data={data}
          season={season}
          auroraOn={auroraOn}
          videoRef={videoRef}
        />

        {/* Clicking the open sky plays the aurora too. The forecast pill below
            is the labelled, keyboard-reachable control for the same thing. */}
        {isWinter && (
          <button
            type="button"
            tabIndex={-1}
            aria-hidden
            onClick={toggleAurora}
            className="rounded-panel absolute inset-0 cursor-pointer"
          />
        )}

        <div
          className={cn(
            "relative flex flex-col items-center gap-4 px-6 pt-10 text-center transition-opacity duration-300 md:pt-[clamp(48px,8vh,96px)]",
            isDatePickerOpen && "min-[961px]:opacity-0",
          )}
        >
          {badgeDate && (
            <SeasonBadge
              key={season}
              season={season}
              date={badgeDate}
              fromTrip={tripInSeason}
            />
          )}
          <h1 className="max-w-[18ch] text-[clamp(2.5rem,5.4vw,4.75rem)] leading-[1] font-bold tracking-[-0.02em] text-balance [text-shadow:0_2px_24px_rgb(0_0_0/0.3)]">
            {data.title}
          </h1>
          <p className="max-w-[46ch] text-lg leading-relaxed text-pretty text-white/85 md:text-[1.375rem]">
            {data.subtitle}
          </p>
        </div>

        <BookingSlot datePickerOpen={isDatePickerOpen} />

        {isWinter ? (
          <AuroraToggle
            on={auroraOn}
            onToggle={toggleAurora}
            tripStart={tripStart}
          />
        ) : (
          seasonDate && <SeasonChip date={seasonDate} season={season} />
        )}
      </div>
    </section>
  );
}
