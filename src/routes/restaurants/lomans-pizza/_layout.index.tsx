import { createFileRoute } from "@tanstack/react-router";
import Landing from "$lib/lomans-pizza/components/Landing";
import Story from "$lib/lomans-pizza/components/Story/Story";
import Reservation from "$lib/lomans-pizza/components/Reservation";
export const Route = createFileRoute("/restaurants/lomans-pizza/_layout/")({
  component: Index,
});

function Index() {
  return (
    <section className="w-screen top-0 left-0 h-full no-scrollbar !scroll-smooth">
      <Landing />
      <Story />
      <Reservation />
    </section>
  );
}
