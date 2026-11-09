export const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

/** A tel: link for a phone number written with spaces */
export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

/** "1 day", "3 days". Pass `plural` for words that don't just take an s. */
export const pluralize = (count: number, singular: string, plural = `${singular}s`) =>
  `${count} ${count === 1 ? singular : plural}`;
