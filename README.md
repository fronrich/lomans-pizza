Hello. I have a very complex problem that I want to create a function to solve. I am creating a reservation platform for a restaurant, and need it to be able to suggest reservations given time and space constraints. Here is the completion criteria:

- I want the function to be called "getTimeSuggestions".

- getTimeSuggestions is a TS function that should take six parameters, "partySize", "operationHours", "date", "time", "tables", and "currentReservations".
  - partySize is number. It is the number of people in a party. If the party is larger than the largest table, throw an error, as this should not happen.
  - operationHours is a RelativeDuration[]. Assume any RelativeDuration objects in this array refer to times when the restaurant is open. I will be providing you will all the type definitions I created after explaining everything.
  - date is a Date object, used to get the day a user wants a reservation.
  - time is RelativeISODateTimeString.
  - tables is an array of Table objects
  - currentReservations is an array of Reservation Objects

-getTimeSuggestions then returns an object with the keys "sameTimeOfDayTimes", "sameDayTimes", "sameWeekTimes"

- sameTimeOfDayTimes is a {time: RelativeISODateTimeString, tableId: string}[] that contains available reservations within the same time of day (AM/PM). For example, if the user wanted to reserve for 20:00, and 10:00, 13:00, 15:30 and 20:00 were available, sameTimeOfDayTimes would return [{time: 13:00, tableId: "some-id"}, {time: 15:30, tableId: "some-id"}, {time: 20:00, tableId: "some-id"} ]
- sameDayTimes contains available {time: RelativeISODateTimeString, tableId: string}[] within the same day
- same WeekTimes contains available {time: RelativeISODateTimeString, tableId: string}[] within the same week

ASSUMPTIONS:

- Reservations can only be booked on 30 minute intervals (ex. can be booked on 6:00 or 6:30, not 6:15), meaning you can assume the time parameter will be on a 30 minute interval
- Reservations will always be 90 minutes long
- No part of a reservation can exist outside of open hours. This means that if opening hours on one day are 9:00-21:00, The latest reservation that can be booked would start at 19:30 and end at 21:00
- Assume that reservations can only occupy one table, meaning that the tableIds string[] of a reservation will only contain a single tableId
- Reservations that happen at the same time cannot share the same table. Therefore, even if a table that seats 6 is reserved for 1 guest, that table is not available to be reserved until that guests reservation ends.
- In terms of suggesting tables for reservations, the table seating capacity should be as close but no less than the party size. Parties can reserve tables with more seats than they need, but this is only if there are no smaller tables that will accommodate them. Ultimately, every guest needs a seat, but it would not be profitable to have a bunch of unused chairs.

TYPE DEFS:

// RelativeISOTimeString - ISO-like time string (24h format)
type HH = `${0 | 1}${number}` | `2${0 | 1 | 2 | 3}`;
type MM = `${0 | 1 | 2 | 3 | 4 | 5}${number}`;
type SS = MM;
type RelativeISOTimeString = `${HH}:${MM}` | `${HH}:${MM}:${SS}`;

enum DayOfWeek {
SUNDAY,
MONDAY,
TUESDAY,
WEDNESDAY,
THURSDAY,
FRIDAY,
SATURDAY,
}

export default interface RelativeDuration {
startTime: RelativeISOTimeString;
endTime: RelativeISOTimeString;
repeat: DayOfWeek[];
}

/\*\*

- A dedicated seating space that can hold one party
- and as many people as there are seats
- \*/
  export default interface Table {
  id: string;

  /\*\*
  - A positive integer that employees can refer to when
  - serving tables
    \*/
    serverIndex: string;

  /\*\*
  - The number of seats a table may have
    \*/
    seats: number;

  /\*\*
  - Dimensions of the table, x is width y is length.
  - Units are measured in feet irl
    \*/
    dimensions: Coordinate;

  /\*\*
  - Coordinates of the origin cell,
  - always located in the top-left
  - corner of the table
    \*/
    origin: Coordinate;

  /\*\*
  - The **PRESENT** status of a table
  - The tables actual availability is determined
  - based on a scope of time, and if the table is reserved
  - during that time
    \*/
    status: TableStatus;
    }

/\*\*

- A location on a 2D plane.
-
- {x: 0, y: 0} is the top-left of the plane;
- {x: n, y: m} in the bottom-right of a plane with dimensions nXm
  \*/
  export default interface Coordinate {
  x: number;
  y: number;

/\*\*

- This is optional, might want to support 3D dimension
- in the future for wheelchair / high chair
- accessibility, bar vs table. etc.
  \*/
  z?: number;
  }

enum TableStatus {
/\*\*

- Table is not currently occupied.
- This plus any reservations determines table
- availability
  \*/
  UNOCCUPIED,

/\*\*

- Table currently has guests at it.
- This prevents walk ins from occupying the table
  \*/
  OCCUPIED,

/\*\*

- The table has been closed due to under staffing
- and will be ignored when considering reservation spots
  \*/
  UNAVAILABLE,

/\*\*

- After customers leave, table must be cleaned,
- and cannot be occupied until a clean.
- This is set manually by employees during service
  \*/
  BEING_CLEANED,
  }

export default interface Reservation {
id: string;

/\*\*

- guest who made reservation
- if undefined, user is guest
  \*/
  guestId?: string;

/\*\*

- These will be auto populated if the guest is logged in
- otherwise, they must be filled out
  \*/
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  /\*\*
- Items in this list are **filtered out of the safe menu** for the table
- at the restaurant, guests can change their menus independently
  \*/
  allergies: Allergen[];

/\*\*

- Items in this list are **highlighted in the safe menu** for the table
- at the restaurant, guests can change their menus independently
  \*/
  diets: Diet[];

/\*\*

- Restaurant associated with the reservation
  \*/
  restaurantId: string;

/\*\*

- Determined by the booking algorithm for parties <= 8.
- For parties > 8, store owner has option to reject reservation
- or accept and combine tables. Do note that combining tables may
- result in many unused seats
  \*/
  tableIds: string[];

seatingComposition: SeatingComposition;

// determined by the user
partySize: number;

date: Date;

/\*\*

- transformed to duration once reservation is confirmed
- Assume that end time can always be calculated by adding 90
- minutes to the start time
  \*/
  startTimeISO?: RelativeISOTimeString;

status: ReservationStatus;

/\*\*

- once the customers pay, the tab is collected here
- item ids are allowed to repeat
  \*/
  tab: string[];
  }
