import ReservationButton from "./ReservationButton";
import MenuButton from "./MenuButton";
import DiningHours from "./DiningHours";

const MiddleMenu = () => {
  return (
    <div className="flex flex-col items-center gap-1 mt-36 lg:mt-16">
      <DiningHours />
      <div className="flex flex-col lg:flex-row items-center justify-center px-8 w-2xl max-w-screen gap-4 motion-translate-y-in-25 motion-opacity-in-0 motion-ease-spring-bouncy motion-delay-[3000ms]">
        <MenuButton />
        <ReservationButton />
      </div>
    </div>
  );
};

export default MiddleMenu;
