import PageContentWrapper from "$lib/idine/components/elements/PageContentWrapper";
import Navigation from "$lib/idine/components/organisms/Navigation";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_idine")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <PageContentWrapper>
        <Outlet />
      </PageContentWrapper>
      <Navigation />
    </>
  );
}
