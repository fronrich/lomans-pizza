import { Checkbox, Label } from "flowbite-react";
import AllergenVisual from "./AllergenVisual";
import Allergen from "../../enums/Allergen";
import DietVisual from "./DietVisual";
import { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import Diet from "../../enums/Diet";
import enumToArray from "../../utils/enumToArray";
import WrappingFlexbox from "../atoms/WrappingFlexbox";

interface MenuRestrictionsProps {
  /**
   * allows menu restrictions to be generic enough to use with any form
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
}

const MenuRestrictions: FC<MenuRestrictionsProps> = ({ register }) => {
  return (
    <>
      <details>
        <summary>
          <span className="font-semibold uppercase">Allergens</span>
        </summary>
        <div className="bg-surface-50 !text-surface-950 rounded-lg p-2 border-surface-100 border-2">
          <WrappingFlexbox>
            {enumToArray(Allergen).map((allergen) => (
              <div key={allergen} className="flex items-center gap-2 p-2">
                <Checkbox
                  id={`checkbox-allergen-${allergen}`}
                  value={allergen}
                  {...register("allergies")}
                />
                <Label
                  className="pr-2"
                  htmlFor={`checkbox-allergen-${allergen}`}
                >
                  <AllergenVisual displayName allergen={allergen} />
                </Label>
              </div>
            ))}
          </WrappingFlexbox>
        </div>
        <p className="text-xs">
          We'll remove items with these from your table's menu, but you can
          always toggle the full menu!
        </p>
      </details>
      <details>
        <summary>
          <span className="font-semibold uppercase">Diets</span>
        </summary>
        <div className="bg-surface-50 !text-surface-950 rounded-lg p-2 border-surface-100 border-2">
          <WrappingFlexbox>
            {enumToArray(Diet).map((diet) => (
              <div key={diet} className="flex items-center gap-2 p-2">
                <Checkbox
                  id={`checkbox-diet-${diet}`}
                  value={diet}
                  {...register("diets")}
                />
                <Label className="pr-2" htmlFor={`checkbox-diet-${diet}`}>
                  <DietVisual displayName diet={diet} />
                </Label>
              </div>
            ))}
          </WrappingFlexbox>
        </div>
        <p className="text-xs">
          We'll highlight any menu items that match the diets you select.
        </p>
      </details>
    </>
  );
};

export default MenuRestrictions;
