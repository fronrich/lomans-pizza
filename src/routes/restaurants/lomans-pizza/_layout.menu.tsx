import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/restaurants/lomans-pizza/_layout/menu")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/restaurants/lomans-pizza/_layout/menu"!</div>;
}
