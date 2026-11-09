import type { Metadata } from "next";
import { MapBackdrop } from "@/components/iceland-map/map-backdrop";
import { getFilters, getPosts } from "@/data";
import { FeaturedPosts } from "@/sections/home/featured-posts";

export const metadata: Metadata = {
  title: "Road trips · Aurora Campers",
  description:
    "Six Icelandic road trips from our Keflavík depot, with day-by-day plans and what to drive.",
};

export default function Page() {
  const { categories } = getFilters();
  return (
    <div className="page-container pt-8 md:pt-12">
      <FeaturedPosts
        posts={getPosts()}
        categories={categories}
        backdrop={<MapBackdrop />}
        headingLevel="h1"
      />
    </div>
  );
}
