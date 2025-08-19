import { useMemo, useState } from "react";
import useProfilesContext from "./contexts/useProfileContext";
import groupMenuByCategory, {
  MenuByCategoryName,
} from "../utils/groupMenuByCategory";
import Reservation from "../types/Reservation";

export default () => {
  /**
   * The reservation being used to filter the menu
   */
  const [currentReservation, setCurrentReservation] =
    useState<Reservation | null>(null);
  const { menuItems } = useProfilesContext();
  const menu: MenuByCategoryName = useMemo(() => {
    const oldMenu = [...menuItems];

    if (!currentReservation) {
      return groupMenuByCategory(oldMenu);
    }

    // filter out menu items that can't be eaten
    const safeMenuItems = oldMenu.filter((item) => {
      for (const allergen of item.allergens) {
        if (currentReservation?.allergies.includes(allergen)) {
          return false;
        }
      }
      return true;
    });

    const pivot = groupMenuByCategory(safeMenuItems);

    // return the pivot
    return pivot;
  }, [menuItems, currentReservation]);

  return {
    menu,
    currentReservation,
    setCurrentReservation,
  };
};
