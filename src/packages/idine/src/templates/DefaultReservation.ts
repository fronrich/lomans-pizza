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
  restaurantName: "",
  date: new Date(),
  tableServerIndices: [],
  targetTime: "",
  startDate: null,
  startTimeISO: "",
  seatingComposition: {
    infants: 0,
    wheelchairAccessible: 0,
  },
  requests: "",
  status: ReservationStatus.HOLD,
  tab: [],
  tableIds: [],
  guestId: "",
};

export default DefaultReservation;
