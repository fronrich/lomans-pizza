import { Tabs, TabItem } from "flowbite-react";
import useReservationFormContext from "../../hooks/contexts/useReservationFormContext";
import Logo from "../atoms/Logo";
import MemberBanner from "../molecules/MemberBanner";
import ProfileInfo from "../organisms/ProfileInfo";
import ReservationInfo from "../organisms/ReservationInfo";
import ConfirmationInfo from "../organisms/ConfirmationInfo";
import useIcon from "../../hooks/render/useIcon";
import AccommodationInfo from "../organisms/AccommodationInfo";

const FindReservationForm = () => {
  const { register, watch } = useReservationFormContext();
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

  return (
    <>
      <div className="relative mt-12 flex lg:flex-row flex-col justify-between lg:items-center items-start w-full drop-shadow-sm">
        <h3 className="!font-title lg:text-4xl uppercase !m-0">
          RESERVE A TABLE
        </h3>
        <div className="lg:flex flex-col gap-4 hidden">
          <div className="flex gap-2 items-center">
            <span className="lg:text-base text-xs text-nowrap">Powered by</span>{" "}
            <Logo />
          </div>
        </div>
      </div>

      <div className="w-full h-auto flex flex-col justify-between gap-4">
        <MemberBanner />
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
            <ConfirmationInfo />
          </TabItem>
        </Tabs>
      </div>
    </>
  );
};

export default FindReservationForm;
