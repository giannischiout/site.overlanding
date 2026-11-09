import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { paths } from "@/lib/paths";
import { pluralize } from "@/lib/text";
import type { Post } from "@/types/content";

type Props = { posts: Post[] };

/** The other routes as compact image rows */
export function OtherTrips({ posts }: Props) {
  return (
    <section
      aria-labelledby="other-trips-title"
      className="flex flex-col gap-6"
    >
      <h2
        id="other-trips-title"
        className="text-3xl font-bold tracking-[-0.02em]"
      >
        More road trips
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              href={paths.roadTrip(post.id)}
              className="group rounded-panel flex items-center gap-4 bg-white p-3 ring-1 ring-black/[0.06] transition-colors hover:bg-[var(--hover)]"
            >
              <span className="rounded-control bg-sky relative size-20 shrink-0 overflow-hidden">
                <Image
                  src={post.featuredImage.url}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
                />
              </span>
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="font-bold">{post.title}</span>
                <span className="text-muted-foreground text-sm">
                  {pluralize(post.days, "day")} ·{" "}
                  {post.distance.toLocaleString("en")} km
                </span>
              </span>
              <ArrowRight
                size={16}
                aria-hidden
                className="text-muted-foreground mr-2 ml-auto shrink-0 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
