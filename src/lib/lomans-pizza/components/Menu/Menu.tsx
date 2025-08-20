import { useState } from "react";
import { MenuCategory, useIDine } from "../../../../packages/idine";
import CategorySwitch from "./CategorySwitch";
import MenuBg from "./MenuBg";
import SectionDisplay from "./SectionDisplay";
import UseSafeMenuButton from "./UseSafeMenuButton";

const Menu = () => {
  const {
    hooks: { useMenu },
    enums: { MenuCategory },
  } = useIDine();
  const [category, setCategory] = useState<MenuCategory>(
    MenuCategory.APPETIZER
  );
  const { menu, currentReservation, setCurrentReservation } = useMenu();

  return (
    <MenuBg>
      <div className="w-full flex justify-between gap-2 lg:!p-0 p-8 pt-20 pb-0">
        <CategorySwitch
          allowedCategories={Object.keys(menu)}
          category={category}
          setCategory={setCategory}
        />
        <UseSafeMenuButton
          currentReservation={currentReservation}
          setCurrentReservation={setCurrentReservation}
        />
      </div>
      <SectionDisplay
        currentReservation={currentReservation}
        menu={menu}
        highlight={currentReservation?.diets ?? []}
        category={category}
      />
    </MenuBg>
  );
};

export default Menu;
