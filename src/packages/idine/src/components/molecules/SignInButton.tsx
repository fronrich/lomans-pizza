import { Button } from "flowbite-react";
import useAuthContext from "../../hooks/contexts/useAuthContext";
import Glyph from "../atoms/Glyph";
const SignInButton = () => {
  const { googleSignIn } = useAuthContext();
  return (
    <abbr
      className="no-underline"
      title="Sign in to reserve faster, get diet friendly menus, and explore restaurants"
    >
      <Button
        onClick={googleSignIn}
        className="flex items-center justify-center gap-2 motion-scale-in-0"
      >
        <span>Sign in</span>
        <Glyph />
      </Button>
    </abbr>
  );
};

export default SignInButton;
