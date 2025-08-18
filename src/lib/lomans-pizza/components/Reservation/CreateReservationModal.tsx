import { useIDine } from "../../../../packages/idine";

const CreateReservationModal = () => {
  const {
    display: {
      organisms: { FindReservationForm },
    },
  } = useIDine();
  return (
    <section className="relative bg-surface-700 text-surface-50 lg:max-w-3xl lg:w-full lg:h-[80vh] p-8 flex flex-col lg:rounded-2xl gap-4 overflow-y-scroll no-scrollbar lg:relative bottom-0 w-screen h-screen">
      <FindReservationForm />
    </section>
  );
};

export default CreateReservationModal;
