import DayOfWeek from "../enums/DayOfWeek";
import RelativeDuration from "../types/RelativeDuration";
import RelativeISOTimeString from "../types/RelativeISODateTimeString";

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// --- Helpers ---
const formatTime = (time: RelativeISOTimeString): string => {
  const [hStr, mStr] = time.split(":");
  let hour = parseInt(hStr, 10);
  const minute = parseInt(mStr, 10);
  const suffix = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return minute === 0 ? `${hour}${suffix}` : `${hour}:${mStr}${suffix}`;
};

const formatShift = (
  start: RelativeISOTimeString,
  end: RelativeISOTimeString
) => `${formatTime(start)}–${formatTime(end)}`;

// --- Main function ---
const prettyHours = (defaultOperationHours: RelativeDuration[]): string => {
  // Step 1: Build per-day schedule
  const perDay: Record<DayOfWeek, string[]> = {
    [DayOfWeek.SUNDAY]: [],
    [DayOfWeek.MONDAY]: [],
    [DayOfWeek.TUESDAY]: [],
    [DayOfWeek.WEDNESDAY]: [],
    [DayOfWeek.THURSDAY]: [],
    [DayOfWeek.FRIDAY]: [],
    [DayOfWeek.SATURDAY]: [],
  };

  defaultOperationHours.forEach(({ startTime, endTime, repeat }) => {
    const shift = formatShift(startTime, endTime);
    repeat.forEach((day) => {
      perDay[day].push(shift);
    });
  });

  // Sort shifts per day
  for (const day in perDay) {
    perDay[day as unknown as DayOfWeek].sort();
  }

  // Step 2: Group consecutive days with identical schedules (including Closed)
  const resultParts: string[] = [];
  const allDays = Object.values(DayOfWeek).filter(
    (d) => typeof d === "number"
  ) as DayOfWeek[];

  let i = 0;
  while (i < allDays.length) {
    const start = i;
    const shifts = perDay[allDays[i]].join(", ") || "Closed";

    let j = i + 1;
    while (
      j < allDays.length &&
      (perDay[allDays[j]].join(", ") || "Closed") === shifts
    ) {
      j++;
    }

    // Now group days from i..j-1
    const label =
      start === j - 1
        ? dayNames[allDays[start]]
        : `${dayNames[allDays[start]]}–${dayNames[allDays[j - 1]]}`;

    if (shifts === "Closed") {
      resultParts.push(`Closed ${label}`);
    } else {
      resultParts.push(`Open ${label}: ${shifts}`);
    }

    i = j;
  }

  // sort open first
  return resultParts
    .sort((a, b) => {
      if (a.includes("Closed") && b.includes("Open")) {
        return 1;
      }
      return -1;
    })
    .join(" | ");
};

export default prettyHours;
