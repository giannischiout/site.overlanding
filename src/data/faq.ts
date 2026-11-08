export type FaqItem = { question: string; answer: string };

// Placeholder policies: check every answer against the company's real terms before launch
export const FAQ: FaqItem[] = [
  {
    question: "What do I need to rent a vehicle?",
    answer:
      "A driving licence held for at least one year, a passport or ID, and a credit card in the main driver's name for the deposit. Licences printed in the Latin alphabet are accepted as they are; others need an International Driving Permit.",
  },
  {
    question: "How old do I have to be?",
    answer:
      "20 for cars and 4x4 SUVs, 23 for campervans and motorhomes. Drivers under 23 pay a young driver fee at pickup.",
  },
  {
    question: "Where do I pick up the vehicle?",
    answer:
      "Most guests start at our Keflavík Airport depot, a five-minute shuttle ride from arrivals. You can also pick up in Reykjavík, Akureyri, Selfoss or Höfn. Returning to a different location costs €150.",
  },
  {
    question: "Can I drive on F-roads and into the Highlands?",
    answer:
      "Only in vehicles marked F-road approved, and only while the roads are open, usually late June to early September. Check road.is on the morning you set out. River crossings are at your own risk unless you have Zero-excess protection, which covers them on approved routes.",
  },
  {
    question: "Which protection should I choose?",
    answer:
      "Basic cover comes with every rental. Most guests choose Zero excess, because gravel chips, sandstorms and windy door damage are common in Iceland and are not covered by basic CDW. With Zero excess you pay nothing if something happens.",
  },
  {
    question: "Can I sleep anywhere with a campervan?",
    answer:
      "No. Since 2015, Icelandic law only allows overnight stays in campervans, motorhomes and rooftop tents at registered campsites. There are around 170 of them, open mostly from May to September, with several running all year.",
  },
  {
    question: "Is it safe to drive in Iceland in winter?",
    answer:
      "Yes, with care. Every vehicle gets studded winter tyres from October to April. Keep an eye on road.is and vedur.is, and give yourself extra time for short daylight. We recommend a 4x4 from November to March.",
  },
  {
    question: "How does payment and cancellation work?",
    answer:
      "Nothing is charged when you book. We email a secure payment link, and the balance is due 14 days before pickup. You can cancel for free up to 7 days before pickup.",
  },
  {
    question: "Are kilometres and fuel included?",
    answer:
      "Unlimited kilometres are always included. Fuel isn't: pick up with a full tank and return it at any level, and we charge only what you used at the pump price.",
  },
];
