import { FC, ReactNode } from "react";
import bg from "$lib/assets/bgLamp.jpg";
import PaperTextureOverlay from "../PaperTextureOverlay";

interface ParallaxBgProps {
  children: ReactNode;
}

const ParallaxBg: FC<ParallaxBgProps> = ({ children }) => {
  return (
    <section
      id="reservation"
      className="relative w-screen h-screen flex flex-col gap-4 items-center justify-start overflow-clip bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      {children}
      <PaperTextureOverlay />
    </section>
  );
};

export default ParallaxBg;
