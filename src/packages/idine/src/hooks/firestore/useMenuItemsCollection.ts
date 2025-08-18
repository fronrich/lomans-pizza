import MenuCategory from "../../enums/MenuCategory";
import MenuItem from "../../types/MenuItem";
import useCRUD from "./useCRUD";

export default () => {
  const {
    createDocument,
    deleteDocument,
    updateDocument,
    getDocumentsByQuery,
    subscribeToDocumentsByQuery,
  } = useCRUD<MenuItem>({
    collectionName: "tables",
  });

  const createMenuItem = async (
    menuItem: Partial<MenuItem>
  ): Promise<string> => {
    const tableTemplate: Omit<MenuItem, "id"> = {
      allergens: [],
      diets: [],
      category: MenuCategory.ENTREE,
      description: "",
      name: "",
      price: 0,
      ...menuItem,
    };

    return await createDocument(tableTemplate);
  };

  const updateMenuItem = async (
    id: string,
    table: Partial<Omit<MenuItem, "id">>
  ) => {
    return updateDocument(id, table);
  };

  return {
    createMenuItem,
    getMenuItemsByQuery: getDocumentsByQuery,
    subscribeToTMenuItemByQuery: subscribeToDocumentsByQuery,
    deleteMenuItem: deleteDocument,
    updateMenuItem,
  };
};
