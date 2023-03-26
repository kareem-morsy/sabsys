import React, { useState, useEffect, useContext, useRef } from "react";
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import moment from "moment-hijri";
import { format, addDays } from "date-fns";
import ReactTooltip from "react-tooltip";
import AvailableRoom from "../../Data/AvailableRooms.json";

import "./Calender.css";
import ReservationContext from "../../Context/ReservationContext";
import { useNavigate } from "react-router";
const DateRangeFilter = ({ availableRoomsData }) => {
  const [CalenderState, setCalenderState] = useState([
    {
      id: Math.floor(Math.random()),
      startDate: new Date(),
      startDateHijri: moment(new Date()).format("iYYYY/iMM/iDD"),
      endDate: new Date(),
      endDateHijri: moment(new Date()).format("iYYYY/iMM/iDD"),
      key: "selection",
    },
  ]);

  const [xPosition, setXPosition] = useState();
  const [yPosition, setYPosition] = useState();
  const [hoveredDay, setHoveredDay] = useState();
  const [date, setDate] = useState();
  const [availabilityList, setAvailabilityList] = useState();

  const {
    state,
    showReservationPopup,
    availability,
    handleReservationPopup,
    handleState,
  } = useContext(ReservationContext);

  const navigate = useNavigate();
  const handleCalenderChange = (ranges) => {
    // console.log("ranges.selection", ranges);
    setAvailabilityList(false);
    const { selection } = ranges;
    if (selection !== undefined) {
      selection.startDateHijri = moment(selection.startDate).format(
        "iYYYY-iMM-iDD"
      );
      selection.endDateHijri = moment(selection.endDate).format(
        "iYYYY-iMM-iDD"
      );
      handleState([selection], "Calender");
    }
    console.log("ranges.selection", ranges.selection);
    //if you want to show create reservation page
    navigate({
      pathname: "reservations/Create",
      search: `?startDate=${
        ranges.selection.startDate
          ? moment(ranges.selection.startDate).format("YYYY-MM-DD")
          : moment(new Date()).format("YYYY-MM-DD")
      }&endDate=${
        ranges.selection.endDate
          ? moment(ranges.selection.endDate).format("YYYY-MM-DD")
          : moment(new Date()).format("YYYY-MM-DD")
      }&startDateHijri=${
        ranges.selection.startDateHijri
          ? ranges.selection.startDateHijri
          : moment(new Date()).format("iYYYY/iMM/iDD")
      }&endDateHijri=${
        ranges.selection.endDateHijri
          ? ranges.selection.endDateHijri
          : moment(new Date()).format("iYYYY/iMM/iDD")
      }`,
    });
    //if you want to show create reservation popup
    // handleReservationPopup(true);
  };

  function customDayContent(day) {
    // console.log("day", day);
    //format day to match date in api and check if available
    let extraDot = null;
    // if (format(day, "d") === hoveredDay) {
    let x = AvailableRoom.filter(
      (night) => night.date !== format(day, "yyyy-MM-dd")
    );
    // console.log("avalibilty", x);
    // console.log(x.find(night => night.date !== format(day, "yyyy-MM-dd")));
    if (0) {
      // if (availabilityList.length <=0) {
      extraDot = (
        <div
          style={{
            height: "5px",
            width: "5px",
            borderRadius: "100%",
            background: "red",
            position: "absolute",
            top: 0,
            right: 0,
          }}
        />
      );
    }
    return (
      <div>
        {extraDot}
        <span>{format(day, "d")}</span>
      </div>
    );
  }

  useEffect(() => {
    if (availableRoomsData) {
      console.log(
        availableRoomsData.map((data) => data.filter((room) => room))
      );
    }
  }, [availableRoomsData]);
  useEffect(() => {
    if (state[0] !== undefined) setCalenderState(state);
    if (showReservationPopup) handleReservationPopup(true);
  }, [state]);

  const sliceArray = (arr, n) => {
    const array = arr.slice();
    const chunks = [];
    while (array.length) chunks.push(array.splice(0, n));
    setAvailabilityList(chunks);
  };

  useEffect(() => {
    if (availableRoomsData && hoveredDay) {
      // console.log(
      //   "availableRoomsData",
      //   availableRoomsData.map((data) =>
      //     data.filter((room) => room.date === hoveredDay)
      //   )
      // );
      setAvailabilityList(
        availableRoomsData.map((data) =>
          data.filter((room) => room.date === hoveredDay)
        )
      );
    }
    // sliceArray(availableRoomsData, 5);
  }, [hoveredDay, availableRoomsData]);

  // useEffect(() => {
  //   if (date) sliceArray(date.available, 5);
  // }, [date]);

  // useEffect(() => {
  //   if (hoveredDay && availability)
  //     // setDate(AvailableRoom.find((room) => room.date === hoveredDay));
  //     console.log(availability.find((room) => room.date === hoveredDay));
  //     // setDate(availability.find((room) => room.date === hoveredDay));
  // }, [hoveredDay, availability]);

  useEffect(() => {
    let dayCell = document.querySelectorAll(".rdrDay span>div>span");
    let dayCells = document.querySelectorAll(".rdrDay span>div");
    // console.log("dayCells", dayCells);
    let days = [...dayCell, ...dayCells];
    // let days1 = [...dayCells];
    let dayNum;
    days?.map((day) => {
      // console.log("dayCells", dayCells);

      day.onmouseover = (e) => {
        if (e.target.innerText < 10) dayNum = `0${e.target.innerText}`;
        else dayNum = `${e.target.innerText}`;
        let monthYear = day
          .closest(".rdrDays")
          .parentNode.querySelector(".rdrMonthName");
        const arr = monthYear.innerText.split(" ");
        // console.log(`${arr[1]}-${MonthsObject[arr[0]]}-${dayNum}`);
        setHoveredDay(`${arr[1]}-${MonthsObject[arr[0]]}-${dayNum}`);
        if (e.pageX < 240) setXPosition(e.pageX);
        else setXPosition(e.pageX);

        setYPosition(e.pageY);
      };
      day.onmouseout = (e) => {
        setAvailabilityList(false);
      };
    });
  }, []);

  return (
    <>
      <DateRange
        editableDateInputs={true}
        onChange={handleCalenderChange}
        moveRangeOnFirstSelection={false}
        ranges={CalenderState}
        months={12}
        direction="horizontal"
        dayContentRenderer={customDayContent}
        minDate={moment().toDate()}
      />
      {availabilityList && (
        <div
          style={{
            position: "absolute",
            top: yPosition,
            left: xPosition,
          }}
          className="toolTip-div"
        >
          {
            <div key={availabilityList.id}>
              {availabilityList &&
                availabilityList.map((ava) =>
                  ava.map((a) =>
                    a.available.map((list) => (
                      <li>
                        {list.count} {list.roomType}-{list.roomView}
                      </li>
                    ))
                  )
                )}
            </div>
          }
        </div>
      )}
    </>
  );
};

export default DateRangeFilter;

const MonthsObject = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
};
