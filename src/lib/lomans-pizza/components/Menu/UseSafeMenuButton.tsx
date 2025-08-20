import { Icon } from "@iconify/react";
import { Dispatch, FC, SetStateAction } from "react";
import { useIDine } from "../../../../packages/idine";
import { Button, Card, Popover } from "flowbite-react";
import Reservation from "../../../../packages/idine/src/types/Reservation";
import toDate from "../../../../packages/idine/src/utils/toDate";

interface UseSafeMenuButtonProps {
  currentReservation: Reservation | null;
  setCurrentReservation: Dispatch<SetStateAction<Reservation | null>>;
}

/**
 * toggles the menu so that it prevents users from
 * ordering allergens and highlights diet-specific items
 */
const UseSafeMenuButton: FC<UseSafeMenuButtonProps> = ({
  currentReservation,
  setCurrentReservation,
}) => {
  const {
    currentUserReservations,
    currentUser,
    display: {
      molecules: { SignInButton },
    },
    utils: { formatDatePretty, convert24ToAmPm },
  } = useIDine();

  return (
    <>
      <Popover
        placement="bottom-end"
        content={
          <Card className="max-w-80">
            <span className="font-base font-semibold uppercase text-lg">
              Get Safe Menu *
            </span>
            {currentUser ? (
              <>
                <Button
                  className={`${currentReservation === null && "bg-green-300"}`}
                  color={"alternative"}
                  onClick={() => setCurrentReservation(null)}
                >
                  Full Menu{" "}
                  {currentReservation === null && "(Currently Selected)"}
                </Button>
                <span>Select A Reservation</span>
                {currentUserReservations.map((reservation) => (
                  <Button
                    key={reservation.id}
                    className={`${currentReservation?.id === reservation.id && "bg-green-300"}`}
                    color={"alternative"}
                    onClick={() => setCurrentReservation(reservation)}
                  >
                    {reservation.startDate &&
                      formatDatePretty(toDate(reservation.startDate) as Date)}
                    ,{" "}
                    {reservation.startTimeISO &&
                      convert24ToAmPm(
                        reservation.startTimeISO as `${string}:${string}`
                      )}
                  </Button>
                ))}
                <span className="text-xs">
                  * Guests in your party may have allergies or dietary
                  restrictions, consider letting them know to filter their
                  menus.
                </span>
              </>
            ) : (
              <>
                <span>Sign in with IDine to enable diet-friendly menus</span>
                <SignInButton fullWidth />
              </>
            )}
          </Card>
        }
      >
        <Button
          className={
            Number(currentReservation?.allergies.length ?? 0) +
              Number(currentReservation?.diets.length ?? 0) ===
            0
              ? "transition-all flex gap-2 border-pink-300 bg-gradient-to-br from-pink-500 to-orange-400 text-white hover:bg-gradient-to-bl focus:ring-pink-200 dark:focus:ring-pink-800"
              : "transition-all flex gap-2 border-green-300 bg-gradient-to-r from-teal-200 to-lime-200 text-gray-900 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-lime-200 dark:focus:ring-teal-700"
          }
        >
          <Icon
            icon={
              Number(currentReservation?.allergies.length ?? 0) +
                Number(currentReservation?.diets.length ?? 0) ===
              0
                ? "mdi:peanut"
                : "mdi:peanut-off"
            }
            className="text-2xl"
          />
        </Button>
      </Popover>
    </>
  );
};

export default UseSafeMenuButton;
