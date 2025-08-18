import DayOfWeek from "../enums/DayOfWeek";
import RelativeDuration from "../types/RelativeDuration";

export default (
  defaultOperationHours: RelativeDuration[]
): Record<DayOfWeek, boolean> => {
  // Initialize all days as closed (false)
  const result: Record<DayOfWeek, boolean> = {
    [DayOfWeek.SUNDAY]: false,
    [DayOfWeek.MONDAY]: false,
    [DayOfWeek.TUESDAY]: false,
    [DayOfWeek.WEDNESDAY]: false,
    [DayOfWeek.THURSDAY]: false,
    [DayOfWeek.FRIDAY]: false,
    [DayOfWeek.SATURDAY]: false,
  };

  // Mark days that have at least one shift as true
  defaultOperationHours.forEach(({ repeat }) => {
    repeat.forEach((day) => {
      result[day] = true;
    });
  });

  return result;
};
