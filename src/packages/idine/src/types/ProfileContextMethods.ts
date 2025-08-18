import { Dispatch, SetStateAction } from "react";
import Restaurant from "./Restaurant";
import User from "./User";
import MenuItem from "./MenuItem";
import Table from "./Table";
import Reservation from "./Reservation";
export default interface ProfilesContextMethods {
  /**
   * Set with useMemo based on env
   */
  restaurant: Restaurant | null;
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
  menuItems: MenuItem[];
  tables: Table[];
  reservations: Reservation[];
  maxGuests: number;
}
