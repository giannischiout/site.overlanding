import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Media } from "@/types/content";

export function Gallery({ images }: { images: Media[] }) {
  const [photo, setPhoto] = useState(0);

  return (
    <div className="mt-4 grid gap-3 md:grid-cols-[1fr_220px] lg:grid-cols-[1fr_280px]">
      <div className="bg-sky rounded-panel relative aspect-[16/10] overflow-hidden shadow-[0_18px_40px_-28px_rgb(6_20_16/0.6)]">
        {images.map((image, index) => (
          <Image
            key={image.url + index}
            src={image.url}
            alt={image.alt}
            fill
            priority={index === 0}
            sizes="(min-width: 1024px) 70vw, 100vw"
            className={cn(
              "object-cover transition-opacity duration-500",
              photo === index ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
        <span className="bg-basalt/70 rounded-control absolute right-4 bottom-4 px-3 py-1 text-sm font-semibold text-white backdrop-blur">
          {photo + 1} / {images.length}
        </span>
      </div>
      <ul className="grid grid-cols-3 gap-3 md:grid-cols-1 md:grid-rows-3">
        {images.map((image, index) => (
          <li key={image.url + index} className="min-h-0">
            <button
              type="button"
              onClick={() => setPhoto(index)}
              aria-label={`Show photo ${index + 1}`}
              aria-pressed={photo === index}
              className={cn(
                "rounded-panel relative block aspect-[4/3] w-full overflow-hidden transition-[box-shadow,opacity] duration-200 md:aspect-auto md:h-full",
                photo === index
                  ? "shadow-[0_0_0_3px_var(--background),0_0_0_5px_var(--link)]"
                  : "opacity-75 hover:opacity-100",
              )}
            >
              <Image
                src={image.url}
                alt=""
                fill
                sizes="280px"
                className="object-cover"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
