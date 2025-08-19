/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useFormContext, UseFormReturn } from "react-hook-form";
import Reservation from "../../types/Reservation";
import useProfilesContext from "./useProfileContext";
import useReservationsCollection from "../firestore/useReservationsCollection";
import useUsersCollection from "../firestore/useUsersCollection";
import useRestaurantsCollection from "../firestore/useRestaurantsCollection";
import User from "../../types/User";
import Restaurant from "../../types/Restaurant";
import ReservationStatus from "../../enums/ReservationStatus";

export default () => {
  const { handleSubmit, ...rest } = useFormContext() as UseFormReturn<
    Reservation,
    any,
    Reservation
  >;

  const { reset } = rest;

  const { setRestaurant, setCurrentUser, currentUser, restaurant } =
    useProfilesContext();
  const { createReservation, getReservationsByQuery } =
    useReservationsCollection();
  const { updateRestaurant } = useRestaurantsCollection();
  const { updateUser } = useUsersCollection();

  const submitReservation = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    handleSubmit(async (data) => {
      const cleanedData: Reservation = { ...data };

      if (!restaurant) {
        throw new Error("Reservation is not linked to a restaurant");
        return;
      }

      // add restaurant id to reservation
      cleanedData.restaurantId = restaurant?.id;

      // make anon if no user
      if (!currentUser) {
        cleanedData.guestId = "anon";
      }

      // confirm reservation
      cleanedData.status = ReservationStatus.CONFIRMED;

      console.log(cleanedData);

      // return;
      // double check reservation at table at time does not exist
      // fetch by table then filter by time
      const reservationsAtTable: Reservation[] = [
        ...(await getReservationsByQuery(
          "startTimeISO",
          "==",
          cleanedData.startTimeISO
        )),
      ];
      const matches: Reservation[] = reservationsAtTable
        // keep matching dates
        .filter(
          (reservation) =>
            reservation.startDate?.toDateString() ===
            cleanedData.startDate?.toDateString()
        )
        // keep matching tables
        .filter(
          (reservation) => reservation.tableIds[0] === cleanedData.tableIds[0]
        );

      if (matches.length) {
        throw new Error(`Reservations conflict with this time: ${matches}`);
      }

      // create new reservation ID and push reservations
      const newReservationId = await createReservation(cleanedData);

      // update user reservations list locally
      if (currentUser) {
        setCurrentUser((oldUser) => {
          const newUser: User = { ...(oldUser as User) };
          newUser.reservationIds = [
            ...(newUser.reservationIds ?? []),
            newReservationId,
          ];
          // push user updates
          updateUser(currentUser?.id, newUser);
          return newUser;
        });
      }

      // update restaurant reservation list locally
      if (restaurant) {
        setRestaurant((oldRestaurant) => {
          const newRestaurant: Restaurant = {
            ...(oldRestaurant as Restaurant),
          };
          newRestaurant.reservationIds = [
            ...(newRestaurant.reservationIds ?? []),
            newReservationId,
          ];
          // push user updates
          updateRestaurant(restaurant?.id, newRestaurant);
          return newRestaurant;
        });
      }
      // push restaurant updates

      // reset form
      reset();
      // refresh page
    })();
  };

  return { ...rest, submitReservation };
};
