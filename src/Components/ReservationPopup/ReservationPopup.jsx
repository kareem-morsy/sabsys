import React, { useState, useContext, useEffect } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import { v4 as uuid } from "uuid";
import moments from "moment";
import "./ReservationPopup.css";
import PricePopup from "../PricePopup/PricePopup";
import Night from "../../Pages/Dashboard/Night/Night";
import ReservationData from "../../Pages/Dashboard/ReservationData/ReservationData";
import ReservationContext from "../../Context/ReservationContext";
import { postReservation } from "../../Services/Reservations";
import { getAvailability } from "../../Services/Availability";
import { AlertToaster } from "../../AlertToaster/AlertToaster";
import { useAlert } from "react-alert";
import useToken from "../../customHooks/useToken";
import RequestContext from "../../Context/RequestContext";
import { FaHotel } from "react-icons/fa";
import fetcher from "../../Services/fetcher";
const ReservationPopup = () => {
  const { state, roomType, roomView, vatPercent, handleReservationPopup } =
    useContext(ReservationContext);

  const { user } = useToken();
  const [slotId, setslotId] = useState();
  const [reserve, setReserv] = useState([]);
  const [reservationTotalPrice, setReservationTotalPrice] = useState();
  const [showPriceBreakdow, setShowPriceBreakdow] = useState(false);
  const [availableRoomsCount, setAvailableRoomsCount] = useState();
  const [availabilityParams, setAvailabilityParams] = useState();
  const [availableRoomsData, setAvailableRoomsData] = useState();
  const [reservationVat, setReservationVat] = useState();
  const [availableRoomLabel, setAvailableRoomLabel] = useState();
  const [nightsCount, setNightsCount] = useState([
    {
      id: uuid(),
      to_date: null,
      from_date: null,
      to_hijri_date: null,
      from_hijri_date: null,
      key: "selection",
      count: 1,
      numberOfNights: null,
      room_type_id: null,
      // roomTypeName: roomType?.label,
      room_view_id: null,
      // roomViewName: roomView?.label,
      meal_price: null,
      meal_id: null,
      oldTotal: null,
      total: null,
      sub_total: null,
      vat: null,
      nights: [],
      guests: [],
    },
  ]);

  // const { Refresh } = useContext(RequestContext);
  const [refreshState, setRefreshState] = useState(null);

  const Refresh = (state) => {
    setRefreshState(state);
  };
  const navigate = useNavigate();
  const alert = useAlert();

  const changeSlotId = (id) => setslotId(id);

  const removeNight = (nights) => {
    setNightsCount(nights);
  };
  const handlePricePopup = (isShown) => setShowPriceBreakdow(isShown);
  const addNight = (night) => setNightsCount((prev) => [...prev, night]);

  const handleHotelChange = (hotel) => {
    setAvailabilityParams((prevState) => ({
      ...prevState,
      hotel_id: hotel,
    }));
  };
  const handleDateChange = (from, to) => {
    setAvailabilityParams((prevState) => ({
      ...prevState,
      from,
      to,
    }));
  };
  const handleRoomTypeChange = (type) => {
    setAvailabilityParams((prevState) => ({
      ...prevState,
      room_type: type,
    }));
  };
  const handleRoomViewChange = (view) =>
    setAvailabilityParams((prevState) => ({
      ...prevState,
      room_view: view,
    }));

  const calculateTotal = () => {
    const nightsObj = [...nightsCount];
    const newState = nightsObj.map((obj) => {
      let totalPrice = 0;
      let newTotalPrice = 0;
      // debugger;
      totalPrice += obj.nights?.length
        ? Number(obj.meal_price) * obj.nights?.length
        : Number(obj.meal_price);
      // newTotalPrice += Number(obj.meal_price) * obj.numberOfNights;
      newTotalPrice += obj.nights?.length
        ? Number(obj.meal_price) * obj.nights?.length
        : Number(obj.meal_price);
      obj?.nights?.map((night) => {
        totalPrice += Number(night.nightPrice);
        if (night.selling_price && night.selling_price !== 0) {
          newTotalPrice += Number(night.selling_price);
        } else {
          newTotalPrice += Number(night.nightPrice);
        }

        // night.extras.map((option) => { *
        night.extras.map((option) => {
          totalPrice += option.price;
          newTotalPrice += option.price;
        });
      });
      obj.oldTotal = totalPrice;
      obj.sub_total = totalPrice === newTotalPrice ? 0 : newTotalPrice;
      obj.vat = vatPercent * newTotalPrice;
      obj.total =
        obj.sub_total !== 0 ? obj.sub_total + obj.vat : obj.oldTotal + obj.vat;
      // if(!obj.nights?.length) obj.count = 0;
      if (obj.count) {
        obj.oldTotal = Number(obj.count) * totalPrice;
        obj.sub_total =
          totalPrice === newTotalPrice ? 0 : Number(obj.count) * newTotalPrice;
        obj.vat = vatPercent * newTotalPrice * obj.count;
        obj.total =
          obj.sub_total !== 0
            ? obj.sub_total + obj.vat
            : obj.oldTotal + obj.vat;
      }
      return obj;
    });
    setNightsCount(newState);
  };

  const createRoom = (night, nightExtras) => {
    const nightsObj = [...nightsCount];
    const newState = nightsObj.map((obj) => {
      if (obj.id === night?.id) {
        obj.nights = nightExtras;
        obj.numberOfNights = nightExtras.length;
      }
      return obj;
    });
    setNightsCount(newState);
  };

  const updateNight = (id = null, night) => {
    // console.log("night in popup", night);
    const nightsObj = [...nightsCount];
    const newState = nightsObj.map((obj) => {
      // 👇️ if id equals 2 replace object
      if (obj.id === id) {
        let index = obj.nights.findIndex(
          // (obj) => obj.night_id === night.id *
          (obj) => obj.night_id === night.night_id
        );
        obj.nights[index].night_id = night.night_id;
        obj.nights[index].selling_price = Number(night.selling_price);
        // obj.nights[index].extra = night.extra;
        obj.nights[index].extras = night.extras;
        return obj;
      }
      if (obj.id === night?.id) {
        return night;
      }
      obj.numberOfNights = obj.nights.length;
      // 👇️ otherwise return object as is
      return obj;
    });
    setNightsCount(newState);
    calculateTotal();
  };
  const handleConfirm = () => {
    // reservationObj.id = uuid();
    reservationObj.user_id = user.id;
    reservationObj.slots = nightsCount;
    reservationObj.status_id = 1;
    // console.log(reservationObj);
    // handleReservationPopup(false);

    // post reservationObject
    postReservation(reservationObj, token)
      .then((response) => {
        alert.show(response.message);
        Refresh("reservations");
        handleReservationPopup(false);
        // alert("Reservation is Successful");
        navigate("/reservations");
      })
      .catch((error) => alert.show(error.message));
    // navigate("/reservations");
  };

  useEffect(() => {
    if (state)
      handleDateChange(
        moments(state[0]?.startDate).format("YYYY-MM-DD"),
        moments(state[0]?.endDate).format("YYYY-MM-DD")
      );
  }, [state]);

  // useEffect(() => {
  //   console.log("availableRoomLabel", availableRoomLabel);
  // }, [availableRoomLabel]);
  const { token } = useToken();

  useEffect(() => {
    if (availabilityParams) {
      // console.log("availabilityState", availabilityParams);
      fetcher("availability?", availabilityParams)
        .then((res) => {
          let roomsStock = res.data.reduce(
            (total, currentItem) =>
              (total = Number(total) + Number(currentItem.min_availability)),
            0
          );
          // console.log(roomsStock);
          setAvailableRoomsCount(roomsStock);
          // setAvailableRoomLabel(prev => [{slot_id:prev[0].slot_id, min_availability:roomsStock}]);
          setAvailableRoomsData(res.data);
          // console.log("availabilityParams", res.data);
        })
        .catch((err) => {
          alert.show(err.message);
          // handleReservationPopup(false)
        });
      // alert.show(err.message)
    }
  }, [availabilityParams]);

  useEffect(() => {
    let priceCount = nightsCount.reduce(
      (total, currentItem) =>
        currentItem.sub_total !== 0
          ? (total += currentItem.sub_total)
          : (total += currentItem.oldTotal),
      0
    );

    let vatCount = priceCount * vatPercent;
    setReservationTotalPrice(priceCount);
    reservationObj.sub_total = priceCount;
    reservationObj.total = priceCount + vatCount;
    setReservationVat(vatCount);
    reservationObj.vat = vatCount;
  }, [nightsCount, vatPercent]);

  // useEffect(() => {
  //   if (nightsCount)
  //     setAvailableRoomLabel([
  //       { slot_id: nightsCount[0].id, min_availability: "" },
  //     ]);
  // }, [nightsCount]);

  return (
    <Popup
      onClose={() => handleReservationPopup(false)}
      open={true}
      closeOnDocumentClick
      className="preview-popup"
    >
      <div className="m-auto h-100">
        <div className="popup-date-picker">
          <ReservationData
            type="create"
            {...{ reservationObj, handleHotelChange }}
          />
        </div>
        {nightsCount.length > 0 && (
          <div className="nights-div">
            {nightsCount.map((night, index) => (
              <Night
                key={index}
                type="create"
                {...{
                  index,
                  night,
                  slotId,
                  addNight,
                  createRoom,
                  updateNight,
                  nightsCount,
                  removeNight,
                  changeSlotId,
                  calculateTotal,
                  handleDateChange,
                  availableRoomsData,
                  availableRoomsCount,
                  handleRoomViewChange,
                  handleRoomTypeChange,
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="popup-actions">
        <div
          data-tip="Price Breakdown"
          data-place="left"
          data-type="info"
          data-effect="solid"
          data-background-color="#d49e1f"
          data-text-color="#fff"
          onClick={() => setShowPriceBreakdow(true)}
        >
          <AiOutlineInfoCircle />
        </div>
        <div className="total-div">
          <div>
            <span>Total: </span>{" "}
            <span className="main-color"> ${reservationTotalPrice}</span>
          </div>
          <div className="vat">
            <span>Vat: </span> <span>${reservationVat}</span>
          </div>
        </div>
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
          onClick={() => handleReservationPopup(false)}
        >
          Cancel
        </button>
      </div>
      {showPriceBreakdow && (
        <PricePopup
          {...{
            handlePricePopup,
            nightsCount,
            reservationTotalPrice,
            reservationVat,
          }}
        />
      )}
      <ReactTooltip />
    </Popup>
  );
};

export default ReservationPopup;

const reservationObj = {
  // id: null, // noy used
  user_id: null,
  client_id: null,
  hotel_id: null,
  payment_method_id: null,
  status_id: null,
  sub_total: null,
  vat: null,
  total: null,
  slots: [],
};
