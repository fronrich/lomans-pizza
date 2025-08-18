/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormContext, UseFormReturn } from "react-hook-form";
import Reservation from "../../types/Reservation";

export default () => {
  const methods = useFormContext() as UseFormReturn<
    Reservation,
    any,
    Reservation
  >;

  return { ...methods };
};
