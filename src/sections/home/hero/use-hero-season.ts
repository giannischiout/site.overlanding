import { useEffect, useState } from "react";
import { seasonOf, type Season } from "@/lib/season";
import { useFilterStore } from "@/store/use-filters-store";

/**
 * The season the hero shows: the trip's season once dates are picked, today's
 * until then. The photo holds while the calendar covers the hero and changes
 * once it closes, so the switch happens where people can see it.
 */
export function useHeroSeason() {
  const tripStart = useFilterStore((state) => state.range.from);
  const isPickingDates = useFilterStore(
    (state) =>
      state.openPopover === "dateRange" || state.currentScreen !== "callToAction",
  );

  // Today is only known on the client; rendering it on the server would mismatch
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => setToday(new Date()), []);

  const seasonDate = tripStart ?? today;
  const pickedSeason: Season = seasonDate ? seasonOf(seasonDate) : "winter";

  const [season, setSeason] = useState<Season>(pickedSeason);
  useEffect(() => {
    if (!isPickingDates) setSeason(pickedSeason);
  }, [pickedSeason, isPickingDates]);

  const tripInSeason = !!tripStart && seasonOf(tripStart) === season;

  return {
    season,
    tripStart,
    /** The date the season reading is about, or null before the client knows today */
    seasonDate,
    /** The date the badge describes: the trip when it falls in the shown season */
    badgeDate: tripInSeason ? tripStart : (today ?? seasonDate),
    tripInSeason,
  };
}
