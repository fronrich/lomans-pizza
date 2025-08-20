import UserRole from "../../../enums/UserRole";
import User from "../../../types/User";
import useCRUD from "./useCRUD";

export default () => {
  const {
    createDocumentWithId,
    getDocumentById,
    getAllDocuments,
    updateDocument,
  } = useCRUD<User>({
    collectionName: "users",
  });

  const createUserWithId = async (
    id: string,
    {
      firstName,
      lastName,
      phone,
      email,
      allergies,
      diets,
    }: Omit<User, "id" | "reservationIds" | "role">
  ) => {
    const userTemplate: Omit<User, "id"> = {
      firstName,
      lastName,
      phone,
      email,
      allergies,
      diets,
      reservationIds: [],
      role: UserRole.GUEST,
    };
    await createDocumentWithId(id, userTemplate);
  };

  return {
    createUserWithId,
    updateUser: updateDocument,
    getAllUsers: getAllDocuments,
    getUserById: getDocumentById,
  };
};
