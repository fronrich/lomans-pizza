import PageContentWrapper from "$lib/idine/components/elements/PageContentWrapper";
import Navigation from "$lib/idine/components/organisms/Navigation";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { useIDine } from "../../packages/idine";

export const Route = createFileRoute("/dashboard/_idine")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    currentUser,
    security: { banishGuest },
  } = useIDine();

  useEffect(() => {
    banishGuest();
  }, [currentUser]);

  return (
    <>
      <PageContentWrapper>
        <Outlet />
      </PageContentWrapper>
      <Navigation />
    </>
  );
}
