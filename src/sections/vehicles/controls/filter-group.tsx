import type { ReactNode } from "react";

export function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div role="group" aria-label={title} className="flex flex-col gap-3 py-5 first:pt-0 last:pb-0">
      <h3 className="text-[15px] font-bold">{title}</h3>
      {children}
    </div>
  );
}
