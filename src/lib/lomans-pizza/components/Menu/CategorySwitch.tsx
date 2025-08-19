import { Button, ButtonGroup, Dropdown, DropdownItem } from "flowbite-react";
import { MenuCategory, useIDine } from "../../../../packages/idine";
import { Dispatch, FC, SetStateAction } from "react";

interface CategorySwitchProps {
  category: MenuCategory;
  setCategory: Dispatch<SetStateAction<MenuCategory>>;
}

const CategorySwitch: FC<CategorySwitchProps> = ({ category, setCategory }) => {
  const {
    enums: { MenuCategory },
    utils: { enumToArray },
  } = useIDine();

  const categories = enumToArray(MenuCategory);
  return (
    <>
      <ButtonGroup className="w-full lg:flex hidden">
        {categories.map((currCategory) => (
          <Button
            onClick={() => setCategory(currCategory)}
            outline={category !== currCategory}
            className={`w-full`}
            key={currCategory}
          >
            {MenuCategory[currCategory]}S
          </Button>
        ))}
      </ButtonGroup>
      <div className="lg:hidden">
        <Dropdown
          className=" !min-w-fit not-prose "
          label={`${MenuCategory[category]}S`}
        >
          {categories.map((currCategory) => (
            <DropdownItem
              onClick={() => setCategory(currCategory)}
              key={currCategory}
            >
              {MenuCategory[currCategory]}S
            </DropdownItem>
          ))}
        </Dropdown>
      </div>
    </>
  );
};

export default CategorySwitch;
