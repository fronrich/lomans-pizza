import { useIDine } from "../../../../packages/idine";

const CreateReservationModal = () => {
  const {
    display: {
      organisms: { FindReservationForm },
    },
  } = useIDine();
  return (
    <section className="relative bg-surface-200 text-surface-950 lg:max-w-3xl lg:w-full lg:max-h-[70vh] lg:h-fit p-8 flex flex-col lg:rounded-2xl gap-4 overflow-y-visible no-scrollbar lg:relative bottom-0 w-screen h-screen border-1 border-surface-300">
      <FindReservationForm />
    </section>
  );
};

export default CreateReservationModal;
