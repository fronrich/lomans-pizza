import { FC, ReactNode } from "react";
import longuiniMobile from "$lib/lomans-pizza/assets/longuiniMobile.png";

interface LonguiniMobileWrapperProps {
  children: ReactNode;
}

const LonguiniMobileWrapper: FC<LonguiniMobileWrapperProps> = ({
  children,
}) => {
  return (
    <div
      className="flex flex-col p-8 bg-fixed w-full h-auto bg-cover"
      style={{
        backgroundImage: `linear-gradient(0deg,rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.25) 100%), url(${longuiniMobile})`,
      }}
    >
      {children}
    </div>
  );
};

export default LonguiniMobileWrapper;
