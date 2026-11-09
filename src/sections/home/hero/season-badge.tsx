import dayjs from "dayjs";
import { Leaf, Snowflake, Sprout, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { isSpring, type Season } from "@/lib/season";

const SEASON_LOOK: Record<Season, { icon: typeof Sun; tint: string }> = {
  winter: { icon: Snowflake, tint: "bg-frost/25 text-frost-soft" },
  summer: { icon: Sun, tint: "bg-sun/25 text-sun" },
  shoulder: { icon: Leaf, tint: "bg-ember/25 text-ember-soft" },
};

type Props = {
  season: Season;
  date: Date;
  fromTrip: boolean;
};

/** Names the season the photo shows. Give it `key={season}` to replay its entrance on change. */
export function SeasonBadge({ season, date, fromTrip }: Props) {
  const spring = isSpring(date);
  const name =
    season === "summer"
      ? "Summer"
      : season === "winter"
        ? "Winter"
        : spring
          ? "Spring"
          : "Autumn";
  const look = SEASON_LOOK[season];
  const Icon = season === "shoulder" && spring ? Sprout : look.icon;

  return (
    <span
      aria-live="polite"
      className="animate-in fade-in zoom-in-75 slide-in-from-top-2 rounded-control flex items-center gap-2 bg-black/25 py-1.5 pr-3.5 pl-1.5 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur-md duration-700 ease-[var(--ease-out-expo)]"
    >
      <span
        className={cn(
          "flex size-6 items-center justify-center rounded-full",
          look.tint,
        )}
      >
        <Icon
          size={14}
          strokeWidth={2.25}
          className="animate-in spin-in-[-90deg] duration-1000"
        />
      </span>
      {name} in Iceland
      <span className="font-normal text-white/70">
        · {fromTrip ? `your trip in ${dayjs(date).format("MMMM")}` : "right now"}
      </span>
    </span>
  );
}
