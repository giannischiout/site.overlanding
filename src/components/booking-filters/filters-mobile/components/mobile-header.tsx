import { X } from "lucide-react";

type Props = {
  label: string;
  onClick: () => void;
};
export function MobileHeader({ label, onClick }: Props) {
  return (
    <div className="flex h-14 shrink-0 items-center justify-between border-b pr-2 pl-4">
      <span className="text-base font-medium">{label}</span>
      <button
        type="button"
        aria-label="Close"
        onClick={onClick}
        className="hover:bg-hover flex size-11 items-center justify-center rounded-md"
      >
        <X size={20} />
      </button>
    </div>
  );
}
