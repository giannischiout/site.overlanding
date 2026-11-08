import Image from "next/image";

const HIGHLIGHTS = [
  {
    label: "Ready for Iceland's roads",
    description:
      "Choose a vehicle that fits your route, from the Ring Road to marked mountain roads.",
  },
  {
    label: "Clear deposits",
    description: "See the security deposit up front and choose how you pay.",
  },
  {
    label: "A vehicle for every trip",
    description: "From compact city cars to 4x4s and campervans.",
  },
  {
    label: "Support on the road",
    description:
      "Every rental comes with 24/7 support and full insurance options.",
  },
];

export function Highlights() {
  return (
    <section className="bg-sky grid overflow-hidden rounded-[22px] lg:grid-cols-[2fr_3fr]">
      <div className="relative min-h-[320px]">
        <Image
          alt="Small silver 4x4 parked on a wet road beside bright green hills"
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          src="/assets/highlights-diverse.jpg"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-8 p-6 md:p-12">
        <h2 className="text-4xl font-black tracking-[-0.02em] md:text-5xl">
          Why rent with us
        </h2>
        <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {HIGHLIGHTS.map((highlight) => (
            <div key={highlight.label} className="flex flex-col gap-1">
              <dt className="text-xl font-bold">{highlight.label}</dt>
              <dd className="text-muted-foreground leading-snug">
                {highlight.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
