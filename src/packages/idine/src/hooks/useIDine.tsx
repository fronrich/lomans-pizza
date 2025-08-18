import useProfilesContext from "./contexts/useProfileContext";
import useAuthContext from "./contexts/useAuthContext";
import { useFormContext } from "react-hook-form";
import Glyph from "../components/atoms/Glyph";
import Logo from "../components/atoms/Logo";
import OperationHours from "../components/atoms/OperationHours";
import SignInButton from "../components/molecules/SignInButton";
import AuthUI from "../components/organisms/AuthUI";
import FindReservationForm from "../components/layouts/FindReservationForm";

export default () => {
  const { restaurant, currentUser } = useProfilesContext();
  const { googleSignIn, googleSignOut } = useAuthContext();

  return {
    restaurant,
    currentUser,
    signIn: googleSignIn,
    signOut: googleSignOut,
    reservationForm: useFormContext,
    display: {
      atoms: {
        OperationHours,
        Glyph,
        Logo,
      },
      molecules: {
        SignInButton,
      },
      organisms: {
        AuthUI,
        FindReservationForm,
      },
    },
  };
};
