import type { ReactNode } from "react";

type Props = {
  title: string;
  text: string;
  /** The evidence for the claim: a quote, a chart, a timeline */
  children: ReactNode;
};

export function ProofCard({ title, text, children }: Props) {
  return (
    <li className="rounded-panel shadow-card flex flex-col gap-3 bg-white p-6 ring-1 ring-black/[0.04] md:p-7">
      <h3 className="text-xl leading-snug font-bold tracking-[-0.01em]">{title}</h3>
      <p className="text-muted-foreground text-[15px] leading-relaxed">{text}</p>
      <div className="pt-3">{children}</div>
    </li>
  );
}
