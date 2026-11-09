import { MapBackdrop } from "@/components/iceland-map/map-backdrop";
import type { TripGuide } from "@/data/trip-guides";
import type { MapRoute } from "@/lib/iceland-map";
import type { CategoryWithStats, Post, Vehicle } from "@/types/content";
import { Itinerary } from "./itinerary";
import { OtherTrips } from "./other-trips";
import { TripHeader } from "./trip-header";
import { TripVehicles } from "./trip-vehicles";

type Props = {
  post: Post;
  route: MapRoute;
  guide: TripGuide;
  category?: CategoryWithStats;
  vehicles: Vehicle[];
  others: Post[];
};

export function RoadTripView({
  post,
  route,
  guide,
  category,
  vehicles,
  others,
}: Props) {
  return (
    <div className="page-container flex flex-col gap-20 pt-8 pb-24 md:gap-28 md:pt-12">
      <TripHeader post={post} category={category} />
      <Itinerary
        title={post.title}
        route={route}
        guide={guide}
        backdrop={<MapBackdrop />}
      />
      {category && vehicles.length > 0 && (
        <TripVehicles
          category={category}
          vehicles={vehicles}
          days={post.days}
        />
      )}
      <OtherTrips posts={others} />
    </div>
  );
}
