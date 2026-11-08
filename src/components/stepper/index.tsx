import { Minus, Plus } from "lucide-react";

export function Stepper({
  value,
  max = 4,
  label,
  onChange,
}: {
  value: number;
  max?: number;
  label: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex items-center gap-1 rounded-full border bg-white p-1">
      <button
        type="button"
        aria-label={`Remove ${label}`}
        disabled={value === 0}
        onClick={() => onChange(value - 1)}
        className="hover:bg-hover flex size-8 items-center justify-center rounded-full disabled:opacity-30"
      >
        <Minus size={15} />
      </button>
      <span className="tabular w-5 text-center text-sm font-semibold" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        aria-label={`Add ${label}`}
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        className="hover:bg-hover flex size-8 items-center justify-center rounded-full disabled:opacity-30"
      >
        <Plus size={15} />
      </button>
    </div>
  );
}
