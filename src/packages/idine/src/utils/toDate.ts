import { Timestamp } from "firebase/firestore"; // only needed if you're using Firestore SDK types

type MaybeDateInput =
  | Date
  | string
  | Timestamp
  | { seconds: number; nanoseconds: number }
  | Record<string, string>
  | null
  | undefined;

/**
 * Attempts to convert various types into a JavaScript Date.
 *
 * Supports:
 * - Date → returns as-is
 * - Firestore Timestamp → calls .toDate()
 * - { seconds, nanoseconds } object → reconstructs Date
 * - string (ISO or parseable) → new Date()
 */
export default (input: MaybeDateInput): Date | null => {
  if (!input) return null;

  // Already a Date
  if (input instanceof Date) return input;

  // Firestore Timestamp (client/server SDK)
  if (input instanceof Timestamp) return input.toDate();

  // Firestore JSON export shape
  if (
    typeof input === "object" &&
    "seconds" in input &&
    "nanoseconds" in input &&
    typeof input.seconds === "number" &&
    typeof input.nanoseconds === "number"
  ) {
    return new Date(input.seconds * 1000 + input.nanoseconds / 1e6);
  }

  // String case
  if (typeof input === "string") {
    const d = new Date(input);
    if (!isNaN(d.getTime())) return d;
  }

  return null; // not convertible
};
