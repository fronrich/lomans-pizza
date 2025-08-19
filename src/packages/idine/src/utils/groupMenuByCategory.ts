import MenuCategory from "../enums/MenuCategory";
import MenuItem from "../types/MenuItem";

export type MenuByCategoryName = Record<string, MenuItem[]>;

export default (menu: MenuItem[]): MenuByCategoryName => {
  return menu.reduce((acc, item) => {
    const key = MenuCategory[item.category]; // converts numeric enum -> string name
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as MenuByCategoryName);
};
