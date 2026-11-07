import { Search } from "lucide-react";

type Props = {
  onSubmit: () => void;
};
export const SearchButton = ({ onSubmit }: Props) => {
  return (
    <button
      type="button"
      onClick={onSubmit}
      className="bg-primary hover:bg-primary/90 flex shrink-0 items-center justify-center gap-2 rounded-lg px-6 text-base font-bold text-primary-foreground transition-colors duration-150 ease-out"
    >
      <Search size={18} />
      Search vehicles
    </button>
  );
};
