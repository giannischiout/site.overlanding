import { useEffect, useRef, type KeyboardEvent, type RefObject } from "react";
import { useFilterStore } from "@/store/use-filters-store";

/**
 * Keyboard behaviour for the desktop booking bar: Esc closes the open menu,
 * focus moves into the calendar when it opens and back when it closes, and
 * Tab stays inside the bar while the calendar's backdrop covers the page.
 */
export function useBarKeyboard(barRef: RefObject<HTMLDivElement | null>) {
  const openPopover = useFilterStore((state) => state.openPopover);
  const onClose = useFilterStore((state) => state.onClose);
  const isDatePickerOpen = openPopover === "dateRange";
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!openPopover) return undefined;
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose(openPopover);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openPopover, onClose]);

  useEffect(() => {
    if (!isDatePickerOpen) return undefined;
    returnFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const timer = window.setTimeout(() => {
      barRef.current
        ?.querySelector<HTMLElement>("[data-date-popover] button")
        ?.focus({ preventScroll: true });
    }, 50);
    return () => {
      window.clearTimeout(timer);
      returnFocusRef.current?.focus({ preventScroll: true });
    };
  }, [isDatePickerOpen, barRef]);

  const keepFocusInside = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isDatePickerOpen || event.key !== "Tab") return;
    const focusable = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        'button:not([disabled]):not([tabindex="-1"])',
      ),
    ).filter((element) => getComputedStyle(element).visibility !== "hidden");
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return { keepFocusInside };
}
