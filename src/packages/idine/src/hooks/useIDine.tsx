import useProfilesContext from "./contexts/useProfileContext";
import useAuthContext from "./contexts/useAuthContext";
import { useFormContext } from "react-hook-form";
import Glyph from "../components/atoms/Glyph";
import Logo from "../components/atoms/Logo";
import OperationHours from "../components/atoms/OperationHours";
import SignInButton from "../components/molecules/SignInButton";
import AuthUI from "../components/organisms/AuthUI";
import FindReservationForm from "../components/layouts/FindReservationForm";
import Allergen from "../enums/Allergen";
import Diet from "../enums/Diet";
import enumToArray from "../utils/enumToArray";
import prettyHours from "../utils/prettyHours";
import useMenu from "./useMenu";
import MenuCategory from "../enums/MenuCategory";
import AllergenVisual from "../components/molecules/AllergenVisual";
import DietVisual from "../components/molecules/DietVisual";
import shouldHighlight from "../utils/shouldHighlight";
import { useMemo } from "react";
import formatDatePretty from "../utils/formatDatePretty";
import convert24ToAmPm from "../utils/convert24ToAmPm";

export default () => {
  const { restaurant, currentUser, reservations } = useProfilesContext();
  const { googleSignIn, googleSignOut } = useAuthContext();

  const currentUserReservations = useMemo(() => {
    if (!currentUser) {
      return [];
    }
    return [
      ...reservations.filter(
        (reservation) => reservation.guestId === currentUser?.id
      ),
    ];
  }, [currentUser, reservations]);

  return {
    restaurant,
    reservations,
    currentUser,
    currentUserReservations,
    signIn: googleSignIn,
    signOut: googleSignOut,
    reservationForm: useFormContext,
    hooks: {
      useMenu,
    },
    enums: {
      Allergen,
      Diet,
      MenuCategory,
    },
    utils: {
      enumToArray,
      prettyHours,
      shouldHighlight,
      formatDatePretty,
      convert24ToAmPm,
    },
    display: {
      atoms: {
        OperationHours,
        Glyph,
        Logo,
      },
      molecules: {
        SignInButton,
        AllergenVisual,
        DietVisual,
      },
      organisms: {
        AuthUI,
        FindReservationForm,
      },
    },
  };
};
