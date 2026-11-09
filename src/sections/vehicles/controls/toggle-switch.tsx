import { cn } from "@/lib/utils";

type Props = {
  label: string;
  hint: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function ToggleSwitch({ label, hint, checked, onChange }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex items-center justify-between gap-4 text-left"
    >
      <span className="flex flex-col">
        <span className="text-[15px] font-medium">{label}</span>
        <span className="text-muted-foreground text-[13px] leading-snug">{hint}</span>
      </span>
      <span
        className={cn(
          "relative h-6 w-10 shrink-0 rounded-full transition-colors duration-200",
          checked ? "bg-[var(--link)]" : "bg-[var(--border)]",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform duration-300 ease-[var(--ease-out-expo)]",
            checked && "translate-x-4",
          )}
        />
      </span>
    </button>
  );
}
