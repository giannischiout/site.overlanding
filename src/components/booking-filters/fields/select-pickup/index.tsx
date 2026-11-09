import { Popover } from "@/components/popover";
import { cn } from "@/lib/utils";
import { pickupIcons } from "@/components/booking-filters/pickup-icons";
import { Check } from "lucide-react";
import type { RefObject } from "react";
import { FieldWrapper } from "@/components/booking-filters/fields/field-wrapper";
import type { PickupLocation } from "@/types/content";

type Props = {
  options: PickupLocation[];
  value: PickupLocation | null;
  onChange: (value: PickupLocation) => void;
  open: boolean;
  anchorRef: RefObject<HTMLDivElement | null>;
  onClose: () => void;
  onToggle: () => void;
  alignRight?: boolean;
  label: string;
  shortLabel?: string;
  accent?: boolean;
  isDatePickerOpen: boolean;
  top: string;
};

const shortName = (label: string) =>
  label.replace(" International", "").replace(" Domestic", "");

export function SelectPickup({
  open,
  label,
  shortLabel,
  accent,
  top,
  anchorRef,
  onClose,
  onToggle,
  options,
  value,
  onChange,
  alignRight,
  isDatePickerOpen,
}: Props) {
  const handleChange = (newValue: PickupLocation) => {
    onChange(newValue);
    onClose();
  };

  return (
    <div ref={anchorRef} className="relative min-w-0 flex-1 xl:w-[200px] xl:flex-none">
      <FieldWrapper
        label={label}
        shortLabel={shortLabel}
        accent={accent}
        // The bar shows the short name; the menu lists the full one
        value={value ? shortName(value.label) : "Select location"}
        active={open}
        expanded={open}
        muted={isDatePickerOpen}
        onClick={onToggle}
      />
      <Popover
        top={top}
        alignRight={alignRight}
        anchorRef={anchorRef}
        open={open}
        onClose={onClose}
        className="w-[360px]"
      >
        {options.map((option) => {
          const isActive = option.id === value?.id;
          return (
            <button
              type="button"
              key={option.id}
              onClick={() => handleChange(option)}
              className={cn(
                "flex min-h-11 w-full items-center gap-3 rounded-md px-3 py-2 text-left text-[15px] hover:bg-hover",
                isActive && "font-medium",
              )}
            >
              {pickupIcons[option.icon]}
              <span className="flex-1">{option.label}</span>
              {isActive && <Check size={16} className="text-link" />}
            </button>
          );
        })}
      </Popover>
    </div>
  );
}
