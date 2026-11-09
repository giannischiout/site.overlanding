import { usePathname, useRouter } from "next/navigation";
import { useOpenDatePicker } from "@/hooks/use-open-date-picker";
import { paths } from "@/lib/paths";

/**
 * Opens the booking flow from anywhere. Pages with a booking bar (home, results, vehicle)
 * open its calendar in place; everywhere else goes to the results first.
 */
export function useBookNow() {
  const router = useRouter();
  const pathname = usePathname();
  const openDatePicker = useOpenDatePicker();

  return () => {
    const hasBar = pathname === "/" || pathname.startsWith(paths.vehicles());
    if (hasBar) openDatePicker();
    else router.push(paths.vehicles());
  };
}
