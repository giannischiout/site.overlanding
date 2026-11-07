import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export function LayoutWithBar({ children }: Props) {
  return (
    <div className="page-container">
      {/*<BookingFilters />*/}
      {children}
    </div>
  );
}
