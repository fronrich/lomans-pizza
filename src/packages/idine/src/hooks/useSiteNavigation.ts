import { useNavigate } from "@tanstack/react-router";
import Reservation from "../types/Reservation";

interface Link {
  label: string;
  icon: string;
  href: string;
}

export default () => {
  const nav = useNavigate();

  const navLinks: Link[] = [];

  /**
   * Takes a confirmation number and displays it on a page after the user has confirmed a reservation
   */
  const postConfirm = (reservation: Reservation) => {
    nav({
      to: `/confirmation/${reservation.id}/${reservation.firstName}/${reservation.phone}`,
    });
  };

  /**
   * Takes a confirmation number and displays it on a page after the user has confirmed a reservation
   */
  const postUpdate = (reservation: Reservation) => {
    nav({
      to: `/update/${reservation.id}/${reservation.firstName}/${reservation.phone}`,
    });
  };

  return { navLinks, postConfirm, postUpdate };
};
