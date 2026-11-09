import type { ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { pluralize } from "@/lib/text";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resultCount: number;
  onClear: () => void;
  children: ReactNode;
};

export function MobileFiltersDialog({ open, onOpenChange, resultCount, onClear, children }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-panel flex max-h-[92svh] flex-col gap-0 overflow-hidden p-0 sm:max-w-md">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <DialogTitle className="text-lg font-bold">Filters</DialogTitle>
        </div>
        <div className="overflow-y-auto px-5 py-5">{children}</div>
        <div className="flex gap-2 border-t p-4">
          <button type="button" onClick={onClear} className="btn-secondary h-12 px-5">
            Clear
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="btn-primary h-12 flex-1"
          >
            Show {pluralize(resultCount, "vehicle")}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
