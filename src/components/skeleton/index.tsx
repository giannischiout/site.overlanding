import { cn } from "@/lib/utils";

type Props = { className?: string };

/**
 * A placeholder block shaped like the content that's loading.
 * Pulses gently; holds still for visitors who ask for less motion.
 */
export function Skeleton({ className }: Props) {
  return (
    <div
      aria-hidden
      className={cn(
        "bg-sky rounded-control animate-pulse motion-reduce:animate-none",
        className,
      )}
    />
  );
}

/** A vehicle card's shape: photo, title, specs and price */
export function VehicleCardSkeleton() {
  return (
    <div className="rounded-panel flex flex-col overflow-hidden bg-white ring-1 ring-black/[0.04]">
      <Skeleton className="aspect-[4/3] rounded-none" />
      <div className="flex flex-col gap-3 p-5">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-6 w-3/4" />
        <div className="flex gap-3">
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-4 w-14" />
        </div>
        <div className="mt-2 flex items-end justify-between border-t pt-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-7 w-24" />
        </div>
      </div>
    </div>
  );
}
