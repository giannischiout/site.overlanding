import { Skeleton, VehicleCardSkeleton } from "@/components/skeleton";

/** Results loading: same layout as the page, so nothing jumps when the cards arrive */
export default function Loading() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading vehicles"
      className="pt-6 pb-24 md:pt-8"
    >
      <div className="mt-8 flex flex-col gap-3 md:mt-10">
        <Skeleton className="h-11 w-72 md:h-14 md:w-96" />
        <Skeleton className="h-5 w-full max-w-xl" />
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-10">
        <Skeleton className="rounded-panel hidden h-[520px] lg:block" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-5 w-40" />
          <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <li key={index}>
                <VehicleCardSkeleton />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
