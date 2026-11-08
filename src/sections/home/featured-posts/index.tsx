"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Route, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { DEPOT, ICELAND_PATH, MAP_VIEWBOX, project } from "@/lib/iceland-map";
import type { ICategory } from "@/types";
import type { Post } from "@/types/content";

const tripHref = (post: Post) => `/book/vehicles?category=${post.category}`;
const daysLabel = (days: number) => `${days} ${days === 1 ? "day" : "days"}`;

/**
 * Road trip ideas. Opens with the map rather than a heading block: the routes are the point.
 * Hovering a card or a list row lights up its route, and hovering a route lights up its card.
 */
export function FeaturedPosts({ posts, categories }: { posts: Post[]; categories: ICategory[] }) {
  const [active, setActive] = useState<string | null>(null);
  const hover = (id: string) => ({
    onMouseEnter: () => setActive(id),
    onMouseLeave: () => setActive(null),
    onFocus: () => setActive(id),
    onBlur: () => setActive(null),
  });

  return (
    <section
      id="road-trips"
      aria-labelledby="road-trips-title"
      className="flex scroll-mt-[var(--nav-height)] flex-col gap-8 py-16 md:gap-10 md:py-24"
    >
      <div className="bg-sky rounded-panel grid overflow-hidden lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)]">
        <div className="flex flex-col gap-4 p-6 md:p-10 lg:justify-center">
          <h2 id="road-trips-title" className="text-4xl font-bold tracking-[-0.02em] text-balance md:text-5xl">
            Where to drive first
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
            Six routes we send friends on, with how long to give them and what to drive. All of
            them start at our depot by Keflavík airport.
          </p>
          <ol className="mt-2 hidden flex-col gap-1 lg:flex">
            {posts.map((post, index) => (
              <li key={post.id}>
                <Link
                  href={tripHref(post)}
                  {...hover(post.id)}
                  className={cn(
                    "rounded-control flex items-center gap-3 px-2 py-1.5 text-[15px] transition-colors",
                    active === post.id ? "bg-white" : "hover:bg-white/60",
                  )}
                >
                  <Marker number={index + 1} active={active === post.id} />
                  <span className="font-semibold">{post.title}</span>
                  <span className="text-muted-foreground ml-auto text-sm whitespace-nowrap">
                    {daysLabel(post.days)}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>

        <TripMap posts={posts} active={active} onActive={setActive} />
      </div>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <li key={post.id} {...hover(post.id)}>
            <TripCard
              post={post}
              number={index + 1}
              active={active === post.id}
              category={categories.find((c) => c.id === post.category)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

function Marker({ number, active }: { number: number; active: boolean }) {
  return (
    <span
      className={cn(
        "rounded-inner flex size-6 shrink-0 items-center justify-center text-xs font-bold transition-colors",
        active ? "bg-basalt text-aurora" : "bg-link text-white",
      )}
    >
      {number}
    </span>
  );
}

function TripMap({
  posts,
  active,
  onActive,
}: {
  posts: Post[];
  active: string | null;
  onActive: (id: string | null) => void;
}) {
  return (
    <div className="px-4 pb-6 md:px-8 lg:py-8">
      <svg viewBox={MAP_VIEWBOX} className="h-auto w-full" role="img" aria-labelledby="trip-map-title">
        <title id="trip-map-title">Map of Iceland with the six road trip routes</title>
        <path
          d={ICELAND_PATH}
          fill="#fff"
          stroke="color-mix(in oklab, var(--link) 35%, white)"
          strokeWidth={2.5}
          strokeLinejoin="round"
        />

        {posts.map((post, index) => {
          const points = post.route.map(project);
          const line = points.map((p) => p.join(",")).join(" ");
          // Number sits on the far half of the route, away from the crowded Reykjavík area
          const [mx, my] = points[Math.ceil((points.length - 1) * 0.66)];
          const isActive = active === post.id;
          const dimmed = active !== null && !isActive;
          const colour = isActive ? "var(--basalt)" : "var(--link)";
          return (
            <a
              key={post.id}
              href={tripHref(post)}
              aria-label={`${post.title}: see vehicles`}
              onMouseEnter={() => onActive(post.id)}
              onMouseLeave={() => onActive(null)}
              style={{ opacity: dimmed ? 0.22 : 1, transition: "opacity 250ms ease-out" }}
            >
              {/* A wide invisible stroke makes the thin route easy to hover */}
              <polyline points={line} fill="none" stroke="transparent" strokeWidth={28} />
              <polyline
                points={line}
                fill="none"
                stroke={colour}
                strokeWidth={isActive ? 7 : 5}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transition: "stroke 250ms ease-out, stroke-width 250ms ease-out" }}
              />
              <g transform={`translate(${mx} ${my})`}>
                <rect x={-17} y={-17} width={34} height={34} rx={8} fill={colour} stroke="#fff" strokeWidth={3} />
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={18}
                  fontWeight={700}
                  fill={isActive ? "var(--aurora)" : "#fff"}
                >
                  {index + 1}
                </text>
              </g>
            </a>
          );
        })}

        <g transform={`translate(${DEPOT[0]} ${DEPOT[1]})`}>
          <circle r={11} fill="var(--aurora)" stroke="var(--basalt)" strokeWidth={4} />
          <text y={38} fontSize={20} fontWeight={700} fill="var(--basalt)" textAnchor="middle">
            Our depot
          </text>
        </g>
      </svg>
    </div>
  );
}

function TripCard({
  post,
  number,
  active,
  category,
}: {
  post: Post;
  number: number;
  active: boolean;
  category?: ICategory;
}) {
  return (
    <Link
      href={tripHref(post)}
      className={cn(
        "group rounded-panel shadow-card hover:shadow-card-hover flex h-full flex-col overflow-hidden bg-white ring-1 transition-[box-shadow,transform] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1",
        active ? "ring-link/40" : "ring-black/[0.04]",
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
        <h3 className="flex items-start gap-2.5 text-xl font-bold tracking-[-0.01em]">
          <span className="mt-0.5">
            <Marker number={number} active={active} />
          </span>
          {post.title}
        </h3>
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
