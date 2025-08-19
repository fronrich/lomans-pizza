import useReservationFormContext from "./contexts/useReservationFormContext";
import getTimeSuggestions from "../utils/getTimeSuggestions";
import { useMemo } from "react";
import useProfilesContext from "./contexts/useProfileContext";
import ReservationSuggestion from "../types/ReservationSuggestion";
import RelativeISOTimeString from "../types/RelativeISOTimeString";

export default () => {
  const { watch } = useReservationFormContext();
  const { tables, reservations, restaurant, maxGuests } = useProfilesContext();

  const partySize = watch("partySize");
  const date = watch("date");
  const time = watch("targetTime");

  const results: {
    sameTimeOfDayTimes: ReservationSuggestion[];
    sameDayTimes: ReservationSuggestion[];
    nextSevenDayTimes: ReservationSuggestion[];
  } | null = useMemo(() => {
    if (!restaurant || !partySize || partySize > maxGuests || !date || !time) {
      return null;
    }

    const suggestions = getTimeSuggestions({
      time: time as RelativeISOTimeString,
      date: date,
      partySize: partySize,
      currentReservations: reservations,
      operationHours: restaurant?.defaultOperationHours,
      tables: tables,
    });

    return suggestions;
  }, [partySize, date, time]);

  return { results };
};
