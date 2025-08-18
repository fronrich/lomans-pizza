import Allergen from "../enums/Allergen";
import Diet from "../enums/Diet";
import UserRole from "../enums/UserRole";

export default interface User {
  id: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  /**
   * Items in this list are **filtered out of the safe menu**
   */
  allergies: Allergen[];

  /**
   * Items in this list are **highlighted in the safe menu**
   */
  diets: Diet[];
  reservationIds: string[];
}
