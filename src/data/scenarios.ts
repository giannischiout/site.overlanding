/**
 * The "What if…" panel on the home page. Each scenario is shown, not described:
 * damage scenarios are priced against the real PROTECTIONS, cancel uses CANCELLATION.
 * Repair costs are typical Keflavík workshop prices, rounded.
 */

type Base = { id: string; label: string; story: string };

export type DamageScenario = Base & {
  kind: "damage";
  repairCost: number;
  /** Protection ids whose cover includes this kind of damage */
  coveredBy: string[];
};

export type ArrivalScenario = Base & {
  kind: "arrival";
  timeline: { time: string; text: string }[];
};

export type CancelScenario = Base & { kind: "cancel" };

export type DeskScenario = Base & { kind: "desk" };

export type Scenario = DeskScenario | DamageScenario | ArrivalScenario | CancelScenario;

export const SCENARIOS: Scenario[] = [
  {
    kind: "desk",
    id: "desk",
    label: "You reach the rental desk",
    story: "The quote you booked is the bill. Nothing is added when you collect the keys.",
  },
  {
    kind: "damage",
    id: "windscreen",
    label: "A stone cracks the windscreen",
    story: "A truck passes on Route 1 and flicks gravel into the glass. It happens to someone every day.",
    repairCost: 1400,
    coveredBy: ["plus", "premium"],
  },
  {
    kind: "damage",
    id: "sandstorm",
    label: "A sandstorm on the south coast",
    story: "Wind picks up black sand near Vík and strips paint and glass in minutes.",
    repairCost: 4800,
    coveredBy: ["premium"],
  },
  {
    kind: "arrival",
    id: "late-flight",
    label: "Your flight lands at 2am",
    story: "We track your flight, so a delay moves us, not you.",
    timeline: [
      { time: "01:55", text: "Your flight lands two hours late. We saw it coming." },
      { time: "02:15", text: "The shuttle is waiting at door 4 in arrivals." },
      { time: "02:30", text: "Keys at the desk, the heater already on." },
    ],
  },
  {
    kind: "cancel",
    id: "plans-change",
    label: "Your plans change",
    story: "Weather, work, a cancelled flight. Drag to see what cancelling costs.",
  },
];
