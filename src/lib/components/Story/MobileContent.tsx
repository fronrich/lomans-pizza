import LonguiniMobileWrapper from "./LonguiniMobileWrapper";
import Header from "./Header";
import Bio from "./Bio";
import ReservationButton from "../Landing/ReservationButton";

const MobileContent = () => {
  return (
    <section className="flex flex-col lg:hidden">
      <LonguiniMobileWrapper>
        <Header />
      </LonguiniMobileWrapper>
      <Bio />
      <div className="px-8">
        <ReservationButton />
      </div>
    </section>
  );
};

export default MobileContent;
