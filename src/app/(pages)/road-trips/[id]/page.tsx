import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategory, getPost, getPosts, getVehicles } from "@/data";
import { TRIP_GUIDES } from "@/data/trip-guides";
import { ROUTES } from "@/lib/iceland-map";
import { RoadTripView } from "@/sections/road-trip";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return getPosts().map((post) => ({ id: post.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).id);
  return {
    title: post
      ? `${post.title} road trip · Aurora Campers`
      : "Road trip not found · Aurora Campers",
    description: post?.short_description,
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const post = getPost(id);
  const route = ROUTES[id];
  const guide = TRIP_GUIDES[id];
  if (!post || !route || !guide) notFound();

  const vehicles = getVehicles()
    .filter((vehicle) => vehicle.category.id === post.category)
    .slice(0, 3);
  const others = getPosts().filter((other) => other.id !== post.id);

  return (
    <RoadTripView
      post={post}
      route={route}
      guide={guide}
      category={getCategory(post.category)}
      vehicles={vehicles}
      others={others}
    />
  );
}
