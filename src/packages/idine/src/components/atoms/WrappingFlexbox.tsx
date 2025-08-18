import { FC, ReactNode } from "react";

interface WrappingFlexboxProps {
  children: ReactNode;
}

const WrappingFlexbox: FC<WrappingFlexboxProps> = ({ children }) => {
  return (
    <section className="flex flex-row flex-wrap justify-start content-start">
      {children}
    </section>
  );
};

export default WrappingFlexbox;
