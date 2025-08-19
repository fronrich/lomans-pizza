import { FC } from "react";
import ReservationSuggestion from "../../types/ReservationSuggestion";
import { Button } from "flowbite-react";
import convert24ToAmPm from "../../utils/convert24ToAmPm";
import RelativeISOTimeString from "../../types/RelativeISOTimeString";
import useReservationFormContext from "../../hooks/contexts/useReservationFormContext";
import useProfilesContext from "../../hooks/contexts/useProfileContext";

const ReservationTime: FC<Partial<ReservationSuggestion>> = ({
  time,
  date,
  tableId,
}) => {
  const { watch, setValue } = useReservationFormContext();
  const { tables } = useProfilesContext();
  const startTime = watch("startTimeISO");
  const startDate = watch("startDate");

  const shouldHighlight: boolean =
    !!startTime.length &&
    time === startTime &&
    !!startDate &&
    date?.toDateString() === startDate.toDateString();
  return (
    <Button
      onClick={() => {
        setValue("startTimeISO", time as RelativeISOTimeString);
        if (date) {
          setValue("startDate", date);
        }
        if (tableId) {
          setValue("tableIds", [tableId]);
          setValue("tableServerIndices", [
            tables.find((table) => table.id === tableId)?.serverIndex ?? "",
          ]);
        }
      }}
      outline={!shouldHighlight}
    >
      <span className="font-semibold uppercase text-nowrap">
        {convert24ToAmPm(time as RelativeISOTimeString)}
      </span>
    </Button>
  );
};

export default ReservationTime;
