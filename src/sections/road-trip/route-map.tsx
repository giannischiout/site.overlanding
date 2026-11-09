import type { ReactNode } from "react";
import { DEPOT, type MapRoute } from "@/lib/iceland-map";
import { routeViewBox } from "@/lib/map-view";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  route: MapRoute;
  /** Names of route.stops, in the same order */
  stopNames: string[];
  /** Stops of the day in focus; they get a label and a filled marker */
  activeStops: string[];
  /** The static land, terrain and road layers, rendered on the server */
  backdrop: ReactNode;
};

/** One road trip on the terrain map, framed to its route. The route draws itself in once. */
export function RouteMap({
  title,
  route,
  stopNames,
  activeStops,
  backdrop,
}: Props) {
  const view = routeViewBox(route, { aspect: 3 / 2 });
  // Markers and labels are sized as a share of the frame, so every route reads the same;
  // line widths use non-scaling strokes, so they stay crisp at any size
  const unit = view.width / 100;

  return (
    <svg
      viewBox={view.viewBox}
      className="h-auto w-full"
      role="img"
      aria-labelledby="route-map-title"
    >
      <title id="route-map-title">{`Map of the ${title} route`}</title>
      {backdrop}

      <path
        d={route.d}
        pathLength={1}
        fill="none"
        stroke="var(--link)"
        // Scales with the frame: a non-scaling stroke would break the pathLength dash draw-in
        strokeWidth={0.6 * unit}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="route-draw"
      />

      {route.stops.map(([x, y], index) => {
        const name = stopNames[index] ?? "";
        // A round trip passes its first stop twice; draw it once
        if (stopNames.indexOf(name) !== index) return null;
        const active = activeStops.includes(name);
        return (
          <g key={`${x},${y}`} transform={`translate(${x} ${y})`}>
            <circle
              r={(active ? 1.1 : 0.75) * unit}
              fill={active ? "var(--link)" : "white"}
              stroke={active ? "white" : "var(--link)"}
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
              className="transition-[r] duration-300"
            />
            <text
              x={1.8 * unit}
              y={0.8 * unit}
              fontSize={2.4 * unit}
              fontWeight={600}
              fill="var(--foreground)"
              stroke="var(--map-land)"
              strokeWidth={0.6 * unit}
              paintOrder="stroke"
              className={cn(
                "transition-opacity duration-300 motion-reduce:transition-none",
                active ? "opacity-100" : "opacity-0",
              )}
            >
              {name}
            </text>
          </g>
        );
      })}

      <g transform={`translate(${DEPOT[0]} ${DEPOT[1]})`}>
        <circle
          r={unit}
          fill="var(--basalt)"
          stroke="white"
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        <text
          x={-1.8 * unit}
          y={0.8 * unit}
          fontSize={2.2 * unit}
          fontWeight={600}
          fill="var(--muted-foreground)"
          textAnchor="end"
        >
          Our depot
        </text>
      </g>
    </svg>
  );
}
