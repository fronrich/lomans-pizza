import { Tabs, TabItem } from "flowbite-react";
import useReservationFormContext from "../../hooks/contexts/useReservationFormContext";
import ProfileInfo from "../organisms/ProfileInfo";
import ReservationInfo from "../organisms/ReservationInfo";
import useIcon from "../../hooks/render/useIcon";
import AccommodationInfo from "../organisms/AccommodationInfo";
import { FC, useEffect } from "react";
import ConfirmationUpdateInfo from "../organisms/ConfirmationUpdateInfo";
import CancelReservationButton from "../molecules/CancelReservationButton";
import { useNavigate } from "@tanstack/react-router";

interface EditReservationFormProps {
  id: string;
}

const EditReservationForm: FC<EditReservationFormProps> = ({ id }) => {
  const { register, watch, importReservation } = useReservationFormContext();
  const userIcon = useIcon("carbon:user");
  const reservationIcon = useIcon("carbon:document-attachment");
  const confirmationIcon = useIcon("carbon:bookmark-filled");
  const accommodationsIcon = useIcon("carbon:accessibility");
  const {
    firstName,
    lastName,
    phone,
    email,
    startDate,
    startTimeISO,
    partySize,
    seatingComposition,
  } = watch();

  const nav = useNavigate();

  useEffect(() => {
    try {
      importReservation(id);
    } catch (error) {
      console.error(error);
      nav({ to: "/dashboard" });
    }
  }, [id]);

  return (
    <>
      <div className="!font-idine relative mt-12 flex lg:flex-row flex-col justify-between lg:items-center items-start w-full drop-shadow-sm">
        <h3 className="!font-idine font-bold lg:text-4xl uppercase !m-0">
          Edit Reservation
        </h3>
      </div>
      <CancelReservationButton />
      <div className="w-full h-auto flex flex-col justify-between gap-4">
        <Tabs aria-label="reservation tabs" variant="underline">
          <TabItem active title="" icon={userIcon}>
            <ProfileInfo register={register} />
          </TabItem>

          <TabItem
            disabled={
              !firstName.length ||
              !lastName.length ||
              !phone.length ||
              !email.length
            }
            title=""
            icon={reservationIcon}
          >
            <ReservationInfo />
          </TabItem>
          <TabItem
            disabled={
              !firstName.length ||
              !lastName.length ||
              !phone.length ||
              !email.length ||
              !startDate ||
              !startTimeISO ||
              !partySize
            }
            title=""
            icon={accommodationsIcon}
          >
            <AccommodationInfo />
          </TabItem>
          <TabItem
            disabled={
              !firstName.length ||
              !lastName.length ||
              !phone.length ||
              !email.length ||
              !startDate ||
              !startTimeISO ||
              !partySize ||
              Number(seatingComposition.infants) +
                Number(seatingComposition.wheelchairAccessible) >
                Number(partySize)
            }
            title=""
            icon={confirmationIcon}
          >
            <ConfirmationUpdateInfo />
          </TabItem>
        </Tabs>
      </div>
    </>
  );
};

export default EditReservationForm;
