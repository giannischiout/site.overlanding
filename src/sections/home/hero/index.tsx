"use client";
import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import dayjs from "dayjs";
import { Leaf, Snowflake, Sparkles, Sprout, Sun } from "lucide-react";
import { FilterPanel } from "@/components/booking-filters";
import { cn } from "@/lib/utils";
import { SEASON_BACKDROPS, daylightHours, seasonOf, type Season } from "@/lib/season";
import { useFilterStore } from "@/store/use-filters-store";
import type { Home } from "@/types/content";

const DESKTOP_QUERY = "(min-width: 961px)";
const VIEWPORT_MARGIN = 16;

// Sample reading until a live forecast is connected (e.g. the Icelandic Met Office aurora API)
const AURORA = { level: "Likely", kp: 4 };

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
      const top = Math.max(VIEWPORT_MARGIN, (window.innerHeight - total) / 2);
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
  const tripStart = useFilterStore((state) => state.range.from);
  const { slotRef, lift } = useLift(isDatePickerOpen);
  const [auroraOn, setAuroraOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // The backdrop follows the season of the trip, or today's season until dates are picked
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => setToday(new Date()), []);
  const seasonDate = tripStart ?? today;
  const pickedSeason: Season = seasonDate ? seasonOf(seasonDate) : "winter";

  // Hold the photo while the calendar covers the hero, then change it once the
  // calendar closes, so the switch happens where people can see it
  const isPickingDates = useFilterStore(
    (state) => state.openPopover === "dateRange" || state.currentScreen !== "callToAction",
  );
  const [season, setSeason] = useState<Season>(pickedSeason);
  useEffect(() => {
    if (!isPickingDates) setSeason(pickedSeason);
  }, [pickedSeason, isPickingDates]);
  const isWinter = season === "winter";

  // Northern lights only make sense on the winter backdrop
  useEffect(() => {
    if (!isWinter) setAuroraOn(false);
  }, [isWinter]);

  const toggleAurora = () => {
    if (!isWinter) return;
    setAuroraOn((on) => {
      const next = !on;
      const video = videoRef.current;
      if (video) {
        if (next) void video.play();
        else video.pause();
      }
      return next;
    });
  };

  // Clicking the photo plays the aurora; clicks on the booking bar or text don't
  const onPanelClick = (event: MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("button, a, [data-booking]")) return;
    toggleAurora();
  };

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

      <div
        onClick={onPanelClick}
        className={cn(
          "bg-basalt relative flex min-h-[clamp(600px,84svh,900px)] flex-col items-center rounded-panel text-white",
          isWinter && "cursor-pointer",
        )}
      >
        {/* The photo clips on its own layer so the booking menus can open past the panel */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-panel"
        >
          {/* One photo per season, crossfading when the trip dates move into another season */}
          {(Object.keys(SEASON_BACKDROPS) as Season[]).map((key) => {
            const backdrop = SEASON_BACKDROPS[key];
            return (
              <Image
                key={key}
                alt={backdrop.alt}
                fill
                priority={key === season}
                sizes="100vw"
                src={backdrop.url}
                style={{ objectPosition: backdrop.position }}
                className={cn(
                  "object-cover transition-[opacity,transform] duration-[1400ms] ease-[var(--ease-out-expo)]",
                  key === season && !auroraOn
                    ? "scale-100 opacity-100"
                    : "scale-[1.03] opacity-0",
                )}
              />
            );
          })}
          {/* Winter night: shown when the aurora is switched on */}
          <div
            className={cn(
              "absolute inset-0 transition-[opacity,transform] duration-[1400ms] ease-[var(--ease-out-expo)]",
              auroraOn ? "scale-[1.04] opacity-100" : "opacity-0",
            )}
          >
            <Image
              alt={backgroundImage.alt}
              fill
              sizes="100vw"
              src={backgroundImage.url}
              className="object-cover object-[50%_75%]"
            />
          </div>
          {data.backgroundVideo && (
            <video
              ref={videoRef}
              src={data.backgroundVideo.url}
              muted
              loop
              playsInline
              preload="none"
              className={cn(
                "absolute inset-0 size-full object-cover object-[50%_75%] transition-opacity duration-700",
                auroraOn ? "opacity-100" : "opacity-0",
              )}
            />
          )}
          {/* Drawn aurora: ribbons screened over the sky, shown while the aurora is playing */}
          {!data.backgroundVideo && (
            <div
              className={cn(
                "absolute inset-0 mix-blend-screen transition-opacity duration-[1600ms] ease-out [mask-image:linear-gradient(to_bottom,black_0%,black_58%,transparent_72%)] motion-reduce:hidden",
                auroraOn ? "opacity-100" : "opacity-0",
              )}
            >
              <div className="aurora-ribbon absolute top-[34%] -left-[15%] h-[30%] w-[85%] rounded-[50%] bg-[radial-gradient(closest-side,rgb(90_255_170/0.95),rgb(61_220_151/0.35)_55%,transparent)] blur-2xl [--aurora-speed:7s]" />
              <div className="aurora-ribbon absolute top-[16%] left-[25%] h-[42%] w-[50%] rounded-[50%] bg-[radial-gradient(closest-side,rgb(140_255_210/0.7),rgb(45_200_200/0.25)_60%,transparent)] blur-3xl [--aurora-speed:10s] [animation-delay:-3s]" />
              <div className="aurora-ribbon absolute top-[24%] left-[58%] h-[26%] w-[48%] rounded-[50%] bg-[radial-gradient(closest-side,rgb(190_130_255/0.5),transparent)] blur-3xl [--aurora-speed:12s] [animation-delay:-6s]" />
              <div className="aurora-ribbon absolute top-[44%] left-[5%] h-[12%] w-[60%] rounded-[50%] bg-[radial-gradient(closest-side,rgb(200_255_220/0.8),transparent)] blur-xl [--aurora-speed:6s] [animation-delay:-2s]" />
            </div>
          )}
          {/* The same glow, faintly, in the water */}
          {!data.backgroundVideo && (
            <div
              className={cn(
                "absolute inset-x-0 bottom-0 h-[35%] mix-blend-screen transition-opacity duration-[1600ms] ease-out motion-reduce:hidden",
                auroraOn ? "opacity-70" : "opacity-0",
              )}
            >
              <div className="aurora-ribbon absolute top-[10%] left-0 h-[60%] w-[60%] rounded-[50%] bg-[radial-gradient(closest-side,rgb(90_255_170/0.5),transparent)] blur-3xl [--aurora-speed:7s] [animation-direction:reverse]" />
            </div>
          )}
          <div className="from-basalt/60 via-basalt/20 absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b via-55% to-transparent" />
          <div className="from-basalt/60 absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t to-transparent" />
        </div>

        <div
          className={cn(
            "relative flex flex-col items-center gap-4 px-6 pt-10 text-center transition-opacity duration-300 md:pt-[clamp(48px,8vh,96px)]",
            isDatePickerOpen && "min-[961px]:opacity-0",
          )}
        >
          {seasonDate && (
            <SeasonBadge
              // A new key replays the entrance animation each time the season changes
              key={season}
              season={season}
              date={tripStart && seasonOf(tripStart) === season ? tripStart : (today ?? seasonDate)}
              fromTrip={!!tripStart && seasonOf(tripStart) === season}
            />
          )}
          <h1 className="max-w-[18ch] text-[clamp(2.5rem,5.4vw,4.75rem)] leading-[1] font-bold tracking-[-0.02em] text-balance [text-shadow:0_2px_24px_rgb(0_0_0/0.3)]">
            {data.title}
          </h1>
          <p className="max-w-[46ch] text-lg leading-relaxed text-pretty text-white/85 md:text-[1.375rem]">
            {data.subtitle}
          </p>
        </div>

        {/* The slot holds the bar's place in the page while the bar moves */}
        <div
          ref={slotRef}
          data-booking
          className="relative mt-6 w-full cursor-auto px-3 md:mt-10 md:px-5 min-[961px]:w-fit min-[961px]:max-w-[calc(100%-48px)] min-[961px]:px-0"
        >
          <div
            style={{ transform: lift ? `translateY(${-lift}px)` : undefined }}
            className={cn(
              "text-foreground relative rounded-panel bg-white p-1.5 shadow-float ring-1 ring-black/5 min-[961px]:rounded-panel min-[961px]:pl-2",
              "transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-expo)]",
              isDatePickerOpen
                ? "z-[60] shadow-float"
                : "z-10",
            )}
          >
            <FilterPanel top="calc(100% + 12px)" />
          </div>
        </div>

        {isWinter ? (
          <button
            type="button"
            onClick={toggleAurora}
            aria-pressed={auroraOn}
            className={cn(
              "bg-basalt/70 relative mt-auto mb-5 flex items-center gap-2 self-start rounded-control py-2 pr-4 pl-2 text-sm text-white/90 ring-1 ring-white/10 backdrop-blur-md transition-shadow duration-700 md:mb-6 md:ml-6",
              auroraOn
                ? "shadow-[0_0_48px_rgb(61_220_151/0.6)]"
                : "shadow-[0_0_32px_rgb(61_220_151/0.3)]",
            )}
          >
            <span className="bg-aurora/20 text-aurora flex size-7 items-center justify-center rounded-full">
              <Sparkles size={15} strokeWidth={2} />
            </span>
            <span>
              {tripStart ? `Aurora in ${dayjs(tripStart).format("MMMM")}: ` : "Aurora tonight: "}
              <strong className="text-aurora font-semibold">
                {tripStart ? "Good odds" : AURORA.level}
              </strong>
              {!tripStart && <span className="text-white/60"> · Kp {AURORA.kp}</span>}
            </span>
            <span className="sr-only">
              {auroraOn ? "Show the daytime photo" : "Show the night sky with the aurora"}
            </span>
          </button>
        ) : (
          seasonDate && <SeasonChip date={seasonDate} season={season} />
        )}
      </div>
    </section>
  );
}

const SEASON_LOOK: Record<Season, { icon: typeof Sun; tint: string }> = {
  winter: { icon: Snowflake, tint: "bg-[#bfe3ff]/25 text-[#d8efff]" },
  summer: { icon: Sun, tint: "bg-sun/25 text-sun" },
  shoulder: { icon: Leaf, tint: "bg-[#ffb36b]/25 text-[#ffc58f]" },
};

/** Names the season the photo shows, and pops in again whenever it changes */
function SeasonBadge({
  season,
  date,
  fromTrip,
}: {
  season: Season;
  date: Date;
  fromTrip: boolean;
}) {
  const month = date.getMonth();
  const spring = month === 3 || month === 4;
  const name = season === "summer" ? "Summer" : season === "winter" ? "Winter" : spring ? "Spring" : "Autumn";
  const look = SEASON_LOOK[season];
  const Icon = season === "shoulder" && spring ? Sprout : look.icon;

  return (
    <span
      aria-live="polite"
      className="animate-in fade-in zoom-in-75 slide-in-from-top-2 flex items-center gap-2 rounded-control bg-black/25 py-1.5 pr-3.5 pl-1.5 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur-md duration-700 ease-[var(--ease-out-expo)]"
    >
      <span className={cn("flex size-6 items-center justify-center rounded-full", look.tint)}>
        <Icon size={14} strokeWidth={2.25} className="animate-in spin-in-[-90deg] duration-1000" />
      </span>
      {name} in Iceland
      <span className="font-normal text-white/70">
        · {fromTrip ? `your trip in ${dayjs(date).format("MMMM")}` : "right now"}
      </span>
    </span>
  );
}

/** What the season means for the trip, in place of the aurora reading outside winter */
function SeasonChip({ date, season }: { date: Date; season: Season }) {
  const month = date.getMonth();
  const spring = month === 3 || month === 4;
  const label =
    season === "summer" ? "Midnight sun" : spring ? "Spring thaw" : "Autumn colours";
  const Icon = season === "summer" ? Sun : spring ? Sprout : Leaf;

  return (
    <p className="bg-basalt/55 relative mt-auto mb-5 flex items-center gap-2 self-start rounded-control py-2 pr-4 pl-2 text-sm text-white/90 ring-1 ring-white/15 backdrop-blur-md md:mb-6 md:ml-6">
      <span className="flex size-7 items-center justify-center rounded-full bg-sun/20 text-sun">
        <Icon size={15} strokeWidth={2} />
      </span>
      <span>
        <strong className="font-semibold">{label}</strong>
        <span className="text-white/70">
          {" "}
          · about {daylightHours(date)}h of daylight in {dayjs(date).format("MMMM")}
        </span>
      </span>
    </p>
  );
}
