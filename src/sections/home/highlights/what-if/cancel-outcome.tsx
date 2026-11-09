"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { CANCELLATION } from "@/data/policies";
import { cancellationFee } from "@/lib/cover";
import { formatPrice } from "@/lib/pricing";
import { pluralize } from "@/lib/text";
import { cn } from "@/lib/utils";
import { Payoff } from "./payoff";

export type BookingSummary = { name: string; days: number; dailyRate: number; total: number };

type Props = { booking: BookingSummary };

const MAX_DAYS = 30;

/** Drag how many days before pickup you cancel; see the fee and refund change */
export function CancelOutcome({ booking }: Props) {
  const [daysBefore, setDaysBefore] = useState(14);
  const fee = cancellationFee(daysBefore, booking.dailyRate);
  const free = fee === 0;
  const freeShare = 1 - CANCELLATION.freeUntilDays / MAX_DAYS;

  return (
    <div className="tabular flex flex-col gap-6">
      <p className="text-muted-foreground font-mono text-xs tracking-wide uppercase">
        {booking.name} · {pluralize(booking.days, "day")} · {formatPrice(booking.total)}
      </p>

      <div className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor="cancel-days" className="font-semibold">
            Cancel {pluralize(daysBefore, "day")} before pickup
          </label>
          <span className={cn("text-sm font-semibold", free ? "text-link" : "text-warn")}>
            {free ? "Free" : "Late cancellation"}
          </span>
        </div>
        {/* Slider runs from 30 days out (left) to pickup day (right), like the trip getting closer */}
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-1/2 flex h-1.5 -translate-y-1/2 overflow-hidden rounded-full"
          >
            <div className="bg-aurora/50" style={{ width: `${freeShare * 100}%` }} />
            <div className="bg-warn/40 flex-1" />
          </div>
          <Slider
            id="cancel-days"
            min={0}
            max={MAX_DAYS}
            step={1}
            inverted
            value={[daysBefore]}
            onValueChange={([value]) => setDaysBefore(value ?? 0)}
            aria-label="Days before pickup"
            className="[&_[data-slot=slider-range]]:bg-transparent [&_[data-slot=slider-track]]:bg-transparent"
          />
        </div>
        <div className="text-muted-foreground flex justify-between text-xs">
          <span>{MAX_DAYS} days before</span>
          <span>Pickup</span>
        </div>
      </div>

      {/* Payoff replays each time the slider crosses back into the free window */}
      {free ? (
        <Payoff
          key="free"
          label="Cancellation fee"
          detail={`Full refund of ${formatPrice(booking.total)}`}
          message="Nothing to pay"
        />
      ) : (
        <dl key="late" className="grid grid-cols-2 gap-4 border-t border-black/10 pt-5">
          <div className="flex flex-col gap-1">
            <dt className="text-muted-foreground text-sm">Fee</dt>
            <dd className="text-warn text-3xl font-bold">{formatPrice(fee)}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-muted-foreground text-sm">You get back</dt>
            <dd className="text-3xl font-bold">{formatPrice(booking.total - fee)}</dd>
          </div>
        </dl>
      )}
    </div>
  );
}
