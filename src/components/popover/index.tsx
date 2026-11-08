import { useLayoutEffect, useState } from "react";
import type { ReactNode, RefObject } from "react";
import { cn } from "@/lib/utils";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { useClickOutside } from "@/hooks/use-click-outside";

const MENU_GAP = 8;
const NAV_CLEARANCE = 80;

type Props = {
  flip?: boolean;
  children: ReactNode;
  onClose: () => void;
  open: boolean;
  anchorRef: RefObject<HTMLDivElement | null>;
  maxMenuHeight?: number;
  className?: string;
  alignRight?: boolean;
  top?: string;
};

export function Popover({
  children,
  onClose,
  open,
  anchorRef,
  maxMenuHeight,
  alignRight = false,
  top = "120%",
  flip = true,
  className,
}: Props) {
  const ref = useClickOutside<HTMLDivElement>(onClose, anchorRef, open);
  const [above, setAbove] = useState(false);

  // Open upward when the menu would run off the bottom of the screen and fits above
  useLayoutEffect(() => {
    if (!open || !flip || !anchorRef.current || !ref.current) return;
    const anchor = anchorRef.current.getBoundingClientRect();
    const height = ref.current.offsetHeight + MENU_GAP;
    setAbove(
      anchor.bottom + height > window.innerHeight &&
        anchor.top - height > NAV_CLEARANCE,
    );
  }, [open, flip, anchorRef, ref]);

  return (
    <div
      onDragStart={(e) => e.preventDefault()}
      aria-hidden={!open}
      ref={ref}
      style={above ? { bottom: `calc(100% + ${MENU_GAP}px)` } : { top }}
      className={cn(
        "absolute z-40 min-w-[320px] overflow-hidden rounded-2xl bg-white p-2 shadow-[0_18px_48px_-12px_rgb(6_20_16/0.28)] ring-1 ring-black/5 select-none",
        alignRight ? "right-0 origin-top-right" : "left-0 origin-top-left",
        above && "origin-bottom",
        // Opens with a short settle: rises, sharpens and scales in on an expo ease
        "transition-[opacity,visibility,transform,filter] ease-[var(--ease-out-expo)]",
        // invisible also takes closed menus out of the keyboard tab order
        open
          ? "visible translate-y-0 scale-100 opacity-100 blur-0 duration-500"
          : "pointer-events-none invisible -translate-y-1.5 scale-[0.985] opacity-0 blur-[2px] duration-200",
        className,
      )}
    >
      <SimpleBar
        style={{
          maxHeight: maxMenuHeight,
        }}
        autoHide
      >
        <div className="flex flex-col">{children}</div>
      </SimpleBar>
    </div>
  );
}
