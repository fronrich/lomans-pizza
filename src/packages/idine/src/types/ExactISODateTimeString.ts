/**
 * Describes an exact point in time.
 *
 * For times that may repeat **weekly**, use
 * WeeklyISODateTimeString
 */
type ExactISODateTimeString =
  `${number}-${number}-${number}T${number}:${number}:${number}${string}`;

export default ExactISODateTimeString;
