import { COAST, CONTOURS, GLACIERS, LAKES, RING_ROAD, ROADS } from "@/lib/iceland-map";

/**
 * The static layers of the road trip map: land, terrain and roads. A server component, so
 * the ~40 KB of path data is sent as HTML once and never ships in the JavaScript bundle.
 */
export function MapBackdrop() {
  return (
    <g aria-hidden>
      <defs>
        <clipPath id="iceland-land">
          <path d={COAST} />
        </clipPath>
      </defs>

      <path d={COAST} fill="var(--map-land)" />

      <g clipPath="url(#iceland-land)">
        <path d={CONTOURS} fill="none" stroke="var(--map-sage)" strokeOpacity={0.28} strokeWidth={0.8} />
        <path d={GLACIERS} fill="var(--map-ice)" stroke="var(--map-sage)" strokeOpacity={0.35} strokeWidth={0.6} />
        <path d={LAKES} fill="var(--map-water)" />
        <path d={ROADS} fill="none" stroke="var(--map-road)" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
        <path d={RING_ROAD} fill="none" stroke="var(--map-road)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <path d={COAST} fill="none" stroke="var(--map-sage)" strokeWidth={1} strokeLinejoin="round" />
    </g>
  );
}
