import { Skeleton } from "@/components/skeleton";

/** Vehicle page loading: gallery, details column and the booking card */
export default function Loading() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading vehicle"
      className="pt-6 pb-24 md:pt-8"
    >
      <Skeleton className="h-4 w-32" />
      <div className="mt-6 grid gap-2 md:grid-cols-[2fr_1fr]">
        <Skeleton className="rounded-panel aspect-[16/10] md:aspect-auto md:h-[460px]" />
        <div className="hidden grid-rows-2 gap-2 md:grid">
          <Skeleton className="rounded-panel" />
          <Skeleton className="rounded-panel" />
        </div>
      </div>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-14">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton key={index} className="h-20" />
            ))}
          </div>
        </div>
        <Skeleton className="rounded-panel h-[420px]" />
      </div>
    </div>
  );
}
