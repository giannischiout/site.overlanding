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
        "absolute top-full left-0 w-full border-y border-border bg-white shadow-[0_24px_48px_-24px_rgb(6_20_16/0.3)]",
        "transition-[opacity,visibility,transform] ease-[var(--ease-out-expo)]",
        active
          ? "visible translate-y-0 opacity-100 duration-400"
          : "pointer-events-none invisible -translate-y-1 opacity-0 duration-150",
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
