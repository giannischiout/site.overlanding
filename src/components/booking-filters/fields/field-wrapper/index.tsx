import { cn } from "@/lib/utils";

/** One labelled cell of the booking bar. Location, date and time all use it. */
export const FieldWrapper = ({
  label,
  shortLabel,
  accent = false,
  value,
  onClick,
  active = false,
  muted = false,
  isPlaceholder = false,
  expanded,
  className,
  valueClassName,
}: {
  label: string;
  /** Shown instead of label; label stays the accessible name */
  shortLabel?: string;
  /** Marks the first field of a leg (Pickup, Return) */
  accent?: boolean;
  value: string;
  onClick: () => void;
  active?: boolean;
  muted?: boolean;
  isPlaceholder?: boolean;
  expanded?: boolean;
  className?: string;
  valueClassName?: string;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={expanded}
      className={cn(
        "flex h-14 w-full min-w-0 flex-col justify-center gap-0.5 rounded-control px-3.5 text-left transition-[background-color,opacity] duration-150 ease-out",
        "hover:bg-hover",
        active && "bg-sky hover:bg-sky",
        muted && "opacity-40",
        className,
      )}
    >
      <span
        aria-hidden={shortLabel ? true : undefined}
        className={cn(
          "text-[12px] leading-tight whitespace-nowrap",
          accent ? "text-link font-semibold" : "text-muted-foreground",
        )}
      >
        {shortLabel ?? label}
      </span>
      {shortLabel && <span className="sr-only">{label}</span>}
      <span
        title={value}
        className={cn(
          "truncate text-[14px] leading-tight font-medium",
          valueClassName,
          isPlaceholder && "text-link",
        )}
      >
        {value}
      </span>
    </button>
  );
};
