import Coordinate from "./Coordinate";
import RelativeDuration from "./RelativeDuration";

export default interface Restaurant {
  id: string;

  /**
   * admins of a restaurant
   * Can be any user in db
   */
  adminIds: string[];

  /**
   * Loman's Pizza by default
   */
  name: string;

  logoURL: string;

  address: string;

  /**
   * Dimensions of the dining room, x is width y is length.
   * Units are measured in feet irl
   */
  dimensions: Coordinate;

  /**
   * If Loman's or another restaurant opens up a chain, they may
   * want to register it as a different restaurant so the reservation
   * systems are decoupled. However, they may want to migrate some menu items
   * from their old location and have them syn across locations, which is why
   * we refer to menu item ids instead of declaring menu items
   */
  menuItemIds: Set<string>;

  /**
   * Even with sync menus, some locations may be out of ingredients.
   * This array allows restaurants to temporarily take items off the menu
   * If they are out of stock
   */
  outOfStockItemIds: Set<string>;

  /**
   * An array of table id associated with the restaurant
   * Designed this way so contractor analytics team
   * can easily aggregate cross-restaurant data
   * for pattern analysis
   */
  tableIds: Set<string>;

  /**
   * An array of bookings for the restaurant
   * Designed this way so contractor analytics team
   * can easily aggregate cross-restaurant data
   * for pattern analysis
   */
  reservationIds: Set<string>;

  /**
   * An array of operational hours throughout the week
   */
  defaultOperationHours: RelativeDuration[];

  /**
   * The default number of minutes a reservation is held after being created
   * 5 by default
   */
  defaultHoldMinutes: number;

  /**
   * default number of minutes for the reservation
   * Per the assignment, this is set to 90 minutes by default
   */
  defaultReservationLength: number;
}
