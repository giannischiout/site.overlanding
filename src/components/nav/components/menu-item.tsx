import type { Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  label: string;
  active: string | null;
  setActive: Dispatch<SetStateAction<string | null>>;
  onOpen: (id: string) => void;
  href?: string;
};

export const MenuItem = ({
  id,
  label,
  active,
  setActive,
  onOpen,
  href,
}: Props) => {
  const handleClick = () => {
    onOpen(id);
    setActive(id);
    if (href) {
      window.location.href = href; // or router.push(href) if using Next.js
    }
  };

  return (
    <li
      onClick={handleClick}
      className={cn(
        "transition-color flex cursor-pointer rounded-full bg-white px-4 py-1 text-[1.1rem] text-nowrap text-gray-500 duration-500 ease-in-out",
        active === id
          ? "bg-primary text-primary-foreground transition"
          : "hover:bg-primary/10",
      )}
    >
      {label}
    </li>
  );
};
