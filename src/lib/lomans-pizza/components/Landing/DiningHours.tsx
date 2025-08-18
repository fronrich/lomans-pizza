import { useIDine } from "../../../../packages/idine";

const DiningHours = () => {
  const {
    display: {
      atoms: { OperationHours },
    },
  } = useIDine();
  return (
    <span className="font-semibold px-8 text-center uppercase font-base text-surface-50 motion-translate-y-in-25 motion-opacity-in-0 motion-ease-spring-bouncy motion-delay-[2750ms]">
      <OperationHours />
    </span>
  );
};

export default DiningHours;
