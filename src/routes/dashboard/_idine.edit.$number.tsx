import { createFileRoute } from "@tanstack/react-router";
import { useIDine } from "../../packages/idine";

export const Route = createFileRoute("/dashboard/_idine/edit/$number")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    display: {
      organisms: { EditReservationForm },
    },
  } = useIDine();

  const { number } = Route.useParams();

  return <EditReservationForm id={number} />;
}
