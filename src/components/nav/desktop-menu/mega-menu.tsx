import { cn } from "@/lib/utils";
import { paths } from "@/lib/paths";
import type { MenuId, Navigation } from "@/types/content";
import { categoryItem, RENTAL_FACTS, roadTripItem } from "@/components/nav/menu-items";
import { FeaturedVehicles } from "@/components/nav/desktop-menu/featured-vehicles";
import { PreviewPanel } from "@/components/nav/desktop-menu/preview-panel";

type Props = {
  active: MenuId | null;
  menus: Navigation["menus"];
  onNavigate: () => void;
};

/** The dark sheet under the header. With the header gone basalt too, the two read as one. */
export function MegaMenu({ active, menus, onNavigate }: Props) {
  const { vehicles, roadTrips } = menus;
  const fleetSize = vehicles.categories.reduce((sum, category) => sum + category.count, 0);

  return (
    <>
      {/* Dims the page so the open menu is the only thing in focus */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none fixed inset-x-0 top-[var(--nav-height)] bottom-0 bg-[var(--backdrop)] transition-opacity duration-300 ease-out",
          active ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        id="nav-menu-panel"
        className={cn(
          // Sits against the header, which is the positioned parent
          "bg-basalt absolute top-full left-0 w-full text-white shadow-[0_32px_64px_-32px_rgb(0_0_0/0.6)]",
          "transition-[opacity,visibility,transform] ease-[var(--ease-out-expo)]",
          active
            ? "visible translate-y-0 opacity-100 duration-400"
            : "pointer-events-none invisible -translate-y-1 opacity-0 duration-150",
        )}
      >
        <div className="wide-container px-3 md:px-6">
          {active === "vehicles" && (
            <PreviewPanel
              heading="Vehicle types"
              items={vehicles.categories.map(categoryItem)}
              aside={
                <FeaturedVehicles vehicles={vehicles.featuredVehicles} onNavigate={onNavigate} />
              }
              facts={RENTAL_FACTS}
              footerLink={{ label: `See all ${fleetSize} vehicles`, href: paths.vehicles() }}
              onNavigate={onNavigate}
            />
          )}
          {active === "roadTrips" && (
            <PreviewPanel
              heading="Routes from our depot"
              items={roadTrips.posts.map(roadTripItem)}
              facts={["Every route starts at Keflavík airport", "Pick a vehicle type per route"]}
              footerLink={{ label: "All routes on the map", href: "/#road-trips" }}
              onNavigate={onNavigate}
            />
          )}
        </div>
      </div>
    </>
  );
}
