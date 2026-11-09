import { useEffect, useState, type RefObject } from "react";

type Options = { threshold?: number };

/** Becomes true the first time the element is on screen, then stays true */
export function useInView(ref: RefObject<Element | null>, { threshold = 0.4 }: Options = {}) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || inView) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setInView(true);
      },
      { threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, threshold, inView]);

  return inView;
}
