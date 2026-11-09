export const MobileFieldWrapper = ({
  label,
  onClick,
  value,
}: {
  label: string;
  onClick: () => void;
  value: string;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border-border flex min-h-16 w-full flex-col justify-center gap-0.5 rounded-lg border px-4 py-2 text-left"
    >
      <span className="text-muted-foreground text-[13px]">{label}</span>
      <span className="truncate text-base font-medium">{value}</span>
    </button>
  );
};
