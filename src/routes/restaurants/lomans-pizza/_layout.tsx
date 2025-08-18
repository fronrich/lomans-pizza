import Navigation from "$lib/lomans-pizza/components/Navigation";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/restaurants/lomans-pizza/_layout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Outlet />
      <Navigation />
    </>
  );
}
