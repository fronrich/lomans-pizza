import { FC, ReactNode, useMemo, useState } from "react";
import IDineContext from "../contexts/IDineContext";
import Restaurant from "../types/Restaurant";
import User from "../types/User";
import Reservation from "../types/Reservation";

interface IDineProviderProps {
  children: ReactNode;
}

const IDineProvider: FC<IDineProviderProps> = ({ children }) => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentReservation, setCurrentReservation] =
    useState<Reservation | null>(null);

  const value = useMemo(
    () => ({
      restaurant,
      setRestaurant,
      currentUser,
      setCurrentUser,
      currentReservation,
      setCurrentReservation,
    }),
    []
  );

  return <IDineContext value={value}>{children}</IDineContext>;
};

export default IDineProvider;
