import RelativeISOTimeString from "../types/RelativeISOTimeString";
/**
 * convert24ToAmPm
 * Converts a 24-hour time string ("HH:MM" or "HH:MM:SS") into "HH:MM AM/PM".
 *
 * Examples:
 *   "00:00"   -> "12:00 AM"
 *   "09:30"   -> "09:30 AM"
 *   "12:00"   -> "12:00 PM"
 *   "15:45"   -> "03:45 PM"
 *   "23:59"   -> "11:59 PM"
 *
 * Throws on invalid input.
 */
const convert24ToAmPm = (time24: RelativeISOTimeString): string => {
  const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`);

  if (typeof time24 !== "string") {
    throw new Error('time24 must be a string in "HH:MM" or "HH:MM:SS" format');
  }

  const parts = time24.split(":");
  if (parts.length < 2)
    throw new Error('Invalid time format. Expected "HH:MM" or "HH:MM:SS".');

  const hh = Number(parts[0]);
  const mm = Number(parts[1]);

  if (!Number.isInteger(hh) || !Number.isInteger(mm)) {
    throw new Error("Invalid numeric values in time string.");
  }
  if (hh < 0 || hh > 23) throw new Error("Hour must be between 0 and 23.");
  if (mm < 0 || mm > 59) throw new Error("Minutes must be between 0 and 59.");

  // Convert to 12-hour clock
  const period = hh < 12 ? "AM" : "PM";
  // 00 -> 12 AM, 12 -> 12 PM, 13 -> 01 PM, etc.
  const hour12 = hh % 12 === 0 ? 12 : hh % 12;

  return `${pad2(hour12)}:${pad2(mm)} ${period}`;
};

export default convert24ToAmPm;
