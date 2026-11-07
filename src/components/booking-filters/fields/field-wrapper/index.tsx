import { cn } from "@/lib/utils";

/** One labelled cell of the booking bar. Location, date and time all use it. */
export const FieldWrapper = ({
  label,
  value,
  onClick,
  active = false,
  muted = false,
  isPlaceholder = false,
  expanded,
}: {
  label: string;
  value: string;
  onClick: () => void;
  active?: boolean;
  muted?: boolean;
  isPlaceholder?: boolean;
  expanded?: boolean;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={expanded}
      className={cn(
        "flex h-16 w-full min-w-0 flex-col justify-center gap-0.5 rounded-lg px-4 text-left transition-[background-color,opacity] duration-150 ease-out",
        "hover:bg-hover",
        active && "bg-primary/10 hover:bg-primary/10",
        muted && "opacity-40",
      )}
    >
      <span className="text-muted-foreground text-[13px] leading-tight">
        {label}
      </span>
      <span
        title={value}
        className={cn(
          "truncate text-[15px] leading-tight font-medium",
          isPlaceholder && "text-link",
        )}
      >
        {value}
      </span>
    </button>
  );
};
