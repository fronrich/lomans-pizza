/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useFormContext, UseFormReturn } from "react-hook-form";
import Reservation from "../../types/Reservation";
import useProfilesContext from "./useProfileContext";
import useReservationsCollection from "../services/firestore/useReservationsCollection";
import useUsersCollection from "../services/firestore/useUsersCollection";
import useRestaurantsCollection from "../services/firestore/useRestaurantsCollection";
import User from "../../types/User";
import Restaurant from "../../types/Restaurant";
import ReservationStatus from "../../enums/ReservationStatus";
import useEmailService from "../services/useEmailService";
import useSiteNavigation from "../useSiteNavigation";
import toDate from "../../utils/toDate";
export default () => {
  const {
    setRestaurant,
    setCurrentUser,
    currentUser,
    restaurant,
    reservations,
    setReservations,
  } = useProfilesContext();
  const {
    createReservation,
    updateReservation: upRes,
    getReservationsByQuery,
  } = useReservationsCollection();
  const { updateRestaurant } = useRestaurantsCollection();
  const { updateUser } = useUsersCollection();
  const { sendConfirmationEmail } = useEmailService();
  const { postConfirm, postUpdate } = useSiteNavigation();

  const { handleSubmit, ...rest } = useFormContext() as UseFormReturn<
    Reservation,
    any,
    Reservation
  >;

  const { reset, setValue } = rest;

  /**
   * helper function to clean reservation data
   */
  const cleanData = (data: Reservation): Reservation => {
    const cleanedData: Reservation = { ...data };

    if (!restaurant) {
      throw new Error("Reservation is not linked to a restaurant");
      return data;
    }

    // add restaurant id to reservation
    cleanedData.restaurantId = restaurant?.id;
    cleanedData.restaurantName = restaurant.name;
    cleanedData.date = cleanedData.startDate as Date;
    cleanedData.targetTime = cleanedData.startDate?.toDateString();

    // make anon if no user
    if (!currentUser) {
      cleanedData.guestId = "anon";
    }

    // confirm reservation
    cleanedData.status = ReservationStatus.CONFIRMED;

    return cleanedData;
  };

  /**
   * helper function to prevent reservation conflicts
   * if two people reserve at the same time
   */
  const preventOverwrite = async (data: Reservation) => {
    // double check reservation at table at time does not exist
    // fetch by table then filter by time
    const reservationsAtTable: Reservation[] = [
      ...(await getReservationsByQuery(
        "startTimeISO",
        "==",
        data.startTimeISO
      )),
    ];
    const matches: Reservation[] = reservationsAtTable
      // keep matching dates
      .filter((reservation) => {
        return (
          toDate(reservation.startDate)?.toDateString() ===
          toDate(data.startDate)?.toDateString()
        );
      })
      // keep matching tables
      .filter((reservation) => reservation.tableIds[0] === data.tableIds[0]);

    if (matches.length) {
      throw new Error(`Reservations conflict with this time: ${matches}`);
    }
  };

  const submitReservation = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    handleSubmit(async (data) => {
      const cleanedData: Reservation = cleanData(data);

      await preventOverwrite(data);

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
      if (!restaurant) {
        throw new Error(
          "Your reservation is not associated with a restaurant."
        );
        return;
      }
      setRestaurant((oldRestaurant) => {
        const newRestaurant: Restaurant = {
          ...(oldRestaurant as Restaurant),
        };
        newRestaurant.reservationIds = [
          ...(newRestaurant.reservationIds ?? []),
          newReservationId,
        ];

        // push restaurant updates
        updateRestaurant(restaurant?.id, newRestaurant);
        return newRestaurant;
      });

      const newReservation: Reservation = {
        ...cleanedData,
        id: newReservationId,
      };

      // send email
      sendConfirmationEmail(newReservation, restaurant);
      // reset form
      reset();
      // refresh page
      postConfirm(newReservation);
    })();
  };

  const updateReservation = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    handleSubmit(async (data) => {
      const cleanedData: Reservation = cleanData(data);

      // update existing reservation
      await upRes(cleanedData.id, cleanedData);
      postUpdate(cleanedData);

      if (restaurant) {
        // grab new reservations in bg for synced state
        setReservations(
          await getReservationsByQuery("id", "in", restaurant.reservationIds)
        );
      }
    })();
  };

  const cancelReservation = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    handleSubmit(async (data) => {
      const cleanedData: Reservation = cleanData(data);
      cleanedData.status = ReservationStatus.CANCELED;
      // create new reservation ID and push reservations
      await upRes(cleanedData.id, cleanedData);
      postUpdate(cleanedData);

      if (restaurant) {
        // grab new reservations in bg for synced state
        setReservations(
          await getReservationsByQuery("id", "in", restaurant.reservationIds)
        );
      }
    })();
  };

  /**
   * Import a reservation, overriding info
   */
  const importReservation = (id: string) => {
    const importedReservation = reservations.find(
      (reservation) => reservation.id === id
    );

    if (!importedReservation) {
      throw new Error("Reservation does not exist.");
      return;
    }

    Object.keys(importedReservation).forEach((key) => {
      const k: keyof Reservation = key as unknown as keyof Reservation;
      const value = importedReservation[k];
      if (!value) {
        return;
      }

      if (k === "date" || k === "startDate") {
        setValue(k, toDate(importedReservation[k]));
        return;
      }

      setValue(k, importedReservation[k]);
    });

    setValue("targetTime", importedReservation.startTimeISO);
    setValue("date", toDate(importedReservation.startDate) as Date);
  };

  return {
    ...rest,
    submitReservation,
    importReservation,
    updateReservation,
    cancelReservation,
  };
};
