import { FieldWrapper } from "@/components/booking-filters/fields/field-wrapper";

type Props = {
  label: string;
  shortLabel?: string;
  accent?: boolean;
  value: string | null;
  active: boolean;
  onClick: () => void;
};

export function DateTrigger({
  label,
  shortLabel,
  accent,
  value,
  active,
  onClick,
}: Props) {
  return (
    <div className="w-[104px] shrink-0 xl:w-auto">
      <FieldWrapper
        label={label}
        shortLabel={shortLabel}
        accent={accent}
        value={value ?? "Add date"}
        isPlaceholder={!value}
        active={active}
        expanded={active}
        onClick={onClick}
        className="min-[961px]:pr-2.5"
        valueClassName="text-[16px] font-semibold tracking-[-0.01em]"
      />
    </div>
  );
}
