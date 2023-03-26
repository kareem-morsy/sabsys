import React, { useState, createContext } from "react";
import { v4 as uuid } from "uuid";
import moment from "moment-hijri";

const ReservationContext = createContext({
  state: [],
  days: undefined,
  vatPercent: 0.15,
  hotel: undefined,
  client: undefined,
  roomType: undefined,
  roomView: undefined,
  guestName: undefined,
  availability: undefined,
  numberOfGuests: undefined,
  datePickerState: undefined,
  showReservationPopup: false,
  handleDatePickerState: (dates) => {},
  handleReservationPopup: (isOpen) => {},
  handleAvailability: (available) => {},
  handleVatPercent: (percent) => {},
  handleClient: (client) => {},
  handleRoomType: (type) => {},
  handleRoomView: (view) => {},
  handleState: (dates) => {},
  handleHotel: (hotel) => {},
  handleDays: (day) => {},
});

export const ReservationContextProvider = (props) => {
  const [hotel, setHotel] = useState();
  const [client, setClient] = useState();
  const [roomType, setRoomType] = useState();
  const [roomView, setRoomView] = useState();
  const [guestName, setGuestName] = useState();
  const [availability, setAvailability] = useState();
  const [vatPercent, setVatPercent] = useState(0.15);
  const [numberOfGuests, setNumberOfGuests] = useState();
  const [datePickerState, setDatePickerState] = useState();
  const [showReservationPopup, setShowReservationPopup] = useState(false);
  const [state, setState] = useState([
    {
      id: uuid(),
      startDate: new Date(),
      startDateHijri: moment(new Date()).format("iYYYY/iM/iD"),
      endDate: new Date(),
      endDateHijri: moment(new Date()).format("iYYYY/iM/iD"),
      key: "selection",
    },
  ]);

  const handleHotel = (hotel) => setHotel(hotel);
  const handleState = (dates, error) => {console.log("error", error); setState(dates);}
  const handleRoomView = (view) => setRoomView(view);
  const handleRoomType = (type) => setRoomType(type);
  const handleClient = (client) => setClient(client);
  const handleGuestName = (name) => setGuestName(name);
  const handleVatPercent = (percent) => setVatPercent(percent);
  const handleNumberOfGuests = (guests) => setNumberOfGuests(guests);
  const handleDatePickerState = (dates) => setDatePickerState(dates);
  const handleAvailability = (available) => setAvailability(available);
  const handleReservationPopup = (isOpen) => setShowReservationPopup(isOpen);

  return (
    <ReservationContext.Provider
      value={{
        state,
        hotel,
        client,
        roomType,
        roomView,
        guestName,
        vatPercent,
        availability,
        numberOfGuests,
        datePickerState,
        showReservationPopup,
        handleReservationPopup,
        handleDatePickerState,
        handleNumberOfGuests,
        handleAvailability,
        handleVatPercent,
        handleGuestName,
        handleRoomType,
        handleRoomView,
        handleClient,
        handleHotel,
        handleState,
      }}
    >
      {props.children}
    </ReservationContext.Provider>
  );
};

export default ReservationContext;
