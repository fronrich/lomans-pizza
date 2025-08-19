import { FC, ReactNode } from "react";

interface MenuBgProps {
  children: ReactNode;
}

const MenuBg: FC<MenuBgProps> = ({ children }) => {
  return (
    <section className="relative w-screen h-screen flex flex-col gap-4 lg:items-center items-start lg:justify-start justify-between overflow-clip bg-fixed bg-surface-200 lg:p-24 p-0">
      {children}
    </section>
  );
};

export default MenuBg;
