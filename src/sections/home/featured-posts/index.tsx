"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Route, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { DEPOT, MAP_VIEWBOX, ROUTES } from "@/lib/iceland-map";
import type { ICategory } from "@/types";
import type { Post } from "@/types/content";

const tripHref = (post: Post) => `/book/vehicles?category=${post.category}`;
const daysLabel = (days: number) => `${days} ${days === 1 ? "day" : "days"}`;

/**
 * Road trip ideas. Opens with the map rather than a heading block: the routes are the point.
 * One route is always selected; hovering or focusing a row, card or route selects it.
 * `backdrop` is the static land, terrain and road layers, rendered on the server.
 */
export function FeaturedPosts({
  posts,
  categories,
  backdrop,
}: {
  posts: Post[];
  categories: ICategory[];
  backdrop: ReactNode;
}) {
  const [selected, setSelected] = useState(posts[0]?.id);
  const select = (id: string) => ({ onMouseEnter: () => setSelected(id), onFocus: () => setSelected(id) });

  return (
    <section
      id="road-trips"
      aria-labelledby="road-trips-title"
      className="flex scroll-mt-[var(--nav-height)] flex-col gap-8 py-16 md:gap-10 md:py-24"
    >
      <div className="rounded-panel grid overflow-hidden bg-[var(--map-paper)] lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)]">
        <div className="flex flex-col gap-4 p-6 md:p-10 lg:justify-center">
          <h2 id="road-trips-title" className="text-4xl font-bold tracking-[-0.02em] text-balance md:text-5xl">
            Where to drive first
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
            Six routes we send friends on, with how long to give them and what to drive. All of
            them start at our depot by Keflavík airport.
          </p>
          <ul className="mt-2 hidden flex-col gap-0.5 lg:flex">
            {posts.map((post) => {
              const isSelected = selected === post.id;
              return (
                <li key={post.id}>
                  <Link
                    href={tripHref(post)}
                    {...select(post.id)}
                    aria-current={isSelected || undefined}
                    className={cn(
                      "rounded-control flex items-center gap-3 px-2.5 py-2 text-[15px] transition-colors duration-200",
                      isSelected ? "bg-white/80" : "hover:bg-white/50",
                    )}
                  >
                    <span
                      className={cn(
                        "size-2 shrink-0 rounded-full transition-[background-color,box-shadow] duration-200",
                        isSelected ? "bg-link shadow-[0_0_0_4px_rgb(13_122_82/0.15)]" : "bg-[var(--map-sage)]",
                      )}
                    />
                    <span className={cn("font-semibold", !isSelected && "text-foreground/80")}>{post.title}</span>
                    <span className="text-muted-foreground ml-auto text-sm whitespace-nowrap">{daysLabel(post.days)}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <TripMap posts={posts} selected={selected} onSelect={setSelected} backdrop={backdrop} />
      </div>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.id} {...select(post.id)}>
            <TripCard
              post={post}
              selected={selected === post.id}
              category={categories.find((c) => c.id === post.category)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

function TripMap({
  posts,
  selected,
  onSelect,
  backdrop,
}: {
  posts: Post[];
  selected?: string;
  onSelect: (id: string) => void;
  backdrop: ReactNode;
}) {
  // The selected route is drawn last so it sits on top of the others
  const ordered = [...posts].sort((a, b) => Number(a.id === selected) - Number(b.id === selected));

  return (
    <div className="px-4 pb-6 md:px-8 lg:py-8">
      <svg viewBox={MAP_VIEWBOX} className="h-auto w-full" role="img" aria-labelledby="trip-map-title">
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
              href={tripHref(post)}
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

              {isSelected &&
                route.stops.map(([x, y]) =>
                  x === dx && y === dy ? null : (
                    <circle key={`${x},${y}`} cx={x} cy={y} r={3.6} fill="#fff" stroke="var(--link)" strokeWidth={1.8} />
                  ),
                )}

              {isSelected ? (
                <g transform={`translate(${dx} ${dy})`}>
                  <circle r={16} fill="var(--link)" opacity={0.12} className="map-halo" />
                  <circle r={7} fill="var(--link)" stroke="#fff" strokeWidth={2.5} />
                </g>
              ) : (
                <circle cx={dx} cy={dy} r={3.4} fill="var(--map-land)" stroke="var(--map-sage)" strokeWidth={1.6} />
              )}
            </a>
          );
        })}

        <g transform={`translate(${DEPOT[0]} ${DEPOT[1]})`}>
          <circle r={5} fill="var(--basalt)" stroke="#fff" strokeWidth={2} />
          <text x={-10} y={4} fontSize={14} fontWeight={600} fill="var(--muted-foreground)" textAnchor="end">
            Our depot
          </text>
        </g>
      </svg>
    </div>
  );
}

function TripCard({ post, selected, category }: { post: Post; selected: boolean; category?: ICategory }) {
  return (
    <Link
      href={tripHref(post)}
      className={cn(
        "group rounded-panel shadow-card hover:shadow-card-hover flex h-full flex-col overflow-hidden bg-white ring-1 transition-[box-shadow,transform] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1",
        selected ? "ring-link/30" : "ring-black/[0.04]",
      )}
    >
      <div className="bg-sky relative aspect-[3/2] overflow-hidden">
        <Image
          alt={post.featuredImage.alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          src={post.featuredImage.url}
          className="object-cover transition-transform duration-[1100ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
        />
        <span className="text-foreground rounded-control absolute top-3 left-3 flex items-center gap-1.5 bg-white/95 px-3 py-1 text-xs font-semibold shadow-sm">
          <CalendarDays size={13} className="text-link" />
          {daysLabel(post.days)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        <h3 className="text-xl font-bold tracking-[-0.01em]">{post.title}</h3>
        <p className="text-muted-foreground leading-snug text-pretty">{post.short_description}</p>
        <ul className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <li className="flex items-center gap-1.5">
            <Route size={14} /> {post.distance.toLocaleString("en")} km
          </li>
          <li className="flex items-center gap-1.5">
            <Sun size={14} /> {post.season}
          </li>
        </ul>
        {category && (
          <div className="mt-auto flex items-center justify-between gap-3 border-t pt-4">
            <span className="text-sm">
              <span className="text-muted-foreground">Best in </span>
              <strong>{category.name.toLowerCase()}</strong>
            </span>
            <span className="text-link flex shrink-0 items-center gap-1 text-sm font-semibold whitespace-nowrap">
              See vehicles
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
