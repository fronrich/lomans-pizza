import TermsOfService from "$lib/lomans-pizza/components/TermsOfService";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/restaurants/lomans-pizza/_layout/tos")({
  component: RouteComponent,
});

function RouteComponent() {
  return <TermsOfService />;
}
