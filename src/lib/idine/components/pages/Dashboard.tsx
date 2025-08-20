import Reservation from "../../../../packages/idine/src/types/Reservation";
import { useIDine } from "../../../../packages/idine";
import { useNavigate } from "@tanstack/react-router";

const Dashboard = () => {
  const {
    currentUserReservations,
    display: {
      layouts: { ReservationTable },
    },
  } = useIDine();

  const nav = useNavigate();
  return (
    <>
      <h1 className="font-semibold lg:!text-7xl">My Reservations</h1>
      <ReservationTable
        onEdit={(reservation: Reservation) =>
          nav({ to: `/dashboard/edit/${reservation.id}` })
        }
        exclude={["guest", "phone", "email"]}
        reservations={currentUserReservations}
      />
    </>
  );
};

export default Dashboard;
