"use client";

import type { ReactNode } from "react";
import type { TripGuide } from "@/data/trip-guides";
import type { MapRoute } from "@/lib/iceland-map";
import { cn } from "@/lib/utils";
import { RouteMap } from "./route-map";
import { useActiveDay } from "./use-active-day";

type Props = {
  title: string;
  route: MapRoute;
  guide: TripGuide;
  backdrop: ReactNode;
};

const formatHours = (hours: number) =>
  hours < 1 ? `${hours * 60} min` : `${hours} h`;

/**
 * Day-by-day plan beside a sticky map. The day in the middle of the screen (or under the pointer)
 * lights up its stops on the map.
 */
export function Itinerary({ title, route, guide, backdrop }: Props) {
  const { active, setActive, register } = useActiveDay(guide.days.length);
  const activeStops = guide.days[active]?.stops ?? [];

  return (
    <section
      aria-labelledby="itinerary-title"
      className="grid gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12"
    >
      <div className="rounded-panel order-first h-fit overflow-hidden bg-[var(--map-paper)] p-3 md:p-5 lg:sticky lg:top-[calc(var(--nav-height)+24px)] lg:order-last">
        <RouteMap
          title={title}
          route={route}
          stopNames={guide.stops}
          activeStops={activeStops}
          backdrop={backdrop}
        />
      </div>

      <div className="flex flex-col gap-6">
        <h2
          id="itinerary-title"
          className="text-3xl font-bold tracking-[-0.02em] md:text-4xl"
        >
          Day by day
        </h2>
        <ol className="flex flex-col">
          {guide.days.map((day, index) => {
            const isActive = index === active;
            return (
              <li
                key={day.title}
                ref={register(index)}
                tabIndex={0}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className={cn(
                  "relative grid gap-2 border-l-2 py-6 pl-6 transition-colors duration-300 outline-none md:pl-8",
                  "focus-visible:ring-ring rounded-r-control focus-visible:ring-2",
                  isActive ? "border-link" : "border-black/10",
                )}
              >
                <p className="text-muted-foreground font-mono text-xs tracking-wide uppercase">
                  Day {index + 1} · {day.km} km · {formatHours(day.hours)}{" "}
                  driving
                </p>
                <h3
                  className={cn(
                    "text-xl font-bold tracking-[-0.01em] transition-colors duration-300",
                    !isActive && "text-foreground/70",
                  )}
                >
                  {day.title}
                </h3>
                <p className="text-muted-foreground max-w-[60ch] leading-relaxed">
                  {day.text}
                </p>
                <ul className="mt-1 flex flex-wrap gap-1.5">
                  {day.stops.map((stop) => (
                    <li
                      key={stop}
                      className={cn(
                        "rounded-inner px-2.5 py-1 text-xs font-semibold transition-colors duration-300",
                        isActive
                          ? "bg-primary-light text-link"
                          : "bg-sky text-muted-foreground",
                      )}
                    >
                      {stop}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>

        <div className="bg-sky rounded-panel flex flex-col gap-3 p-6">
          <h3 className="font-bold">Good to know</h3>
          <ul className="text-muted-foreground flex flex-col gap-2 text-[15px] leading-relaxed">
            {guide.goodToKnow.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
