import { Menu, X } from "lucide-react";

type Props = {
  onToggle: () => void;
  open: boolean;
};
export const Hamburger = ({ onToggle, open }: Props) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-label={open ? "Close menu" : "Open menu"}
      className="-mr-2 ml-auto flex size-11 items-center justify-center rounded-md lg:hidden"
    >
      {open ? <X size={24} /> : <Menu size={24} />}
    </button>
  );
};
