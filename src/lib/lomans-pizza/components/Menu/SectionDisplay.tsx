import { FC } from "react";
import { MenuCategory, useIDine } from "../../../../packages/idine";
import { MenuByCategoryName } from "../../../../packages/idine/src/utils/groupMenuByCategory";
import MenuItem from "./MenuItem";
import Diet from "../../../../packages/idine/src/enums/Diet";
import Allergen from "../../../../packages/idine/src/enums/Allergen";

interface SectionDisplayProps {
  menu: MenuByCategoryName;
  highlight: Diet[];
  category: MenuCategory;
}

const SectionDisplay: FC<SectionDisplayProps> = ({
  category,
  highlight,
  menu,
}) => {
  const {
    display: {
      atoms: { Glyph },
      molecules: { AllergenVisual, DietVisual },
    },
    utils: { enumToArray },
  } = useIDine();

  if (!menu) {
    return;
  }

  return (
    <section className=" relative w-full lg:h-full h-[80vh] flex flex-col items-start justify-start p-8 bg-surface-50 shadow-lg lg:rounded-2xl rounded-t-2xl gap-8 border-1 border-surface-300">
      <div className="flex justify-between items-center w-full flex-col text-xs gap-4">
        <h2 className="text-4xl sticky !m-0 lg:inline translate-y-2 hidden">
          {MenuCategory[category]}S
        </h2>
        <div className="lg:gap-8 gap-2 flex flex-wrap content-start lg:justify-center justify-between w-fit p-4 bg-surface-50 rounded-lg shadow-lg border-1 border-surface-300">
          {enumToArray(Allergen).map((allergen) => (
            <AllergenVisual key={allergen} allergen={allergen} displayName />
          ))}
          {enumToArray(Diet).map((diet) => (
            <DietVisual key={diet} diet={diet} displayName />
          ))}
        </div>
      </div>
      {menu[MenuCategory[category]] ? (
        <section className="w-full h-full overflow-y-auto flex lg:flex-row flex-col lg:flex-wrap items-start justify-start content-start">
          {menu[MenuCategory[category]].map((item) => (
            <MenuItem key={item.id} {...item} highlight={highlight} />
          ))}
        </section>
      ) : (
        <section className="flex items-center justify-center flex-col w-full h-full">
          <div className="scale-[400%] motion-preset-oscillate-lg">
            <Glyph fill="fill-primary-500" />
          </div>
        </section>
      )}
    </section>
  );
};

export default SectionDisplay;
