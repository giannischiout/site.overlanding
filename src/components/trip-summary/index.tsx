"use client";

import dayjs from "dayjs";
import { ArrowRight, MapPin } from "lucide-react";
import type { PickupLocation } from "@/types/content";

const shortName = (label?: string) =>
  label?.replace(" International", "").replace(" Domestic", "") ?? "Not chosen";

/** Pickup and return, side by side: used in the booking summary and on checkout */
export function TripSummary({
  from,
  to,
  pickup,
  dropoff,
  pickupTime,
  dropoffTime,
}: {
  from?: Date | string | null;
  to?: Date | string | null;
  pickup?: PickupLocation | null;
  dropoff?: PickupLocation | null;
  pickupTime: string;
  dropoffTime: string;
}) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-3">
      <Leg
        title="Pickup"
        date={from ? dayjs(from).format("ddd, MMM D") : "Add date"}
        time={pickupTime}
        place={shortName(pickup?.label)}
      />
      <ArrowRight size={16} className="text-muted-foreground mt-6" />
      <Leg
        title="Return"
        date={to ? dayjs(to).format("ddd, MMM D") : "Add date"}
        time={dropoffTime}
        place={shortName(dropoff?.label)}
      />
    </div>
  );
}

function Leg({
  title,
  date,
  time,
  place,
}: {
  title: string;
  date: string;
  time: string;
  place: string;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-0.5">
      <span className="text-link text-xs font-bold tracking-[0.1em] uppercase">
        {title}
      </span>
      <span>{date}</span>
      <span className="text-muted-foreground text-sm">{time}</span>
      <span className="text-muted-foreground flex items-start gap-1 text-sm leading-snug">
        <MapPin size={13} className="mt-0.5 shrink-0" />
        <span className="line-clamp-2">{place}</span>
      </span>
    </div>
  );
}
