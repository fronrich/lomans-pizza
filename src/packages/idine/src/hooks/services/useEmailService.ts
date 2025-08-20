import { init, send } from "@emailjs/browser";
import { useCallback } from "react";
import Reservation from "../../types/Reservation";
import Restaurant from "../../types/Restaurant";
import convert24ToAmPm from "../../utils/convert24ToAmPm";
import formatDatePretty from "../../utils/formatDatePretty";

export default () => {
  const serviceId: string = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId: string = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey: string = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  /**
   * Use once in IDineProvider
   */
  const initEmailService = useCallback(() => {
    if (publicKey) {
      init({
        publicKey,
      });
    }
  }, [publicKey]);

  const sendConfirmationEmail = (
    reservation: Reservation,
    restaurant: Restaurant
  ) => {
    interface TemplateParams {
      name: string;
      restaurantName: string;
      date: string;
      time: string;
      confirmationNumber: string;
      email: string;
    }

    const params: TemplateParams = {
      name: reservation.firstName,
      confirmationNumber: reservation.id,
      date: formatDatePretty(reservation.startDate as Date),
      time: convert24ToAmPm(reservation.startTimeISO as `${string}:${string}`),
      email: reservation.email,
      restaurantName: restaurant.name,
    };

    send(serviceId, templateId, { ...params });
  };

  return { initEmailService, sendConfirmationEmail };
};
