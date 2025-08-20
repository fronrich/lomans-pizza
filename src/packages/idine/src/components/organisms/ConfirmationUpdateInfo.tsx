import { Link } from "@tanstack/react-router";
import useReservationFormContext from "../../hooks/contexts/useReservationFormContext";
import { Button } from "flowbite-react";
import useProfilesContext from "../../hooks/contexts/useProfileContext";
import formatDatePretty from "../../utils/formatDatePretty";
import convert24ToAmPm from "../../utils/convert24ToAmPm";
import RelativeISOTimeString from "../../types/RelativeISOTimeString";
import AllergenVisual from "../molecules/AllergenVisual";
import DietVisual from "../molecules/DietVisual";
import { Icon } from "@iconify/react";

/**
 * use when updating a reservation
 */
const ConfirmationUpdateInfo = () => {
  const { updateReservation, getValues } = useReservationFormContext();
  const { restaurant } = useProfilesContext();
  const {
    firstName,
    lastName,
    phone,
    email,
    partySize,
    startDate,
    startTimeISO,
    tableServerIndices,
    allergies,
    diets,
    seatingComposition,
    requests,
  } = getValues();

  return (
    <section className="flex flex-col w-full gap-2">
      <span>
        <strong>Who: </strong>
        {firstName} {lastName}, Party of {partySize}
      </span>
      <span className="text-xs italic">
        {email} | {phone}
      </span>
      <span>
        <strong>Where: </strong> {restaurant?.name}, {restaurant?.address},
        Table {tableServerIndices[0]}
      </span>
      <span>
        <strong>When: </strong>
        {startDate && formatDatePretty(startDate as Date)},{" "}
        {startTimeISO &&
          convert24ToAmPm(startTimeISO as RelativeISOTimeString)}{" "}
      </span>
      {!!allergies.length ||
      !!diets.length ||
      seatingComposition.infants ||
      seatingComposition.wheelchairAccessible ? (
        <>
          <strong>Accommodations</strong>
          <div className="flex w-full flex-wrap gap-4 justify-start items-center">
            {allergies.map((allergen) => (
              <AllergenVisual key={allergen} allergen={Number(allergen)} />
            ))}

            {diets.map((diet) => (
              <DietVisual key={diet} diet={Number(diet)} />
            ))}

            {Number(seatingComposition.infants) > 0 && (
              <div className="flex flex-nowrap items-center">
                <Icon icon={"noto:baby"} />×{seatingComposition.infants}
              </div>
            )}
            {Number(seatingComposition.wheelchairAccessible) > 0 && (
              <div className="flex flex-nowrap items-center">
                <Icon icon={"noto:woman-in-manual-wheelchair"} />×
                {seatingComposition.wheelchairAccessible}
              </div>
            )}
          </div>
          {requests && (
            <span>
              <strong>Requests: </strong>
              {requests}
            </span>
          )}
        </>
      ) : (
        <></>
      )}
      <span className="text-xs">
        By confirming a reservation, you acknowledge that you have read,
        understood, and agree to these{" "}
        <Link
          to="/restaurants/lomans-pizza/tos"
          className="text-primary-700 underline"
        >
          Terms of Service.
        </Link>
      </span>
      <Button color={"alternative"} type="submit" onClick={updateReservation}>
        Update My Reservation
      </Button>
    </section>
  );
};

export default ConfirmationUpdateInfo;
