import { useEffect, useRef, useState, type PointerEvent } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useClickOutside } from "@/hooks/use-click-outside";
import { MegaMenu } from "@/components/nav/desktop-menu/mega-menu";
import type { ActiveState } from "@/components/nav/types";
import type { Navigation } from "@/types/content";

type Props = {
  data: Navigation;
};

const MENUS = [
  { id: "vehicles", label: "Vehicles" },
  { id: "roadtrips", label: "Road trips" },
] as const;

// Gives the pointer time to cross from the link down into the open panel
const CLOSE_DELAY = 150;

export function DesktopMenu({ data }: Props) {
  const [active, setActive] = useState<ActiveState>(null);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  const onClose = () => setActive(null);
  useClickOutside<HTMLDivElement>(onClose, navRef, !!active);

  const cancelClose = () => window.clearTimeout(closeTimer.current);
  const scheduleClose = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    cancelClose();
    closeTimer.current = window.setTimeout(onClose, CLOSE_DELAY);
  };

  useEffect(() => cancelClose, []);

  useEffect(() => {
    if (!active) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [active]);

  return (
    <nav
      ref={navRef}
      aria-label="Main"
      onPointerEnter={cancelClose}
      onPointerLeave={scheduleClose}
      className="hidden lg:block"
    >
      <ul className="flex items-center gap-1">
        {MENUS.map((menu) => {
          const isOpen = active === menu.id;
          return (
            <li key={menu.id}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls="nav-menu-panel"
                onPointerEnter={(event) => {
                  // Touch skips hover, so its tap below opens the menu once
                  if (event.pointerType === "mouse") setActive(menu.id);
                }}
                onClick={() =>
                  setActive((current) =>
                    current === menu.id ? null : menu.id,
                  )
                }
                className={cn(
                  "flex h-11 items-center gap-1 rounded-md px-3 text-[15px] font-medium transition-colors duration-150 ease-out hover:bg-hover",
                  isOpen && "bg-hover",
                )}
              >
                {menu.label}
                <ChevronDown
                  size={16}
                  className={cn(
                    "text-muted-foreground transition-transform duration-150 ease-out",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
            </li>
          );
        })}
      </ul>
      <MegaMenu active={active} data={data} onNavigate={onClose} />
    </nav>
  );
}
