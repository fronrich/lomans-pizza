import { Button } from "flowbite-react";
import { useNavigate } from "@tanstack/react-router";

const ReservationButton = () => {
  const nav = useNavigate();
  return (
    <Button
      className="w-full"
      onClick={() =>
        nav({
          to: "/restaurants/lomans-pizza",
          hash: "reservation",
        })
      }
    >
      Find a Reservation
    </Button>
  );
};

export default ReservationButton;
