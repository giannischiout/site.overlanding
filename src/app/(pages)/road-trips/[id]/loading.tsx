import { Skeleton } from "@/components/skeleton";

/** Road trip loading: header with photo, then the day list beside the map */
export default function Loading() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading road trip"
      className="page-container flex flex-col gap-20 pt-8 pb-24 md:gap-28 md:pt-12"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-12">
        <div className="flex flex-col gap-5">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-14 w-4/5 md:h-16" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="mt-2 h-28 w-full" />
          <Skeleton className="h-12 w-60" />
        </div>
        <Skeleton className="rounded-panel aspect-[4/3]" />
      </div>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12">
        <div className="flex flex-col gap-6">
          <Skeleton className="h-10 w-48" />
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 border-l-2 border-black/10 py-4 pl-6"
            >
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
        <Skeleton className="rounded-panel order-first aspect-[3/2] lg:order-last" />
      </div>
    </div>
  );
}
