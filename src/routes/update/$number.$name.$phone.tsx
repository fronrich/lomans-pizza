import { createFileRoute } from "@tanstack/react-router";
import { useIDine } from "../../packages/idine";

export const Route = createFileRoute("/update/$number/$name/$phone")({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const {
    display: {
      organisms: { UpdateConfirmation },
    },
  } = useIDine();
  return <UpdateConfirmation {...params} />;
}
