import { Icon } from "@iconify/react";
import Diet from "../../enums/Diet";
import { FC } from "react";

interface AllergenVisualProps {
  diet: Diet;

  /**
   * display the name of the allergen to the right of the visual
   */
  displayName?: boolean;
}

const DietVisual: FC<AllergenVisualProps> = ({ diet, displayName }) => {
  switch (diet) {
    case Diet.GLUTEN_FREE:
      return (
        <div className="flex gap-2 items-center">
          <Icon
            icon="game-icons:sliced-bread"
            className="text-amber-800 drop-shadow"
          />
          {displayName && <span>Gluten-Free</span>}
        </div>
      );
    case Diet.VEGAN:
      return (
        <div className="flex gap-2 items-center">
          <Icon
            icon="game-icons:broccoli"
            className="text-green-950 drop-shadow"
          />
          {displayName && <span>Vegan</span>}
        </div>
      );
    case Diet.VEGETARIAN:
      return (
        <div className="flex gap-2 items-center">
          <Icon
            icon="game-icons:plant-seed"
            className="text-green-700 drop-shadow"
          />
          {displayName && <span>Vegetarian</span>}
        </div>
      );
    case Diet.PESCATARIAN:
      return (
        <div className="flex gap-2 items-center">
          <Icon
            icon="game-icons:double-fish"
            className="text-indigo-500 drop-shadow"
          />
          {displayName && <span>Pescatarian</span>}
        </div>
      );
    case Diet.KETO:
      return (
        <div className="flex gap-2 items-center">
          <Icon icon="game-icons:meat" className="text-red-400 drop-shadow" />
          {displayName && <span>Keto</span>}
        </div>
      );
  }
};

export default DietVisual;
