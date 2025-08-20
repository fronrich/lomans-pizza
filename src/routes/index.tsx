import Landing from "$lib/idine/components/pages/Landing";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Landing />;
}
