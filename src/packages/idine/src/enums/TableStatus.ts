enum TableStatus {
  /**
   * Table is not currently occupied.
   * This plus any reservations determines table
   * availability
   */
  UNOCCUPIED,

  /**
   * Table currently has guests at it.
   * This prevents walk ins from occupying the table
   */
  OCCUPIED,

  /**
   * The table has been closed due to under staffing
   * and will be ignored when considering reservation spots
   */
  UNAVAILABLE,

  /**
   * After customers leave, table must be cleaned,
   * and cannot be occupied until a clean.
   * This is set manually by employees during service
   */
  BEING_CLEANED,
}

export default TableStatus;
