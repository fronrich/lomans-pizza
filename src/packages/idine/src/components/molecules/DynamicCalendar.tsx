import { FC, useCallback, useMemo } from "react";
import { Datepicker, Views } from "flowbite-react";
import { useController } from "react-hook-form";
import useProfilesContext from "../../hooks/contexts/useProfileContext";
import openDays from "../../utils/openDays";
import DayOfWeek from "../../enums/DayOfWeek";
import useReservationFormContext from "../../hooks/contexts/useReservationFormContext";

const DynamicCalendar: FC = () => {
  const { control } = useReservationFormContext();
  const { restaurant } = useProfilesContext();
  const open = useMemo(
    () => openDays(restaurant?.defaultOperationHours ?? []),
    [restaurant]
  );
  const filterFn = useCallback(
    (date: Date, view: Views) => {
      if (view === Views.Days) {
        const day = date.getDay();
        return open[day as DayOfWeek];
      }
      return true;
    },
    [open]
  );

  const { field } = useController({ name: "date", control: control });

  return (
    <Datepicker
      minDate={new Date()}
      className="block w-full"
      filterDate={filterFn}
      value={field.value}
      onChange={field.onChange}
    />
  );
};

export default DynamicCalendar;
