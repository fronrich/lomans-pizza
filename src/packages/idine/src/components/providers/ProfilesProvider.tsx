import { FC, ReactNode, useEffect, useMemo, useState } from "react";
import ProfilesContext from "../../contexts/ProfileContext";
import useRestaurantsCollection from "../../hooks/services/firestore/useRestaurantsCollection";
import useTablesCollection from "../../hooks/services/firestore/useTablesCollection";
import useMenuItemsCollection from "../../hooks/services/firestore/useMenuItemsCollection";
import User from "../../types/User";
import Restaurant from "../../types/Restaurant";
import { Unsubscribe } from "firebase/firestore";
import MenuItem from "../../types/MenuItem";
import Table from "../../types/Table";
import Reservation from "../../types/Reservation";
import useReservationsCollection from "../../hooks/services/firestore/useReservationsCollection";

interface ProfilesProviderProps {
  children: ReactNode;
}

const ProfilesProvider: FC<ProfilesProviderProps> = ({ children }) => {
  const { getRestaurantById, subscribeToRestaurantById } =
    useRestaurantsCollection();

  const { getTablesByQuery } = useTablesCollection();
  const { getMenuItemsByQuery } = useMenuItemsCollection();
  const { getReservationsByQuery } = useReservationsCollection();

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const maxGuests: number = useMemo(() => {
    if (!tables.length) return 0;
    return Math.max(...[...tables.map((table) => table.seats)]) ?? 0;
  }, [tables]);

  useEffect(() => {
    const restaurantId = import.meta.env.VITE_RESTAURANT_ID;
    let unsubscribe: Unsubscribe | undefined = undefined;

    const calculate = async () => {
      // no restaurantid was provided
      if (!restaurantId) {
        setRestaurant(null);
      }

      // fetch and set the restaurant
      const restaurant = await getRestaurantById(restaurantId);
      setRestaurant(restaurant);
    };

    // after initial calculation, subscribe to restaurant to query any changes
    calculate().then(() => {
      unsubscribe = subscribeToRestaurantById(restaurantId, (restaurant) => {
        if (!restaurant) {
          return;
        }

        setRestaurant(restaurant);
      });
    });

    // clean up
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [import.meta.env.VITE_RESTAURANT_ID]);

  useEffect(() => {
    // helper function to retrieve reservations, tables, menu items
    const getRestaurantAssets = async () => {
      if (!restaurant) {
        return;
      }

      const { tableIds, menuItemIds, reservationIds } = restaurant;

      if (tableIds.length > 0) {
        setTables(await getTablesByQuery("id", "in", tableIds));
      }

      if (menuItemIds.length > 0) {
        setMenuItems(await getMenuItemsByQuery("id", "in", menuItemIds));
      }

      if (reservationIds.length > 0) {
        setReservations(
          await getReservationsByQuery("id", "in", reservationIds)
        );
      }
    };

    getRestaurantAssets();
  }, [restaurant]);

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const value = useMemo(
    () => ({
      restaurant,
      setRestaurant,
      currentUser,
      setCurrentUser,
      tables,
      menuItems,
      reservations,
      setReservations,
      maxGuests,
    }),
    [restaurant, currentUser, tables, menuItems, reservations, maxGuests]
  );

  return <ProfilesContext value={value}>{children}</ProfilesContext>;
};

export default ProfilesProvider;
