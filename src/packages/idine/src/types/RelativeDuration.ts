import DayOfWeek from "../enums/DayOfWeek";
import RelativeISOTimeString from "./RelativeISODateTimeString";
export default interface RelativeDuration {
  startTime: RelativeISOTimeString;
  endTime: RelativeISOTimeString;
  repeat: DayOfWeek[];
}
