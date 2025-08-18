import ReservationStatus from "../enums/ReservationStatus";
import Reservation from "../types/Reservation";

const DefaultReservation: Reservation = {
  allergies: [],
  diets: [],
  email: "",
  firstName: "",
  lastName: "",
  id: "",
  partySize: 0,
  phone: "",
  restaurantId: "",
  date: new Date(),
  seatingComposition: {
    infants: 0,
    regular: 0,
    wheelchairAccessible: 0,
  },
  status: ReservationStatus.HOLD,
  tab: [],
  tableIds: [],
  guestId: "",
};

export default DefaultReservation;
