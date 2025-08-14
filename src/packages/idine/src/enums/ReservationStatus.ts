enum ReservationStatus {
  /**
   * The reservation was created but not confirmed
   */
  HOLD,
  CREATED,
  CONFIRMED,
  CANCELED,
  CHECKED_IN,
  SEATED,
  NO_SHOW,

  /**
   * The reservation is complete, and the customer was served and paid
   */
  COMPLETE,
}

export default ReservationStatus;
