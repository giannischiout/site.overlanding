// Placeholder opening hours: every half hour from 08:00 to 20:00.
export const timeOptions = Array.from({ length: 25 }, (_, index) => {
  const hours = String(8 + Math.floor(index / 2)).padStart(2, "0");
  const value = `${hours}:${index % 2 ? "30" : "00"}`;
  return { value, label: value };
});

export type TimeOption = (typeof timeOptions)[number];
