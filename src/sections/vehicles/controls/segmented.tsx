import { cn } from "@/lib/utils";

type Props<T> = {
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
};

export function Segmented<T extends string | number>({ value, options, onChange }: Props<T>) {
  return (
    <div className="bg-sky flex rounded-control p-1">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "h-9 flex-1 rounded-inner px-2 text-sm font-medium transition-[background-color,color,box-shadow] duration-200",
            value === option.value
              ? "text-foreground bg-white shadow-[0_1px_3px_rgb(6_20_16/0.15)]"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
