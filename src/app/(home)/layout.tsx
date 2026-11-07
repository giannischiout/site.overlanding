import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="m-auto">{children}</div>;
}
