import { useEffect, useRef, useState } from "react";
import { BOOKING_DESKTOP_QUERY } from "@/lib/breakpoints";

const VIEWPORT_MARGIN = 16;

/**
 * How far the booking bar has to move so the bar and calendar sit centred in
 * the viewport. Measured from the slot (which the lift never moves) and measured
 * again on every scroll: "Book now" opens the calendar from far down the page and
 * then scrolls up, so a single measurement taken at the click would be stale.
 */
export function useLift(open: boolean) {
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
      if (!slot || !popover || !window.matchMedia(BOOKING_DESKTOP_QUERY).matches) {
        setLift(0);
        return;
      }
      const slotBox = slot.getBoundingClientRect();
      // offsetTop is measured from the bar, so this is bar + gap + calendar
      const total = popover.offsetTop + popover.offsetHeight;
      const top = Math.max(VIEWPORT_MARGIN, (window.innerHeight - total) / 2);
      setLift(slotBox.top - top);
    };
    // At most one measurement per frame while the page scrolls
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open]);

  return { slotRef, lift };
}
