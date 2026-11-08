import type { Extra, Protection } from "@/types/content";

export const PROTECTIONS: Protection[] = [
  {
    id: "basic",
    name: "Basic",
    pricePerDay: 0,
    excess: 3500,
    covers: ["Collision damage waiver (CDW)", "Third-party liability"],
  },
  {
    id: "plus",
    name: "Plus",
    pricePerDay: 19,
    excess: 1200,
    covers: [
      "Super CDW",
      "Gravel protection: windscreen and paint",
      "Theft protection",
    ],
  },
  {
    id: "premium",
    name: "Zero excess",
    pricePerDay: 35,
    excess: 0,
    recommended: true,
    covers: [
      "Everything in Plus",
      "Sand and ash protection",
      "Tyre and undercarriage cover",
      "River-crossing damage on approved routes",
    ],
  },
];

export const EXTRAS: Extra[] = [
  {
    id: "driver",
    name: "Additional driver",
    description: "Share the wheel on long days.",
    price: 8,
    per: "day",
  },
  {
    id: "wifi",
    name: "Portable Wi-Fi",
    description: "Unlimited 4G for up to 10 devices.",
    price: 9,
    per: "day",
  },
  {
    id: "gps",
    name: "GPS navigation",
    description: "Offline maps, works without signal.",
    price: 6,
    per: "day",
  },
  {
    id: "child-seat",
    name: "Child seat",
    description: "For children 9 to 18 kg.",
    price: 5,
    per: "day",
  },
  {
    id: "camping-kit",
    name: "Camping chairs & table",
    description: "Two chairs and a folding table.",
    price: 25,
    per: "trip",
    campingOnly: true,
  },
  {
    id: "sleeping-bag",
    name: "Extra sleeping bag",
    description: "Rated to -5°C, with a fresh liner.",
    price: 20,
    per: "trip",
    campingOnly: true,
  },
];
