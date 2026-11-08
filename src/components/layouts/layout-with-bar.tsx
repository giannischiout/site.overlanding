import type { ReactNode } from "react";
import { BookingBar } from "@/components/booking-filters/booking-bar";

type Props = {
  children: ReactNode;
};
export function LayoutWithBar({ children }: Props) {
  return (
    <>
      <BookingBar />
      <div className="page-container">{children}</div>
    </>
  );
}
