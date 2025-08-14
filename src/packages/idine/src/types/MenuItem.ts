import Allergen from "../enums/Allergen";
import Diet from "../enums/Diet";
import MenuCategory from "../enums/MenuCategory";

export default interface MenuItem {
  name: string;

  /**
   * Price in $USD
   */
  price: number;

  /**
   * A description of the item. Make it sound tasty
   */
  description: string;

  category: MenuCategory;

  /**
   * Allergens that this item contains
   */
  allergens: Allergen[];

  /**
   * Diets that this item is compatible with
   */
  diets: Diet[];
}
