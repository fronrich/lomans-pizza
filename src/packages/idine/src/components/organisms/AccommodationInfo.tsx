import { Textarea } from "flowbite-react";
import ChairComposition from "../molecules/ChairComposition";
import MenuRestrictions from "../molecules/MenuRestrictions";
import useReservationFormContext from "../../hooks/contexts/useReservationFormContext";

const AccommodationInfo = () => {
  const { register } = useReservationFormContext();
  return (
    <section className="flex flex-col w-full gap-4">
      <ChairComposition />
      <MenuRestrictions />
      <Textarea
        rows={5}
        placeholder="Any special requests?"
        {...register("requests")}
      />
    </section>
  );
};

export default AccommodationInfo;
