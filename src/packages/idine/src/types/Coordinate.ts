/**
 * A location on a 2D plane.
 *
 * {x: 0, y: 0} is the top-left of the plane;
 * {x: n, y: m} in the bottom-right of a plane with dimensions nXm
 */
export default interface Coordinate {
  x: number;
  y: number;

  /**
   * This is optional, might want to support 3D dimension
   * in the future for wheelchair / high chair
   * accessibility, bar vs table. etc.
   */
  z?: number;
}
