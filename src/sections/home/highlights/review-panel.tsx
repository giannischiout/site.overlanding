import Image from "next/image";
import { Star } from "lucide-react";

export function ReviewPanel() {
  return (
    <div className="bg-basalt rounded-panel relative min-h-[400px] overflow-hidden text-white">
      <Image
        src="/assets/fleet/1721220300289-b12765c054b6.jpg"
        alt="Camper van parked under the northern lights"
        fill
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="object-cover"
      />
      <div className="from-basalt/90 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
      <figure className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 md:p-8">
        <blockquote className="text-xl leading-snug font-semibold text-balance md:text-2xl">
          &ldquo;The van was spotless, the heater kept us warm at minus eight, and when we got a
          stone chip they sorted it over the phone in ten minutes.&rdquo;
        </blockquote>
        <figcaption className="flex items-center gap-3 text-sm text-white/80">
          <span className="flex">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} size={14} className="fill-star text-star" />
            ))}
          </span>
          Hanna &amp; Jonas, California Ocean · February
        </figcaption>
      </figure>
    </div>
  );
}
