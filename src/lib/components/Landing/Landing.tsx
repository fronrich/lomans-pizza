import BottomScalloping from "./BottomScalloping";
import Logo from "./Logo";
import MiddleMenu from "./MiddleMenu";
import Motto from "./Motto";
import ParallaxBg from "./ParallaxBg";

const Landing = () => {
  return (
    <ParallaxBg>
      <BottomScalloping />
      <Logo />
      <Motto />
      <MiddleMenu />
    </ParallaxBg>
  );
};

export default Landing;
