import Reservation from "../../../../packages/idine/src/types/Reservation";
import { useIDine } from "../../../../packages/idine";
import { useNavigate } from "@tanstack/react-router";

const AdminDashboard = () => {
  const {
    restaurant,
    reservations,
    display: {
      layouts: { ReservationTable },
    },
  } = useIDine();

  const nav = useNavigate();
  return (
    <>
      <h1 className="font-semibold lg:!text-7xl">
        {restaurant?.name} Reservations
      </h1>
      <ReservationTable
        onEdit={(reservation: Reservation) =>
          nav({ to: `/dashboard/edit/${reservation.id}` })
        }
        exclude={[]}
        reservations={reservations}
      />
    </>
  );
};

export default AdminDashboard;
