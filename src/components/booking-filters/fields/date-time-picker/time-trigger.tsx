import { cn } from "@/lib/utils";
import { Popover } from "@/components/popover";
import { FieldWrapper } from "@/components/booking-filters/fields/field-wrapper";
import { Check } from "lucide-react";
import type { RefObject } from "react";

type TimeOption = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  shortLabel?: string;
  accent?: boolean;
  anchorRef: RefObject<HTMLDivElement | null>;
  value: TimeOption;
  options: TimeOption[];
  open: boolean;
  onClose: () => void;
  onChange: (option: TimeOption) => void;
  onToggle: () => void;
  alignRight?: boolean;
  top?: string;
};

export function TimeTrigger({
  label,
  shortLabel,
  accent,
  top,
  anchorRef,
  alignRight = false,
  open,
  options,
  value,
  onClose,
  onToggle,
  onChange,
}: Props) {
  const handleChange = (newValue: TimeOption) => {
    onChange(newValue);
    onClose();
  };
  return (
    <div ref={anchorRef} className="relative w-[72px] shrink-0 xl:w-auto">
      <FieldWrapper
        label={label}
        shortLabel={shortLabel}
        accent={accent}
        value={value.label}
        active={open}
        expanded={open}
        onClick={onToggle}
        className="min-[961px]:pl-2 min-[961px]:pr-3"
        valueClassName="text-[16px] font-semibold tabular-nums"
      />
      <Popover
        top={top}
        alignRight={alignRight}
        anchorRef={anchorRef}
        open={open}
        onClose={onClose}
        maxMenuHeight={280}
        className="w-[140px] min-w-0"
      >
        {options.map((option) => {
          const isActive = option.value === value.value;
          return (
            <button
              type="button"
              key={option.value}
              onClick={() => handleChange(option)}
              className={cn(
                "flex min-h-10 w-full items-center justify-between rounded-md px-3 text-left text-[15px] hover:bg-hover",
                isActive && "font-medium",
              )}
            >
              {option.label}
              {isActive && <Check size={16} className="text-link" />}
            </button>
          );
        })}
      </Popover>
    </div>
  );
}
