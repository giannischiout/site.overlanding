import dayjs from "dayjs";
import { Leaf, Sprout, Sun } from "lucide-react";
import { daylightHours, isSpring, type Season } from "@/lib/season";

/** What the season means for the trip, in place of the aurora reading outside winter */
export function SeasonChip({ date, season }: { date: Date; season: Season }) {
  const spring = isSpring(date);
  const label =
    season === "summer" ? "Midnight sun" : spring ? "Spring thaw" : "Autumn colours";
  const Icon = season === "summer" ? Sun : spring ? Sprout : Leaf;

  return (
    <p className="bg-basalt/55 rounded-control relative mt-auto mb-5 flex items-center gap-2 self-start py-2 pr-4 pl-2 text-sm text-white/90 ring-1 ring-white/15 backdrop-blur-md md:mb-6 md:ml-6">
      <span className="bg-sun/20 text-sun flex size-7 items-center justify-center rounded-full">
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
