import { TextInput } from "flowbite-react";
import useIcon from "../../hooks/render/useIcon";
import useReservationFormContext from "../../hooks/contexts/useReservationFormContext";
const ChairComposition = () => {
  const { register, watch } = useReservationFormContext();
  const babyChairIcon = useIcon("noto:baby");
  const wheelChairIcon = useIcon("noto:woman-in-manual-wheelchair");

  const partySize = watch("partySize");
  const babyChairs = watch("seatingComposition.infants");
  const wheelChairs = watch("seatingComposition.wheelchairAccessible");
  return (
    <>
      <span className="text-sm">
        Please indicate if you need any high chairs or wheelchair accessible
        spots
      </span>
      <div className="flex gap-2">
        <TextInput
          className="w-full"
          type="number"
          icon={babyChairIcon}
          {...register("seatingComposition.infants")}
        />
        <TextInput
          className="w-full"
          type="number"
          icon={wheelChairIcon}
          {...register("seatingComposition.wheelchairAccessible")}
        />
      </div>
      {Number(babyChairs) + Number(wheelChairs) > Number(partySize) && (
        <span className="text-red-800 text-sm">
          You are requesting more chairs than you have. Please book a larger
          party or contact the restaurant
        </span>
      )}
    </>
  );
};

export default ChairComposition;
