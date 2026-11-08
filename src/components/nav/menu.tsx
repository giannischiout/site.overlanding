import type { Dispatch, RefObject, SetStateAction } from "react";
import type { ActiveState } from "@/components/nav/types";
import type { NavItem } from "@/routes";
import { cn } from "@/lib/utils";

type Props = {
  setActive: Dispatch<SetStateAction<ActiveState>>;
  onOpen: (id: string) => void;
  anchorRef: RefObject<any>;
  navData: NavItem[];
  className?: string;
  active: string | null;
};

export const pnpNavMenu = ({
  className,
  anchorRef,
  onOpen,
  navData,
  setActive,
  active,
}: Props) => {
  const onChange = (navItemID: string) => {
    onOpen(navItemID);
    setActive(navItemID);
  };

  return (
    <ul
      ref={anchorRef}
      className="flex flex-1 items-center justify-center gap-2"
    >
      {navData.map((item) => {
        return (
          <li
            onClick={() => onChange(item.id)}
            key={item.id}
            className={cn(
              "transition-color flex cursor-pointer rounded-full bg-white px-4 py-1 text-[1.1rem] text-nowrap text-gray-500 duration-500 ease-in-out",
              active === item.id
                ? "bg-primary text-primary-foreground transition"
                : "hover:bg-primary/10",
              className,
            )}
          >
            {item.label}
          </li>
        );
      })}
    </ul>
  );
};
