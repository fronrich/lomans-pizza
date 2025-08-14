import { createFileRoute } from "@tanstack/react-router";
import Landing from "$lib/components/Landing";
import Story from "$lib/components/Story/Story";
import Reservation from "$lib/components/Reservation";
export const Route = createFileRoute("/")({
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
