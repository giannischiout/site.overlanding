import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  onToggle: () => void;
  open: boolean;
};

export function Hamburger({ onToggle, open }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls="mobile-menu"
      aria-label={open ? "Close menu" : "Open menu"}
      className={cn(
        "rounded-control -mr-2 ml-auto flex size-11 items-center justify-center transition-colors lg:hidden",
        open ? "text-white hover:bg-white/10" : "hover:bg-black/5",
      )}
    >
      {open ? <X size={24} /> : <Menu size={24} />}
    </button>
  );
}
