import { Select } from "flowbite-react";
import { UseFormRegister } from "react-hook-form";
import ALL_30_MINUTE_INTERVALS from "../../constants/ALL_30_MINUTE_INTERVALS";
import convert24ToAmPm from "../../utils/convert24ToAmPm";
import { FC } from "react";
import Reservation from "../../types/Reservation";

interface TimeSelectorProps {
  register: UseFormRegister<Reservation>;
}

const TimeSelector: FC<TimeSelectorProps> = ({ register }) => {
  return (
    <Select {...register("targetTime")}>
      {ALL_30_MINUTE_INTERVALS.map((interval) => (
        <option key={interval} value={interval}>
          {convert24ToAmPm(interval)}
        </option>
      ))}
    </Select>
  );
};

export default TimeSelector;
