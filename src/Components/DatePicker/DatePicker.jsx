import React, { useState, useEffect, useContext } from "react";
import moment from "moment-hijri";
import moments from "moment";

import "./DatePicker.css";
import Calender from "../DatePickerCalender/DatePickerCalender";
import { countNights } from "../../Pages/Dashboard/Night/Night";
import ReservationContext from "../../Context/ReservationContext";

const DatePicker = ({
  type,
  night,
  srcType,
  createRoom,
  updateNight,
  changeSlotId,
  calculateTotal,
  handleDateChange,
}) => {
  console.log("nightqqqq", night);
  const [datePickerState, setDatePickerState] = useState();

  const { state, handleDatePickerState } = useContext(ReservationContext);

  const handleGregorianInputChange = (id, date) => {
    var m = moment().utcOffset(0);
    m.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    m.toISOString();
    m.format();
    let hijriDate = m.format("iYYYY-iM-iD");
    if (id === "gregorian-start" || id === "hijri-start") {
      setDatePickerState((prev) => ({
        ...prev,
        startDate: date,
        startDateHijri: hijriDate,
        endDate: date,
        endDateHijri: hijriDate,
      }));
      night.from_date = moments(date).format("YYYY-MM-DD");
      night.numberOfNights = night.from_hijri_date = hijriDate;
      handleDateChange(
        moments(date).format("YYYY-MM-DD"),
        moments(date).format("YYYY-MM-DD"),
        night.id
      );
      // console.log("night", night);
      updateNight(null, night);
      countNights(night, createRoom, calculateTotal);
      changeSlotId(night.id);
      return;
    }
    if (id === "gregorian-end" || id === "hijri-end") {
      setDatePickerState((prev) => ({
        ...prev,
        startDate: state[0]?.startDate,
        startDateHijri: state[0]?.startDateHijri,
        endDate: date,
        endDateHijri: hijriDate,
      }));
      night.to_date = moments(date).format("YYYY-MM-DD");
      night.to_hijri_date = state[0]?.hijriDate;
      handleDateChange(
        moments(state[0]?.startDate).format("YYYY-MM-DD"),
        moments(date).format("YYYY-MM-DD")
      );
      updateNight(null, night);
      countNights(night, createRoom, calculateTotal);
      changeSlotId(night.id);
      return;
    }
  };

  //cause error
  useEffect(() => {
    if (state[0] !== undefined && night && srcType) {
      night.from_date = moments(state[0]?.startDate).format("YYYY-MM-DD");
      night.from_hijri_date = moments(state[0]?.startDateHijri).format(
        "YYYY-MM-DD"
      );
      night.to_date = moments(state[0]?.endDate).format("YYYY-MM-DD");
      night.to_hijri_date = moments(state[0]?.endDateHijri).format(
        "YYYY-MM-DD"
      );
      changeSlotId(night.id);
      //to get availability
      // handleDateChange(
      //   moments(state[0]?.startDate).format("YYYY-MM-DD"),
      //   moments(state[0]?.endDate).format("YYYY-MM-DD")
      // );
    }
  }, [state, srcType]);

  useEffect(() => {
    if (type !== "popup") handleDatePickerState(datePickerState);
  }, [datePickerState]);

  return (
    <div className="row m-0">
      <div className="col-md-3 col-sm-12">
        <span className="date-lable">From</span>
        <Calender
          id="hijri-start"
          type="start"
          mode="Gregorian"
          state={type === "popup" ? night.from_date : state[0]?.startDate}
          handleGregorianInputChange={handleGregorianInputChange}
        />
      </div>
      <div className="col-md-3 col-sm-12">
        <span className="date-lable">To</span>
        <Calender
          id="hijri-end"
          type="end"
          mode="Gregorian"
          state={type === "popup" ? night.to_date : state[0]?.endDate}
          handleGregorianInputChange={handleGregorianInputChange}
        />
      </div>

      <div className="col-md-3 col-sm-12">
        <span className="date-lable">From Hijri</span>
        <Calender
          id="hijri-start"
          type="start"
          mode="Islamic"
          state={type === "popup" ? night.from_date : state[0]?.startDate}
          handleGregorianInputChange={handleGregorianInputChange}
        />
      </div>
      <div className="col-md-3 col-sm-12">
        <span className="date-lable">To Hijri</span>
        <Calender
          id="hijri-end"
          type="end"
          mode="Islamic"
          state={type === "popup" ? night.to_date : state[0]?.endDate}
          handleGregorianInputChange={handleGregorianInputChange}
        />
      </div>
    </div>
  );
};

export default DatePicker;
