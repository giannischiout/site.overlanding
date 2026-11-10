import type { ReactNode } from "react";
import { BookingBar } from "@/components/booking-filters/booking-bar";

type Props = {
  children: ReactNode;
};
export function LayoutWithBar({ children }: Props) {
  return (
    <>
      <BookingBar />
      {/* Same width and inset as the nav, so the results line up with the header */}
      <div className="wide-container px-3 md:px-6">{children}</div>
    </>
  );
}
