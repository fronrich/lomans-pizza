import { Avatar, Badge, Button, Card, Popover } from "flowbite-react";
import useProfilesContext from "../../hooks/contexts/useProfileContext";
import getInitials from "../../utils/getInitials";
import useAuthContext from "../../hooks/contexts/useAuthContext";
import Glyph from "../atoms/Glyph";
import { Icon } from "@iconify/react";

const IDineAvatar = () => {
  const { currentUser, restaurant } = useProfilesContext();
  const { googleSignOut } = useAuthContext();
  return (
    <Popover
      placement="bottom"
      className="motion-opacity-in-0"
      content={
        <Card className="bg-surface-200 w-96">
          <div className="flex gap-2 items-end justify-between">
            <span className="font-heading text-xl">
              {currentUser?.firstName} {currentUser?.lastName}
            </span>
            <Glyph fill="fill-surface-400" stroke="stroke-surface-400" />
          </div>
          {currentUser && restaurant?.adminIds.includes(currentUser?.id) && (
            <abbr
              className="cursor-pointer no-underline w-fit"
              title={`${currentUser.firstName} is an administrator of ${restaurant.name}.`}
            >
              <Badge color="yellow">
                <div className="flex flex-row gap-1 items-center">
                  <span>Store Admin</span>
                  <Icon icon="carbon:help-filled" />
                </div>
              </Badge>
            </abbr>
          )}
          <Button color="secondary">Manage {restaurant?.name}</Button>
          <Button color="secondary">My Reservations</Button>
          <Button onClick={googleSignOut}>Sign Out</Button>
        </Card>
      }
    >
      <Avatar
        className="cursor-pointer"
        rounded
        placeholderInitials={getInitials(
          `${currentUser?.firstName} ${currentUser?.lastName}`
        )}
      />
    </Popover>
  );
};

export default IDineAvatar;
