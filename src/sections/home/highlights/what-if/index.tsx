"use client";

import { useState, type ReactNode } from "react";
import { SCENARIOS } from "@/data/scenarios";
import { ArrivalOutcome } from "./arrival-outcome";
import { CancelOutcome, type BookingSummary } from "./cancel-outcome";
import { DamageOutcome } from "./damage-outcome";
import { ScenarioPicker } from "./scenario-picker";

type Props = {
  /** Server-rendered receipt for the "at the desk" scenario */
  deskReceipt: ReactNode;
  booking: BookingSummary;
};

/** "What if…": pick a worry, see the real outcome with our numbers */
export function WhatIf({ deskReceipt, booking }: Props) {
  const [selectedId, setSelectedId] = useState(SCENARIOS[1]?.id ?? "");
  const scenario = SCENARIOS.find((s) => s.id === selectedId) ?? SCENARIOS[0];
  if (!scenario) return null;

  return (
    <div className="rounded-panel grid overflow-hidden bg-white ring-1 ring-black/[0.06] lg:grid-cols-[5fr_7fr]">
      <div className="flex flex-col gap-6 p-6 md:p-10">
        <div className="flex flex-col gap-3">
          <p className="text-muted-foreground font-mono text-xs tracking-wide uppercase">Try it</p>
          <h3 className="text-3xl leading-[1.05] font-bold tracking-[-0.02em] text-balance md:text-[2.5rem]">
            What if…
          </h3>
          <p className="text-muted-foreground max-w-[40ch] text-[15px] leading-relaxed md:text-[17px]">
            Pick what worries you about a trip in Iceland. The numbers are our real prices.
          </p>
        </div>
        <ScenarioPicker scenarios={SCENARIOS} selectedId={scenario.id} onSelect={setSelectedId} />
      </div>

      <div
        aria-live="polite"
        className="bg-sky flex min-h-[420px] flex-col gap-6 p-6 md:p-10"
      >
        {/* Keyed so each scenario enters fresh */}
        <div
          key={scenario.id}
          className="animate-in fade-in slide-in-from-bottom-2 flex flex-1 flex-col gap-6 duration-300 motion-reduce:animate-none"
        >
          <div className="flex flex-col gap-2">
            <p className="text-xl leading-snug font-bold tracking-[-0.01em] text-balance">
              {scenario.label}
            </p>
            <p className="text-muted-foreground max-w-[52ch] text-[15px] leading-relaxed">
              {scenario.story}
            </p>
          </div>
          <div className="mt-auto">
            {scenario.kind === "desk" && deskReceipt}
            {scenario.kind === "damage" && <DamageOutcome scenario={scenario} />}
            {scenario.kind === "arrival" && <ArrivalOutcome scenario={scenario} />}
            {scenario.kind === "cancel" && <CancelOutcome booking={booking} />}
          </div>
        </div>
      </div>
    </div>
  );
}
