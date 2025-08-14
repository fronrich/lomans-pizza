import { Dispatch, SetStateAction } from "react";
import Reservation from "./Reservation";
import Restaurant from "./Restaurant";
import User from "./User";

export default interface IDineContextMethods {
  restaurant: Restaurant | null;
  setRestaurant: Dispatch<SetStateAction<Restaurant | null>>;
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
  currentReservation: Reservation | null;
  setCurrentReservation: Dispatch<SetStateAction<Reservation | null>>;
}
