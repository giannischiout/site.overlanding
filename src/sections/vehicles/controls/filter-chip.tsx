import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
};

export function FilterChip({ active, onClick, children }: Props) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "flex h-9 items-center gap-1.5 rounded-control border px-3.5 text-sm font-medium transition-colors duration-150",
        active
          ? "border-[var(--link)] bg-primary-light text-link"
          : "hover:border-foreground/30 bg-white",
      )}
    >
      {active && <Check size={14} strokeWidth={2.5} />}
      {children}
    </button>
  );
}
