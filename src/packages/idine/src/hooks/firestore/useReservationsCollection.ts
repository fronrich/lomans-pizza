import DefaultReservation from "../../templates/DefaultReservation";
import Reservation from "../../types/Reservation";
import useCRUD from "./useCRUD";

export default () => {
  const {
    createDocument,
    deleteDocument,
    updateDocument,
    getDocumentsByQuery,
    subscribeToDocumentsByQuery,
  } = useCRUD<Reservation>({
    collectionName: "tables",
  });

  const createReservation = async (
    reservation: Partial<Reservation>
  ): Promise<string> => {
    const tableTemplate: Omit<Reservation, "id"> = {
      ...DefaultReservation,
      ...reservation,
    };

    return await createDocument(tableTemplate);
  };

  const updateReservation = async (
    id: string,
    table: Partial<Omit<Reservation, "id">>
  ) => {
    return updateDocument(id, table);
  };

  return {
    createReservation,
    getReservationsByQuery: getDocumentsByQuery,
    subscribeToReservationsByQuery: subscribeToDocumentsByQuery,
    deleteReservation: deleteDocument,
    updateReservation,
  };
};
