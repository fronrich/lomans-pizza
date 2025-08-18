import ReservationButton from "../Landing/ReservationButton";
import Bio from "./Bio";
import Header from "./Header";
import LonguiniDesktop from "./LonguiniDesktop";

const DesktopContent = () => {
  return (
    <section className="flex-row w-full lg:flex hidden">
      <section className="flex flex-col w-full h-full justify-center items-start">
        <Header />
        <Bio />
        <div className="max-w-xl w-full mt-8">
          <ReservationButton />
        </div>
      </section>
      <LonguiniDesktop />
    </section>
  );
};

export default DesktopContent;
