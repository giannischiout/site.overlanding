import { DEPOT, type MapRoute } from "@/lib/iceland-map";

/**
 * A viewBox framing one route (its stops plus our depot) with padding,
 * widened or heightened to the given aspect so the map never looks squeezed.
 */
export function routeViewBox(route: MapRoute, { padding = 60, aspect = 4 / 3 } = {}) {
  const points = [DEPOT, ...route.stops];
  const xs = points.map(([x]) => x);
  const ys = points.map(([, y]) => y);
  let minX = Math.min(...xs) - padding;
  let minY = Math.min(...ys) - padding;
  let width = Math.max(...xs) + padding - minX;
  let height = Math.max(...ys) + padding - minY;

  if (width / height < aspect) {
    const grow = height * aspect - width;
    minX -= grow / 2;
    width += grow;
  } else {
    const grow = width / aspect - height;
    minY -= grow / 2;
    height += grow;
  }

  return { minX, minY, width, height, viewBox: `${minX} ${minY} ${width} ${height}` };
}
