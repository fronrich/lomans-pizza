import { createFileRoute } from "@tanstack/react-router";
import { useIDine } from "../../packages/idine";

export const Route = createFileRoute("/confirmation/$number/$name/$phone")({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const {
    display: {
      organisms: { ReservationConfirmation },
    },
  } = useIDine();
  return <ReservationConfirmation {...params} />;
}
