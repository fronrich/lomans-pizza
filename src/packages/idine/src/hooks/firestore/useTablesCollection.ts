import TableStatus from "../../enums/TableStatus";
import Table from "../../types/Table";
import useCRUD from "./useCRUD";

export default () => {
  const {
    createDocument,
    deleteDocument,
    updateDocument,
    getDocumentsByQuery,
    subscribeToDocumentsByQuery,
  } = useCRUD<Table>({
    collectionName: "tables",
  });

  const createTable = async (table: Partial<Table>): Promise<string> => {
    const tableTemplate: Omit<Table, "id"> = {
      dimensions: { x: 4, y: 4 },
      seats: 4,
      origin: { x: 0, y: 0 },
      status: TableStatus.UNOCCUPIED,
      serverIndex: "A0",
      ...table,
    };

    return await createDocument(tableTemplate);
  };

  const updateTable = async (id: string, table: Partial<Omit<Table, "id">>) => {
    return updateDocument(id, table);
  };

  return {
    createTable,
    getTablesByQuery: getDocumentsByQuery,
    subscribeToTablesByQuery: subscribeToDocumentsByQuery,
    deleteTable: deleteDocument,
    updateTable,
  };
};
