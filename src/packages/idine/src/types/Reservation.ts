import Allergen from "../enums/Allergen";
import Diet from "../enums/Diet";
import ReservationStatus from "../enums/ReservationStatus";
import RelativeISODateTimeString from "./RelativeISODateTimeString";
import SeatingComposition from "./SeatingComposition";

export default interface Reservation {
  id: string;

  /**
   * guest who made reservation
   * if undefined, user is guest
   */
  guestId?: string;

  /**
   * These will be auto populated if the guest is logged in
   * otherwise, they must be filled out
   */
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  /**
   * Items in this list are **filtered out of the safe menu** for the table
   *  at the restaurant, guests can change their menus independently
   */
  allergies: Allergen[];

  /**
   * Items in this list are **highlighted in the safe menu** for the table
   * at the restaurant, guests can change their menus independently
   */
  diets: Diet[];

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

  /**
   * For easy access for management dashboard
   */
  tableServerIndices: string[];

  seatingComposition: SeatingComposition;

  // determined by the user
  partySize: number;

  /**
   * Suggested date to look around
   */
  date?: Date;

  targetTime?: RelativeISODateTimeString;

  /**
   * actual date of the reservation
   */
  startDate: Date | null;

  /**
   * transformed to duration once reservation is confirmed
   * Assume that end time can always be calculated by adding 90
   * minutes to the start time
   */
  startTimeISO: RelativeISODateTimeString;

  status: ReservationStatus;

  /**
   * once the customers pay, the tab is collected here
   * item ids are allowed to repeat
   */
  tab: string[];
}
