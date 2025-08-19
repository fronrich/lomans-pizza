import ReservationSuggestion from "../types/ReservationSuggestion";

/**
 * Transforms an array of slots into a record keyed by date,
 * with each date containing an array of times.
 */
export default (slots: ReservationSuggestion[]): Record<string, string[]> => {
  return slots.reduce<Record<string, string[]>>((acc, slot) => {
    const { date, time } = slot;

    if (!acc[date.toISOString()]) {
      acc[date.toISOString()] = [];
    }

    acc[date.toISOString()].push(time);

    return acc;
  }, {});
};
