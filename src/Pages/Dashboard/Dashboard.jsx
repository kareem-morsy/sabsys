import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DocumentMeta from "react-document-meta";
import moments from "moment";
import Filter from "../../Components/Filter/Filter";
import Calender from "../../Components/Calender/Calender";
import DatePicker from "../../Components/DatePicker/DatePicker";
import ReservationContext from "../../Context/ReservationContext";
import ReservationPopup from "../../Components/ReservationPopup/ReservationPopup";
import fetcher from "../../Services/fetcher";

function Dashboard() {
  // Start Dashboard Status
  const [availabilityParams, setAvailabilityParams] = useState({
    from: moments(new Date()).format("YYYY-MM-DD"),
    to: moments(new Date()).add(365, "d").format("YYYY-MM-DD"),
  });
  const [availableRoomsData, setAvailableRoomsData] = useState();
  // End Dashboard Status

  const { showReservationPopup, datePickerState, handleState } =
    useContext(ReservationContext);
  const history = useNavigate();

  const handleHotelChange = (hotel) =>
    setAvailabilityParams((prevState) => ({
      ...prevState,
      hotel_id: hotel.value,
    }));

  const handleDateChange = (from, to) =>
    setAvailabilityParams((prevState) => ({
      ...prevState,
      from: from,
      to: to,
    }));

  const handleRoomTypeChange = (type) =>
    setAvailabilityParams((prevState) => ({
      ...prevState,
      room_type: type.value,
    }));

  const handleRoomViewChange = (view) =>
    setAvailabilityParams((prevState) => ({
      ...prevState,
      room_view: view.value,
    }));

  useEffect(() => {
    if (datePickerState !== undefined)
      handleState([datePickerState], "dashboard");
    history(window.location.pathname === "/login" && `/`, { replace: true });
  }, [datePickerState]);

  // Start Fetch Avilabilty
  useEffect(() => {
    fetcher("availability?", availabilityParams)
      .then((res) => {
        // ReservationData.handleAvailability(
        // console.log("res.data", res);
        // console.log(
        //   res.data.map((x) =>
        //     x.nights.map((y) => ({
        //       id: y.id,
        //       date: y.date,
        //       available: [
        //         {
        //           id: y.id,
        //           roomType: x.room_type.title,
        //           roomView: x.room_view.title,
        //           count: y.availability,
        //         },
        //       ],
        //     }))
        //   )
        // );
        setAvailableRoomsData(
          res.data.map((x) =>
            x.nights.map((y) => ({
              id: y.id,
              date: y.date,
              available: [
                {
                  id: y.id,
                  roomType: x.room_type.title,
                  roomView: x.room_view.title,
                  count: y.availability,
                },
              ],
            }))
          )
        );
        // console.log(
        //   res.data.map((x) => ({
        //     id: x.id,
        //     date: "2022-07-17",
        //     available: [
        //       {
        //         id: x.id,
        //         roomType: x.room_type.title,
        //         roomView: x.room_view.title,
        //         count: x.stock,
        //       },
        //     ],
        //   }))
        // );
        // );
      })
      .catch((err) => console.log(err));
  }, [availabilityParams]);
  // End Fetch Avilabilty

  return (
    <div className="Home">
      <div className="container">
        <h1>Dashboard</h1>
        <Filter
          {...{
            handleHotelChange,
            handleRoomTypeChange,
            handleRoomViewChange,
          }}
        />
        <div className="calender">
          {/* <DatePicker {...{ handleDateChange }} /> */}
          <Calender {...{ availableRoomsData }} />
        </div>
        {showReservationPopup === true && <ReservationPopup />}
      </div>
    </div>
  );
}

export default Dashboard;
