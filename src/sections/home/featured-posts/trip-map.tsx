import type { ReactNode } from "react";
import { DEPOT, MAP_VIEWBOX, ROUTES } from "@/lib/iceland-map";
import { paths } from "@/lib/paths";
import type { Post } from "@/types/content";

type Props = {
  posts: Post[];
  selected?: string;
  onSelect: (id: string) => void;
  /** The static land, terrain and road layers, rendered on the server */
  backdrop: ReactNode;
};

export function TripMap({ posts, selected, onSelect, backdrop }: Props) {
  // The selected route is drawn last so it sits on top of the others
  const ordered = [...posts].sort(
    (a, b) => Number(a.id === selected) - Number(b.id === selected),
  );

  return (
    <div className="px-4 pb-6 md:px-8 lg:py-8">
      <svg
        viewBox={MAP_VIEWBOX}
        className="h-auto w-full"
        role="img"
        aria-labelledby="trip-map-title"
      >
        <title id="trip-map-title">Map of Iceland with the six road trip routes</title>
        {backdrop}

        {ordered.map((post) => {
          const route = ROUTES[post.id];
          if (!route) return null;
          const isSelected = post.id === selected;
          const [dx, dy] = route.destination;
          return (
            <a
              key={post.id}
              href={paths.vehicles(post.category)}
              aria-label={`${post.title}: see vehicles`}
              onMouseEnter={() => onSelect(post.id)}
              onFocus={() => onSelect(post.id)}
            >
              {/* A wide invisible stroke makes the thin route easy to hover */}
              <path d={route.d} fill="none" stroke="transparent" strokeWidth={22} />
              <path
                d={route.d}
                fill="none"
                stroke={isSelected ? "var(--link)" : "var(--map-sage)"}
                strokeOpacity={isSelected ? 1 : 0.75}
                strokeWidth={isSelected ? 3.6 : 2}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transition: "stroke 300ms ease-out, stroke-width 300ms ease-out" }}
              />

              {/* Round trips pass some stops twice; draw each one once */}
              {isSelected &&
                route.stops.map(([x, y], index, stops) =>
                  (x === dx && y === dy) ||
                  stops.findIndex(([sx, sy]) => sx === x && sy === y) !== index ? null : (
                    <circle
                      key={`${x},${y}`}
                      cx={x}
                      cy={y}
                      r={3.6}
                      fill="white"
                      stroke="var(--link)"
                      strokeWidth={1.8}
                    />
                  ),
                )}

              {isSelected ? (
                <g transform={`translate(${dx} ${dy})`}>
                  <circle r={16} fill="var(--link)" opacity={0.12} className="map-halo" />
                  <circle r={7} fill="var(--link)" stroke="white" strokeWidth={2.5} />
                </g>
              ) : (
                <circle
                  cx={dx}
                  cy={dy}
                  r={3.4}
                  fill="var(--map-land)"
                  stroke="var(--map-sage)"
                  strokeWidth={1.6}
                />
              )}
            </a>
          );
        })}

        <g transform={`translate(${DEPOT[0]} ${DEPOT[1]})`}>
          <circle r={5} fill="var(--basalt)" stroke="white" strokeWidth={2} />
          <text
            x={-10}
            y={4}
            fontSize={14}
            fontWeight={600}
            fill="var(--muted-foreground)"
            textAnchor="end"
          >
            Our depot
          </text>
        </g>
      </svg>
    </div>
  );
}
