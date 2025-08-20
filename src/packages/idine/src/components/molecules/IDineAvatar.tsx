import { Avatar, Badge, Button, Card, Popover } from "flowbite-react";
import useProfilesContext from "../../hooks/contexts/useProfileContext";
import getInitials from "../../utils/getInitials";
import useAuthContext from "../../hooks/contexts/useAuthContext";
import Glyph from "../atoms/Glyph";
import { Icon } from "@iconify/react";
import { useNavigate } from "@tanstack/react-router";

const IDineAvatar = () => {
  const nav = useNavigate();
  const { currentUser, restaurant } = useProfilesContext();
  const { googleSignOut } = useAuthContext();
  return (
    <Popover
      placement="bottom"
      className="motion-opacity-in-0 shadow-lg"
      content={
        <Card className="bg-surface-50 w-96 border-[1px] border-surface-300">
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
          <Button
            onClick={() => nav({ to: "/dashboard/admin" })}
            color="alternative"
          >
            Manage {restaurant?.name} 🔓
          </Button>
          <Button color="alternative">My Reservations</Button>
          <Button onClick={googleSignOut}>Sign Out</Button>
        </Card>
      }
    >
      <Avatar
        className="cursor-pointer border-[1px] rounded-full border-surface-300"
        rounded
        placeholderInitials={getInitials(
          `${currentUser?.firstName} ${currentUser?.lastName}`
        )}
      />
    </Popover>
  );
};

export default IDineAvatar;
