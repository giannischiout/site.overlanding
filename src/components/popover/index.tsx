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
        "absolute z-40 min-w-[320px] overflow-hidden rounded-xl bg-white p-2 shadow-[0_12px_40px_rgb(0_0_0/0.14)] select-none",
        alignRight ? "right-0" : "left-0",
        "transition-[opacity,visibility] duration-200 ease-out",
        // invisible also takes closed menus out of the keyboard tab order
        open ? "visible opacity-100" : "pointer-events-none invisible opacity-0",
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
