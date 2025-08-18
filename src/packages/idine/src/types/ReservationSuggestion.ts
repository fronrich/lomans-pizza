import RelativeISODateTimeString from "./RelativeISODateTimeString";

export default interface ReservationSuggestion {
  time: RelativeISODateTimeString;
  tableId: string;
  date: Date;
}
