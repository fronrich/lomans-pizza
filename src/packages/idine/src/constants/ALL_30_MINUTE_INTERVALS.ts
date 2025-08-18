// Type alias from your defs (kept for clarity)
type HH = `${0 | 1}${number}` | `2${0 | 1 | 2 | 3}`;
type MM = `${0 | 1 | 2 | 3 | 4 | 5}${number}`;
type SS = MM;
type RelativeISOTimeString = `${HH}:${MM}` | `${HH}:${MM}:${SS}`;

// Constants
const MINUTES_IN_DAY = 24 * 60;
const SLOT_INTERVAL_MINUTES = 30;

// Helper: zero-pad
const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`);

// Generator function
export function getAll30MinuteIntervals(): RelativeISOTimeString[] {
  const intervals: RelativeISOTimeString[] = [];
  for (let m = 0; m < MINUTES_IN_DAY; m += SLOT_INTERVAL_MINUTES) {
    const hh = Math.floor(m / 60);
    const mm = m % 60;
    intervals.push(`${pad2(hh)}:${pad2(mm)}` as RelativeISOTimeString);
  }
  return intervals;
}

// Precomputed constant (calls generator once)
const ALL_30_MINUTE_INTERVALS: RelativeISOTimeString[] =
  getAll30MinuteIntervals();

export default ALL_30_MINUTE_INTERVALS;
