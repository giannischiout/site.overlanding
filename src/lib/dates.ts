import dayjs from "dayjs";
import { pluralize } from "@/lib/text";

/** "Mar 4", or null when there's no date yet */
export const shortDate = (date: Date | null | undefined) =>
  date ? dayjs(date).format("MMM D") : null;

/** The prompt or summary under the booking calendar, depending on how far the range is picked */
export function rangeSummary(from?: Date | null, to?: Date | null) {
  if (!from) return "Choose your pickup date";
  if (!to) return "Now choose your dropoff date";
  const days = dayjs(to).diff(dayjs(from), "day");
  return `${shortDate(from)} to ${shortDate(to)}, ${pluralize(days, "day")}`;
}
