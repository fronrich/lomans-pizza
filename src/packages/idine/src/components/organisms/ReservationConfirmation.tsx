import { FC } from "react";
import useProfilesContext from "../../hooks/contexts/useProfileContext";
import { Button } from "flowbite-react";
import { useNavigate } from "@tanstack/react-router";

interface ReservationConfirmationProps {
  name: string;
  number: string;
  phone: string;
}

const ReservationConfirmation: FC<ReservationConfirmationProps> = ({
  name,
  number,
  phone,
}) => {
  const { restaurant, currentUser } = useProfilesContext();
  const nav = useNavigate();
  return (
    <section className="w-screen h-screen flex items-start justify-center lg:pt-32 pt-24 bg-surface-50">
      <div className="w-full max-w-xl p-8 flex flex-col text-center gap-8">
        <div className="flex flex-col">
          <span className="text-xl font-semibold uppercase motion-translate-y-in-100 motion-opacity-in-0 motion-ease-in-out-back motion-delay-200">
            🎉 Congratulations {name}! You're all set.
          </span>
          {restaurant && (
            <span className="motion-translate-y-in-100 motion-opacity-in-0 motion-ease-in-out-back motion-delay-300">
              See you at {restaurant?.name}!
            </span>
          )}
        </div>
        {restaurant && (
          <Button
            color={"alternative"}
            className="motion-translate-y-in-100 motion-opacity-in-0 motion-ease-in-out-back motion-delay-500"
            onClick={() => nav({ to: "/restaurants/lomans-pizza" })}
          >
            Back to {restaurant?.name}
          </Button>
        )}
        {currentUser && (
          <Button className="motion-translate-y-in-100 motion-opacity-in-0 motion-ease-in-out-back motion-delay-700">
            Manage your reservations with IDine
          </Button>
        )}
        <span className="italic motion-translate-y-in-100 motion-opacity-in-0 motion-ease-in-out-back motion-delay-1000">
          When you arrive, please let the hostess know your phone number,{" "}
          <strong>{phone}</strong>, or confirmation number{" "}
          <strong>#{number}</strong> to get checked in.
        </span>
      </div>
    </section>
  );
};

export default ReservationConfirmation;
