// Builds src/lib/iceland-map.ts: coastline, glaciers, contours, lakes, roads and the road trip
// routes, all projected into one SVG coordinate space.
//
// Data (public domain, Natural Earth), downloaded into one folder:
//   https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-10m.json
//   https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/geojson/ne_10m_glaciated_areas.geojson
//   https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/geojson/ne_10m_roads.geojson
//
// Run: node scripts/build-iceland-map.mjs <data folder>
// Re-run after changing the route waypoints in src/data/posts.json.

import { readFileSync, writeFileSync } from "node:fs";

const dataDir = process.argv[2];
if (!dataDir) throw new Error("Usage: node scripts/build-iceland-map.mjs <data folder>");
const read = (name) => JSON.parse(readFileSync(`${dataDir}/${name}`, "utf8"));

// ---------- projection (equirectangular, scaled for 65°N) ----------
const LON0 = -24.7, LAT0 = 66.62, K = Math.cos((65 * Math.PI) / 180), S = 210;
const project = ([lon, lat]) => [(lon - LON0) * K * S, (LAT0 - lat) * S];
const UNITS_PER_KM = S / 111;
const inIceland = ([lon, lat]) => lon > -25 && lon < -13 && lat > 63.2 && lat < 66.7;

// ---------- geometry helpers ----------
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const r1 = (n) => Math.round(n * 10) / 10;
const pt = ([x, y]) => `${r1(x)} ${r1(y)}`;

function simplify(points, tol) {
  if (points.length < 3) return points;
  const a = points[0], b = points[points.length - 1];
  let max = 0, idx = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i];
    const dx = b[0] - a[0], dy = b[1] - a[1];
    const len = Math.hypot(dx, dy) || 1;
    const d = Math.abs(dy * px - dx * py + b[0] * a[1] - b[1] * a[0]) / len;
    if (d > max) { max = d; idx = i; }
  }
  if (max <= tol) return [a, b];
  return [...simplify(points.slice(0, idx + 1), tol).slice(0, -1), ...simplify(points.slice(idx), tol)];
}
const simplifyRing = (ring, tol) => {
  const m = ring.length >> 1;
  return [...simplify(ring.slice(0, m + 1), tol).slice(0, -1), ...simplify(ring.slice(m), tol)];
};

/** Catmull-Rom through the points, written as cubic Béziers: smooth, and it passes every point */
function smoothPath(points, closed = false, tension = 0.5) {
  const n = points.length;
  if (n < 2) return "";
  const at = (i) => (closed ? points[(i + n) % n] : points[Math.max(0, Math.min(n - 1, i))]);
  let d = `M${pt(points[0])}`;
  const segments = closed ? n : n - 1;
  for (let i = 0; i < segments; i++) {
    const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
    const c1 = [p1[0] + ((p2[0] - p0[0]) * tension) / 3, p1[1] + ((p2[1] - p0[1]) * tension) / 3];
    const c2 = [p2[0] - ((p3[0] - p1[0]) * tension) / 3, p2[1] - ((p3[1] - p1[1]) * tension) / 3];
    d += `C${pt(c1)} ${pt(c2)} ${pt(p2)}`;
  }
  return closed ? d + "Z" : d;
}

const centroid = (ring) => ring.reduce((c, p) => [c[0] + p[0] / ring.length, c[1] + p[1] / ring.length], [0, 0]);
const area = (r) => Math.abs(r.reduce((s, [x, y], i) => s + x * r[(i + 1) % r.length][1] - r[(i + 1) % r.length][0] * y, 0) / 2);

// ---------- coastline ----------
const topo = read("countries-10m.json");
const { scale, translate } = topo.transform;
const arcs = topo.arcs.map((arc) => {
  let x = 0, y = 0;
  return arc.map(([dx, dy]) => { x += dx; y += dy; return [x * scale[0] + translate[0], y * scale[1] + translate[1]]; });
});
const arc = (i) => (i >= 0 ? arcs[i] : arcs[~i].slice().reverse());
const iceland = topo.objects.countries.geometries.find((g) => g.id === "352");
const polygons = iceland.type === "Polygon" ? [iceland.arcs] : iceland.arcs;
const coast = polygons
  .map((poly) => poly[0].flatMap((i, n) => (n ? arc(i).slice(1) : arc(i))).map(project))
  .filter((r) => area(r) > 40)
  .map((r) => simplifyRing(r, 1.5));
const coastPath = coast.map((r) => "M" + r.map(pt).join("L") + "Z").join("");

// ---------- glaciers and the contour rings around them ----------
const glacierRings = read("ne_10m_glaciated_areas.geojson")
  .features.filter((f) => f.geometry.coordinates[0].some(inIceland))
  .map((f) => simplifyRing(f.geometry.coordinates[0].map(project), 2));
const glaciersPath = glacierRings.map((r) => smoothPath(r, true)).join("");

// Decorative highland contours: the larger ice caps, grown outward twice
const contoursPath = glacierRings
  .filter((r) => area(r) > 120)
  .flatMap((ring) => {
    const c = centroid(ring);
    const grow = (k) => ring.map(([x, y]) => [c[0] + (x - c[0]) * k, c[1] + (y - c[1]) * k]);
    return [grow(1.45), grow(1.95)].map((r) => smoothPath(simplifyRing(r, 6), true));
  })
  .join("");

// ---------- lakes (not in Natural Earth at this scale, so sketched from known positions) ----------
const LAKES = [
  { at: [-21.14, 64.18], rx: 7, ry: 4.2, rot: 35 }, // Þingvallavatn
  { at: [-18.92, 64.25], rx: 6, ry: 3.6, rot: -20 }, // Þórisvatn
  { at: [-17.0, 65.6], rx: 4.2, ry: 3.2, rot: 10 }, // Mývatn
];
const lakesPath = LAKES.map(({ at, rx, ry, rot }) => {
  const [cx, cy] = project(at);
  const a = (rot * Math.PI) / 180;
  const ring = Array.from({ length: 10 }, (_, i) => {
    const t = (i / 10) * Math.PI * 2;
    const wobble = 1 + 0.12 * Math.sin(t * 3 + rot);
    const x = Math.cos(t) * rx * wobble * UNITS_PER_KM, y = Math.sin(t) * ry * wobble * UNITS_PER_KM;
    return [cx + x * Math.cos(a) - y * Math.sin(a), cy + x * Math.sin(a) + y * Math.cos(a)];
  });
  return smoothPath(ring, true);
}).join("");

// ---------- roads ----------
const roadFeatures = read("ne_10m_roads.geojson").features.filter(
  (f) => f.properties.type !== "Ferry Route" && f.geometry.type === "LineString" && f.geometry.coordinates.some(inIceland),
);
const roadLines = roadFeatures.map((f) => ({
  ring: f.properties.label === "1",
  points: f.geometry.coordinates.map(project),
}));
const linePath = (lines) => lines.map((l) => "M" + simplify(l, 1.6).map(pt).join("L")).join("");
const ringRoadPath = linePath(roadLines.filter((l) => l.ring).map((l) => l.points));
const roadsPath = linePath(roadLines.filter((l) => !l.ring).map((l) => l.points));

// ---------- routing over the road network ----------
const key = ([x, y]) => `${Math.round(x * 2)},${Math.round(y * 2)}`;
const nodes = new Map(); // key -> { p, edges: Map<key, weight> }
const node = (p) => {
  const k = key(p);
  if (!nodes.has(k)) nodes.set(k, { p, edges: new Map() });
  return k;
};
const link = (a, b) => {
  const w = dist(nodes.get(a).p, nodes.get(b).p);
  nodes.get(a).edges.set(b, w);
  nodes.get(b).edges.set(a, w);
};
for (const { points } of roadLines) {
  for (let i = 1; i < points.length; i++) link(node(points[i - 1]), node(points[i]));
}
// Natural Earth lines do not always share a vertex at junctions: join ends that nearly touch
const ends = roadLines.flatMap(({ points }) => [points[0], points[points.length - 1]]).map(key);
for (const e of ends) {
  for (const [k, n] of nodes) {
    if (k !== e && !nodes.get(e).edges.has(k) && dist(nodes.get(e).p, n.p) < 6) link(e, k);
  }
}

const nearest = (p) => {
  let best = null, bestD = Infinity;
  for (const [k, n] of nodes) { const d = dist(p, n.p); if (d < bestD) { bestD = d; best = k; } }
  return { key: best, d: bestD };
};

function shortestPath(from, to) {
  const distTo = new Map([[from, 0]]), prev = new Map(), done = new Set();
  const queue = [[0, from]];
  while (queue.length) {
    queue.sort((a, b) => a[0] - b[0]);
    const [d, k] = queue.shift();
    if (done.has(k)) continue;
    if (k === to) break;
    done.add(k);
    for (const [next, w] of nodes.get(k).edges) {
      const nd = d + w;
      if (nd < (distTo.get(next) ?? Infinity)) { distTo.set(next, nd); prev.set(next, k); queue.push([nd, next]); }
    }
  }
  if (!distTo.has(to)) return null;
  const path = [to];
  while (path[0] !== from) path.unshift(prev.get(path[0]));
  return path.map((k) => nodes.get(k).p);
}

/** Follows roads between waypoints; where there is no mapped road (F-roads, cliffs) it goes direct */
function routeGeometry(waypoints) {
  const pts = waypoints.map(project);
  const out = [pts[0]];
  const SNAP = 22; // about 12 km
  for (let i = 1; i < pts.length; i++) {
    const a = nearest(pts[i - 1]), b = nearest(pts[i]);
    const road = a.d < SNAP && b.d < SNAP && a.key !== b.key ? shortestPath(a.key, b.key) : null;
    if (road && road.length > 1) out.push(...road);
    out.push(pts[i]);
  }
  // Drop near-duplicate points, then thin before smoothing so curves stay gentle
  const clean = out.filter((p, i) => i === 0 || dist(p, out[i - 1]) > 1.5);
  return simplify(clean, 2.2);
}

/** Reports places where a route doubles back on itself, which draw as spikes */
function findSpikes(points) {
  const spikes = [];
  for (let i = 1; i < points.length - 1; i++) {
    const a = points[i - 1], b = points[i], c = points[i + 1];
    const v1 = [b[0] - a[0], b[1] - a[1]], v2 = [c[0] - b[0], c[1] - b[1]];
    const cos = (v1[0] * v2[0] + v1[1] * v2[1]) / ((Math.hypot(...v1) || 1) * (Math.hypot(...v2) || 1));
    if (cos < -0.85 && Math.min(Math.hypot(...v1), Math.hypot(...v2)) > 12) spikes.push(b.map(Math.round));
  }
  return spikes;
}

const DEPOT_LONLAT = [-22.605, 63.985];
const posts = JSON.parse(readFileSync("src/data/posts.json", "utf8"));
const reykjavik = project([-21.94, 64.146]);
const routes = Object.fromEntries(
  posts.map((post) => {
    // Every trip starts at the depot by the airport
    const geometry = routeGeometry([DEPOT_LONLAT, ...post.route]);
    const spikes = findSpikes(geometry);
    if (spikes.length) console.warn(`  ${post.id}: route doubles back at ${JSON.stringify(spikes)}`);
    const stops = post.route.map(project).filter((p) => dist(p, reykjavik) > 12);
    const destination = stops.reduce((far, p) => (dist(p, reykjavik) > dist(far, reykjavik) ? p : far), stops[0]);
    return [post.id, { d: smoothPath(geometry), stops: stops.map((p) => p.map(r1)), destination: destination.map(r1) }];
  }),
);

// ---------- output ----------
const xs = coast.flat().map((p) => p[0]), ys = coast.flat().map((p) => p[1]);
const pad = 24;
const viewBox = [Math.floor(Math.min(...xs) - pad), Math.floor(Math.min(...ys) - pad), Math.ceil(Math.max(...xs) - Math.min(...xs) + pad * 2), Math.ceil(Math.max(...ys) - Math.min(...ys) + pad * 2)];

const ts = `// Generated by scripts/build-iceland-map.mjs from Natural Earth data. Do not edit by hand.

export function project([lon, lat]: [number, number]): [number, number] {
  return [(lon - ${LON0}) * ${K} * ${S}, (${LAT0} - lat) * ${S}];
}

export type MapRoute = { d: string; stops: [number, number][]; destination: [number, number] };

export const MAP_VIEWBOX = "${viewBox.join(" ")}";
/** Our depot at Keflavík airport, where every route starts */
export const DEPOT: [number, number] = [${project([-22.605, 63.985]).map(r1).join(", ")}];

export const COAST = "${coastPath}";
export const GLACIERS = "${glaciersPath}";
export const CONTOURS = "${contoursPath}";
export const LAKES = "${lakesPath}";
export const RING_ROAD = "${ringRoadPath}";
export const ROADS = "${roadsPath}";

export const ROUTES: Record<string, MapRoute> = ${JSON.stringify(routes)};
`;
writeFileSync("src/lib/iceland-map.ts", ts);
console.log(`viewBox ${viewBox.join(" ")}, ${glacierRings.length} glaciers, ${roadLines.length} roads, ${nodes.size} road nodes, ${(ts.length / 1024).toFixed(1)} KB`);
