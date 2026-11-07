import { FieldWrapper } from "@/components/booking-filters/fields/field-wrapper";

type Props = {
  label: string;
  value: string | null;
  active: boolean;
  onClick: () => void;
};

export function DateTrigger({ label, value, active, onClick }: Props) {
  return (
    <div className="w-[128px] shrink-0">
      <FieldWrapper
        label={label}
        value={value ?? "Add date"}
        isPlaceholder={!value}
        active={active}
        expanded={active}
        onClick={onClick}
      />
    </div>
  );
}
