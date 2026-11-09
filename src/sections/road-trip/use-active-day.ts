import { useEffect, useRef, useState } from "react";

/**
 * Tracks which day of the itinerary is in the middle of the screen while scrolling.
 * Returns the index, a setter for hover and focus, and a ref callback for each day's element.
 */
export function useActiveDay(count: number) {
  const [active, setActive] = useState(0);
  const elements = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = elements.current.indexOf(entry.target as HTMLElement);
          if (index >= 0) setActive(index);
        }
      },
      // A thin band across the middle of the viewport decides the active day
      { rootMargin: "-45% 0px -45% 0px" },
    );
    for (const element of elements.current)
      if (element) observer.observe(element);
    return () => observer.disconnect();
  }, [count]);

  const register = (index: number) => (element: HTMLElement | null) => {
    elements.current[index] = element;
  };

  return { active, setActive, register };
}
