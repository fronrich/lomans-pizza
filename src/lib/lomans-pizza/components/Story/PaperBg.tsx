import { FC, ReactNode } from "react";
import PaperTextureOverlay from "../PaperTextureOverlay";

interface PaperBgProps {
  children: ReactNode;
}

const PaperBg: FC<PaperBgProps> = ({ children }) => {
  return (
    <section className="relative w-screen h-screen flex flex-col gap-4 items-center justify-start overflow-clip bg-fixed bg-surface-200 lg:p-12 p-0">
      {children}
      <PaperTextureOverlay />
    </section>
  );
};

export default PaperBg;
