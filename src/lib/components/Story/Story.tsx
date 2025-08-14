import DesktopContent from "./DesktopContent";
import MobileContent from "./MobileContent";
import PaperBg from "./PaperBg";

const Story = () => {
  return (
    <PaperBg>
      <MobileContent />
      <DesktopContent />
    </PaperBg>
  );
};

export default Story;
