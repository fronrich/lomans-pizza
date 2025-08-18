import { Icon } from "@iconify/react";
import Allergen from "../../enums/Allergen";
import { FC } from "react";

interface AllergenVisualProps {
  allergen: Allergen;

  /**
   * display the name of the allergen to the right of the visual
   */
  displayName?: boolean;
}

const AllergenVisual: FC<AllergenVisualProps> = ({ allergen, displayName }) => {
  switch (allergen) {
    case Allergen.DAIRY:
      return (
        <div className="flex gap-2 items-center">
          <Icon icon="game-icons:cow" className="text-stone-900 drop-shadow" />
          {displayName && <span>Dairy</span>}
        </div>
      );
    case Allergen.PEANUTS:
      return (
        <div className="flex gap-2 items-center">
          <Icon
            icon="game-icons:peanut"
            className="text-amber-700 drop-shadow"
          />
          {displayName && <span>Peanuts</span>}
        </div>
      );
    case Allergen.NUTS:
      return (
        <div className="flex gap-2 items-center">
          <Icon
            icon="game-icons:almond"
            className="text-amber-950 drop-shadow"
          />
          {displayName && <span>Nuts</span>}
        </div>
      );
    case Allergen.SHELLFISH:
      return (
        <div className="flex gap-2 items-center">
          <Icon
            icon="game-icons:shrimp"
            className="text-orange-400 drop-shadow"
          />
          {displayName && <span>Shrimp</span>}
        </div>
      );
    case Allergen.FISH:
      return (
        <div className="flex gap-2 items-center">
          <Icon
            icon="game-icons:flatfish"
            className="text-stone-600 drop-shadow"
          />
          {displayName && <span>Fish</span>}
        </div>
      );
    case Allergen.SOY:
      return (
        <div className="flex gap-2 items-center">
          <Icon
            icon="game-icons:jelly-beans"
            className="text-green-950 drop-shadow"
          />
          {displayName && <span>Soy</span>}
        </div>
      );
  }
};

export default AllergenVisual;
