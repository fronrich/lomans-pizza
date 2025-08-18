import { Tabs, TabItem } from "flowbite-react";
import useReservationFormContext from "../../hooks/contexts/useReservationFormContext";
import Logo from "../atoms/Logo";
import MemberBanner from "../molecules/MemberBanner";
import { Icon } from "@iconify/react";
import ProfileInfo from "../organisms/ProfileInfo";
import ReservationInfo from "../organisms/ReservationInfo";

const FindReservationForm = () => {
  const { register } = useReservationFormContext();
  return (
    <>
      <div className="mt-12 flex lg:flex-row flex-col justify-between lg:items-center items-start w-full">
        <h3 className="!font-title lg:text-4xl uppercase text-surface-50 !m-0">
          RESERVE A TABLE
        </h3>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <span className="lg:text-base text-xs text-nowrap">Powered by</span>{" "}
            <Logo />
          </div>
        </div>
      </div>

      <div className="w-full h-auto flex flex-col justify-between gap-4">
        <MemberBanner />
        <Tabs aria-label="reservation tabs" variant="underline">
          <TabItem
            active
            title="Your Info"
            icon={() => <Icon icon="carbon:user" />}
          >
            <ProfileInfo register={register} />
          </TabItem>
          <TabItem
            title="Reservation Info"
            icon={() => <Icon icon="carbon:document-attachment" />}
          >
            <ReservationInfo />
          </TabItem>
          <TabItem
            title="Confirm"
            icon={() => <Icon icon="carbon:document-attachment" />}
          ></TabItem>
        </Tabs>
      </div>
    </>
  );
};

export default FindReservationForm;
