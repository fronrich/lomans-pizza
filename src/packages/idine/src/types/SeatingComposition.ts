/**
 * In order to be accommodating, baby chairs
 * and wheelchair accessible seating can be
 * provided
 */
export default interface SeatingComposition {
  /**
   * This cannot be manually changed by the guest
   * and is determined by subtracting infant and
   * wheelchair seating from total guests.
   */
  regular: number;
  infants: number;
  wheelchairAccessible: number;
}
