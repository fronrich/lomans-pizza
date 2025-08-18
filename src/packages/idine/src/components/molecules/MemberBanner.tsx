import useProfilesContext from "../../hooks/contexts/useProfileContext";
import { FC } from "react";
import { Badge, Button } from "flowbite-react";
import useAuthContext from "../../hooks/contexts/useAuthContext";

const MemberBanner: FC = () => {
  const { currentUser } = useProfilesContext();
  const { googleSignIn } = useAuthContext();

  if (currentUser) {
    return (
      <div className="w-fit">
        <Badge color="success">
          <span>🪄 Info synced with IDine</span>
        </Badge>
      </div>
    );
  }

  return (
    <Button onClick={googleSignIn} className="w-full" color={"secondary"}>
      Quick reserve with IDine
    </Button>
  );
};

export default MemberBanner;
