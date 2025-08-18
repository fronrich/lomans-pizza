import DayOfWeek from "../../enums/DayOfWeek";
import Restaurant from "../../types/Restaurant";
import Table from "../../types/Table";
import useCRUD from "./useCRUD";
import useTablesCollection from "./useTablesCollection";

export default () => {
  const {
    createDocument,
    getDocumentById,
    updateDocument,
    subscribeToDocumentsByQuery,
    subscribeToDocumentById,
  } = useCRUD<Restaurant>({ collectionName: "restaurants" });

  const { createTable, deleteTable } = useTablesCollection();

  const createRestaurant = async (
    fields?: Partial<Restaurant>
  ): Promise<string> => {
    const { TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY } =
      DayOfWeek;

    // for the sake of complexity, we'll have Loman's be the
    // default restaurant template
    const restaurantTemplate: Omit<Restaurant, "id"> = {
      adminIds: [],
      name: "Loman's Pizza",
      bannerURL: "https://api.dicebear.com/9.x/glass/svg",
      address: "",
      //Dimensions of Moontower Cider dining room
      dimensions: { x: 25, y: 30 },
      menuItemIds: [],
      outOfStockItemIds: [],
      tableIds: [],
      reservationIds: [],
      defaultOperationHours: [
        {
          startTime: "09:00",
          endTime: "23:00",
          repeat: [TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY],
        },
      ],
      defaultHoldMinutes: 5,
      defaultReservationLength: 90,
      ...fields,
    };

    return await createDocument(restaurantTemplate);
  };

  const getRestaurantById = async (id: string) => await getDocumentById(id);

  // updates are very restrictive to prevent errors

  /**
   * update non-coupled fields
   */
  const updateRestaurant = async (
    id: string,
    fields: Partial<Omit<Restaurant, "id" | "tableIds" | "reservationIds">>
  ) => {
    return await updateDocument(id, fields);
  };

  const addTable = async (restaurantId: string, table: Table) => {
    // create the table document
    const newTableId = await createTable(table);
    const restaurant = await getDocumentById(restaurantId);

    if (!restaurant) {
      throw new Error("Restaurant does not exist");
      return;
    }

    const { tableIds } = restaurant;

    const newTableIds = [...tableIds, newTableId];

    await updateDocument(restaurantId, { tableIds: newTableIds });
  };

  const removeTable = async (restaurantId: string, tableId: string) => {
    const restaurant = await getDocumentById(restaurantId);

    if (!restaurant) {
      throw new Error("Restaurant does not exist");
      return;
    }

    const { tableIds } = restaurant;

    const newTableIds = [...tableIds].filter((id) => id !== tableId);

    await updateDocument(restaurantId, { tableIds: newTableIds });
    await deleteTable(tableId);
  };

  return {
    createRestaurant,
    getRestaurantById,
    updateRestaurant,
    subscribeToRestaurantById: subscribeToDocumentById,
    subscribeToRestaurantsByQuery: subscribeToDocumentsByQuery,
    addTable,
    removeTable,
  };
};
