import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="page-container pt-6 pb-24 md:pt-10">{children}</div>;
}
