import Allergen from "../enums/Allergen";
import Diet from "../enums/Diet";
import ReservationStatus from "../enums/ReservationStatus";
import ExactDuration from "./ExactDuration";
import SeatingComposition from "./SeatingComposition";

export default interface Reservation {
  id: string;

  /**
   * guest who made reservation
   */
  guestId: string;

  /**
   * Restaurant associated with the reservation
   */
  restaurantId: string;

  /**
   * Determined by the booking algorithm for parties <= 8.
   * For parties > 8, store owner has option to reject reservation
   * or accept and combine tables. Do note that combining tables may
   * result in many unused seats
   */
  tableIds: string[];

  seatingComposition: SeatingComposition;

  // determined by the user
  partySize: number;

  /**
   * ISO string representing the date and time that a reservation takes place.
   *
   * The end time is determined by adding default reservation length to the startTime,
   * so it does not need to be stored.
   *
   *
   */
  duration: ExactDuration;

  /**
   * ISO string representing the date and time
   *
   * If a reservation is created, it is held for defaultHold
   */
  holdDuration: ExactDuration;

  /**
   * Items in this list are **filtered out of the safe menu**
   */
  allergies: Allergen[];

  /**
   * Items in this list are **highlighted in the safe menu**
   */
  diets: Diet[];

  status: ReservationStatus;

  /**
   * once the customers pay, the tab is collected here
   * item ids are allowed to repeat
   */
  tab: string[];
}
