import { Link } from "@tanstack/react-router";
import useReservationFormContext from "../../hooks/contexts/useReservationFormContext";
import { Button } from "flowbite-react";
const ConfirmationInfo = () => {
  const { submitReservation } = useReservationFormContext();

  return (
    <section className="flex flex-col w-full gap-4">
      <span className="text-xs">
        By confirming a reservation, you acknowledge that you have read,
        understood, and agree to these{" "}
        <Link to="/restaurants/lomans-pizza/tos">Terms of Service.</Link>
      </span>
      <Button type="submit" onClick={submitReservation}>
        Confirm My Reservation
      </Button>
    </section>
  );
};

export default ConfirmationInfo;
