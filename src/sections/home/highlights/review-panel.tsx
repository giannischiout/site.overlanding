import { Star } from "lucide-react";

/** One guest review on solid basalt: the words carry it, no stock photo behind them */
export function ReviewPanel() {
  return (
    <figure className="bg-basalt rounded-panel flex flex-col justify-between gap-10 p-6 text-white md:p-10">
      <span aria-hidden className="text-aurora text-7xl leading-none font-bold">
        &ldquo;
      </span>
      <blockquote className="text-2xl leading-snug font-semibold tracking-[-0.01em] text-balance md:text-[1.75rem]">
        The van was spotless, the heater kept us warm at minus eight, and when we got a stone chip
        they sorted it over the phone in ten minutes.
      </blockquote>
      <figcaption className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/15 pt-5 text-sm text-white/75">
        <span className="flex" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} size={14} className="fill-star text-star" aria-hidden />
          ))}
        </span>
        <span>Hanna &amp; Jonas · California Ocean · February</span>
      </figcaption>
    </figure>
  );
}
