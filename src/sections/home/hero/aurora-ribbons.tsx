import { cn } from "@/lib/utils";

/** Drawn aurora: ribbons screened over the sky, with a faint glow in the water below */
export function AuroraRibbons({ on }: { on: boolean }) {
  return (
    <>
      <div
        className={cn(
          "absolute inset-0 mix-blend-screen transition-opacity duration-[1600ms] ease-out [mask-image:linear-gradient(to_bottom,black_0%,black_58%,transparent_72%)] motion-reduce:hidden",
          on ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="aurora-ribbon absolute top-[34%] -left-[15%] h-[30%] w-[85%] rounded-[50%] bg-[radial-gradient(closest-side,rgb(90_255_170/0.95),rgb(61_220_151/0.35)_55%,transparent)] blur-2xl [--aurora-speed:7s]" />
        <div className="aurora-ribbon absolute top-[16%] left-[25%] h-[42%] w-[50%] rounded-[50%] bg-[radial-gradient(closest-side,rgb(140_255_210/0.7),rgb(45_200_200/0.25)_60%,transparent)] blur-3xl [--aurora-speed:10s] [animation-delay:-3s]" />
        <div className="aurora-ribbon absolute top-[24%] left-[58%] h-[26%] w-[48%] rounded-[50%] bg-[radial-gradient(closest-side,rgb(190_130_255/0.5),transparent)] blur-3xl [--aurora-speed:12s] [animation-delay:-6s]" />
        <div className="aurora-ribbon absolute top-[44%] left-[5%] h-[12%] w-[60%] rounded-[50%] bg-[radial-gradient(closest-side,rgb(200_255_220/0.8),transparent)] blur-xl [--aurora-speed:6s] [animation-delay:-2s]" />
      </div>
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 h-[35%] mix-blend-screen transition-opacity duration-[1600ms] ease-out motion-reduce:hidden",
          on ? "opacity-70" : "opacity-0",
        )}
      >
        <div className="aurora-ribbon absolute top-[10%] left-0 h-[60%] w-[60%] rounded-[50%] bg-[radial-gradient(closest-side,rgb(90_255_170/0.5),transparent)] blur-3xl [--aurora-speed:7s] [animation-direction:reverse]" />
      </div>
    </>
  );
}
