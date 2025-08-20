import Dashboard from "$lib/idine/components/pages/Dashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_idine/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Dashboard />;
}
