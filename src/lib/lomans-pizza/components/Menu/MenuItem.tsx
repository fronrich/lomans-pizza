import { FC } from "react";
import MenuItemProps from "../../../../packages/idine/src/types/MenuItem";
import Diet from "../../../../packages/idine/src/enums/Diet";
import { useIDine } from "../../../../packages/idine";

const MenuItem: FC<MenuItemProps & { highlight: Diet[] }> = ({
  allergens,
  description,
  diets,
  id,
  name,
  price,
  highlight,
}) => {
  const {
    display: {
      molecules: { AllergenVisual, DietVisual },
    },
    utils: { shouldHighlight },
  } = useIDine();

  return (
    <div
      key={id}
      className={`${shouldHighlight(diets, highlight) && "bg-primary-250"} p-2 flex flex-col w-full lg:w-1/3 lg:justify-between gap-4 rounded-lg`}
    >
      <div className="w-full flex justify-between">
        <div className="flex flex-col gap-1  items-start justify-start">
          <span className="font-base font-semibold text-lg uppercase">
            {name}
          </span>

          <div className="flex gap-2">
            {allergens.map((allergen) => (
              <AllergenVisual key={allergen} allergen={allergen} />
            ))}
            {allergens.length && diets.length ? "|" : ""}
            {diets.map((diet) => (
              <DietVisual key={diet} diet={diet} />
            ))}
          </div>
        </div>
        <span className="font-title text-lg text-primary-500">${price}</span>
      </div>
      <div className="text-sm italic">{description}</div>
    </div>
  );
};

export default MenuItem;
