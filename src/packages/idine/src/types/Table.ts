import TableStatus from "../enums/TableStatus";
import Coordinate from "./Coordinate";

/**
 * A dedicated seating space that can hold one party
 * and as many people as there are seats
 *
 */
export default interface Table {
  id: string;

  /**
   * A positive integer that employees can refer to when
   * serving tables
   */
  serverIndex: string;

  /**
   * The number of seats a table may have
   */
  seats: number;

  /**
   * Dimensions of the table, x is width y is length.
   * Units are measured in feet irl
   */
  dimensions: Coordinate;

  /**
   * Coordinates of the origin cell,
   * always located in the top-left
   * corner of the table
   */
  origin: Coordinate;

  /**
   * The **PRESENT** status of a table
   * The tables actual availability is determined
   * based on a scope of time, and if the table is reserved
   * during that time
   */
  status: TableStatus;
}
