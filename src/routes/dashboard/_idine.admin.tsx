import { createFileRoute } from "@tanstack/react-router";
import { useIDine } from "../../packages/idine";
import AdminDashboard from "$lib/idine/components/pages/AdminDashboard";
import { useEffect } from "react";

export const Route = createFileRoute("/dashboard/_idine/admin")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    currentUser,
    security: { banishNonAdmins },
  } = useIDine();

  useEffect(() => {
    banishNonAdmins();
  }, [currentUser]);

  return <AdminDashboard />;
}
