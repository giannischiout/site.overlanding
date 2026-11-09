import { Search } from "lucide-react";
import { Spinner } from "@/components/spinner";

type Props = {
  onSubmit: () => void;
  /** The results page is loading */
  pending?: boolean;
};

export const SearchButton = ({ onSubmit, pending = false }: Props) => {
  return (
    <button
      type="button"
      onClick={onSubmit}
      disabled={pending}
      aria-busy={pending}
      aria-label={pending ? "Searching vehicles" : "Search vehicles"}
      className="group bg-primary text-primary-foreground hover:bg-primary-dark rounded-control flex size-12 shrink-0 items-center justify-center self-center shadow-[0_6px_16px_-8px_rgb(34_184_120/0.8)] transition-[background-color,transform] duration-200 ease-out active:scale-95 disabled:cursor-wait"
    >
      {pending ? (
        <Spinner size={19} />
      ) : (
        <Search
          size={19}
          strokeWidth={2.5}
          className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:scale-110"
        />
      )}
    </button>
  );
};
