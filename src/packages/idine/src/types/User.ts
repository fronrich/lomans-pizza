import UserRole from "../enums/UserRole";

export default interface User {
  id: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  reservationIds: string[];
}
