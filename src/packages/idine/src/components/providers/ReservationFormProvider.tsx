import { FC, ReactNode, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Reservation from "../../types/Reservation";
import useProfilesContext from "../../hooks/contexts/useProfileContext";
import DefaultReservation from "../../templates/DefaultReservation";
interface ReservationFormProviderProps {
  children: ReactNode;
}

const ReservationFormProvider: FC<ReservationFormProviderProps> = ({
  children,
}) => {
  const defaultValues: Reservation = { ...DefaultReservation };

  const methods = useForm<Reservation>({
    defaultValues: defaultValues,
  });

  const { currentUser } = useProfilesContext();

  const { setValue, reset } = methods;
  // auto populate the form when user is logged in
  useEffect(() => {
    if (!currentUser) {
      reset();
      return;
    }

    const { id, allergies, diets, email, firstName, lastName, phone } =
      currentUser;
    setValue("guestId", id);
    setValue("allergies", allergies);
    setValue("diets", diets);
    setValue("email", email);
    setValue("firstName", firstName);
    setValue("lastName", lastName);
    setValue("phone", phone);
  }, [currentUser]);
  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default ReservationFormProvider;
