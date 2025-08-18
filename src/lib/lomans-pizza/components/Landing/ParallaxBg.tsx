import { FC, ReactNode } from "react";
import bg from "$lib/lomans-pizza/assets/bgPizza.jpg";
import PaperTextureOverlay from "../PaperTextureOverlay";

interface ParallaxBgProps {
  children: ReactNode;
}

const ParallaxBg: FC<ParallaxBgProps> = ({ children }) => {
  return (
    <section
      className="relative w-screen h-screen flex flex-col gap-4 items-center justify-start overflow-clip bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(0deg,rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.5) 100%), url(${bg})`,
      }}
    >
      {children}
      <PaperTextureOverlay />
    </section>
  );
};

export default ParallaxBg;
