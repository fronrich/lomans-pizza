import { useState } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import useReservationFormContext from "../../hooks/contexts/useReservationFormContext";

const CancelReservationButton = () => {
  const { cancelReservation } = useReservationFormContext();
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Button onClick={() => setOpen(true)} color={"red"} className="w-full">
        Cancel My Reservation
      </Button>
      <Modal
        className="not-prose"
        dismissible
        show={open}
        onClose={() => setOpen(false)}
      >
        <ModalHeader className="!font-idine">
          Confirm Canceling Your Reservation
        </ModalHeader>
        <ModalBody className="!font-idine">
          <p>
            You are about to cancel your reservation. Doing so will open this
            date and time up for other people to take.
          </p>
          <p className="font-bold">Are you sure you want to cancel?</p>
          <div className="w-full flex lg:flex-row gap-2 flex-col">
            <Button
              type="submit"
              onClick={cancelReservation}
              color="red"
              className="w-full"
            >
              Yes, cancel my reservation
            </Button>
            <Button
              className="w-full"
              color="alternative"
              onClick={() => setOpen(false)}
            >
              Nevermind
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default CancelReservationButton;
