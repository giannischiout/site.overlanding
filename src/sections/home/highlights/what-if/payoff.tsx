"use client";

import { useRef, type CSSProperties } from "react";
import { useInView } from "@/hooks/use-in-view";
import { formatPrice } from "@/lib/pricing";

type Props = {
  label: string;
  detail?: string;
  message?: string;
  /** Wait for the rest of the scenario (e.g. the bars) before revealing, in ms */
  delay?: number;
};

/**
 * The reward at the end of every scenario: a dark strip that unmasks upward,
 * "€0" rising out of its line, then the message and a drawn check.
 * Plays the first time it's on screen; static with reduced motion (see styles.css).
 */
export function Payoff({
  label,
  detail,
  message = "Nothing to pay",
  delay = 0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    // The observed wrapper stays unclipped: a fully masked element never counts as on screen
    <div ref={ref} data-play={inView} className="payoff-scope">
      <div
        style={{ "--delay": `${delay}ms` } as CSSProperties}
        className="payoff rounded-control bg-basalt grid grid-cols-[1fr_auto] items-center gap-x-4 p-4 text-white md:p-5"
      >
        <div className="flex flex-col">
          <span className="font-semibold">{label}</span>
          {detail && <span className="text-sm text-white/60">{detail}</span>}
        </div>
        {/* The mask: €0 rises from below its own baseline */}
        <span className="overflow-hidden">
          <span className="payoff-rise text-aurora tabular block text-4xl leading-[1.1] font-bold tracking-[-0.02em]">
            {formatPrice(0)}
          </span>
        </span>
        <p className="payoff-message text-aurora col-span-2 mt-3 flex items-center gap-2 border-t border-white/10 pt-3 font-semibold">
          <svg
            viewBox="0 0 24 24"
            className="payoff-check size-5 shrink-0"
            aria-hidden
          >
            <path
              d="M4.5 12.5l5 5L19.5 7"
              pathLength={1}
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {message}
        </p>
      </div>
    </div>
  );
}
