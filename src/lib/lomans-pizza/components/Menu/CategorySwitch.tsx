/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, ButtonGroup, Dropdown, DropdownItem } from "flowbite-react";
import { MenuCategory, useIDine } from "../../../../packages/idine";
import { Dispatch, FC, SetStateAction } from "react";

interface CategorySwitchProps {
  allowedCategories: string[];
  category: MenuCategory;
  setCategory: Dispatch<SetStateAction<MenuCategory>>;
}

const CategorySwitch: FC<CategorySwitchProps> = ({
  allowedCategories,
  category,
  setCategory,
}) => {
  const {
    enums: { MenuCategory },
  } = useIDine();

  return (
    <>
      <ButtonGroup className="w-full lg:flex hidden">
        {allowedCategories.map((key) => {
          const currCategory: MenuCategory = MenuCategory[
            key as any
          ] as unknown as MenuCategory;
          return (
            <Button
              onClick={() => setCategory(currCategory)}
              outline={category !== currCategory}
              className={`w-full`}
              key={currCategory}
            >
              {MenuCategory[currCategory]}S
            </Button>
          );
        })}
      </ButtonGroup>
      <div className="lg:hidden">
        <Dropdown
          className=" !min-w-fit not-prose "
          label={`${MenuCategory[category]}S`}
        >
          {allowedCategories.map((key) => {
            const currCategory: MenuCategory = MenuCategory[
              key as any
            ] as unknown as MenuCategory;
            return (
              <DropdownItem
                onClick={() => setCategory(currCategory)}
                key={currCategory}
              >
                {MenuCategory[currCategory]}S
              </DropdownItem>
            );
          })}
        </Dropdown>
      </div>
    </>
  );
};

export default CategorySwitch;
