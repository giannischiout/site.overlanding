import Image from "next/image";
import Link from "next/link";
import type { Navigation } from "@/types/content";

type Props = {
  data: Navigation["trip"];
  onNavigate?: () => void;
};

export function Roadtrips({ data, onNavigate }: Props) {
  return (
    <ul className="grid gap-6 lg:grid-cols-3">
      {data.posts.map((post) => (
        <li key={post.id}>
          <Link
            href="/#road-trips"
            onClick={onNavigate}
            className="group flex gap-4 rounded-lg lg:flex-col lg:gap-3"
          >
            <span className="relative aspect-[3/2] w-24 shrink-0 overflow-hidden rounded-md bg-hover lg:w-full">
              <Image
                src={post.featuredImage.url}
                alt=""
                fill
                sizes="(min-width: 1024px) 33vw, 96px"
                className="object-cover"
              />
            </span>
            <span className="flex flex-col gap-1">
              <span className="text-[15px] leading-snug font-medium group-hover:underline">
                {post.title}
              </span>
              <span className="text-muted-foreground text-sm">
                {post.read} minute read
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
