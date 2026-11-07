import { cn } from "@/lib/utils";
import type { ActiveState } from "@/components/nav/types";
import type { Navigation } from "@/types/content";
import { OurCars } from "@/components/nav/desktop-menu/mega-menu/our-cars";
import { Roadtrips } from "@/components/nav/desktop-menu/mega-menu/roadtrips";

type Props = {
  active: ActiveState;
  data: Navigation;
  onNavigate: () => void;
};

export function MegaMenu({ active, data, onNavigate }: Props) {
  return (
    <div
      id="nav-menu-panel"
      className={cn(
        // Sits against the header, which is the positioned parent
        "absolute top-full left-0 w-full border-y border-border bg-white shadow-[0_16px_32px_rgb(0_0_0/0.08)]",
        "transition-[opacity,visibility] duration-150 ease-out",
        active ? "visible opacity-100" : "pointer-events-none invisible opacity-0",
      )}
    >
      <div className="page-container py-8">
        {active === "vehicles" && (
          <OurCars vehicles={data.vehicles} onNavigate={onNavigate} />
        )}
        {active === "roadtrips" && (
          <Roadtrips data={data.trip} onNavigate={onNavigate} />
        )}
      </div>
    </div>
  );
}
