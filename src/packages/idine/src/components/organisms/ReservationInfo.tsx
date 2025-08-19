import useReservationFormContext from "../../hooks/contexts/useReservationFormContext";
import { Select } from "flowbite-react";
import useProfilesContext from "../../hooks/contexts/useProfileContext";
import { FC } from "react";
import DynamicCalendar from "../molecules/DynamicCalendar";
import TimeSelector from "../molecules/TimeSelector";
import ReservationResults from "./ReservationResults";
import useIcon from "../../hooks/render/useIcon";

const ReservationInfo: FC = () => {
  const { register, watch } = useReservationFormContext();
  const { maxGuests } = useProfilesContext();
  const partySizeIcon = useIcon("carbon:user-avatar-filled");
  const partySize = watch("partySize");

  return (
    <section className="flex flex-col w-full gap-2">
      <div className="flex lg:flex-row flex-col gap-2">
        <Select
          required
          className="w-full"
          id="partySize"
          {...register("partySize")}
          icon={partySizeIcon}
        >
          {[...Array(maxGuests + 2)].map((_, index) => (
            <option key={`guests-${index + 0}`} value={index}>
              {(() => {
                switch (index) {
                  case 0:
                    return "Select Party Size";
                  case maxGuests + 1:
                    return `${maxGuests + 1}+ People`;
                  default:
                    return `${index} People`;
                }
              })()}
            </option>
          ))}
        </Select>

        {partySize > 1 && partySize <= maxGuests && <DynamicCalendar />}
      </div>

      {partySize > 1 && partySize <= maxGuests && (
        <TimeSelector register={register} />
      )}
      {partySize > maxGuests && (
        <span className="text-primary-500 font-base uppercase font-semibold">
          For parties greater than {maxGuests}, please contact the restaurant at{" "}
          <span className="underline">(XXX) XXX-XXXX</span>
        </span>
      )}
      <ReservationResults />
    </section>
  );
};

export default ReservationInfo;
