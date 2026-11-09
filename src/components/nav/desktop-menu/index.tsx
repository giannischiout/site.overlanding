import { useEffect, useRef, type PointerEvent } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useClickOutside } from "@/hooks/use-click-outside";
import { MegaMenu } from "@/components/nav/desktop-menu/mega-menu";
import type { MenuId, Navigation } from "@/types/content";

const MENU_IDS = ["vehicles", "roadTrips"] as const satisfies readonly MenuId[];

// Gives the pointer time to cross from the link down into the open panel
const CLOSE_DELAY = 150;

type Props = {
  menus: Navigation["menus"];
  active: MenuId | null;
  onActiveChange: (id: MenuId | null) => void;
};

export function DesktopMenu({ menus, active, onActiveChange }: Props) {
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  const onClose = () => onActiveChange(null);
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
      if (event.key === "Escape") onActiveChange(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [active, onActiveChange]);

  return (
    <nav
      ref={navRef}
      aria-label="Main"
      onPointerEnter={cancelClose}
      onPointerLeave={scheduleClose}
      className="hidden self-stretch lg:flex"
    >
      <ul className="flex items-stretch gap-1">
        {MENU_IDS.map((id) => {
          const isOpen = active === id;
          return (
            <li key={id} className="flex">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls="nav-menu-panel"
                onPointerEnter={(event) => {
                  // Touch skips hover, so its tap below opens the menu once
                  if (event.pointerType === "mouse") onActiveChange(id);
                }}
                onClick={() => onActiveChange(isOpen ? null : id)}
                className={cn(
                  "relative flex items-center gap-1.5 px-4 text-[15px] font-semibold transition-colors duration-200",
                  active ? "text-white/70 hover:text-white" : "text-foreground/75 hover:text-foreground",
                  isOpen && "text-white",
                )}
              >
                {menus[id].label}
                <ChevronDown
                  size={15}
                  strokeWidth={2.25}
                  className={cn(
                    "transition-transform duration-300 ease-[var(--ease-out-expo)]",
                    isOpen && "text-aurora rotate-180",
                  )}
                />
                {/* Aurora rule on the open menu, sitting on the header's bottom edge */}
                <span
                  aria-hidden
                  className={cn(
                    "bg-aurora absolute inset-x-4 bottom-0 h-0.5 origin-left transition-transform duration-300 ease-[var(--ease-out-expo)]",
                    isOpen ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </button>
            </li>
          );
        })}
      </ul>
      <MegaMenu active={active} menus={menus} onNavigate={onClose} />
    </nav>
  );
}
