import { useEffect } from "react";

/** How long the page must stop scrolling before the lock goes on */
const SETTLE_MS = 150;

type Options = {
  /** Only lock when this media query matches (e.g. desktop, where the dialog is inline) */
  query?: string;
};

/**
 * Stops the page scrolling while `active`. It waits for any scroll already under way to
 * settle first, so a smooth scroll that brings the dialog into view (Book now) can finish.
 * The scrollbar's space is kept, so the page doesn't shift sideways when it locks.
 */
export function useScrollLock(active: boolean, { query }: Options = {}) {
  useEffect(() => {
    if (!active) return undefined;
    if (query && !window.matchMedia(query).matches) return undefined;

    const root = document.documentElement;
    let locked = false;
    let timer = 0;

    const lock = () => {
      locked = true;
      window.removeEventListener("scroll", onScroll);
      root.style.scrollbarGutter = "stable";
      root.style.overflow = "hidden";
    };
    // Every scroll event pushes the lock back until the page has been still for a moment
    const onScroll = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(lock, SETTLE_MS);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    timer = window.setTimeout(lock, SETTLE_MS);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      if (locked) {
        root.style.overflow = "";
        root.style.scrollbarGutter = "";
      }
    };
  }, [active, query]);
}
