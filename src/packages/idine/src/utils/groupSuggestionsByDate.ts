import ReservationSuggestion from "../types/ReservationSuggestion";

/**
 * Transforms an array of slots into a record keyed by date,
 * with each date containing an array of times.
 */
export default (
  slots: ReservationSuggestion[]
): Record<string, { time: string; tableId: string }[]> => {
  return slots.reduce<Record<string, { time: string; tableId: string }[]>>(
    (acc, slot) => {
      const { date, time, tableId } = slot;

      if (!acc[date.toISOString()]) {
        acc[date.toISOString()] = [];
      }

      acc[date.toISOString()].push({ time, tableId });

      return acc;
    },
    {}
  );
};
