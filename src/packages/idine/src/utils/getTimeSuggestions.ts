import DayOfWeek from "../enums/DayOfWeek";
import TableStatus from "../enums/TableStatus";
import RelativeDuration from "../types/RelativeDuration";
import RelativeISODateTimeString from "../types/RelativeISODateTimeString";
import RelativeISOTimeString from "../types/RelativeISOTimeString";
import Reservation from "../types/Reservation";
import ReservationSuggestion from "../types/ReservationSuggestion";
import Table from "../types/Table";
import toDate from "./toDate";

/**
 * Get collections of suggested times based on conditions
 */
export default ({
  partySize,
  operationHours,
  date,
  time,
  tables,
  currentReservations,
}: {
  partySize: number;
  operationHours: RelativeDuration[];
  date: Date; // desired reservation date (Date object)
  /**
   * "HH:MM"
   */
  time: RelativeISOTimeString;
  tables: Table[];
  currentReservations: Reservation[];
}): {
  sameTimeOfDayTimes: ReservationSuggestion[];
  sameDayTimes: ReservationSuggestion[];
  nextSevenDayTimes: ReservationSuggestion[];
} => {
  // ----------------- Constants (no magic numbers) -----------------
  const RESERVATION_MINUTES = 90;
  const SLOT_INTERVAL_MINUTES = 30;
  const DAYS_IN_WINDOW = 7;
  const MS_IN_DAY = 24 * 60 * 60 * 1000;
  const TIME_PART_SEPARATOR = "T";

  // ----------------- Helpers -----------------
  const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`);

  function parseTimeOnly(t: string): { hours: number; minutes: number } {
    const parts = t.split(":");
    if (parts.length < 2) throw new Error(`Invalid time string: ${t}`);
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    if (Number.isNaN(hours) || Number.isNaN(minutes))
      throw new Error(`Invalid time string: ${t}`);
    return { hours, minutes };
  }

  function timeStringToMinutes(t: RelativeISODateTimeString) {
    const { hours, minutes } = parseTimeOnly(t);
    return hours * 60 + minutes;
  }

  function toDateWithTime(baseDate: Date, timeStr: RelativeISODateTimeString) {
    const d = new Date(baseDate.getTime());
    const { hours, minutes } = parseTimeOnly(timeStr);
    d.setHours(hours, minutes, 0, 0);
    return d;
  }

  function toISODateTimeString(d: Date) {
    // "YYYY-MM-DDTHH:MM"
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}${TIME_PART_SEPARATOR}${pad2(
      d.getHours()
    )}:${pad2(d.getMinutes())}`;
  }

  function addMinutes(d: Date, mins: number) {
    return new Date(d.getTime() + mins * 60 * 1000);
  }

  function addDays(d: Date, days: number) {
    return new Date(d.getTime() + days * MS_IN_DAY);
  }

  function dateOnly(d: Date) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  function sameCalendarDay(a: Date, b: Date) {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  function overlap(startA: Date, endA: Date, startB: Date, endB: Date) {
    // intervals [start, end)
    return startA < endB && startB < endA;
  }

  function weekdayOfDate(d: Date): DayOfWeek {
    return d.getDay(); // JS: 0 = Sunday
  }

  function extractTimePart(
    timeParam: RelativeISODateTimeString
  ): RelativeISODateTimeString {
    if (timeParam.includes(TIME_PART_SEPARATOR)) {
      const part = timeParam.split(TIME_PART_SEPARATOR)[1];
      const comps = part.split(":").slice(0, 2);
      return `${comps[0].padStart(2, "0")}:${comps[1].padStart(2, "0")}` as RelativeISODateTimeString;
    } else {
      return timeParam as RelativeISODateTimeString;
    }
  }

  // ----------------- Preprocessing -----------------
  // Filter out tables that are intentionally closed by manager
  const usableTables = tables.filter(
    (t) => t.status !== TableStatus.UNAVAILABLE
  );

  // Validate party size against largest usable table
  const maxSeats = usableTables.reduce((mx, t) => Math.max(mx, t.seats), 0);
  if (partySize > maxSeats) {
    throw new Error(
      `partySize ${partySize} exceeds largest table capacity ${maxSeats}. Cannot make a suggestion.`
    );
  }

  // Build reservationsByTable map (only for usable tables)
  const reservationsByTable: Record<string, { start: Date; end: Date }[]> = {};
  for (const t of usableTables) reservationsByTable[t.id] = [];
  for (const r of currentReservations) {
    if (!r.startTimeISO) continue;
    const start = toDateWithTime(toDate(r.startDate) as Date, r.startTimeISO);
    const end = addMinutes(start, RESERVATION_MINUTES);
    for (const tid of r.tableIds) {
      if (!reservationsByTable[tid]) continue; // ignore reservations for unavailable tables
      reservationsByTable[tid].push({ start, end });
    }
  }

  // Determine today's date (local), at midnight
  const now = new Date();
  const todayStart = dateOnly(now);

  // Desired date only (midnight)
  const desiredDateOnly = dateOnly(date);

  // Window start: the later of desiredDateOnly and todayStart
  const windowStart =
    desiredDateOnly < todayStart ? todayStart : desiredDateOnly;
  // Window end: desiredDateOnly + (DAYS_IN_WINDOW - 1) days
  const windowEnd = dateOnly(addDays(desiredDateOnly, DAYS_IN_WINDOW - 1));

  // If the computed window entirely precedes today (shouldn't happen after clipping above), return empty
  if (windowEnd < windowStart) {
    return { sameTimeOfDayTimes: [], sameDayTimes: [], nextSevenDayTimes: [] };
  }

  // ----------------- Slot generation -----------------
  function getSlotsForDay(dayDate: Date): Date[] {
    const slots: Date[] = [];
    const dow = weekdayOfDate(dayDate);
    const durations = operationHours.filter((dur) => dur.repeat.includes(dow));
    for (const dur of durations) {
      const startMin = timeStringToMinutes(
        dur.startTime as RelativeISODateTimeString
      );
      const endMin = timeStringToMinutes(
        dur.endTime as RelativeISODateTimeString
      );

      // Latest allowed reservation start so the reservation ends by endMin
      const latestStartMin = endMin - RESERVATION_MINUTES;
      if (latestStartMin < startMin) continue;

      for (let m = startMin; m <= latestStartMin; m += SLOT_INTERVAL_MINUTES) {
        const hh = Math.floor(m / 60);
        const mm = m % 60;
        const slot = new Date(dayDate.getTime());
        slot.setHours(hh, mm, 0, 0);
        slots.push(slot);
      }
    }
    return slots;
  }

  function findAvailableTableForSlot(slotStart: Date): string | null {
    const candidateTables = usableTables.filter((t) => t.seats >= partySize);
    if (candidateTables.length === 0) return null;

    const slotEnd = addMinutes(slotStart, RESERVATION_MINUTES);
    const available = candidateTables.filter((t) => {
      const existing = reservationsByTable[t.id] || [];
      for (const r of existing) {
        if (overlap(slotStart, slotEnd, r.start, r.end)) return false;
      }
      return true;
    });

    if (available.length === 0) return null;
    available.sort((a, b) => a.seats - b.seats);
    return available[0].id;
  }

  // ----------------- Collections -----------------
  const sameTimeOfDayTimes: {
    time: RelativeISODateTimeString;
    tableId: string;
    date: Date;
  }[] = [];
  const sameDayTimes: {
    time: RelativeISODateTimeString;
    tableId: string;
    date: Date;
  }[] = [];
  const nextSevenDayTimes: {
    time: RelativeISODateTimeString;
    tableId: string;
    date: Date;
  }[] = [];

  // Determine requested AM/PM
  const requestedTimeOnly = extractTimePart(time);
  const requestedHour = parseTimeOnly(requestedTimeOnly).hours;
  const requestedIsAM = requestedHour < 12;

  // Avoid duplicates (key = iso + tableId)
  const addedSlots = new Set<string>();

  // Iterate each day in [windowStart..windowEnd]
  const dayCount =
    Math.floor((windowEnd.getTime() - windowStart.getTime()) / MS_IN_DAY) + 1;
  for (let i = 0; i < dayCount; i++) {
    const dayDate = addDays(windowStart, i);
    const dayDateOnly = dateOnly(dayDate);
    const daySlots = getSlotsForDay(dayDateOnly);

    for (const slotStart of daySlots) {
      // Only accept slots inside the window (should be true already)
      const slotDayOnly = dateOnly(slotStart);
      if (slotDayOnly < windowStart || slotDayOnly > windowEnd) continue;

      const tableId = findAvailableTableForSlot(slotStart);
      if (!tableId) continue;

      const iso = toISODateTimeString(slotStart);
      const hhmm = extractTimePart(iso); // <- only "HH:MM"
      const key = `${iso}:${tableId}`;
      if (addedSlots.has(key)) continue;
      addedSlots.add(key);

      const suggestionDate = dateOnly(slotStart);

      // Add to sameDayTimes if calendar date equals desired date
      if (sameCalendarDay(slotStart, desiredDateOnly)) {
        sameDayTimes.push({ time: hhmm, tableId, date: suggestionDate });
      }

      // Add to sameTimeOfDayTimes if same AM/PM as requested
      const slotIsAM = slotStart.getHours() < 12;
      if (slotIsAM === requestedIsAM) {
        sameTimeOfDayTimes.push({ time: hhmm, tableId, date: suggestionDate });
      }

      // All valid slots in the window go in nextSevenDayTimes
      nextSevenDayTimes.push({ time: hhmm, tableId, date: suggestionDate });
    }
  }

  // ----------------- Sort results (by ISO time string ascending) -----------------
  const byIsoAsc = (a: { time: string }, b: { time: string }) =>
    a.time < b.time ? -1 : a.time > b.time ? 1 : 0;

  sameDayTimes.sort(byIsoAsc);
  sameTimeOfDayTimes.sort(byIsoAsc);
  nextSevenDayTimes.sort(byIsoAsc);

  return { sameTimeOfDayTimes, sameDayTimes, nextSevenDayTimes };
};
