import { useState } from "react";
import useReservationFormContext from "../../hooks/contexts/useReservationFormContext";
import useReservationFinder from "../../hooks/useReservationFinder";
import { Button, ButtonGroup, Dropdown, DropdownItem } from "flowbite-react";
import groupSuggestionsByDate from "../../utils/groupSuggestionsByDate";
import ReservationTime from "../molecules/ReservationTime";
import formatDatePretty from "../../utils/formatDatePretty";
const ReservationResults = () => {
  const { watch } = useReservationFormContext();
  const date = watch("date");

  const [recommendSameDay, setRecommendSameDay] = useState<boolean>(true);
  const [dayFilter, setDayFilter] = useState<string>("");
  const { results } = useReservationFinder();

  if (!results) {
    return;
  }

  const { sameDayTimes, sameTimeOfDayTimes } = results;

  return (
    <div className="w-full flex-col gap-4">
      <div className="pb-4">
        <Dropdown
          label={`Filter Results (${recommendSameDay ? `Same Day, ${date && formatDatePretty(date)}` : "Same Time of Day"})`}
          className="not-prose lg:w-auto w-full"
        >
          <DropdownItem
            onClick={() => setRecommendSameDay(false)}
            className={`${!recommendSameDay && "!bg-primary-300"} border-none w-full rounded-lg`}
          >
            Time of day
          </DropdownItem>
          <DropdownItem
            onClick={() => setRecommendSameDay(true)}
            className={`${recommendSameDay && "!bg-primary-300"} border-none w-full rounded-lg`}
          >
            Same Day
          </DropdownItem>
        </Dropdown>
      </div>

      <div className="w-full flex flex-col justify-center gap-4 h-full">
        {!recommendSameDay && (
          <>
            <ButtonGroup className="w-full overflow-x-auto">
              {Object.keys(groupSuggestionsByDate(sameTimeOfDayTimes)).map(
                (day) => (
                  <Button
                    onClick={() => {
                      setDayFilter(day);
                      console.log(day);
                    }}
                    color={dayFilter === day ? "default" : "alternative"}
                    className="w-full text-nowrap"
                    key={day}
                  >
                    {formatDatePretty(day)}
                  </Button>
                )
              )}
            </ButtonGroup>

            <div className="flex flex-row w-full gap-4 overflow-x-auto pb-8 pt-1">
              {dayFilter &&
                [...groupSuggestionsByDate(sameTimeOfDayTimes)[dayFilter]].map(
                  (time) => (
                    <ReservationTime
                      key={time}
                      time={time}
                      date={new Date(dayFilter)}
                    />
                  )
                )}
            </div>
          </>
        )}
        {recommendSameDay && (
          <>
            {!sameDayTimes.length && (
              <div className="font-semibold uppercase w-full text-center p-2">
                No Reservations Available For {date && formatDatePretty(date)},
                Try Filtering By Time Of Day.
              </div>
            )}
            <div className="flex flex-row w-full gap-4 overflow-x-auto pb-8 pt-1">
              {sameDayTimes.map((suggestion) => (
                <ReservationTime
                  key={suggestion.time}
                  time={suggestion.time}
                  date={date}
                  tableId={suggestion.tableId}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReservationResults;
