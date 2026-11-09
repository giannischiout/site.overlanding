"use client";

import { useState, type ReactNode } from "react";
import type { ICategory } from "@/types";
import type { Post } from "@/types/content";
import { RouteList } from "@/sections/home/featured-posts/route-list";
import { TripCard } from "@/sections/home/featured-posts/trip-card";
import { TripMap } from "@/sections/home/featured-posts/trip-map";

type Props = {
  posts: Post[];
  categories: ICategory[];
  /** The static land, terrain and road layers, rendered on the server */
  backdrop: ReactNode;
  /** "h1" when this section is the whole page (the road trips index) */
  headingLevel?: "h1" | "h2";
};

/**
 * Road trip ideas. Opens with the map rather than a heading block: the routes are the point.
 * One route is always selected; hovering or focusing a row, card or route selects it.
 */
export function FeaturedPosts({ posts, categories, backdrop, headingLevel = "h2" }: Props) {
  const [selected, setSelected] = useState(posts[0]?.id);
  const Heading = headingLevel;

  return (
    <section
      id="road-trips"
      aria-labelledby="road-trips-title"
      className="flex scroll-mt-[var(--nav-height)] flex-col gap-8 py-16 md:gap-10 md:py-24"
    >
      <div className="rounded-panel grid overflow-hidden bg-[var(--map-paper)] lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)]">
        <div className="flex flex-col gap-4 p-6 md:p-10 lg:justify-center">
          <Heading
            id="road-trips-title"
            className="text-4xl font-bold tracking-[-0.02em] text-balance md:text-5xl"
          >
            Where to drive first
          </Heading>
          <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
            Six routes we send friends on, with how long to give them and what to drive. All of
            them start at our depot by Keflavík airport.
          </p>
          <RouteList posts={posts} selected={selected} onSelect={setSelected} />
        </div>

        <TripMap posts={posts} selected={selected} onSelect={setSelected} backdrop={backdrop} />
      </div>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li
            key={post.id}
            onMouseEnter={() => setSelected(post.id)}
            onFocus={() => setSelected(post.id)}
          >
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
