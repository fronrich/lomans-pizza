import { Button } from "flowbite-react";
import useAuthContext from "../../hooks/contexts/useAuthContext";
import Glyph from "../atoms/Glyph";
import { FC } from "react";

interface SignInButtonProps {
  fullWidth?: boolean;
}
const SignInButton: FC<SignInButtonProps> = ({ fullWidth }) => {
  const { googleSignIn } = useAuthContext();
  return (
    <abbr
      className="no-underline w-full"
      title="Sign in to reserve faster, get diet friendly menus, and explore restaurants"
    >
      <Button
        onClick={googleSignIn}
        className={`${fullWidth && "w-full"} flex items-center justify-center gap-2 motion-scale-in-0`}
      >
        <span>Sign in</span>
        <Glyph />
      </Button>
    </abbr>
  );
};

export default SignInButton;
