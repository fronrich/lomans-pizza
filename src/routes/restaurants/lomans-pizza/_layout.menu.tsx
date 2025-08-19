import Menu from "$lib/lomans-pizza/components/Menu";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/restaurants/lomans-pizza/_layout/menu")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Menu />;
}
