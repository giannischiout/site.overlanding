import Image from "next/image";
import type { RefObject } from "react";
import { cn } from "@/lib/utils";
import { SEASON_BACKDROPS, type Season } from "@/lib/season";
import type { Home } from "@/types/content";
import { AuroraRibbons } from "@/sections/home/hero/aurora-ribbons";

type Props = {
  data: Home["hero"];
  season: Season;
  auroraOn: boolean;
  videoRef: RefObject<HTMLVideoElement | null>;
};

/** The photo layer. It clips itself so the booking menus can open past the panel. */
export function HeroBackdrop({ data, season, auroraOn, videoRef }: Props) {
  return (
    <div
      aria-hidden
      className="rounded-panel pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* One photo per season, crossfading when the trip dates move into another season */}
      {(Object.keys(SEASON_BACKDROPS) as Season[]).map((key) => {
        const backdrop = SEASON_BACKDROPS[key];
        return (
          <Image
            key={key}
            alt={backdrop.alt}
            fill
            priority={key === season}
            sizes="100vw"
            src={backdrop.url}
            style={{ objectPosition: backdrop.position }}
            className={cn(
              "object-cover transition-[opacity,transform] duration-[1400ms] ease-[var(--ease-out-expo)]",
              key === season && !auroraOn
                ? "scale-100 opacity-100"
                : "scale-[1.03] opacity-0",
            )}
          />
        );
      })}
      {/* Winter night: shown when the aurora is switched on */}
      <div
        className={cn(
          "absolute inset-0 transition-[opacity,transform] duration-[1400ms] ease-[var(--ease-out-expo)]",
          auroraOn ? "scale-[1.04] opacity-100" : "opacity-0",
        )}
      >
        <Image
          alt={data.backgroundImage.alt}
          fill
          sizes="100vw"
          src={data.backgroundImage.url}
          className="object-cover object-[50%_75%]"
        />
      </div>
      {data.backgroundVideo ? (
        <video
          ref={videoRef}
          src={data.backgroundVideo.url}
          muted
          loop
          playsInline
          preload="none"
          className={cn(
            "absolute inset-0 size-full object-cover object-[50%_75%] transition-opacity duration-700",
            auroraOn ? "opacity-100" : "opacity-0",
          )}
        />
      ) : (
        <AuroraRibbons on={auroraOn} />
      )}
      <div className="from-basalt/60 via-basalt/20 absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b via-55% to-transparent" />
      <div className="from-basalt/60 absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t to-transparent" />
    </div>
  );
}
