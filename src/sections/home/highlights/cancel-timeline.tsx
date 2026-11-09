/** Today → free cancellation → 7 days before pickup → pickup */
export function CancelTimeline() {
  return (
    <div className="rounded-control bg-sky p-4 text-sm">
      <div className="flex h-2 overflow-hidden rounded-full">
        <div className="bg-aurora w-[78%]" />
        <div className="w-[22%] bg-white" />
      </div>
      <div className="relative mt-2 h-10 text-xs">
        <span className="absolute left-0 font-semibold">Today</span>
        <span className="text-link absolute left-[39%] -translate-x-1/2 font-semibold whitespace-nowrap">
          Cancel free
        </span>
        <span className="absolute left-[78%] -translate-x-1/2 text-center leading-tight">
          7 days
          <br />
          before
        </span>
        <span className="absolute right-0 font-semibold">Pickup</span>
      </div>
    </div>
  );
}
