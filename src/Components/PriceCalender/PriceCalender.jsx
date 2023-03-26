import React, { useState, useEffect, useContext } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import momentPlugin from "@fullcalendar/moment";
import listPlugin from "@fullcalendar/list";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import moment from "moment-hijri";
import moments from "moment";
import useToken from "../../customHooks/useToken";
import "./PriceCalender.css";
import nights from "../../Data/nights.json";
import { getRoomById, PostRooms } from "../../Services/Rooms";
import NightPrice from "./NightPrice/NightPriceCopy";
import { useAlert } from "react-alert";
import RequestContext from "../../Context/RequestContext";
import fetcher from "../../Services/fetcher";

const PriceCalender = ({ room, handleNightPriceCalender }) => {
  // console.log("rooooom", room);
  const { permissions, token } = useToken();
  const [showPricePopup, setShowPricePopup] = useState(false);
  const [nightPrice, setNightPrice] = useState([]);
  const [startDay, setStartDay] = useState();
  const [endDay, setEndDay] = useState();
  const [events, setEvents] = useState([]);
  const [roomDataId, setRoomDataId] = useState([]);

  const alert = useAlert();
  // const { Refresh } = useContext(RequestContext);
  const [refreshState, setRefreshState] = useState(null);
  const Refresh = (state) => {
    setRefreshState(state);
  };

  const handlePrice = (price) => setNightPrice(price);
  const handleNightPricePopup = (isShown) => setShowPricePopup(isShown);
  const renderEventContent = (eventInfo) => {
    return (
      <i>
        {eventInfo.event.groupId}: ${eventInfo.event.title}
      </i>
    );
  };

  const handleSelection = (info) => {
    // if (
    //   moment(new Date()).format("YYYY-MM-DD") === moment(info.startStr).format("YYYY-MM-DD") ||
    //   moment(info.startStr).isAfter(moment())
    // ) {
    handleNightPricePopup(true);
    setStartDay(info.startStr);
    setEndDay(info.endStr);
    // }
  };

  const formatNights = (nights) => {
    let formatedNights = nights?.map((night) => [
      {
        title: night.cost_price,
        date: night.date,
        groupId: "cost price",
        className: "cost",
      },
      {
        title: night.selling_price,
        date: night.date,
        groupId: "selling price",
        className: "selling",
      },
    ]);
    setEvents([].concat.apply([], formatedNights));
  };

  const handleHijriCalender = () => {
    setTimeout(() => {
      let dateElement = document.querySelectorAll(".fc-daygrid-day-top");
      for (let myData of dateElement) {
        if (myData.childElementCount === 1) {
          let DateElement = myData.firstChild;
          const node = document.createElement("a");
          const HijriDay = moment(DateElement.getAttribute("aria-label"));
          const textnode = document.createTextNode(HijriDay.iDate());
          node.setAttribute("aria-label", HijriDay.format("iYYYY-iMM-iDD"));
          node.setAttribute("class", "fc-daygrid-day-hijri-number");
          node.appendChild(textnode);
          myData.appendChild(node);
        }
      }
    }, 100);
    handleHijriTitle();
  };

  const handleHijriTitle = () => {
    //remove old title
    let prevTitle = document.querySelector(".hijri-title");
    if (prevTitle) prevTitle.parentNode.removeChild(prevTitle);
    // add new title
    let title = document.querySelector(".fc-toolbar-title");
    const hijriDate = document.createElement("h2");
    const hijriDateText = document.createTextNode(
      ` - ${moment(title.innerText).format("iMMMM iYYYY")}`
    );
    hijriDate.setAttribute("class", "fc-toolbar-title hijri-title");
    hijriDate.appendChild(hijriDateText);
    title.parentElement.insertBefore(hijriDate, title.nextSibling);
  };

  let calenderBtns = document.querySelectorAll(".fc-button");
  for (let myData of calenderBtns) {
    myData.onclick = handleHijriCalender;
  }
  const handleConfirm = () => {
    let confirmObj = {
      hotel_id: roomDataId?.hotel_id,
      room_id: roomDataId?.id,
      nights: [...nightPrice],
    };

    // console.log(confirmObj);
    PostRooms(confirmObj, token)
      .then((res) => {
        if (res.statusCode === 200) {
          handleNightPriceCalender(false);
          Refresh();
          alert.show(res.message);
        }
      })
      .catch((err) => {});
  };

  // useEffect(() => {
  //   console.log("events", events);
  // }, [events]);

  useEffect(() => {
    formatNights(nightPrice);
  }, [nightPrice]);

  // useEffect(() => {
  //   formatNights(nights);
  //   setNightPrice(nights);
  // }, [nights]);
  useEffect(() => {
    fetcher(`rooms/${room.id}`)
      .then((data) => {
        // console.log("roomById", data);
        setRoomDataId(data);
        formatNights(data.nights);
        setNightPrice(
          data.nights.map((night) => ({
            date: night.date,
            cost_price: night.cost_price,
            selling_price: night.selling_price,
            hijri_date: night.hijri_date,
          }))
        );
      })
      .catch((error) => console.log(error));
  }, [room]);

  useEffect(() => {
    // console.log(room);
    formatNights(roomDataId.nights);
    setNightPrice(
      roomDataId?.nights?.map((night) => ({
        date: night.date,
        cost_price: night.cost_price,
        selling_price: night.selling_price,
        hijri_date: moment(night.date).format("iYYYY-iMM-iDD"),
      }))
    );
  }, [room]);

  useEffect(() => {
    handleHijriCalender();
  }, []);

  return (
    <>
      <Popup
        onClose={() => handleNightPriceCalender(false)}
        open={true}
        closeOnDocumentClick
        className="nightPrice-popup"
      >
        <FullCalendar
          plugins={[
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin,
            listPlugin,
            momentPlugin,
          ]}
          eventContent={(event) => renderEventContent(event)}
          initialView="dayGridMonth"
          events={events}
          droppable={true}
          // dateClick={(date) => handleDateClick(date)}
          // eventClick={(info) => console.log("info", info)} //Triggered when the user clicks an event.
          selectable={true}
          dragScroll
          height={540}
          handleWindowResize={true}
          // selectAllow = {(selectInfo)=> {
          //   var ms = moments(new Date());
          //   return ms.isSameOrBefore(moments(selectInfo.start));
          // } }
          select={(e) => handleSelection(e)}
          headerToolbar={{
            left: "today",
            center: "prevYear prev title next nextYear",
            right: "dayGridMonth,listWeek",
          }}
        />
        <div className="popup-actions">
          <button
            type="button"
            className="btn btn-confirm"
            onClick={handleConfirm}
          >
            Confirm
          </button>
          <button
            type="button"
            className="btn btn-cancel"
            onClick={() => handleNightPriceCalender(false)}
          >
            Cancel
          </button>
        </div>
        {showPricePopup &&
          permissions?.find((permission) => permission == "nights-update") && (
            <NightPrice
              {...{
                endDay,
                startDay,
                nightPrice,
                handlePrice,
                handleNightPricePopup,
              }}
            />
          )}
      </Popup>
    </>
  );
};

export default PriceCalender;
