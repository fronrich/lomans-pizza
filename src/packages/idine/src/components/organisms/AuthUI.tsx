import SignInButton from "../molecules/SignInButton";
import useProfilesContext from "../../hooks/contexts/useProfileContext";
import IDineAvatar from "../molecules/IDineAvatar";
import useAuthContext from "../../hooks/contexts/useAuthContext";
import Glyph from "../atoms/Glyph";

/**
 * UI that allows users to manage IDine account
 * @returns
 */
const AuthUI = () => {
  const { currentUser } = useProfilesContext();

  const { isAuthReady } = useAuthContext();

  if (!isAuthReady) {
    return (
      <div className="animate-pulse">
        <Glyph />
      </div>
    );
  }

  return <>{!currentUser ? <SignInButton /> : <IDineAvatar />}</>;
};

export default AuthUI;
