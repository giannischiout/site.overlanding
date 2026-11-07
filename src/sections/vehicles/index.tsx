import type { IFilters } from "@/types";

type Props = {
  filters: IFilters;
};
export function VehiclesView({ filters }: Props) {
  return (
    <section className="bg-bac min-h-[50vh] p-4">
      a{/*<div className="m-auto flex w-[65%] flex-col gap-10 pt-6">*/}
      {/*  <div className="flex flex-col gap-1">*/}
      {/*    <h1 className="text-5xl font-medium">Our Vehicles</h1>*/}
      {/*    <span className="text-muted-foreground">*/}
      {/*      Choose from our carefully selected fleet of premium RVs*/}
      {/*    </span>*/}
      {/*  </div>*/}
      {/*  /!* Filters view *!/*/}
      {/*  <div className="flex flex-col gap-2">*/}
      {/*    /!*<h4 className="text-2xl">Filter & Sort</h4>*!/*/}
      {/*    <VehicleFilters filters={filters} />*/}
      {/*  </div>*/}
      {/*</div>*/}
    </section>
  );
}
