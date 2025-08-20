import { FC } from "react";
import { Button } from "flowbite-react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import useProfilesContext from "../../hooks/contexts/useProfileContext";
import { useNavigate } from "@tanstack/react-router";

interface UpdateConfirmationProps {
  name: string;
  number: string;
  phone: string;
}

const UpdateConfirmation: FC<UpdateConfirmationProps> = ({
  name,
  number,
  phone,
}) => {
  const { restaurant, currentUser } = useProfilesContext();
  const nav = useNavigate();
  const { width, height } = useWindowSize();
  return (
    <>
      <section className="w-screen h-screen flex items-start justify-center lg:pt-48 pt-24 bg-surface-50">
        <div className="w-full max-w-xl p-8 flex flex-col text-left lg:text-center gap-8">
          <div className="flex flex-col">
            <span className="text-xl font-semibold uppercase motion-translate-y-in-100 motion-opacity-in-0 motion-ease-in-out-back motion-delay-200">
              <span>🎉</span> And that's it {name}, you're all set!
            </span>

            {restaurant && (
              <span className="motion-translate-y-in-100 motion-opacity-in-0 motion-ease-in-out-back motion-delay-300">
                We'll let {restaurant?.name} know you've changed your
                reservation.
              </span>
            )}
          </div>
          {currentUser && (
            <Button
              onClick={() => nav({ to: "/dashboard" })}
              className="motion-translate-y-in-100 motion-opacity-in-0 motion-ease-in-out-back motion-delay-700"
            >
              Manage your reservations with IDine
            </Button>
          )}
          <div className="flex flex-col text-xs motion-translate-y-in-100 motion-opacity-in-0 motion-ease-in-out-back motion-delay-[2200ms]">
            <strong>Confirmation #: {number}</strong>
            <strong>Phone #: {phone}</strong>
          </div>
        </div>
      </section>
      <Confetti width={width} height={height} numberOfPieces={20} />
    </>
  );
};

export default UpdateConfirmation;
