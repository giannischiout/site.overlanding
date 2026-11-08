import { Search } from "lucide-react";

type Props = {
  onSubmit: () => void;
};
export const SearchButton = ({ onSubmit }: Props) => {
  return (
    <button
      type="button"
      onClick={onSubmit}
      aria-label="Search vehicles"
      className="group bg-primary text-primary-foreground hover:bg-primary-dark flex size-12 shrink-0 items-center justify-center self-center rounded-full shadow-[0_8px_20px_-8px_rgb(34_184_120/0.8)] transition-[background-color,transform] duration-200 ease-out active:scale-95"
    >
      <Search
        size={19}
        strokeWidth={2.5}
        className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:scale-110"
      />
    </button>
  );
};
