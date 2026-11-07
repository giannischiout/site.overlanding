import Image from "next/image";

// Decorative: the brand name is always shown as text next to it
export const Logo = () => {
  return (
    <Image
      priority
      src="/assets/hederson.png"
      width={44}
      height={44}
      className="rounded-full"
      alt=""
    />
  );
};
