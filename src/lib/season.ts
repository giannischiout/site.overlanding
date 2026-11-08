import type { Media } from "@/types/content";

/** Iceland's three travel seasons, as rental companies price and plan them */
export type Season = "summer" | "shoulder" | "winter";

export function seasonOf(date: Date): Season {
  const month = date.getMonth();
  if (month >= 5 && month <= 7) return "summer"; // Jun–Aug
  if (month === 3 || month === 4 || month === 8 || month === 9) return "shoulder"; // Apr–May, Sep–Oct
  return "winter"; // Nov–Mar
}

/** Rough daylight hours in Reykjavík around mid-month, January first */
const DAYLIGHT = [5, 8, 12, 15, 19, 21, 20, 16, 13, 10, 7, 4];

export const daylightHours = (date: Date) => DAYLIGHT[date.getMonth()];

/**
 * One hero photo per season, all framed the same way: a road running at eye level
 * towards the mountains, so switching season reads as the same place changing.
 */
export const SEASON_BACKDROPS: Record<Season, Media & { position: string }> = {
  summer: {
    url: "/assets/hero/season-summer.jpg",
    alt: "Road curving through green moorland towards a mountain under a blue summer sky",
    position: "50% 60%",
  },
  shoulder: {
    url: "/assets/hero/season-shoulder.jpg",
    alt: "Straight road through golden autumn grass towards dark mountains",
    position: "50% 65%",
  },
  winter: {
    url: "/assets/hero/season-winter.jpg",
    alt: "Straight road through snow-covered fields towards white mountains",
    position: "50% 70%",
  },
};
